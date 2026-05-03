import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEADERBOARD_DATA } from "@/src/lib/data";

const UNIVERSITIES: Record<string, {
  name: string; shortName: string; flag: string; country: string; location: string;
  founded: number; type: string; rank: string; color: string; emoji: string; desc: string;
  programs: string[];
}> = {
  "iit-bombay": {
    name: "Indian Institute of Technology Bombay", shortName: "IIT Bombay",
    flag: "🇮🇳", country: "India", location: "Mumbai, India", founded: 1958,
    type: "Public Research University", rank: "#1 India (QS 2025)", color: "#1A56FF",
    emoji: "🏛️", desc: "IIT Bombay is India's most prestigious technical institution, producing world-class engineers, researchers, and entrepreneurs across fields from CS to biotech.",
    programs: ["Computer Science", "Electrical Engineering", "Data Science", "Aerospace"],
  },
  "mit": {
    name: "Massachusetts Institute of Technology", shortName: "MIT",
    flag: "🇺🇸", country: "USA", location: "Cambridge, MA, USA", founded: 1861,
    type: "Private Research University", rank: "#1 World (QS 2025)", color: "#FF4500",
    emoji: "⚙️", desc: "MIT is the world's leading technical research university, driving breakthroughs in computing, physics, biology, economics, and beyond.",
    programs: ["EECS", "Mathematics", "Physics", "Cognitive Science", "Bioengineering"],
  },
  "oxford": {
    name: "University of Oxford", shortName: "Oxford",
    flag: "🇬🇧", country: "UK", location: "Oxford, UK", founded: 1096,
    type: "Public Research University", rank: "#3 World (QS 2025)", color: "#9333EA",
    emoji: "📚", desc: "The University of Oxford is one of the world's oldest and most influential institutions, renowned for research in humanities, sciences, and law.",
    programs: ["PPE", "Computer Science", "Mathematics", "Law", "Medicine"],
  },
  "eth-zurich": {
    name: "ETH Zürich", shortName: "ETH Zürich",
    flag: "🇨🇭", country: "Switzerland", location: "Zürich, Switzerland", founded: 1855,
    type: "Public Research University", rank: "#7 World (QS 2025)", color: "#00BE6A",
    emoji: "🔬", desc: "ETH Zürich is Europe's premier technical university, with unmatched strengths in physics, computer science, chemistry, and engineering.",
    programs: ["Computer Science", "Physics", "Mechanical Engineering", "Data Science"],
  },
  "caltech": {
    name: "California Institute of Technology", shortName: "Caltech",
    flag: "🇺🇸", country: "USA", location: "Pasadena, CA, USA", founded: 1891,
    type: "Private Research University", rank: "#6 World (QS 2025)", color: "#FF4500",
    emoji: "🚀", desc: "Caltech is a world leader in science and engineering, famous for its collaborations with NASA's Jet Propulsion Laboratory and Nobel laureate density.",
    programs: ["Physics", "Computer Science", "Astrophysics", "Chemical Engineering"],
  },
  "cambridge": {
    name: "University of Cambridge", shortName: "Cambridge",
    flag: "🇬🇧", country: "UK", location: "Cambridge, UK", founded: 1209,
    type: "Public Research University", rank: "#2 World (QS 2025)", color: "#00BE6A",
    emoji: "🎓", desc: "Cambridge is one of the world's most prestigious universities, home to more Nobel laureates than most countries. Its computer lab pioneered the World Wide Web.",
    programs: ["Mathematics", "Computer Science", "Natural Sciences", "Engineering"],
  },
  "tsinghua": {
    name: "Tsinghua University", shortName: "Tsinghua",
    flag: "🇨🇳", country: "China", location: "Beijing, China", founded: 1911,
    type: "Public Research University", rank: "#25 World (QS 2025)", color: "#9333EA",
    emoji: "🌏", desc: "Tsinghua is China's most prestigious university and one of the world's top technical institutions, producing global leaders in AI, engineering, and policy.",
    programs: ["Computer Science & Technology", "Electrical Engineering", "Physics", "Economics"],
  },
  "tokyo": {
    name: "University of Tokyo", shortName: "UTokyo",
    flag: "🇯🇵", country: "Japan", location: "Tokyo, Japan", founded: 1877,
    type: "Public Research University", rank: "#28 World (QS 2025)", color: "#F5A200",
    emoji: "🗼", desc: "The University of Tokyo is Japan's most prestigious university, a powerhouse in physics, materials science, computer science, and biological research.",
    programs: ["Computer Science", "Physics", "Engineering", "Biology", "Economics"],
  },
};

