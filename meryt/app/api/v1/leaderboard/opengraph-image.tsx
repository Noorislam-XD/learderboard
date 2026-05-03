import { ImageResponse } from "next/og";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";
export const alt = "MERYT API v1 — World Talent Graph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ApiLeaderboardOGImage() {
  const top5 = LEADERBOARD_DATA.slice(0, 5);
  return new ImageResponse(
    (
      <div style={{ background: "#0F0E0B", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #1A56FF10, transparent)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-1px", display: "flex" }}>MERY</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 14, fontFamily: "monospace", letterSpacing: "0.1em", display: "flex" }}>API v1</span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#00BE6A", display: "flex" }}>GET /api/v1/leaderboard</div>
        </div>
        <div style={{ flex: 1, display: "flex", gap: 48 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: "-3px", color: "white", lineHeight: 1.0, display: "flex", flexDirection: "column", marginBottom: 20 }}>World&apos;s Talent Graph</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.35)", display: "flex" }}>CORS · Edge · Free 1k req/day · No auth</div>
          </div>
          <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
            {top5.map((c, i) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 10, background: i === 0 ? "rgba(245,162,0,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? "rgba(245,162,0,0.25)" : "rgba(255,255,255,0.07)"}` }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: i === 0 ? "#F5A200" : "rgba(255,255,255,0.25)", width: 24, display: "flex" }}>#{c.rank}</span>
                <span style={{ fontSize: 20, display: "flex" }}>{c.avatar}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white", flex: 1, display: "flex" }}>{c.name}</span>
                <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 900, color: i === 0 ? "#F5A200" : "rgba(255,255,255,0.6)", display: "flex" }}>{c.niScore.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
