import type { Metadata } from "next";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Trending — MERYT",
  description: "The fastest rising profiles on the MERYT global leaderboard this week — biggest NI Score gains across all fields.",
};

const PERIODS = [
  { id: "day", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

const trending = [...LEADERBOARD_DATA]
  .filter(c => c.scoreChange > 0)
  .sort((a, b) => b.scoreChange - a.scoreChange);

const CATEGORIES = ["All", "Tech", "Research", "Creative", "Social", "Gaming"];

export default function TrendingPage() {
  const top = trending[0];

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#FF4500", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid #FF450033" }}>
          🔥 Live Rankings
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          Trending Now
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560 }}>
          The fastest-rising verified profiles on MERYT — ranked by score gain velocity.
        </p>
      </div>

      {/* Period tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
        {PERIODS.map((p, i) => (
          <div key={p.id} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", borderRadius: 100, border: "1.5px solid var(--border)", background: i === 1 ? "var(--accent)" : "var(--surface)", color: i === 1 ? "#fff" : "var(--muted)", cursor: "pointer" }}>
            {p.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        {CATEGORIES.map((c, i) => (
          <div key={c} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 14px", borderRadius: 100, border: "1.5px solid var(--border)", background: i === 0 ? "var(--text)" : "var(--surface)", color: i === 0 ? "var(--bg)" : "var(--muted)", cursor: "pointer" }}>
            {c}
          </div>
        ))}
      </div>

      {/* Top mover spotlight */}
      {top && (
        <div style={{ marginBottom: 40, padding: "36px 40px", borderRadius: 24, background: "linear-gradient(135deg, #FF450010 0%, #F5A20008 100%)", border: "2px solid #FF450028" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#FF4500", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>🔥 Biggest Mover This Week</div>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 56, lineHeight: 1 }}>{top.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "var(--text)", letterSpacing: "-1px", marginBottom: 4 }}>{top.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>{top.handle} · {top.flag} {top.country} · Rank #{top.rank}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, maxWidth: 500 }}>{top.bio}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#FF4500", letterSpacing: "-0.5px", marginBottom: 4 }}>+{top.scoreChange}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", marginBottom: 12 }}>points gained</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--accent)", letterSpacing: "-1px" }}>{top.niScore.toLocaleString()}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", marginBottom: 16 }}>NI Score</div>
              <Link href={`/profile/${top.id}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", background: "#FF4500", padding: "10px 22px", borderRadius: 100, textDecoration: "none" }}>View Profile →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Full trending list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {trending.map((c, i) => (
          <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, padding: "16px 22px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
            {/* Trending rank */}
            <div style={{ width: 28, textAlign: "center" }}>
              {i < 3 ? (
                <span style={{ fontSize: 18 }}>{["🥇","🥈","🥉"][i]}</span>
              ) : (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)" }}>#{i + 1}</span>
              )}
            </div>

            <span style={{ fontSize: 36, lineHeight: 1 }}>{c.avatar}</span>

            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{c.flag} {c.country} · {c.university} · Global #{c.rank}</div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {c.tags.slice(0, 2).map(t => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
              ))}
            </div>

            {/* Gain badge */}
            <div style={{ textAlign: "center", padding: "8px 16px", borderRadius: 10, background: "#00BE6A18", border: "1px solid #00BE6A30", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#00BE6A" }}>+{c.scoreChange}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "var(--muted)" }}>pts gained</div>
            </div>

            {/* NI score */}
            <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{c.niScore.toLocaleString()}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>NI Score</div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 48, textAlign: "center", padding: "36px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>Want to be on this list?</div>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>
          Add new verified credentials to boost your NI Score and climb the rankings.
        </p>
        <Link href="/verify" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 28px", borderRadius: 100, textDecoration: "none" }}>
          Verify a Credential
        </Link>
      </div>
    </main>
  );
}
