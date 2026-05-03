import { NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET() {
  const total = LEADERBOARD_DATA.length;
  const countries = [...new Set(LEADERBOARD_DATA.map(c => c.country))];
  const universities = [...new Set(LEADERBOARD_DATA.map(c => c.university))];
  const avgScore = Math.round(LEADERBOARD_DATA.reduce((s, c) => s + c.niScore, 0) / total);
  const topScore = Math.max(...LEADERBOARD_DATA.map(c => c.niScore));
  const categoryBreakdown = LEADERBOARD_DATA.reduce<Record<string, number>>((acc, c) => {
    c.categories.forEach(cat => { acc[cat] = (acc[cat] ?? 0) + 1; });
    return acc;
  }, {});
  const risers = [...LEADERBOARD_DATA]
    .filter(c => c.scoreChange > 0)
    .sort((a, b) => b.scoreChange - a.scoreChange)
    .slice(0, 5)
    .map(c => ({ id: c.id, name: c.name, handle: c.handle, scoreChange: c.scoreChange }));

  return NextResponse.json(
    {
      data: {
        totalProfiles: total,
        totalVerified: Math.round(total * 0.94),
        countriesRepresented: countries.length,
        universitiesRepresented: universities.length,
        averageNiScore: avgScore,
        topNiScore: topScore,
        categoryBreakdown,
        topRisers: risers,
        platformStats: {
          verificationsThisMonth: 2847,
          rankChangesToday: 1284,
          newProfilesThisWeek: 312,
        },
      },
      meta: { apiVersion: "1", timestamp: new Date().toISOString() },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
