import { NextResponse } from "next/server";

export const runtime = "edge";

const BASE = "https://meryt.app";

const POSTS = [
  {
    slug: "ni-score-explained",
    title: "The NI Score Explained: How We Quantify Human Achievement",
    description: "A deep dive into the five pillars of the NI Score, how weights are calculated, and why proof-of-work beats follower counts every time.",
    date: "2024-12-10",
    author: "MERYT Research Team",
    tags: ["NI Score", "Methodology", "Verification"],
  },
  {
    slug: "not-social-credit",
    title: "MERYT Is Not Social Credit Scoring — Here's the Difference",
    description: "We address the most common misconception about MERYT. Social credit scores punish. The NI Score rewards verifiable proof-of-work.",
    date: "2024-11-28",
    author: "MERYT Team",
    tags: ["Philosophy", "Ethics", "NI Score"],
  },
  {
    slug: "verification-accuracy",
    title: "How We Achieve 99.1% Verification Accuracy",
    description: "Our verification pipeline combines document analysis, cross-referencing with institutional databases, and human review.",
    date: "2024-11-15",
    author: "MERYT Engineering",
    tags: ["Verification", "Engineering", "Trust"],
  },
  {
    slug: "global-talent-map",
    title: "The Global Talent Map: Where Is the World's Top 0.1% From?",
    description: "An analysis of the geographical distribution of MERYT's highest-ranked profiles across 142 countries.",
    date: "2024-10-30",
    author: "MERYT Research Team",
    tags: ["Research", "Global", "Rankings"],
  },
  {
    slug: "api-v1-launch",
    title: "MERYT API v1 Is Live",
    description: "Developer-friendly REST API to access leaderboard data, profiles, and verification status. Free tier includes 1,000 requests/day.",
    date: "2024-10-15",
    author: "MERYT Engineering",
    tags: ["API", "Developer", "Engineering"],
  },
  {
    slug: "rank-card-embeds",
    title: "Embed Your MERYT Rank Card Anywhere",
    description: "Add your MERYT rank card to your GitHub README, portfolio site, or LinkedIn. One URL, always up to date.",
    date: "2024-09-28",
    author: "MERYT Team",
    tags: ["Embed", "Features", "Developer"],
  },
];

export async function GET() {
  const items = POSTS.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid>${BASE}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>hello@meryt.app (${p.author})</author>
      ${p.tags.map(t => `<category>${t}</category>`).join("\n      ")}
    </item>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MERYT Blog — Global Verified Talent Rankings</title>
    <link>${BASE}/blog</link>
    <description>Insights on talent ranking, verification, and the NI Score from the MERYT team.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/api/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE}/opengraph-image</url>
      <title>MERYT Blog</title>
      <link>${BASE}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
