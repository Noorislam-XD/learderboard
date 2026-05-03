import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

const UNI_META: Record<string, { shortName: string; flag: string; country: string; rank: string; color: string }> = {
  "IIT Bombay":  { shortName: "IIT Bombay", flag: "🇮🇳", country: "India",       rank: "#1 India (QS 2025)",   color: "#1A56FF" },
  "MIT":         { shortName: "MIT",         flag: "🇺🇸", country: "USA",         rank: "#1 World (QS 2025)",   color: "#FF4500" },
  "Oxford":      { shortName: "Oxford",      flag: "🇬🇧", country: "UK",          rank: "#3 World (QS 2025)",   color: "#9333EA" },
  "ETH Zürich":  { shortName: "ETH Zürich",  flag: "🇨🇭", country: "Switzerland", rank: "#7 World (QS 2025)",   color: "#00BE6A" },
  "Caltech":     { shortName: "Caltech",     flag: "🇺🇸", country: "USA",         rank: "#6 World (QS 2025)",   color: "#FF4500" },
  "Cambridge":   { shortName: "Cambridge",   flag: "🇬🇧", country: "UK",          rank: "#2 World (QS 2025)",   color: "#00BE6A" },
  "Tsinghua":    { shortName: "Tsinghua",    flag: "🇨🇳", country: "China",       rank: "#25 World (QS 2025)",  color: "#9333EA" },
  "University of Tokyo": { shortName: "UTokyo", flag: "🇯🇵", country: "Japan", rank: "#28 World (QS 2025)", color: "#F5A200" },
  "KAIST":       { shortName: "KAIST",       flag: "🇰🇷", country: "South Korea", rank: "#65 World (QS 2025)",  color: "#1A56FF" },
  "University of Sydney": { shortName: "USyd", flag: "🇦🇺", country: "Australia", rank: "#19 World (QS 2025)", color: "#FF4500" },
  "TU Berlin":   { shortName: "TU Berlin",   flag: "🇩🇪", country: "Germany",     rank: "#154 World (QS 2025)", color: "#F5A200" },
  "Moscow State University": { shortName: "MSU", flag: "🇷🇺", country: "Russia", rank: "#95 World (QS 2025)", color: "#FF4500" },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q")?.toLowerCase();
  const country = searchParams.get("country")?.toLowerCase();

  const uniMap: Record<string, {
    name: string; shortName: string; flag: string; country: string; rank: string; color: string;
    profileCount: number; topRank: number; topScore: number; avgScore: number;
    topProfile: { id: string; name: string; niScore: number } | null;
    profileUrl: string;
  }> = {};

  for (const c of LEADERBOARD_DATA) {
    const uniName = c.university;
    if (!uniMap[uniName]) {
      const meta = UNI_META[uniName] ?? { shortName: uniName, flag: "🎓", country: "Unknown", rank: "—", color: "#FF4500" };
      uniMap[uniName] = {
        name: uniName,
        ...meta,
        profileCount: 0,
        topRank: Infinity,
        topScore: 0,
        avgScore: 0,
        topProfile: null,
        profileUrl: `/university/${uniName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
      };
    }
    const u = uniMap[uniName];
    u.profileCount++;
    if (c.niScore > u.topScore) { u.topScore = c.niScore; u.topProfile = { id: c.id, name: c.name, niScore: c.niScore }; }
    if (c.rank < u.topRank) u.topRank = c.rank;
  }

  const scores: Record<string, number[]> = {};
  for (const c of LEADERBOARD_DATA) {
    if (!scores[c.university]) scores[c.university] = [];
    scores[c.university].push(c.niScore);
  }
  for (const [name, sc] of Object.entries(scores)) {
    uniMap[name].avgScore = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length);
  }

  let universities = Object.values(uniMap).sort((a, b) => b.topScore - a.topScore);
  if (search) universities = universities.filter(u => u.name.toLowerCase().includes(search));
  if (country) universities = universities.filter(u => u.country.toLowerCase() === country);

  return NextResponse.json(
    {
      data: universities,
      meta: { total: universities.length, apiVersion: "1", timestamp: new Date().toISOString() },
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
