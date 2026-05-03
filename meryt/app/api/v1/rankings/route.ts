import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

function topN(arr: typeof LEADERBOARD_DATA, n: number) {
  return arr.slice(0, n).map(c => ({
    id: c.id,
    rank: c.rank,
    name: c.name,
    handle: c.handle,
    avatar: c.avatar,
    country: c.country,
    flag: c.flag,
    university: c.university,
    niScore: c.niScore,
    scoreChange: c.scoreChange,
    categories: c.categories,
    profileUrl: `/profile/${c.id}`,
  }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "global";
  const n = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));

  let data;

  if (type === "global") {
    data = { type: "global", title: "Global Top Ranked", results: topN(LEADERBOARD_DATA, n) };

  } else if (type === "risers") {
    const risers = [...LEADERBOARD_DATA]
      .filter(c => c.scoreChange > 0)
      .sort((a, b) => b.scoreChange - a.scoreChange)
      .slice(0, n)
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, avatar: c.avatar, scoreChange: c.scoreChange, niScore: c.niScore, profileUrl: `/profile/${c.id}` }));
    data = { type: "risers", title: "Biggest Weekly Movers", results: risers };

  } else if (type === "fallers") {
    const fallers = [...LEADERBOARD_DATA]
      .filter(c => c.scoreChange < 0)
      .sort((a, b) => a.scoreChange - b.scoreChange)
      .slice(0, n)
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, avatar: c.avatar, scoreChange: c.scoreChange, niScore: c.niScore, profileUrl: `/profile/${c.id}` }));
    data = { type: "fallers", title: "Biggest Weekly Declines", results: fallers };

  } else if (type === "by_pillar") {
    const pillar = searchParams.get("pillar") ?? "academic";
    const byPillar = [...LEADERBOARD_DATA]
      .map(c => ({ ...c, pillarScore: c.pillars.find(p => p.id === pillar)?.score ?? 0 }))
      .sort((a, b) => b.pillarScore - a.pillarScore)
      .slice(0, n)
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, avatar: c.avatar, niScore: c.niScore, pillar, pillarScore: c.pillarScore, profileUrl: `/profile/${c.id}` }));
    data = { type: "by_pillar", pillar, title: `Top by ${pillar.charAt(0).toUpperCase() + pillar.slice(1)} Pillar`, results: byPillar };

  } else if (type === "by_country") {
    const country = searchParams.get("country");
    if (!country) {
      return NextResponse.json({ error: "country parameter required for type=by_country", code: "MISSING_PARAMS" }, { status: 400 });
    }
    const byCountry = LEADERBOARD_DATA
      .filter(c => c.country.toLowerCase() === country.toLowerCase())
      .slice(0, n)
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, avatar: c.avatar, niScore: c.niScore, university: c.university, profileUrl: `/profile/${c.id}` }));
    data = { type: "by_country", country, title: `Top Profiles from ${country}`, results: byCountry };

  } else if (type === "by_category") {
    const category = searchParams.get("category") ?? "tech";
    const byCat = LEADERBOARD_DATA
      .filter(c => c.categories.includes(category as never))
      .slice(0, n)
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, avatar: c.avatar, niScore: c.niScore, categories: c.categories, profileUrl: `/profile/${c.id}` }));
    data = { type: "by_category", category, title: `Top ${category.charAt(0).toUpperCase() + category.slice(1)} Profiles`, results: byCat };

  } else {
    return NextResponse.json(
      { error: `Unknown ranking type '${type}'. Valid: global, risers, fallers, by_pillar, by_country, by_category`, code: "INVALID_TYPE" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  return NextResponse.json(
    { data, meta: { apiVersion: "1", timestamp: new Date().toISOString(), limit: n } },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
