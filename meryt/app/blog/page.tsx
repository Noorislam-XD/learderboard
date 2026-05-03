import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on talent, merit, verification, and the future of professional identity from the MERYT team.",
};

const POSTS = [
  {
    slug: "ni-score-explained",
    title: "The NI Score: How We Quantify Merit Without Gamification",
    excerpt: "A deep dive into the weighted 5-pillar system, why we chose these metrics, and how we prevent gaming.",
    author: "Noor Islam", authorRole: "Founder", avatar: "👨‍💻",
    date: "May 1, 2025", readTime: "8 min", tag: "Engineering",
    tagColor: "var(--accent2)",
  },
  {
    slug: "not-social-credit",
    title: "Why MERYT Is Not Social Credit Scoring (And Never Will Be)",
    excerpt: "The philosophical and technical boundaries we have built into MERYT to ensure we're measuring merit — not compliance.",
    author: "Priya Sharma", authorRole: "Head of Verification", avatar: "👩‍🔬",
    date: "Apr 22, 2025", readTime: "6 min", tag: "Policy",
    tagColor: "var(--accent3)",
  },
  {
    slug: "verification-accuracy",
    title: "How We Achieve 99.1% Verification Accuracy",
    excerpt: "Our hybrid AI + human review pipeline, the edge cases that fool automated systems, and how we handle appeals.",
    author: "Priya Sharma", authorRole: "Head of Verification", avatar: "👩‍🔬",
    date: "Apr 10, 2025", readTime: "10 min", tag: "Trust & Safety",
    tagColor: "var(--gold)",
  },
  {
    slug: "global-talent-map",
    title: "Mapping Global Talent: What 28,400 Profiles Reveal",
    excerpt: "Data analysis across 142 countries — which regions produce the most research output, best coders, and highest NI Scores.",
    author: "Noor Islam", authorRole: "Founder", avatar: "👨‍💻",
    date: "Mar 28, 2025", readTime: "12 min", tag: "Data",
    tagColor: "var(--accent)",
  },
  {
    slug: "api-v1-launch",
    title: "API v1 Is Live: Build on Top of MERYT Rankings",
    excerpt: "What you can build with the MERYT API, rate limits, authentication, and example use cases from our first integrators.",
    author: "Marcus Chen", authorRole: "Design Lead", avatar: "🧑‍🎨",
    date: "Mar 14, 2025", readTime: "5 min", tag: "Product",
    tagColor: "var(--accent2)",
  },
  {
    slug: "rank-card-embeds",
    title: "Your Rank, Everywhere: Introducing Embeddable Rank Cards",
    excerpt: "How to embed your verified NI Score on your portfolio, GitHub README, or university website.",
    author: "Marcus Chen", authorRole: "Design Lead", avatar: "🧑‍🎨",
    date: "Feb 28, 2025", readTime: "4 min", tag: "Feature",
    tagColor: "var(--accent3)",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["About", "/about"], ["Changelog", "/changelog"], ["← Home", "/"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>Blog</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>Ideas & Insights</h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 48, lineHeight: 1.65 }}>
          On talent, merit, verification, and the future of professional identity.
        </p>

        {/* Featured post */}
        <div style={{ background: "var(--text)", borderRadius: 24, padding: "36px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, bottom: -20, fontSize: 160, opacity: 0.06, lineHeight: 1, userSelect: "none" }}>{featured.avatar}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: `${featured.tagColor}22`, color: featured.tagColor, letterSpacing: "0.06em" }}>{featured.tag}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>FEATURED</span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px,3.5vw,30px)", fontWeight: 800, letterSpacing: "-0.8px", color: "white", marginBottom: 12, lineHeight: 1.15, maxWidth: 560 }}>
            {featured.title}
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 22, maxWidth: 520 }}>{featured.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{featured.avatar}</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "white", lineHeight: 1 }}>{featured.author}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{featured.authorRole}</div>
              </div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{featured.date} · {featured.readTime} read</span>
            <Link href={`/blog/${featured.slug}`} style={{ marginLeft: "auto", padding: "8px 18px", background: "var(--accent)", color: "white", borderRadius: 9, fontFamily: "'DM Mono', monospace", fontSize: 11, textDecoration: "none" }}>
              Read →
            </Link>
          </div>
        </div>

        {/* Post grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {rest.map(post => (
            <div key={post.slug} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 22px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: `${post.tagColor}14`, color: post.tagColor, letterSpacing: "0.06em" }}>{post.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", color: "var(--text)", marginBottom: 10, lineHeight: 1.2, flex: 1 }}>{post.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 18 }}>{post.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16 }}>{post.avatar}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{post.author} · {post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent2)", textDecoration: "none" }}>Read →</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
