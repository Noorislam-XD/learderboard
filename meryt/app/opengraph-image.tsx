import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MERYT — Global Verified Talent Rankings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background watermark */}
        <div style={{ position: "absolute", right: -40, top: -40, fontSize: 420, fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: -30, display: "flex" }}>
          NI
        </div>

        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00BE6A", display: "flex" }} />
          <div style={{ fontFamily: "monospace", fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
            LIVE RANKINGS · 28,400 VERIFIED PROFILES · 142 COUNTRIES
          </div>
        </div>

        {/* Title */}
        <div style={{ fontSize: 88, fontWeight: 900, letterSpacing: "-6px", color: "white", lineHeight: 0.95, display: "flex", flexDirection: "column", marginBottom: 32 }}>
          <span>Global Verified</span>
          <span style={{ color: "#FF4500" }}>Talent Rankings</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.45)", maxWidth: 700, lineHeight: 1.5, display: "flex" }}>
          The NI Score — proof-of-work identity graph for students, researchers, builders, and creators.
        </div>

        {/* Pillars row */}
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {[
            { icon: "🎓", label: "Academic", color: "#1A56FF" },
            { icon: "🔬", label: "Research", color: "#00BE6A" },
            { icon: "💻", label: "Code", color: "#9333EA" },
            { icon: "✨", label: "Creator", color: "#F5A200" },
            { icon: "🤝", label: "Social", color: "#FF4500" },
          ].map(p => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${p.color}44`, background: `${p.color}18` }}>
              <span style={{ fontSize: 18, display: "flex" }}>{p.icon}</span>
              <span style={{ fontFamily: "monospace", fontSize: 13, color: p.color }}>{p.label}</span>
            </div>
          ))}
        </div>

        {/* Logo bottom right */}
        <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", alignItems: "center", gap: 0 }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: "white", letterSpacing: "-1px", display: "flex" }}>MERY</span>
          <span style={{ fontSize: 36, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
