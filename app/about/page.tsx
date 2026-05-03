import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Leaderboard", "/"], ["Verify", "/verify"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "7px 16px", borderRadius: 100 }}>
          ABOUT MERYT
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,7vw,72px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.02, color: "var(--text)", marginBottom: 24 }}>
          Merit Over<br /><span style={{ color: "var(--accent)" }}>Everything</span>
        </h1>

        <div style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.75, marginBottom: 52 }}>
          MERYT is a global talent ranking platform that quantifies verifiable human achievement — not social capital, not follower counts, not connections. Pure proof-of-work.
        </div>

        {[
          {
            title: "The Problem",
            content: "Credentials are broken. Degrees don't capture what you've built. LinkedIn is a highlight reel. Resumes are self-reported. There's no universal, verifiable way to compare talent across disciplines and geographies.",
          },
          {
            title: "The NI Score",
            content: "The Natural Intelligence (NI) Score is a composite metric across five pillars: Academic (25%), Research (25%), Code (20%), Creator (15%), and Social Impact (15%). Every data point is verified — no self-reporting. The score updates dynamically as new achievements are verified.",
          },
          {
            title: "Not Social Credit",
            content: "MERYT explicitly scores proof-of-work only. We do not score personal beliefs, social behavior, nationality, wealth, or background. A first-generation college student with brilliant research ranks above a legacy admit who hasn't shipped anything. That's the point.",
          },
          {
            title: "Verification",
            content: "Our hybrid AI + human verification system reviews submitted evidence within 48 hours (2 hours on Pro tier). We cross-reference public records, institutional databases, GitHub, Google Scholar, and platform APIs to confirm authenticity.",
          },
          {
            title: "Global First",
            content: "MERYT is built for global talent from day one. Contestants from 142 countries are ranked side-by-side. A researcher in Lagos competes on equal footing with one in MIT — because the math doesn't care where you're from.",
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 14 }}>{section.title}</div>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>{section.content}</p>
          </div>
        ))}

        {/* NI Score breakdown */}
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 24, padding: "28px 28px", marginBottom: 52 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>NI Score Pillars</div>
          {[
            { icon: "🎓", name: "Academic", weight: "25%", color: "#1A56FF", desc: "GPA, degrees, coursework, academic distinctions" },
            { icon: "🔬", name: "Research", weight: "25%", color: "#00BE6A", desc: "Publications, citations, peer-reviewed contributions" },
            { icon: "💻", name: "Code", weight: "20%", color: "#9333EA", desc: "GitHub activity, open-source, competitions" },
            { icon: "✨", name: "Creator", weight: "15%", color: "#F5A200", desc: "Portfolio, content, courses, creative output" },
            { icon: "🤝", name: "Social Impact", weight: "15%", color: "#FF4500", desc: "Mentoring, community leadership, measurable impact" },
          ].map(p => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: "var(--bg)", flexShrink: 0 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{p.name}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "var(--bg)", color: p.color, border: `1px solid ${p.color}44`, padding: "2px 8px", borderRadius: 5 }}>{p.weight}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 16, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 28px rgba(255,69,0,0.35)", marginRight: 12 }}>
            View Leaderboard
          </Link>
          <Link href="/verify" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 16, background: "var(--surface)", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
            Get Verified
          </Link>
        </div>
      </main>
    </div>
  );
}
