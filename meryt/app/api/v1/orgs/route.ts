import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

const ORG_META: Record<string, { name: string; country: string; flag: string; type: string; founded: string; ranking: string; website: string }> = {
  "iit-bombay": { name: "IIT Bombay", country: "India", flag: "🇮🇳", type: "University", founded: "1958", ranking: "QS #149", website: "iitb.ac.in" },
  "mit": { name: "Massachusetts Institute of Technology", country: "USA", flag: "🇺🇸", type: "University", founded: "1861", ranking: "QS #1", website: "mit.edu" },
  "tokyo-u": { name: "University of Tokyo", country: "Japan", flag: "🇯🇵", type: "University", founded: "1877", ranking: "QS #28", website: "u-tokyo.ac.jp" },
  "stanford": { name: "Stanford University", country: "USA", flag: "🇺🇸", type: "University", founded: "1885", ranking: "QS #5", website: "stanford.edu" },
  "oxford": { name: "University of Oxford", country: "UK", flag: "🇬🇧", type: "University", founded: "1096", ranking: "QS #4", website: "ox.ac.uk" },
  "eth-zurich": { name: "ETH Zürich", country: "Switzerland", flag: "🇨🇭", type: "University", founded: "1855", ranking: "QS #7", website: "ethz.ch" },
  "kaist": { name: "KAIST", country: "South Korea", flag: "🇰🇷", type: "University", founded: "1971", ranking: "QS #65", website: "kaist.ac.kr" },
  "tsinghua": { name: "Tsinghua University", country: "China", flag: "🇨🇳", type: "University", founded: "1911", ranking: "QS #25", website: "tsinghua.edu.cn" },
  "caltech": { name: "California Institute of Technology", country: "USA", flag: "🇺🇸", type: "University", founded: "1891", ranking: "QS #6", website: "caltech.edu" },
  "cambridge": { name: "University of Cambridge", country: "UK", flag: "🇬🇧", type: "University", founded: "1209", ranking: "QS #2", website: "cam.ac.uk" },
};

function slugFromUniversity(uni: string): string {
  return uni.toLowerCase()
    .replace(/university of /g, "")
    .replace(/massachusetts institute of technology/g, "mit")
    .replace(/tokyo university/g, "tokyo-u")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (slug) {
    const meta = ORG_META[slug];
    if (!meta) {
      return NextResponse.json({ error: `Organization '${slug}' not found`, code: "NOT_FOUND" }, {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" },
      });
    }
    const members = LEADERBOARD_DATA
      .filter(c => slugFromUniversity(c.university) === slug || c.university.toLowerCase().includes(meta.name.toLowerCase().split(" ")[0]))
      .map(c => ({ id: c.id, rank: c.rank, name: c.name, handle: c.handle, niScore: c.niScore, avatar: c.avatar }));
    return NextResponse.json(
      { data: { slug, ...meta, verified: true, memberCount: members.length, members, profileUrl: `/org/${slug}` }, meta: { apiVersion: "1" } },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  let orgs = Object.entries(ORG_META).map(([s, m]) => {
    const members = LEADERBOARD_DATA.filter(c =>
      slugFromUniversity(c.university) === s || c.university.toLowerCase().includes(m.name.toLowerCase().split(" ")[0])
    );
    return { slug: s, ...m, verified: true, memberCount: members.length, topScore: members.length ? Math.max(...members.map(c => c.niScore)) : 0 };
  });

  if (country) orgs = orgs.filter(o => o.country.toLowerCase() === country.toLowerCase());
  if (type) orgs = orgs.filter(o => o.type.toLowerCase() === type.toLowerCase());
  orgs.sort((a, b) => b.topScore - a.topScore);

  return NextResponse.json(
    { data: orgs, meta: { total: orgs.length, apiVersion: "1", timestamp: new Date().toISOString() } },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
  );
}
