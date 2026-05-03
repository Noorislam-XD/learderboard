import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MERYT Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const POSTS: Record<string, { title: string; author: string; tag: string; tagColor: string }> = {
  "ni-score-explained": { title: "The NI Score: How We Quantify Merit Without Gamification", author: "Noor Islam · Founder", tag: "Engineering", tagColor: "#1A56FF" },
  "not-social-credit": { title: "Why MERYT Is Not Social Credit Scoring (And Never Will Be)", author: "Priya Sharma · Head of Verification", tag: "Philosophy", tagColor: "#9333EA" },
  "verification-accuracy": { title: "How We Achieve 99.1% Verification Accuracy", author: "Marcus Chen · Engineering Lead", tag: "Verification", tagColor: "#00BE6A" },
  "global-talent-map": { title: "The Global Talent Map: Where Is the World's Top 0.1% From?", author: "MERYT Research Team", tag: "Research", tagColor: "#F5A200" },
  "api-v1-launch": { title: "MERYT API v1 Is Live — Access the World's Talent Graph", author: "Amara Osei · Developer Relations", tag: "Developer", tagColor: "#00BE6A" },
  "rank-card-embeds": { title: "Embed Your MERYT Rank Card Anywhere", author: "MERYT Team", tag: "Product", tagColor: "#FF4500" },
};

export default async function BlogOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug] ?? { title: "MERYT Blog", author: "MERYT Team", tag: "Blog", tagColor: "#FF4500" };

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background watermark */}
        <div style={{ position: "absolute", right: -30, bottom: -30, fontSize: 320, fontWeight: 900, color: "rgba(255,255,255,0.02)", lineHeight: 1, display: "flex" }}>
          BLOG
        </div>

        {/* Header: logo + blog label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-1px", display: "flex" }}>MERY</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginLeft: 14, display: "flex", fontFamily: "monospace", letterSpacing: "0.1em" }}>BLOG</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: `${post.tagColor}22`, border: `1px solid ${post.tagColor}55` }}>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: post.tagColor, letterSpacing: "0.06em" }}>{post.tag.toUpperCase()}</span>
          </div>
        </div>

        {/* Post title */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: post.title.length > 60 ? 46 : 56, fontWeight: 900, letterSpacing: "-3px", color: "white", lineHeight: 1.05, maxWidth: 900, display: "flex", flexDirection: "column" }}>
            {post.title}
          </div>
        </div>

        {/* Footer: author + divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FF450022", border: "1px solid #FF450055", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, display: "flex" }}>✍️</span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 14, color: "rgba(255,255,255,0.45)", display: "flex" }}>{post.author}</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", display: "flex" }} />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.25)", display: "flex" }}>meryt.app/blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
