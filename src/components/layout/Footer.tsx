import Link from "next/link";

const LINKS = [
  {
    heading: "Platform",
    items: [
      { label: "Leaderboard", href: "/" },
      { label: "Search", href: "/search" },
      { label: "Verify", href: "/verify" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "API Docs", href: "/api-docs" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Settings", href: "/settings" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1.5px solid var(--border)", paddingTop: 48, paddingBottom: 40, marginTop: 64 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 10 }}>
            MERY<span style={{ color: "var(--accent)" }}>T</span>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", lineHeight: 1.65, maxWidth: 260 }}>
            Global verified talent rankings. Pure proof-of-work.<br />
            Not social credit scoring.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {[
              { label: "28,400 Verified", color: "var(--accent3)" },
              { label: "142 Countries", color: "var(--accent2)" },
              { label: "5 Pillars", color: "var(--accent)" },
            ].map(tag => (
              <span key={tag.label} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 100, background: `${tag.color}14`, color: tag.color, letterSpacing: "0.06em" }}>{tag.label}</span>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div style={{ display: "flex", gap: 48 }}>
          {LINKS.map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>{col.heading}</div>
              {col.items.map(item => (
                <Link key={item.label} href={item.href} style={{ display: "block", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 8, transition: "color 0.15s" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", opacity: 0.55 }}>
          © 2025 MERYT · Proof-of-work talent rankings · Not social credit scoring
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {[["Privacy", "#"], ["Terms", "#"], ["Contact", "#"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textDecoration: "none", opacity: 0.55 }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
