import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "50", 10)));
  const withProfiles = searchParams.get("profiles") === "true";

  const tagMap: Record<string, { tag: string; profileCount: number; topScore: number; topRank: number; profiles?: { id: string; name: string; niScore: number; rank: number }[] }> = {};

  for (const c of LEADERBOARD_DATA) {
    for (const t of c.tags) {
      if (!tagMap[t]) tagMap[t] = { tag: t, profileCount: 0, topScore: 0, topRank: Infinity, profiles: [] };
      tagMap[t].profileCount++;
      if (c.niScore > tagMap[t].topScore) tagMap[t].topScore = c.niScore;
      if (c.rank < tagMap[t].topRank) tagMap[t].topRank = c.rank;
      if (withProfiles) tagMap[t].profiles!.push({ id: c.id, name: c.name, niScore: c.niScore, rank: c.rank });
    }
  }

  const tags = Object.values(tagMap)
    .sort((a, b) => b.profileCount - a.profileCount || b.topScore - a.topScore)
    .slice(0, limit)
    .map(t => withProfiles ? t : { tag: t.tag, profileCount: t.profileCount, topScore: t.topScore, topRank: t.topRank });

  return NextResponse.json(
    {
      data: tags,
      meta: { total: tags.length, apiVersion: "1", timestamp: new Date().toISOString() },
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
