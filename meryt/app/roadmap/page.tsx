import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — MERYT",
  description: "What MERYT is building next — upcoming features and platform milestones.",
};

const PHASES = [
  {
    quarter: "Q1 2025",
    status: "completed",
    statusLabel: "Shipped",
    color: "var(--accent3)",
    items: [
      { done: true, title: "NI Score engine v1 — 5 pillar weighted system" },
      { done: true, title: "Global leaderboard with real-time updates" },
      { done: true, title: "Credential verification workflow (AI + human)" },
      { done: true, title: "Public profile pages with pillar breakdown" },
      { done: true, title: "Dark mode + mobile responsive layout" },
    ],
  },
  {
    quarter: "Q2 2025",
    status: "completed",
    statusLabel: "Shipped",
    color: "var(--accent3)",
    items: [
      { done: true, title: "NI Score engine v2 — improved pillar weights" },
      { done: true, title: "Organization profiles (universities, companies)" },
      { done: true, title: "Shareable rank cards with embed support" },
      { done: true, title: "API v1 for Pro/Elite subscribers" },
      { done: true, title: "Settings, Notifications, and Changelog pages" },
    ],
  },
  {
    quarter: "Q3 2025",
    status: "in_progress",
    statusLabel: "In Progress",
    color: "var(--gold)",
    items: [
      { done: false, title: "Real-time rank notifications via WebSocket" },
      { done: false, title: "GitHub integration — automatic commit scoring" },
      { done: false, title: "ORCID integration — automatic publication import" },
      { done: false, title: "Team/cohort leaderboards for organizations" },
      { done: false, title: "Mobile app (iOS + Android)" },
    ],
  },
  {
    quarter: "Q4 2025",
    status: "planned",
    statusLabel: "Planned",
    color: "var(--accent2)",
    items: [
      { done: false, title: "NI Score API v2 with webhooks" },
      { done: false, title: "Recruiter portal — verified talent search for employers" },
      { done: false, title: "Academic institution partnerships program" },
      { done: false, title: "Custom leaderboard embeds for org websites" },
      { done: false, title: "AI-generated career trajectory analysis" },
    ],
  },
  {
    quarter: "2026",
    status: "vision",
    statusLabel: "Vision",
    color: "var(--accent)",
    items: [
      { done: false, title: "Government partnership: verified talent for national programs" },
      { done: false, title: "Scholarship matching based on NI Score and pillars" },
      { done: false, title: "MERYT Verified badge for external websites/portfolios" },
      { done: false, title: "NI Score as portable identity across platforms" },
      { done: false, title: "100,000 verified profiles milestone" },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Changelog", "/changelog"], ["About", "/about"], ["← Home", "/"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>Platform Roadmap</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 14, lineHeight: 1.05 }}>
          What We&apos;re Building
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 52, lineHeight: 1.65 }}>
          A transparent look at what&apos;s shipped, what&apos;s in progress, and where we&apos;re going.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {PHASES.map((phase, pi) => (
            <div key={phase.quarter} style={{ display: "flex", gap: 0 }}>
              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 24, flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: phase.color, border: "3px solid var(--bg)", flexShrink: 0, marginTop: 4 }} />
                {pi < PHASES.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 4 }} />}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: pi < PHASES.length - 1 ? 8 : 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{phase.quarter}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 9px", borderRadius: 100, background: `${phase.color}18`, color: phase.color, letterSpacing: "0.05em" }}>{phase.statusLabel}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {phase.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, background: item.done ? `${phase.color}20` : "var(--bg)", border: `1.5px solid ${item.done ? phase.color + "44" : "var(--border)"}`, color: item.done ? phase.color : "var(--muted)" }}>
                        {item.done ? "✓" : "·"}
                      </div>
                      <span style={{ fontSize: 13, color: item.done ? "var(--text)" : "var(--muted)", lineHeight: 1.5 }}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 52, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "28px 26px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Have a feature request?</div>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 18 }}>We build what the community needs most.</p>
          <Link href="/contact" style={{ display: "inline-block", padding: "10px 22px", background: "var(--text)", color: "white", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            Submit Feedback
          </Link>
        </div>
      </main>
    </div>
  );
}
