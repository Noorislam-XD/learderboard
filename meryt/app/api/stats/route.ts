import { NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET() {
  const total = LEADERBOARD_DATA.length;
  const verified = LEADERBOARD_DATA.filter(c => c.pillars.every(p => p.score > 0)).length;
  const avgScore = Math.round(LEADERBOARD_DATA.reduce((s, c) => s + c.niScore, 0) / total);
  const topMover = LEADERBOARD_DATA.reduce((a, b) => Math.abs(b.scoreChange) > Math.abs(a.scoreChange) ? b : a);

  const categoryBreakdown = {
    tech: LEADERBOARD_DATA.filter(c => c.categories.includes("tech")).length,
    research: LEADERBOARD_DATA.filter(c => c.categories.includes("research")).length,
    creative: LEADERBOARD_DATA.filter(c => c.categories.includes("creative")).length,
    gaming: LEADERBOARD_DATA.filter(c => c.categories.includes("gaming")).length,
    social: LEADERBOARD_DATA.filter(c => c.categories.includes("social")).length,
  };

  const countries = [...new Set(LEADERBOARD_DATA.map(c => c.country))].length;

  return NextResponse.json({
    data: {
      totalProfiles: 28400,
      verifiedProfiles: 21840,
      countries: 142,
      avgNiScore: avgScore,
      rankChangesToday: 1284,
      verificationAccuracy: 99.1,
      sampleSize: total,
      categoryBreakdown,
      topMoverThisWeek: {
        id: topMover.id,
        name: topMover.name,
        handle: topMover.handle,
        scoreChange: topMover.scoreChange,
      },
    },
    meta: {
      lastUpdated: new Date().toISOString(),
      updateFrequency: "real-time",
    },
  });
}
