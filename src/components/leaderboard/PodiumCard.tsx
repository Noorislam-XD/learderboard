"use client";

import { Contestant } from "@/src/types";

interface PodiumCardProps {
  contestant: Contestant;
  onClick: () => void;
}

const RANK_COLORS: Record<number, string> = {
  1: "var(--gold)",
  2: "var(--silver)",
  3: "var(--bronze)",
};

const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  gaming: { bg: "#EEF2FF", color: "var(--accent2)", border: "#C7D2FE" },
  research: { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  creative: { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" },
  social: { bg: "#FDF4FF", color: "#9333EA", border: "#E9D5FF" },
  tech: { bg: "#EFF6FF", color: "var(--accent2)", border: "#BFDBFE" },
};

export function PodiumCard({ contestant, onClick }: PodiumCardProps) {
  const { rank, avatar, name, handle, country, flag, niScore, tags, socials } = contestant;

  const isFirst = rank === 1;
  const marginTop = rank === 2 ? 28 : rank === 3 ? 52 : 0;

  return (
    <div
      onClick={onClick}
      className="animate-card-pop"
      style={{
        background: isFirst ? "linear-gradient(140deg,#FFFDF4 0%,#FFF8E3 100%)" : "var(--surface)",
        border: `1.5px solid ${isFirst ? "var(--gold)" : "var(--border)"}`,
        borderRadius: 20,
        padding: "24px 20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        marginTop,
        animationDelay: rank === 1 ? "0.05s" : rank === 2 ? "0s" : "0.1s",
        transition: "transform 0.3s cubic-bezier(.34,1.4,.64,1), box-shadow 0.25s",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: -3,
          lineHeight: 1,
          marginBottom: 12,
          color: RANK_COLORS[rank],
        }}
      >
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
      </div>

      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          marginBottom: 10,
          border: "2px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        {avatar}
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 2, color: "var(--text)" }}>
        {name}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 10 }}>
        {handle}
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14 }}>
        {flag} {country}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: -1,
            color: isFirst ? "var(--accent)" : "var(--text)",
          }}
        >
          {niScore.toLocaleString()}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>
          NI SCORE
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {tags.map((tag) => {
          const style = TAG_STYLES[tag] || { bg: "var(--bg)", color: "var(--muted)", border: "var(--border)" };
          return (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                padding: "3px 8px",
                borderRadius: 5,
                background: style.bg,
                border: `1px solid ${style.border}`,
                color: style.color,
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {socials.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {socials.slice(0, 3).map((s) => (
            <span
              key={s.platform}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                padding: "3px 8px",
                borderRadius: 5,
                background: "var(--text)",
                color: "white",
              }}
            >
              {s.platform}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
