import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const aId = searchParams.get("a");
  const bId = searchParams.get("b");

  if (!aId || !bId) {
    return NextResponse.json(
      { error: "Both 'a' and 'b' profile IDs are required", code: "MISSING_PARAMS" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  const a = LEADERBOARD_DATA.find(c => c.id === aId);
  const b = LEADERBOARD_DATA.find(c => c.id === bId);

  if (!a) return NextResponse.json({ error: `Profile '${aId}' not found`, code: "NOT_FOUND" }, { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  if (!b) return NextResponse.json({ error: `Profile '${bId}' not found`, code: "NOT_FOUND" }, { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });

  const scoreDiff = a.niScore - b.niScore;
  const leader = scoreDiff > 0 ? "a" : scoreDiff < 0 ? "b" : "tie";

  const pillarComparison = a.pillars.map((ap, i) => {
    const bp = b.pillars[i];
    return {
      id: ap.id,
      name: ap.name,
      icon: ap.icon,
      a: ap.score,
      b: bp?.score ?? 0,
      winner: ap.score > (bp?.score ?? 0) ? "a" : ap.score < (bp?.score ?? 0) ? "b" : "tie",
    };
  });

  const aPillarWins = pillarComparison.filter(p => p.winner === "a").length;
  const bPillarWins = pillarComparison.filter(p => p.winner === "b").length;

  const summary = (c: typeof a) => ({
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
    rankPercentile: c.rankPercentile,
    categories: c.categories,
    tags: c.tags,
    profileUrl: `/profile/${c.id}`,
    embedUrl: `/embed/${c.id}`,
  });

  return NextResponse.json(
    {
      data: {
        a: summary(a),
        b: summary(b),
        comparison: {
          leader,
          scoreDiff: Math.abs(scoreDiff),
          rankDiff: Math.abs(a.rank - b.rank),
          aPillarWins,
          bPillarWins,
          tiedPillars: pillarComparison.filter(p => p.winner === "tie").length,
          pillars: pillarComparison,
        },
      },
      meta: { apiVersion: "1", timestamp: new Date().toISOString() },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
