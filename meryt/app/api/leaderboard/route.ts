import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region") ?? "global";
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "score";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const q = searchParams.get("q") ?? "";

  const REGION_MAP: Record<string, string[]> = {
    americas: ["USA", "Canada", "Brazil", "Mexico", "Argentina"],
    europe: ["UK", "Germany", "France", "Spain", "Netherlands", "Sweden", "Poland"],
    asia: ["India", "Japan", "China", "South Korea", "Singapore", "Taiwan"],
    africa: ["Nigeria", "Ghana", "Kenya", "South Africa", "Ethiopia"],
    oceania: ["Australia", "New Zealand"],
  };

  let data = LEADERBOARD_DATA.filter(c => {
    const inRegion = region === "global" || (REGION_MAP[region] ?? []).includes(c.country);
    const inCategory = category === "all" || c.categories.includes(category as never);
    const inSearch = q === "" ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.handle.toLowerCase().includes(q.toLowerCase()) ||
      c.university.toLowerCase().includes(q.toLowerCase());
    return inRegion && inCategory && inSearch;
  });

  if (sort === "change") data = [...data].sort((a, b) => b.scoreChange - a.scoreChange);
  else if (sort === "rank") data = [...data].sort((a, b) => a.rank - b.rank);
  else data = [...data].sort((a, b) => b.niScore - a.niScore);

  const total = data.length;
  const paginated = data.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginated.map((c, i) => ({
      id: c.id,
      displayRank: offset + i + 1,
      globalRank: c.rank,
      handle: c.handle,
      name: c.name,
      avatar: c.avatar,
      university: c.university,
      country: c.country,
      flag: c.flag,
      niScore: c.niScore,
      scoreChange: c.scoreChange,
      tags: c.tags,
      categories: c.categories,
      rankPercentile: c.rankPercentile,
    })),
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
      region,
      category,
      sort,
      query: q,
      generatedAt: new Date().toISOString(),
    },
  });
}
