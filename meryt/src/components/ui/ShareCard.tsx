"use client";

import { useState } from "react";
import type { Contestant } from "@/src/types";

interface ShareCardProps {
  contestant: Contestant;
  onClose: () => void;
}

export function ShareCard({ contestant, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const profileUrl = `https://meryt.app/profile/${contestant.id}`;
  const embedCode = `<iframe src="${profileUrl}/card" width="360" height="180" frameborder="0" style="border-radius:16px;"></iframe>`;

  const copyUrl = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    });
  };

  const changeColor = contestant.scoreChange > 0 ? "#00BE6A" : contestant.scoreChange < 0 ? "#FF4500" : "#8A8074";
  const changeSign = contestant.scoreChange > 0 ? "+" : "";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", padding: 20 }} onClick={onClose}>
      <div style={{ background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: 24, overflow: "hidden", width: "100%", maxWidth: 460, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Share Rank Card</div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--surface)", cursor: "pointer", fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Preview card */}
        <div style={{ padding: 22 }}>
          <div style={{ background: "linear-gradient(135deg, #18160F 0%, #2D2A22 100%)", borderRadius: 18, padding: "24px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: 16, top: 10, fontFamily: "'Syne', sans-serif", fontSize: 80, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: -4, userSelect: "none" }}>#{contestant.rank}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 34, background: "rgba(255,255,255,0.07)", borderRadius: 14, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>{contestant.avatar}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.4px" }}>{contestant.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{contestant.handle} · {contestant.flag} {contestant.university}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, color: "var(--accent)", letterSpacing: -1.5, lineHeight: 1 }}>{contestant.niScore.toLocaleString()}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>NI SCORE</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>#{contestant.rank}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>GLOBAL RANK</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: "rgba(0,190,106,0.15)", color: "#00D97E", letterSpacing: "0.05em" }}>✓ VERIFIED</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: `${changeColor}22`, color: changeColor, letterSpacing: "0.05em" }}>{changeSign}{contestant.scoreChange} THIS WEEK</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 9px", borderRadius: 5, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>meryt.app</span>
            </div>
          </div>

          {/* Share options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.07em", marginBottom: 7, textTransform: "uppercase" }}>Profile Link</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, padding: "9px 13px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profileUrl}</div>
                <button onClick={copyUrl} style={{ padding: "9px 16px", background: copied ? "var(--accent3)" : "var(--text)", color: "white", border: "none", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>{copied ? "✓ Copied" : "Copy"}</button>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.07em", marginBottom: 7, textTransform: "uppercase" }}>Embed Code</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, padding: "9px 13px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{embedCode}</div>
                <button onClick={copyEmbed} style={{ padding: "9px 16px", background: embedCopied ? "var(--accent3)" : "var(--surface)", color: embedCopied ? "white" : "var(--muted)", border: "1.5px solid var(--border)", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>{embedCopied ? "✓ Copied" : "Copy"}</button>
              </div>
            </div>

            {/* Social share */}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              {[
                { label: "𝕏 Twitter", color: "#000", bg: "#F4F2ED" },
                { label: "in LinkedIn", color: "#0A66C2", bg: "#EFF6FF" },
                { label: "🔗 Copy Card", color: "var(--muted)", bg: "var(--surface)" },
              ].map(s => (
                <button key={s.label} style={{ flex: 1, padding: "9px 12px", background: s.bg, color: s.color, border: "1.5px solid var(--border)", borderRadius: 10, fontFamily: "'DM Mono', monospace", fontSize: 10, cursor: "pointer", letterSpacing: "0.04em" }}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
