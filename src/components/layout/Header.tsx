"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/components/auth/AuthContext";
import { AuthModal } from "@/src/components/auth/AuthModal";

interface HeaderProps {
  onProfileClick?: () => void;
}

export function Header({ onProfileClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const openSignIn = () => { setAuthTab("signin"); setAuthOpen(true); };
  const openSignUp = () => { setAuthTab("signup"); setAuthOpen(true); };

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 300,
          background: "rgba(244,242,237,0.88)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderBottom: "1px solid var(--border)",
          padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 58, gap: 16,
        }}
        className="dark:[background:rgba(15,14,11,0.90)]"
      >
        {/* Logo */}
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 21, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none", userSelect: "none", flexShrink: 0 }}>
          MERY<span style={{ color: "var(--accent)" }}>T</span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          {[
            { label: "Leaderboard", href: "/" },
            { label: "Search", href: "/search" },
            { label: "Verify", href: "/verify" },
            { label: "Pricing", href: "/pricing" },
            { label: "About", href: "/about" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: 11,
                letterSpacing: "0.04em", color: "var(--muted)",
                textDecoration: "none", padding: "6px 10px",
                borderRadius: 8, transition: "color 0.18s, background 0.18s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* LIVE badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--text)", color: "white", fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "5px 10px", borderRadius: 6, letterSpacing: "0.07em" }}>
            <span style={{ width: 6, height: 6, background: "var(--accent3)", borderRadius: "50%", animation: "livepulse 2s infinite", display: "inline-block" }} />
            LIVE
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{ width: 36, height: 36, borderRadius: 9, border: "1.5px solid var(--border)", background: "var(--surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {/* Auth area */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 8px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, cursor: "pointer" }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{user.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{user.niScore.toLocaleString()} pts</div>
                </div>
                <span style={{ fontSize: 10, color: "var(--muted)" }}>▾</span>
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden", minWidth: 180, boxShadow: "0 8px 32px var(--shadow-lg)", zIndex: 400 }} onClick={() => setMenuOpen(false)}>
                  {[
                    { label: "Dashboard", href: "/dashboard", icon: "📊" },
                    { label: "My Profile", href: `/profile/1`, icon: "👤" },
                    { label: "Verify Credentials", href: "/verify", icon: "✓" },
                  ].map(item => (
                    <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", fontSize: 13, color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
                      <span>{item.icon}</span> {item.label}
                    </Link>
                  ))}
                  <button onClick={signOut} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", fontSize: 13, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
                    <span>←</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={openSignIn} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "7px 14px", background: "transparent", color: "var(--muted)", border: "1.5px solid var(--border)", borderRadius: 8, cursor: "pointer" }}>
                Sign In
              </button>
              <button
                onClick={() => { openSignUp(); onProfileClick?.(); }}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, padding: "7px 16px", background: "var(--accent)", color: "white", border: "none", borderRadius: 8, cursor: "pointer", boxShadow: "0 2px 10px rgba(255,69,0,0.3)" }}
              >
                Get Ranked
              </button>
            </div>
          )}
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </>
  );
}
