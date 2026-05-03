"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { Contestant } from "@/src/types";

const PILLAR_COLORS: Record<string, string> = {
  academic: "#1A56FF",
  research: "#00BE6A",
  code: "#9333EA",
  creator: "#F5A200",
  social: "#FF4500",
};

function ScoreBar({ value, color, max = 100 }: { value: number; color: string; max?: number }) {
  return (
    <div style={{ flex: 1, height: 6, borderRadius: 100, background: "var(--border)", overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", borderRadius: 100, background: color, transition: "width 0.6s ease" }} />
    </div>
  );
}

function ProfilePicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--text)", cursor: "pointer", outline: "none", appearance: "none" }}
      >
        <option value="">— Select a profile —</option>
        {LEADERBOARD_DATA.map(c => (
          <option key={c.id} value={c.id}>#{c.rank} {c.name} · {c.niScore} NI</option>
        ))}
      </select>
    </div>
  );
}

function ProfileCard({ c, side }: { c: Contestant; side: "left" | "right" }) {
  return (
    <div style={{ textAlign: side === "left" ? "right" : "left", flex: 1 }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{c.avatar}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>{c.name}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{c.handle}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 12 }}>{c.flag} {c.country} · {c.university}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--accent)", letterSpacing: "-1px" }}>
        {c.niScore.toLocaleString()}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>NI Score · Rank #{c.rank}</div>
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: side === "left" ? "flex-end" : "flex-start" }}>
        {c.tags.map(t => (
          <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [leftId, setLeftId] = useState("1");
  const [rightId, setRightId] = useState("2");

  const left = useMemo(() => LEADERBOARD_DATA.find(c => c.id === leftId) ?? null, [leftId]);
  const right = useMemo(() => LEADERBOARD_DATA.find(c => c.id === rightId) ?? null, [rightId]);

  const winner = left && right ? (left.niScore > right.niScore ? "left" : left.niScore < right.niScore ? "right" : "tie") : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,242,237,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.9)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>
          MERY<span style={{ color: "var(--accent)" }}>T</span>
        </Link>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>PROFILE COMPARISON</div>
        <Link href="/leaderboard" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>← Leaderboard</Link>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text)", margin: "0 0 12px" }}>
            Compare Profiles
          </h1>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>
            Select two verified profiles to compare their NI Scores, pillar breakdowns, and strengths side-by-side.
          </p>
        </div>

        {/* Pickers */}
        <div style={{ display: "flex", gap: 20, marginBottom: 48, alignItems: "flex-end" }}>
          <ProfilePicker label="Profile A" value={leftId} onChange={setLeftId} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--muted)", paddingBottom: 12, flexShrink: 0 }}>VS</div>
          <ProfilePicker label="Profile B" value={rightId} onChange={setRightId} />
        </div>

        {left && right && (
          <>
            {/* Profile hero cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, marginBottom: 40, padding: "32px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <ProfileCard c={left} side="left" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {winner === "tie" && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", padding: "6px 14px", borderRadius: 100, border: "1px solid var(--border)" }}>TIE</div>}
                {winner === "left" && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#F5A200", padding: "6px 14px", borderRadius: 100, background: "#F5A20018" }}>◀ LEADS</div>}
                {winner === "right" && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#F5A200", padding: "6px 14px", borderRadius: 100, background: "#F5A20018" }}>LEADS ▶</div>}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                  {Math.abs(left.niScore - right.niScore).toLocaleString()}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", letterSpacing: "0.06em" }}>POINT GAP</div>
              </div>
              <ProfileCard c={right} side="right" />
            </div>

            {/* Pillar comparison */}
            <div style={{ marginBottom: 40, padding: "28px 32px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>Pillar Breakdown</h2>
              {left.pillars.map((lp, i) => {
                const rp = right.pillars[i];
                const lWins = lp.score >= (rp?.score ?? 0);
                return (
                  <div key={lp.id} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: PILLAR_COLORS[lp.id] ?? "var(--accent)", minWidth: 40, textAlign: "right" }}>{lp.score}</span>
                      <ScoreBar value={lp.score} color={lWins ? PILLAR_COLORS[lp.id] ?? "var(--accent)" : "var(--border)"} />
                      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 90, justifyContent: "center" }}>
                        <span style={{ fontSize: 14 }}>{lp.icon}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text)" }}>{lp.name}</span>
                      </div>
                      <ScoreBar value={rp?.score ?? 0} color={!lWins ? PILLAR_COLORS[lp.id] ?? "var(--accent)" : "var(--border)"} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: PILLAR_COLORS[lp.id] ?? "var(--accent)", minWidth: 40 }}>{rp?.score ?? "—"}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats comparison table */}
            <div style={{ padding: "28px 32px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>Stats Comparison</h2>
              {[
                { label: "NI Score", la: left.niScore.toLocaleString(), ra: right.niScore.toLocaleString(), lv: left.niScore, rv: right.niScore },
                { label: "Global Rank", la: `#${left.rank}`, ra: `#${right.rank}`, lv: right.rank, rv: left.rank },
                { label: "Score Change (7d)", la: `${left.scoreChange > 0 ? "+" : ""}${left.scoreChange}`, ra: `${right.scoreChange > 0 ? "+" : ""}${right.scoreChange}`, lv: left.scoreChange, rv: right.scoreChange },
                { label: "Followers", la: left.followers.toLocaleString(), ra: right.followers.toLocaleString(), lv: left.followers, rv: right.followers },
                { label: "Rank Percentile", la: left.rankPercentile, ra: right.rankPercentile, lv: 0, rv: 0 },
              ].map(row => (
                <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ textAlign: "right", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: row.lv > row.rv ? 700 : 400, color: row.lv > row.rv ? "var(--text)" : "var(--muted)" }}>
                    {row.la} {row.lv > row.rv && <span style={{ color: "#00BE6A" }}>✓</span>}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textAlign: "center", minWidth: 120, letterSpacing: "0.05em" }}>{row.label}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: row.rv > row.lv ? 700 : 400, color: row.rv > row.lv ? "var(--text)" : "var(--muted)" }}>
                    {row.rv > row.lv && <span style={{ color: "#00BE6A" }}>✓ </span>}{row.ra}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
              {[left, right].map((c, idx) => (
                <div key={c.id} style={{ padding: "24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
                    {c.name}&apos;s Achievements
                  </h3>
                  {c.achievements.map(a => (
                    <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: 18, lineHeight: 1.3 }}>{a.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--text)", fontWeight: 500, lineHeight: 1.4 }}>{a.title}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{a.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={`/profile/${left.id}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 24px", borderRadius: 100, textDecoration: "none" }}>
                View {left.name}&apos;s Profile →
              </Link>
              <Link href={`/profile/${right.id}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--surface)", padding: "12px 24px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>
                View {right.name}&apos;s Profile →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
