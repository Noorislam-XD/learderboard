"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  onProfileClick: () => void;
}

export function Header({ onProfileClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 300,
        background: "rgba(244,242,237,0.85)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 58,
      }}
      className="dark:[background:rgba(15,14,11,0.88)]"
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 21,
          letterSpacing: "-0.5px",
          cursor: "pointer",
          userSelect: "none",
          color: "var(--text)",
        }}
      >
        MERY<span style={{ color: "var(--accent)" }}>T</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--text)",
            color: "white",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            padding: "5px 10px",
            borderRadius: 6,
            letterSpacing: "0.07em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "var(--accent3)",
              borderRadius: "50%",
              animation: "livepulse 2s infinite",
              display: "inline-block",
            }}
          />
          LIVE
        </div>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        )}

        <button
          onClick={onProfileClick}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            padding: "7px 16px",
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(255,69,0,0.3)",
          }}
        >
          My Profile
        </button>
      </div>
    </header>
  );
}
