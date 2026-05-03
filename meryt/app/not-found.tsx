import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found · MERYT",
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(100px,20vw,180px)", fontWeight: 800, letterSpacing: "-10px", color: "var(--border)", lineHeight: 1, userSelect: "none" }}>
          404
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>
          Page Not Found
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, letterSpacing: "-1px", color: "var(--text)", marginBottom: 14, lineHeight: 1.15 }}>
          This rank doesn&apos;t exist (yet)
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, marginBottom: 32 }}>
          The page you&apos;re looking for has either moved, been removed, or hasn&apos;t been built yet. Maybe it needs to submit some credentials first.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <Link href="/" style={{ padding: "12px 24px", background: "var(--accent)", color: "white", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 3px 14px rgba(255,69,0,0.3)" }}>
            ← Back to Leaderboard
          </Link>
          <Link href="/search" style={{ padding: "12px 24px", background: "var(--surface)", color: "var(--text)", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
            Search Profiles
          </Link>
        </div>
        <div style={{ padding: "20px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 18 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.07em", marginBottom: 14, textTransform: "uppercase" }}>Quick Links</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Leaderboard", "/"], ["Verify", "/verify"], ["Pricing", "/pricing"], ["About", "/about"], ["Changelog", "/changelog"], ["API Docs", "/api-docs"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "6px 14px", border: "1.5px solid var(--border)", borderRadius: 8, color: "var(--muted)", textDecoration: "none", background: "var(--bg)" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
