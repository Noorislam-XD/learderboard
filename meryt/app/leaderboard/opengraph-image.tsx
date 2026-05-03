import { ImageResponse } from "next/og";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";
export const alt = "MERYT Global Leaderboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function LeaderboardOGImage() {
  const top5 = LEADERBOARD_DATA.slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%, #FF450008 0%, transparent 60%)", display: "flex" }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ fontSize: 30, fontWeight: 900, color: "white", letterSpacing: "-1.5px", display: "flex" }}>MERY</span>
            <span style={{ fontSize: 30, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 18px", borderRadius: 100, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00BE6A", display: "flex" }} />
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.6)", display: "flex" }}>LIVE · GLOBAL RANKINGS</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-3px", color: "white", lineHeight: 1.0, display: "flex" }}>
            Global Leaderboard
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 10, display: "flex" }}>
            142 countries · 28,400 verified profiles · ranked by NI Score
          </div>
        </div>

        {/* Top 5 profiles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
          {top5.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "10px 18px",
                borderRadius: 12,
                background: i === 0 ? "rgba(245,162,0,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 0 ? "rgba(245,162,0,0.3)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 14, color: i === 0 ? "#F5A200" : "rgba(255,255,255,0.3)", width: 28, display: "flex" }}>#{c.rank}</span>
              <span style={{ fontSize: 24, display: "flex" }}>{c.avatar}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "white", flex: 1, display: "flex" }}>{c.name}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "flex" }}>{c.flag} {c.country}</span>
              <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, color: i === 0 ? "#F5A200" : "rgba(255,255,255,0.7)", display: "flex" }}>
                {c.niScore.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.2)", display: "flex" }}>meryt.app/leaderboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", display: "flex" }}>Updated live · Free API at /api/v1/leaderboard</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
