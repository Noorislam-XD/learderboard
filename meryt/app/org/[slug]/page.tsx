"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

const ORG_DATA: Record<string, { name: string; type: string; logo: string; country: string; flag: string; founded: string; website: string; description: string; verified: boolean; stats: { label: string; value: string }[] }> = {
  "iit-bombay": {
    name: "IIT Bombay", type: "University", logo: "🏛️", country: "India", flag: "🇮🇳",
    founded: "1958", website: "iitb.ac.in", verified: true,
    description: "Indian Institute of Technology Bombay — consistently ranked #1 engineering university in India and top 200 globally. Known for world-class researchers, engineers, and entrepreneurs.",
    stats: [
      { label: "MERYT Members", value: "4,820" },
      { label: "Avg NI Score", value: "7,240" },
      { label: "Verified Profiles", value: "3,100" },
      { label: "Top 100 Global", value: "14" },
    ],
  },
  "mit": {
    name: "Massachusetts Institute of Technology", type: "University", logo: "🔬", country: "USA", flag: "🇺🇸",
    founded: "1861", website: "mit.edu", verified: true,
    description: "MIT — the world's leading research university. Home to Nobel laureates, Turing Award winners, and founders of global technology companies.",
    stats: [
      { label: "MERYT Members", value: "3,910" },
      { label: "Avg NI Score", value: "8,120" },
      { label: "Verified Profiles", value: "2,850" },
      { label: "Top 100 Global", value: "22" },
    ],
  },
  "tokyo-university": {
    name: "University of Tokyo", type: "University", logo: "🌸", country: "Japan", flag: "🇯🇵",
    founded: "1877", website: "u-tokyo.ac.jp", verified: true,
    description: "Japan's top-ranked university. A global leader in engineering, science, and research with a strong international talent network.",
    stats: [
      { label: "MERYT Members", value: "2,640" },
      { label: "Avg NI Score", value: "6,980" },
      { label: "Verified Profiles", value: "1,900" },
      { label: "Top 100 Global", value: "8" },
    ],
  },
  "tokyo-u": {
    name: "University of Tokyo", type: "University", logo: "🌸", country: "Japan", flag: "🇯🇵",
    founded: "1877", website: "u-tokyo.ac.jp", verified: true,
    description: "Japan's top-ranked university. A global leader in engineering, science, and research with a strong international talent network.",
    stats: [
      { label: "MERYT Members", value: "2,640" },
      { label: "Avg NI Score", value: "6,980" },
      { label: "Verified Profiles", value: "1,900" },
      { label: "Top 100 Global", value: "8" },
    ],
  },
  "stanford": {
    name: "Stanford University", type: "University", logo: "🌲", country: "USA", flag: "🇺🇸",
    founded: "1885", website: "stanford.edu", verified: true,
    description: "Stanford University — the heart of Silicon Valley. Where research meets entrepreneurship. Home to founders of Google, HP, Sun Microsystems, and hundreds of YC companies.",
    stats: [
      { label: "MERYT Members", value: "4,120" },
      { label: "Avg NI Score", value: "8,340" },
      { label: "Verified Profiles", value: "3,010" },
      { label: "Top 100 Global", value: "28" },
    ],
  },
  "oxford": {
    name: "University of Oxford", type: "University", logo: "📚", country: "UK", flag: "🇬🇧",
    founded: "1096", website: "ox.ac.uk", verified: true,
    description: "The world's oldest English-speaking university. A global leader in humanities, sciences, and law with over 70 Nobel laureates and 27 Prime Ministers.",
    stats: [
      { label: "MERYT Members", value: "2,980" },
      { label: "Avg NI Score", value: "7,620" },
      { label: "Verified Profiles", value: "2,200" },
      { label: "Top 100 Global", value: "19" },
    ],
  },
  "eth-zurich": {
    name: "ETH Zurich", type: "University", logo: "🔭", country: "Switzerland", flag: "🇨🇭",
    founded: "1855", website: "ethz.ch", verified: true,
    description: "Europe's top technical university. 22 Nobel Prize winners, birthplace of Einstein's theory of relativity, and a powerhouse of engineering and natural sciences.",
    stats: [
      { label: "MERYT Members", value: "1,840" },
      { label: "Avg NI Score", value: "8,010" },
      { label: "Verified Profiles", value: "1,420" },
      { label: "Top 100 Global", value: "11" },
    ],
  },
  "kaist": {
    name: "KAIST", type: "University", logo: "🤖", country: "South Korea", flag: "🇰🇷",
    founded: "1971", website: "kaist.ac.kr", verified: true,
    description: "Korea Advanced Institute of Science and Technology — the birthplace of Korea's tech industry. World-class in robotics, AI, semiconductor research, and competitive programming.",
    stats: [
      { label: "MERYT Members", value: "2,100" },
      { label: "Avg NI Score", value: "7,480" },
      { label: "Verified Profiles", value: "1,680" },
      { label: "Top 100 Global", value: "15" },
    ],
  },
  "tsinghua": {
    name: "Tsinghua University", type: "University", logo: "🏮", country: "China", flag: "🇨🇳",
    founded: "1911", website: "tsinghua.edu.cn", verified: true,
    description: "China's top university and a global leader in engineering, computer science, and quantum research. Consistently ranked in the global top 20.",
    stats: [
      { label: "MERYT Members", value: "3,560" },
      { label: "Avg NI Score", value: "7,910" },
      { label: "Verified Profiles", value: "2,780" },
      { label: "Top 100 Global", value: "24" },
    ],
  },
  "caltech": {
    name: "California Institute of Technology", type: "University", logo: "🚀", country: "USA", flag: "🇺🇸",
    founded: "1891", website: "caltech.edu", verified: true,
    description: "The world's leading science and engineering institute per capita. More Nobel Prizes per student than any other university. Home to JPL and breakthrough physics research.",
    stats: [
      { label: "MERYT Members", value: "980" },
      { label: "Avg NI Score", value: "8,720" },
      { label: "Verified Profiles", value: "820" },
      { label: "Top 100 Global", value: "9" },
    ],
  },
  "cambridge": {
    name: "University of Cambridge", type: "University", logo: "🎓", country: "UK", flag: "🇬🇧",
    founded: "1209", website: "cam.ac.uk", verified: true,
    description: "One of the world's great universities — home to Newton, Darwin, Turing, and Hawking. A global leader in mathematics, natural sciences, and computer science.",
    stats: [
      { label: "MERYT Members", value: "3,140" },
      { label: "Avg NI Score", value: "7,880" },
      { label: "Verified Profiles", value: "2,420" },
      { label: "Top 100 Global", value: "21" },
    ],
  },
};

