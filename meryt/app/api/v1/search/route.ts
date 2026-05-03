import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const category = searchParams.get("category");
  const country = searchParams.get("country");
  const university = searchParams.get("university");
  const minScore = parseInt(searchParams.get("min_score") ?? "0", 10);
  const maxScore = parseInt(searchParams.get("max_score") ?? "99999", 10);
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));

  if (!q && !category && !country && !university) {
    return NextResponse.json(
      { error: "At least one search parameter is required (q, category, country, university)", code: "MISSING_PARAMS" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  let results = [...LEADERBOARD_DATA];

  if (q) {
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.handle.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.university.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  }
  if (category && category !== "all") {
    results = results.filter(c => c.categories.includes(category as never));
  }
  if (country) {
    results = results.filter(c => c.country.toLowerCase() === country.toLowerCase());
  }
  if (university) {
    results = results.filter(c => c.university.toLowerCase().includes(university.toLowerCase()));
  }
  results = results.filter(c => c.niScore >= minScore && c.niScore <= maxScore);

  const total = results.length;
  const paged = results.slice(0, limit);

  return NextResponse.json(
    {
      data: paged.map(c => ({
        id: c.id,
        rank: c.rank,
        name: c.name,
        handle: c.handle,
        avatar: c.avatar,
        country: c.country,
        flag: c.flag,
        university: c.university,
        niScore: c.niScore,
        categories: c.categories,
        tags: c.tags,
        rankPercentile: c.rankPercentile,
        profileUrl: `/profile/${c.id}`,
      })),
      meta: {
        query: { q, category, country, university, minScore, maxScore },
        total,
        returned: paged.length,
        limit,
        apiVersion: "1",
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
