import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contestant = LEADERBOARD_DATA.find(c => c.id === id);

  if (!contestant) {
    return NextResponse.json(
      { error: "Profile not found", code: "NOT_FOUND" },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  const payload = {
    id: contestant.id,
    rank: contestant.rank,
    name: contestant.name,
    handle: contestant.handle,
    avatar: contestant.avatar,
    country: contestant.country,
    flag: contestant.flag,
    university: contestant.university,
    niScore: contestant.niScore,
    scoreChange: contestant.scoreChange,
    rankPercentile: contestant.rankPercentile,
    categories: contestant.categories,
    tags: contestant.tags,
    bio: contestant.bio,
    followers: contestant.followers,
    following: contestant.following,
    joinedDate: contestant.joinedDate,
    skills: contestant.skills,
    pillars: contestant.pillars.map(p => ({
      id: p.id,
      name: p.name,
      score: p.score,
      weight: p.weight,
      color: p.color,
      items: p.items,
    })),
    achievements: contestant.achievements,
    socials: contestant.socials,
    profileUrl: `/profile/${contestant.id}`,
    embedUrl: `/embed/${contestant.id}`,
    ogImageUrl: `/profile/${contestant.id}/opengraph-image`,
  };

  return NextResponse.json(
    { data: payload, meta: { apiVersion: "1", timestamp: new Date().toISOString() } },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
