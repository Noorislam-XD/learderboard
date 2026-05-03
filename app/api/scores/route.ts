import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET(_request: NextRequest) {
  const scores = LEADERBOARD_DATA.map(c => ({
    id: c.id,
    name: c.name,
    handle: c.handle,
    niScore: c.niScore,
    rank: c.rank,
    scoreChange: c.scoreChange,
    pillars: c.pillars.map(p => ({ id: p.id, name: p.name, score: p.score, weight: p.weight })),
  }));

  return NextResponse.json({
    data: scores,
    meta: {
      total: scores.length,
      lastUpdated: new Date().toISOString(),
      updateFrequency: "real-time",
    },
  });
}
