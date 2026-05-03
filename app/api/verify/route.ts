import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pillar, userId, evidence } = body;

  if (!pillar || !userId) {
    return NextResponse.json({ error: "pillar and userId are required" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    verificationId: `vfy_${Date.now()}`,
    pillar,
    userId,
    status: "pending",
    estimatedReview: "48h",
    message: `Your ${pillar} verification has been submitted and is pending review.`,
    submittedAt: new Date().toISOString(),
    evidence: evidence ?? null,
  });
}