export async function generateStaticParams() {
  return Object.keys(UNIVERSITIES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const uni = UNIVERSITIES[slug];
  if (!uni) return { title: "University Not Found — MERYT" };
  return {
    title: `${uni.shortName} on MERYT`,
    description: `Verified MERYT profiles from ${uni.name}. Browse ranked graduates and researchers from ${uni.location}.`,
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uni = UNIVERSITIES[slug];
  if (!uni) notFound();

  const members = LEADERBOARD_DATA.filter(c =>
    c.university.toLowerCase().includes(uni.shortName.toLowerCase()) ||
    c.university.toLowerCase().includes(uni.name.toLowerCase().slice(0, 10))
  ).sort((a, b) => a.rank - b.rank);

  const avgScore = members.length > 0
    ? Math.round(members.reduce((s, m) => s + m.niScore, 0) / members.length)
    : 0;

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
        <Link href="/leaderboard" style={{ color: "var(--accent)", textDecoration: "none" }}>Leaderboard</Link>
        <span>/</span>
        <span>University</span>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>{uni.shortName}</span>
      </div>

      {/* Hero */}
      <div style={{ padding: "44px 48px", borderRadius: 28, background: `${uni.color}08`, border: `2px solid ${uni.color}30`, marginBottom: 56 }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: `${uni.color}18`, border: `2px solid ${uni.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, flexShrink: 0 }}>{uni.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: uni.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{uni.flag} {uni.country} · {uni.rank}</div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)", margin: "0 0 8px", lineHeight: 1.1 }}>{uni.shortName}</h1>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>{uni.name} · Est. {uni.founded} · {uni.type}</div>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 560 }}>{uni.desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {uni.programs.map(p => (
                <span key={p} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "5px 12px", borderRadius: 100, background: `${uni.color}15`, color: uni.color }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flexShrink: 0 }}>
            {[
              { label: "MERYT Members", value: members.length || "—" },
              { label: "Avg NI Score", value: avgScore ? avgScore.toLocaleString() : "—" },
              { label: "Top Rank", value: members[0] ? `#${members[0].rank}` : "—" },
              { label: "Top Score", value: members[0] ? members[0].niScore.toLocaleString() : "—" },
            ].map(s => (
              <div key={s.label} style={{ padding: "14px 16px", borderRadius: 12, background: "var(--surface)", border: "1.5px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: uni.color, letterSpacing: "-0.5px" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Members */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>
          Verified Members {members.length > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>({members.length})</span>}
        </h2>
        {members.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)" }}>No verified profiles found for this institution yet.</div>
            <div style={{ marginTop: 16 }}>
              <Link href="/verify" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "10px 22px", borderRadius: 100, textDecoration: "none" }}>Verify Your Profile</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {members.map((m, i) => (
              <Link key={m.id} href={`/profile/${m.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", width: 24, textAlign: "center" }}>#{i + 1}</span>
                <span style={{ fontSize: 36, lineHeight: 1 }}>{m.avatar}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{m.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{m.handle} · Global Rank #{m.rank}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {m.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: uni.color, letterSpacing: "-0.5px" }}>{m.niScore.toLocaleString()}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: m.scoreChange >= 0 ? "#00BE6A" : "#FF4500" }}>{m.scoreChange >= 0 ? "+" : ""}{m.scoreChange}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Browse more universities */}
      <section>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Other Institutions</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(UNIVERSITIES).filter(([s]) => s !== slug).map(([s, u]) => (
            <Link key={s} href={`/university/${s}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--surface)", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--text)" }}>
              {u.flag} {u.shortName}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
