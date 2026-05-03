import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The NI Score — MERYT",
  description: "A complete explanation of the NI Score methodology — the five pillars, weighting, verification standards, and how the proof-of-work identity graph works.",
};

const PILLARS = [
  {
    id: "academic",
    icon: "🎓",
    name: "Academic",
    weight: "25%",
    color: "#1A56FF",
    desc: "Measures formal academic achievement — GPA, degrees, coursework quality, scholarships, and institutional rankings.",
    items: [
      { label: "Degree tier (university ranking)", points: "0–40 pts" },
      { label: "GPA / class rank", points: "0–25 pts" },
      { label: "Academic awards & scholarships", points: "0–20 pts" },
      { label: "Coursework breadth & rigor", points: "0–15 pts" },
    ],
    verifiedBy: "Institutional transcripts, degree certificates, scholarship letters",
  },
  {
    id: "research",
    icon: "🔬",
    name: "Research",
    weight: "25%",
    color: "#00BE6A",
    desc: "Quantifies research output — published papers, citation counts, conference presentations, and research fellowships.",
    items: [
      { label: "Peer-reviewed publications", points: "0–35 pts" },
      { label: "Citation count & h-index", points: "0–30 pts" },
      { label: "Conference presentations", points: "0–20 pts" },
      { label: "Research fellowships & grants", points: "0–15 pts" },
    ],
    verifiedBy: "Google Scholar, ORCID, DOI cross-reference, journal database lookup",
  },
  {
    id: "code",
    icon: "💻",
    name: "Code",
    weight: "20%",
    color: "#9333EA",
    desc: "Evaluates software engineering output — GitHub activity, open source contributions, project impact, and technical depth.",
    items: [
      { label: "GitHub contribution graph", points: "0–30 pts" },
      { label: "Repository stars & forks", points: "0–25 pts" },
      { label: "OSS project leadership", points: "0–25 pts" },
      { label: "Technical certifications", points: "0–20 pts" },
    ],
    verifiedBy: "GitHub API, npm/PyPI download stats, project repository analysis",
  },
  {
    id: "creator",
    icon: "✨",
    name: "Creator",
    weight: "15%",
    color: "#F5A200",
    desc: "Measures content creation and knowledge sharing — YouTube, writing, courses, podcasts, and public technical communication.",
    items: [
      { label: "Audience size (verified platforms)", points: "0–35 pts" },
      { label: "Content quality & engagement", points: "0–30 pts" },
      { label: "Platform diversity", points: "0–20 pts" },
      { label: "Awards & recognition", points: "0–15 pts" },
    ],
    verifiedBy: "YouTube Analytics API, Substack stats, Spotify podcast data, social platform APIs",
  },
  {
    id: "social",
    icon: "🤝",
    name: "Social Impact",
    weight: "15%",
    color: "#FF4500",
    desc: "Assesses real-world community impact — people mentored, projects deployed, communities built, and measurable societal benefit.",
    items: [
      { label: "Documented community impact", points: "0–40 pts" },
      { label: "Leadership & organising roles", points: "0–25 pts" },
      { label: "Mentorship track record", points: "0–20 pts" },
      { label: "Awards for social contribution", points: "0–15 pts" },
    ],
    verifiedBy: "NGO/company documentation, news coverage, testimonials from verified institutions",
  },
];

const TIERS = [
  { range: "9,000+", label: "World Class", color: "#F5A200", badge: "🏆", desc: "Top 0.01% globally. Exceptional achievement across all five pillars." },
  { range: "8,000–8,999", label: "Elite", color: "#A2AFBE", badge: "⭐", desc: "Top 0.1%. Sustained excellence in at least 4 pillars." },
  { range: "7,000–7,999", label: "Distinguished", color: "#C4793A", badge: "🥉", desc: "Top 1%. Notable achievements in 3+ pillars with verified credentials." },
  { range: "5,000–6,999", label: "Advanced", color: "#1A56FF", badge: "📈", desc: "Top 5%. Strong proof-of-work record with good pillar spread." },
  { range: "3,000–4,999", label: "Established", color: "#00BE6A", badge: "✅", desc: "Active contributor with verified credentials in at least 2 pillars." },
  { range: "0–2,999", label: "Building", color: "#9333EA", badge: "🌱", desc: "Early career. Score grows as credentials are submitted and verified." },
];

