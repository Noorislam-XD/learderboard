import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — MERYT",
  description: "What's new on the MERYT platform — version history and feature updates.",
};

const RELEASES = [
  {
    version: "v2.4.0",
    date: "May 2025",
    tag: "Major",
    tagColor: "var(--accent)",
    items: [
      { type: "new", text: "Live leaderboard with real-time rank updates via WebSocket" },
      { type: "new", text: "NI Score engine v2 — improved weighting across 5 pillars" },
      { type: "new", text: "Shareable rank cards: embed your score anywhere" },
      { type: "new", text: "Organization profiles — universities and companies can now claim verified pages" },
      { type: "improved", text: "Profile page redesign with AI insight and rank history chart" },
      { type: "improved", text: "Mobile-responsive layout across all pages" },
    ],
  },
  {
    version: "v2.3.0",
    date: "Apr 2025",
    tag: "Feature",
    tagColor: "var(--accent2)",
    items: [
      { type: "new", text: "Admin panel: verification queue, user management, score analytics" },
      { type: "new", text: "API v1 released — Pro/Elite subscribers can query leaderboard data" },
      { type: "new", text: "Search & Discover: full-text search with category and sort filters" },
      { type: "improved", text: "Verification workflow redesigned — average review time cut to 28h" },
      { type: "fixed", text: "Score calculation edge case with multi-category contestants" },
    ],
  },
  {
    version: "v2.2.0",
    date: "Mar 2025",
    tag: "Feature",
    tagColor: "var(--accent2)",
    items: [
      { type: "new", text: "Pricing tiers: Explorer (Free), Pro ($19/mo), Elite ($49/mo)" },
      { type: "new", text: "Dark mode — system preference detection + manual toggle" },
      { type: "new", text: "Live ticker strip — real-time rank activity feed" },
      { type: "improved", text: "Podium cards with animated score bars" },
      { type: "fixed", text: "Layout shift on initial page load fixed" },
    ],
  },
  {
    version: "v2.1.0",
    date: "Feb 2025",
    tag: "Improvement",
    tagColor: "var(--accent3)",
    items: [
      { type: "new", text: "Personal dashboard with rank history and activity feed" },
      { type: "new", text: "Authentication system with OAuth placeholders (Google, GitHub)" },
      { type: "improved", text: "NI Score breakdown with per-pillar score bars on profile pages" },
      { type: "fixed", text: "Handle-based profile routing (@username URLs)" },
    ],
  },
  {
    version: "v2.0.0",
    date: "Jan 2025",
    tag: "Launch",
    tagColor: "var(--gold)",
    items: [
      { type: "new", text: "MERYT platform public launch — 142 countries, 28,400 verified profiles" },
      { type: "new", text: "5-pillar NI Score system: Academic, Research, Code, Creator, Social" },
      { type: "new", text: "Global leaderboard with category filtering and time-range selection" },
      { type: "new", text: "Credential verification workflow with AI + human review" },
    ],
  },
];

const TYPE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "rgba(0,190,106,0.12)", color: "var(--accent3)" },
  improved: { label: "Improved", bg: "rgba(26,86,255,0.1)", color: "var(--accent2)" },
  fixed: { label: "Fixed", bg: "rgba(245,162,0,0.12)", color: "var(--gold)" },
};

export default function ChangelogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Leaderboard", "/"], ["About", "/about"], ["API Docs", "/api-docs"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16 }}>CHANGELOG</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>
          What&apos;s New
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 52, lineHeight: 1.65 }}>
          Every update, improvement, and fix to the MERYT platform. Follow our progress.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {RELEASES.map((release, ri) => (
            <div key={release.version} style={{ display: "flex", gap: 0 }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 24, flexShrink: 0 }}>
                <div style={{ width: 13, height: 13, borderRadius: "50%", background: release.tagColor, border: "3px solid var(--bg)", flexShrink: 0, marginTop: 4 }} />
                {ri < RELEASES.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 4, marginBottom: 0 }} />}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: ri < RELEASES.length - 1 ? 44 : 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{release.version}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 9px", borderRadius: 100, background: `${release.tagColor}18`, color: release.tagColor, letterSpacing: "0.05em" }}>{release.tag}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{release.date}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {release.items.map((item, ii) => {
                    const badge = TYPE_BADGE[item.type];
                    return (
                      <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 5, background: badge.bg, color: badge.color, letterSpacing: "0.06em", flexShrink: 0, marginTop: 1 }}>{badge.label}</span>
                        <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.55 }}>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: "28px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, textAlign: "center" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Stay up to date</div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>Follow our progress on GitHub or subscribe to the weekly digest in Settings.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Link href="/settings" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", background: "var(--text)", color: "white", borderRadius: 9, textDecoration: "none" }}>Enable Digest</Link>
            <Link href="/about" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", background: "var(--bg)", color: "var(--muted)", border: "1.5px solid var(--border)", borderRadius: 9, textDecoration: "none" }}>About MERYT</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
