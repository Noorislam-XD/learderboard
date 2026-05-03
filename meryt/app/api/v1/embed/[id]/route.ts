import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const c = LEADERBOARD_DATA.find(p => p.id === id);

  if (!c) {
    return NextResponse.json(
      { error: "Profile not found", code: "NOT_FOUND" },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  const embedData = {
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
    tags: c.tags.slice(0, 3),
    skills: c.skills,
    embedUrl: `/embed/${c.id}`,
    profileUrl: `/profile/${c.id}`,
    ogImageUrl: `/profile/${c.id}/opengraph-image`,
    iframeSnippet: `<iframe src="https://meryt.app/embed/${c.id}" width="340" height="180" frameborder="0" style="border-radius:16px;"></iframe>`,
    markdownSnippet: `[![${c.name} MERYT Rank Card](https://meryt.app/profile/${c.id}/opengraph-image)](https://meryt.app/profile/${c.id})`,
  };

  return NextResponse.json(
    { data: embedData, meta: { apiVersion: "1", timestamp: new Date().toISOString() } },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
