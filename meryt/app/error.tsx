"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>⚡</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 14, textTransform: "uppercase" }}>Unexpected Error</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, letterSpacing: "-1px", color: "var(--text)", marginBottom: 14, lineHeight: 1.15 }}>
          Something went wrong
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)", lineHeight: 1.65, marginBottom: 28, maxWidth: 360, margin: "0 auto 28px" }}>
          An unexpected error occurred. This has been logged. Please try again or return to the leaderboard.
        </p>

        {/* Error message (dev only style) */}
        {error?.message && (
          <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 6, letterSpacing: "0.06em" }}>ERROR</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", wordBreak: "break-word" }}>{error.message}</div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 12, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 3px 14px rgba(255,69,0,0.3)" }}>
            Try Again
          </button>
          <Link href="/" style={{ padding: "12px 24px", borderRadius: 12, background: "var(--surface)", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
