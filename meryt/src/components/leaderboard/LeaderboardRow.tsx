"use client";

import { Contestant } from "@/src/types";

interface LeaderboardRowProps {
  contestant: Contestant;
  onClick: () => void;
  index: number;
}

const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  gaming: { bg: "#EEF2FF", color: "#1A56FF", border: "#C7D2FE" },
  research: { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  creative: { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" },
  social: { bg: "#FDF4FF", color: "#9333EA", border: "#E9D5FF" },
  tech: { bg: "#EFF6FF", color: "#1A56FF", border: "#BFDBFE" },
};

export function LeaderboardRow({ contestant, onClick, index }: LeaderboardRowProps) {
  const { rank, avatar, name, handle, university, flag, country, niScore, scoreChange, tags, skills } = contestant;

  const changeColor = scoreChange > 0 ? "var(--accent3)" : scoreChange < 0 ? "var(--accent)" : "var(--muted)";
  const changePrefix = scoreChange > 0 ? "▲" : scoreChange < 0 ? "▼" : "—";

  return (
    <div
      onClick={onClick}
      className="animate-row-in"
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr 110px 130px 130px 90px",
        padding: "14px 16px",
        gap: 12,
        alignItems: "center",
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: 14,
        marginBottom: 7,
        cursor: "pointer",
        animationDelay: `${index * 0.05}s`,
        transition: "transform 0.22s cubic-bezier(.34,1.3,.64,1), border-color 0.18s, box-shadow 0.18s",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          color: rank <= 10 ? "var(--text)" : "var(--muted)",
          letterSpacing: -1,
        }}
      >
        {rank}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
            border: "1.5px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          {avatar}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "-0.3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--text)" }}>
            {name}
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            {handle} · {flag} {country}
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--text)" }}>
        {niScore.toLocaleString()}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {skills.slice(0, 2).map((skill) => (
          <div key={skill.label}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{skill.label} {skill.value}</div>
            <div style={{ height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: 2,
                  background: skill.color,
                  width: `${skill.value}%`,
                  transition: "width 1.2s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {tags.slice(0, 2).map((tag) => {
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

      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: changeColor,
        }}
      >
        {changePrefix} {Math.abs(scoreChange)}
      </div>
    </div>
  );
}
