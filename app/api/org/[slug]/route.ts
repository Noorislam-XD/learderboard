import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

const ORG_DATA: Record<string, { name: string; type: string; country: string; verified: boolean; founded: string }> = {
  "iit-bombay": { name: "IIT Bombay", type: "University", country: "India", verified: true, founded: "1958" },
  "mit": { name: "Massachusetts Institute of Technology", type: "University", country: "USA", verified: true, founded: "1861" },
  "tokyo-university": { name: "University of Tokyo", type: "University", country: "Japan", verified: true, founded: "1877" },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const org = ORG_DATA[slug];
  if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

  const members = LEADERBOARD_DATA.filter(c =>
    c.university.toLowerCase().replace(/\s+/g, "-") === slug ||
    c.university.toLowerCase().includes(slug.replace(/-/g, " "))
  ).map(c => ({ id: c.id, name: c.name, handle: c.handle, niScore: c.niScore, rank: c.rank }));

  return NextResponse.json({ data: { ...org, slug, members, memberCount: members.length } });
}
