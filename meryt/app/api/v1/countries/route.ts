import { NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET() {
  const countryMap: Record<string, { country: string; flag: string; profileCount: number; topScore: number; topRank: number; avgScore: number; profiles: { id: string; name: string; rank: number; niScore: number }[] }> = {};

  for (const c of LEADERBOARD_DATA) {
    if (!countryMap[c.country]) {
      countryMap[c.country] = { country: c.country, flag: c.flag, profileCount: 0, topScore: 0, topRank: Infinity, avgScore: 0, profiles: [] };
    }
    const cm = countryMap[c.country];
    cm.profileCount++;
    if (c.niScore > cm.topScore) cm.topScore = c.niScore;
    if (c.rank < cm.topRank) cm.topRank = c.rank;
    cm.profiles.push({ id: c.id, name: c.name, rank: c.rank, niScore: c.niScore });
  }

  const countries = Object.values(countryMap).map(cm => ({
    ...cm,
    avgScore: Math.round(cm.profiles.reduce((s, p) => s + p.niScore, 0) / cm.profiles.length),
    profiles: cm.profiles.sort((a, b) => a.rank - b.rank),
  })).sort((a, b) => b.topScore - a.topScore);

  return NextResponse.json(
    {
      data: countries,
      meta: {
        total: countries.length,
        apiVersion: "1",
        timestamp: new Date().toISOString(),
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
