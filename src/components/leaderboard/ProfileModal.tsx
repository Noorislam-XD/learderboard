"use client";

import { useEffect, useRef } from "react";
import { Contestant } from "@/src/types";

interface ProfileModalProps {
  contestant: Contestant | null;
  onClose: () => void;
}

export function ProfileModal({ contestant, onClose }: ProfileModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contestant) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [contestant]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!contestant) return null;

  const changeColor = contestant.scoreChange > 0 ? "var(--accent3)" : contestant.scoreChange < 0 ? "var(--accent)" : "var(--muted)";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,9,6,0.55)",
        backdropFilter: "blur(14px) saturate(1.4)",
        WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        zIndex: 400,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "28px 28px 0 0",
          width: "100%",
          maxWidth: "620px",
          maxHeight: "92vh",
          overflowY: "auto",
          border: "1.5px solid var(--border)",
          borderBottom: "none",
          paddingBottom: "40px",
          animation: "cardPop 0.4s cubic-bezier(.32,1.06,.64,1) both",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "100px",
            background: "var(--border)",
            margin: "14px auto 0",
          }}
        />

        <div
          style={{
            padding: "18px 24px 0",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--text)",
                color: "white",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                padding: "4px 10px",
                borderRadius: "6px",
                marginBottom: "10px",
                letterSpacing: "0.06em",
              }}
            >
              #{contestant.rank} GLOBAL · {contestant.rankPercentile}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "4px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  border: "2px solid var(--border)",
                  background: "var(--bg)",
                }}
              >
                {contestant.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "26px",
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    marginBottom: "2px",
                  }}
                >
                  {contestant.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                    color: "var(--muted)",
                  }}
                >
                  {contestant.handle} · {contestant.flag} {contestant.country}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1.5px solid var(--border)",
              background: "var(--bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "16px 24px 0" }}>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            {contestant.bio}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {[
              { val: contestant.niScore.toLocaleString(), key: "NI SCORE" },
              { val: `#${contestant.rank}`, key: "GLOBAL RANK" },
              { val: `${(contestant.followers / 1000).toFixed(1)}k`, key: "FOLLOWERS" },
            ].map((stat) => (
              <div
                key={stat.key}
                style={{
                  background: "var(--bg)",
                  borderRadius: "14px",
                  padding: "14px 12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    letterSpacing: "-0.8px",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    color: "var(--muted)",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.07em",
                    marginTop: "2px",
                  }}
                >
                  {stat.key}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "12px",
              marginTop: "20px",
            }}
          >
            NI Score Breakdown
          </div>

          {contestant.pillars.map((pillar) => (
            <div key={pillar.id} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{pillar.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {pillar.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: "var(--muted)",
                    }}
                  >
                    {pillar.weight}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    letterSpacing: "-0.8px",
                  }}
                >
                  {pillar.score}
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "var(--bg)",
                  borderRadius: "100px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "100px",
                    background: pillar.color,
                    width: `${pillar.score}%`,
                    transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: "6px",
                  marginTop: "8px",
                }}
              >
                {pillar.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      padding: "3px 9px",
                      borderRadius: "6px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            Achievements
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
            {contestant.achievements.map((ach) => (
              <div
                key={ach.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 14px",
                  background: "var(--bg)",
                  borderRadius: "11px",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "20px" }}>{ach.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 500, flex: 1, lineHeight: 1.3 }}>
                  {ach.title}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    color: "var(--muted)",
                    flexShrink: 0,
                  }}
                >
                  {ach.date}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg,#F0F4FF 0%,#F5F0FF 100%)",
              border: "1.5px solid #D0DAFF",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg,#1A56FF,#9333EA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                ✦
              </div>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#5B6AF0",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                AI INSIGHT
              </span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#2D3A8C" }}>
              {contestant.name} shows exceptional strength in{" "}
              {contestant.pillars.sort((a, b) => b.score - a.score)[0].name.toLowerCase()} (
              {contestant.pillars.sort((a, b) => b.score - a.score)[0].score}/100) and has been
              consistently climbing the {contestant.categories[0]} leaderboard.
              Score movement this week:{" "}
              <strong style={{ color: changeColor }}>
                {contestant.scoreChange > 0 ? "+" : ""}{contestant.scoreChange} pts
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