const FAQ = [
  { q: "Is the NI Score a social credit score?", a: "No. Social credit scores track behaviour, relationships, and lifestyle choices. The NI Score only measures verifiable proof-of-work achievements — publications, code, awards, and impact. We have no access to and do not score personal beliefs, political views, or social relationships." },
  { q: "How often does my score update?", a: "Scores update in near real-time when new credentials are verified. The platform runs a daily batch recalculation to incorporate citation count changes, GitHub contributions, and other live data sources." },
  { q: "Can my score go down?", a: "Yes, though rarely. Score decreases happen when: (1) a verified credential is revoked by the issuing institution, (2) a publication is retracted, or (3) a citation count decreases (rare). We will always notify you before adjusting your score downward." },
  { q: "What if I don't have credentials in all five pillars?", a: "That's fine and expected. Most profiles are strong in 2–3 pillars. The NI Score is designed so that excellence in 2 pillars can still result in a high total score, just as someone competitive across all 5 can too." },
  { q: "How do you verify credentials from obscure institutions?", a: "We use a combination of automated cross-referencing (ORCID, DOI, GitHub, etc.) and manual review by our verification team. For institutions not in our database, we partner with local certification authorities or contact the institution directly." },
  { q: "Is there a way to dispute my score?", a: "Yes. Every verified profile has an 'Appeal' option in their dashboard. Appeals are reviewed within 5 business days by our verification team. All appeal decisions are documented and communicated clearly." },
];

export default function ScorePage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 72 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Score Methodology
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          The NI Score
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", lineHeight: 1.7, maxWidth: 680 }}>
          A proof-of-work identity graph that quantifies verifiable human achievement. No follower counts, no subjective ratings — only evidence-backed proof that you actually did the work.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/verify" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 24px", borderRadius: 100, textDecoration: "none" }}>Verify Your Score</Link>
          <Link href="/api-docs" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--surface)", padding: "12px 24px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>API Documentation</Link>
        </div>
      </div>

      {/* Formula overview */}
      <section style={{ marginBottom: 72, padding: "36px 40px", borderRadius: 24, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>The Formula</h2>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--text)", lineHeight: 2, padding: "20px 24px", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--border)", marginBottom: 24 }}>
          <span style={{ color: "var(--accent)" }}>NI Score</span> = <br />
          &nbsp;&nbsp;(<span style={{ color: "#1A56FF" }}>Academic</span> × 0.25) +<br />
          &nbsp;&nbsp;(<span style={{ color: "#00BE6A" }}>Research</span> × 0.25) +<br />
          &nbsp;&nbsp;(<span style={{ color: "#9333EA" }}>Code</span> × 0.20) +<br />
          &nbsp;&nbsp;(<span style={{ color: "#F5A200" }}>Creator</span> × 0.15) +<br />
          &nbsp;&nbsp;(<span style={{ color: "#FF4500" }}>Social</span> × 0.15)
        </div>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
          Each pillar is scored 0–100 based on verified evidence. The weighted sum is then scaled to the 0–10,000 NI Score range using a global percentile calibration updated monthly. This ensures scores are always relative to the current verified pool.
        </p>
      </section>

      {/* Five pillars */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>The Five Pillars</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 36, lineHeight: 1.7 }}>
          Each pillar is independently scored and verified. You need not excel in all five — specialisation is valued and scores are calibrated accordingly.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PILLARS.map(p => (
            <div key={p.id} style={{ padding: "28px 32px", borderRadius: 20, border: `1.5px solid ${p.color}33`, background: `${p.color}06` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", margin: 0 }}>{p.name}</h3>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: p.color, padding: "4px 10px", borderRadius: 100, background: `${p.color}18` }}>Weight: {p.weight}</span>
                  </div>
                  <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", margin: "6px 0 0", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {p.items.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--text)" }}>{item.label}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: p.color, flexShrink: 0, marginLeft: 8 }}>{item.points}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Verified via:</span>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, color: "var(--muted)" }}>{p.verifiedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Score tiers */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Score Tiers</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>What your NI Score means in context.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TIERS.map(t => (
            <div key={t.label} style={{ display: "grid", gridTemplateColumns: "160px 120px 1fr", gap: 16, alignItems: "center", padding: "16px 24px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.badge}</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: t.color }}>{t.label}</span>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)" }}>{t.range}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 32 }}>Methodology FAQ</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ padding: "22px 28px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>{item.q}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/verify" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", background: "var(--accent)", padding: "14px 32px", borderRadius: 100, textDecoration: "none" }}>Verify Your Credentials →</Link>
        <Link href="/leaderboard" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", background: "var(--surface)", padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>View Leaderboard</Link>
        <Link href="/blog/ni-score-explained" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", background: "var(--surface)", padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>Read Full Blog Post</Link>
      </div>
    </main>
  );
}
