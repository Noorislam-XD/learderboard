import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") ?? "week";
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));

  // Trending = biggest positive movers weighted by base rank position
  const trending = [...LEADERBOARD_DATA]
    .filter(c => c.scoreChange > 0)
    .map(c => ({
      id: c.id,
      rank: c.rank,
      name: c.name,
      handle: c.handle,
      avatar: c.avatar,
      country: c.country,
      flag: c.flag,
      niScore: c.niScore,
      scoreChange: c.scoreChange,
      trendScore: c.scoreChange * (1 + (30 - c.rank) * 0.05),
      categories: c.categories,
      tags: c.tags.slice(0, 3),
      profileUrl: `/profile/${c.id}`,
    }))
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, limit)
    .map(({ trendScore: _t, ...rest }) => rest);

  return NextResponse.json(
    {
      data: { period, trending },
      meta: { apiVersion: "1", timestamp: new Date().toISOString(), limit },
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
