import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const PILLAR_IDS = ["academic", "research", "code", "creator", "social"] as const;
type PillarId = typeof PILLAR_IDS[number];

const REQUIRED_FIELDS: Record<PillarId, string[]> = {
  academic: ["institution", "degree", "gpa", "graduationYear"],
  research: ["title", "doi", "journal", "year"],
  code: ["githubUsername", "projectUrl"],
  creator: ["platform", "channelUrl"],
  social: ["orgName", "role", "startYear"],
};

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body", code: "INVALID_JSON" }, { status: 400 });
  }

  const { pillar, evidence } = body as { pillar?: string; evidence?: Record<string, string> };

  if (!pillar || !PILLAR_IDS.includes(pillar as PillarId)) {
    return NextResponse.json(
      { error: `Invalid pillar. Must be one of: ${PILLAR_IDS.join(", ")}`, code: "INVALID_PILLAR" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  if (!evidence || typeof evidence !== "object") {
    return NextResponse.json(
      { error: "Missing evidence object", code: "MISSING_EVIDENCE" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  const required = REQUIRED_FIELDS[pillar as PillarId];
  const missing = required.filter(f => !evidence[f]);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Missing required evidence fields for ${pillar} pillar: ${missing.join(", ")}`,
        code: "MISSING_FIELDS",
        required,
        missing,
      },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  const submissionId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return NextResponse.json(
    {
      data: {
        submissionId,
        pillar,
        status: "pending_review",
        estimatedReviewTime: "3–5 business days",
        message: `Your ${pillar} credential submission has been received and is queued for verification. You will receive an email once reviewed.`,
        nextSteps: [
          "Our verification team will cross-reference your evidence against primary sources.",
          "You may be contacted for additional documentation.",
          "Score update will be applied immediately upon verification approval.",
        ],
      },
      meta: { apiVersion: "1", timestamp: new Date().toISOString() },
    },
    {
      status: 201,
      headers: { "Access-Control-Allow-Origin": "*", "X-API-Version": "1" },
    }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
