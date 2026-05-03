import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contestant = LEADERBOARD_DATA.find(c => c.id === id);

  if (!contestant) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ data: contestant });
}
