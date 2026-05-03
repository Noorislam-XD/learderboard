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
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: "-4px", marginBottom: 24, color: "white" }}>
          MERY<span style={{ color: "#FF4500" }}>T</span>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 700 }}>
          Global Verified Talent Rankings
        </div>
        <div style={{ marginTop: 24, fontSize: 18, color: "rgba(255,255,255,0.3)" }}>
          28,400 verified profiles · 142 countries · NI Score
        </div>
      </div>
    ),
    { ...size }
  );
}
