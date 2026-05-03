import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 100, fontWeight: 800, letterSpacing: -6, color: "var(--border)", lineHeight: 1 }}>404</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)" }}>Page Not Found</div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)", textAlign: "center", maxWidth: 320 }}>
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{ padding: "12px 24px", borderRadius: 12, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
          Go to Leaderboard
        </Link>
        <Link href="/search" style={{ padding: "12px 24px", borderRadius: 12, background: "var(--surface)", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
          Search Profiles
        </Link>
      </div>
    </div>
  );
}
