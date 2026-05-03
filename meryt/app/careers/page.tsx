import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — MERYT",
  description: "Join the team building the world's first verified global talent ranking platform.",
};

const JOBS = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering", type: "Full-time", location: "Remote (Global)",
    description: "Own end-to-end features across our Next.js frontend and backend APIs. You'll build real-time systems, ranking algorithms, and verification pipelines.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    accent: "var(--accent2)",
  },
  {
    title: "ML Engineer — Verification Systems",
    team: "Engineering", type: "Full-time", location: "Remote (Global)",
    description: "Build and improve the AI layer of our credential verification pipeline. Reduce false positives, catch fraud, and help 99.1% become 99.9%.",
    skills: ["Python", "PyTorch", "Classification", "Anomaly Detection"],
    accent: "var(--accent3)",
  },
  {
    title: "Head of Partnerships",
    team: "Growth", type: "Full-time", location: "Remote (US/EU preferred)",
    description: "Build relationships with universities, research institutions, and companies to integrate MERYT into talent pipelines and academic programs.",
    skills: ["BD", "University Relations", "SaaS Partnerships"],
    accent: "var(--gold)",
  },
  {
    title: "Product Designer",
    team: "Design", type: "Full-time", location: "Remote (Global)",
    description: "Design interfaces that make complex data — NI Scores, pillar breakdowns, rank histories — feel clear and trustworthy. You love data-dense UI.",
    skills: ["Figma", "Data Visualization", "Design Systems"],
    accent: "var(--accent)",
  },
  {
    title: "Trust & Safety Analyst",
    team: "Operations", type: "Full-time", location: "Remote (Global)",
    description: "Review flagged verification submissions, investigate fraud patterns, and maintain the integrity of the leaderboard. You're detail-obsessed and fair-minded.",
    skills: ["Attention to Detail", "Policy Judgment", "Investigation"],
    accent: "var(--accent2)",
  },
  {
    title: "Developer Advocate",
    team: "Growth", type: "Full-time", location: "Remote (Global)",
    description: "Grow the MERYT developer community. Write docs, build integrations, give talks at conferences, and help developers build great things on the API.",
    skills: ["Technical Writing", "Community Building", "API Experience"],
    accent: "var(--accent3)",
  },
];

const VALUES = [
  { icon: "🏆", title: "Proof of Work", body: "We practice what we rank. Every team member's contributions are visible. No politics, no hierarchy theater — output speaks." },
  { icon: "🌍", title: "Globally Distributed", body: "The team is in 12 countries. We're asynchronous-first, document everything, and never penalize people for timezone." },
  { icon: "🔒", title: "Privacy-First", body: "We build what we'd want for ourselves. Every feature is designed with the assumption that privacy is a right, not a premium feature." },
  { icon: "✓", title: "Honest by Default", body: "We say what we mean in user interfaces, documentation, and job descriptions. No dark patterns, no misleading copy." },
];

export default function CareersPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["About", "/about"], ["Blog", "/blog"], ["← Home", "/"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>We&apos;re Hiring</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,60px)", fontWeight: 800, letterSpacing: "-2.5px", color: "var(--text)", marginBottom: 18, lineHeight: 1.0 }}>
            Build the future of<br />
            <span style={{ color: "var(--accent)" }}>verified talent</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            We&apos;re a small team building the world&apos;s first truly verified global talent platform. Every line of code matters. Every verification decision matters. We&apos;re looking for people who want to build something that actually works.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["12 Countries", "Fully Remote", "6 Open Roles", "Series A"].map(tag => (
              <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "5px 12px", borderRadius: 8, background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--muted)", letterSpacing: "0.05em" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 22 }}>How We Work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 18, padding: "20px 20px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{v.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 7 }}>{v.title}</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job listings */}
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 22 }}>Open Roles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {JOBS.map(job => (
              <div key={job.title} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px", marginBottom: 5 }}>{job.title}</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[job.team, job.type, job.location].map(tag => (
                        <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "2px 8px", borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)", letterSpacing: "0.05em" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <Link href={`mailto:careers@meryt.app?subject=Application: ${job.title}`} style={{ padding: "9px 18px", background: job.accent, color: "white", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 11, textDecoration: "none", letterSpacing: "0.04em", flexShrink: 0 }}>
                    Apply →
                  </Link>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 14 }}>{job.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {job.skills.map(s => (
                    <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: `${job.accent}12`, color: job.accent, letterSpacing: "0.05em" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spontaneous */}
        <div style={{ marginTop: 40, background: "var(--text)", borderRadius: 20, padding: "28px 26px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "white", marginBottom: 6 }}>Don&apos;t see your role?</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 380 }}>We hire for attitude and capability, not just open positions. If you believe in what we&apos;re building, reach out.</p>
          </div>
          <Link href="mailto:careers@meryt.app" style={{ padding: "11px 22px", background: "var(--accent)", color: "white", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>
            Send Us a Note
          </Link>
        </div>
      </main>
    </div>
  );
}