export default function OrgPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";
  const org = ORG_DATA[slug];

  const orgMembers = LEADERBOARD_DATA.filter(c =>
    c.university.toLowerCase().replace(/\s+/g, "-") === slug ||
    c.university.toLowerCase().includes(slug.replace(/-/g, " "))
  );

  if (!org) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 52 }}>🏛️</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)" }}>Organization not found</div>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>← Back to Leaderboard</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Leaderboard</Link>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1A1916 0%, #2D2A22 100%)", padding: "52px 24px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, border: "2px solid rgba(255,255,255,0.12)", flexShrink: 0 }}>{org.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", padding: "3px 9px", borderRadius: 5, letterSpacing: "0.06em" }}>{org.type.toUpperCase()}</span>
                {org.verified && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "rgba(0,217,126,0.15)", color: "#00D97E", padding: "3px 9px", borderRadius: 5 }}>✓ VERIFIED</span>}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{org.flag} {org.country}</span>
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,4vw,40px)", fontWeight: 800, letterSpacing: "-1px", color: "white", marginBottom: 4, lineHeight: 1.1 }}>{org.name}</h1>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Est. {org.founded} · {org.website}</div>
            </div>
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 600, marginBottom: 32 }}>{org.description}</p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {org.stats.map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "36px 24px 80px" }}>
        {/* Top members from this org */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 18 }}>
            Top Members
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", background: "var(--surface)", border: "1.5px solid var(--border)", padding: "3px 9px", borderRadius: 5, marginLeft: 10, fontWeight: 400 }}>{orgMembers.length} on MERYT</span>
          </div>
          {orgMembers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {orgMembers.map((c) => (
                <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, transition: "all 0.18s" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", width: 32, textAlign: "right" }}>#{c.rank}</div>
                  <div style={{ fontSize: 28 }}>{c.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{c.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{c.handle} · {c.tags.slice(0, 2).join(", ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{c.niScore.toLocaleString()}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>NI Score</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "32px", textAlign: "center", color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              No MERYT profiles linked to this organization yet.
            </div>
          )}
        </div>

        {/* Claim CTA */}
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "28px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Does this organization belong to you?</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>Claim this page to add your logo, description, and featured profiles.</div>
          </div>
          <Link href="/verify" style={{ padding: "10px 20px", background: "var(--accent)", color: "white", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>Claim Page</Link>
        </div>
      </main>
    </div>
  );
}
