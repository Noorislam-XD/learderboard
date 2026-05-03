"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24 }}>
      <div style={{ fontSize: 52 }}>⚡</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)" }}>Something went wrong</div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)", textAlign: "center", maxWidth: 320 }}>
        An unexpected error occurred. Please try again or return to the leaderboard.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={reset}
          style={{ padding: "12px 24px", borderRadius: 12, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
        >
          Try Again
        </button>
        <Link href="/" style={{ padding: "12px 24px", borderRadius: 12, background: "var(--surface)", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
