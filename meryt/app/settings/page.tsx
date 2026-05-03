"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/src/components/auth/AuthContext";

const SECTION_TABS = ["Profile", "Account", "Notifications", "Privacy", "API Keys", "Danger Zone"];

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({
    rankChange: true, weeklyDigest: true, newFollower: false,
    verificationUpdate: true, platformNews: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showScore: true, showPillars: true,
    showAchievements: true, allowEmbed: true, indexable: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 52 }}>🔒</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)" }}>Sign in to access settings</div>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>← Back to Leaderboard</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/dashboard" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Back</Link>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 28 }}>
        {/* Sidebar */}
        <aside>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 12, textTransform: "uppercase" }}>Settings</div>
          {SECTION_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 9, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? "var(--text)" : "var(--muted)", background: tab === t ? "var(--surface)" : "transparent", border: tab === t ? "1.5px solid var(--border)" : "1.5px solid transparent", cursor: "pointer", marginBottom: 3, transition: "all 0.15s" }}>
              {t}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main>
          {/* ── Profile ── */}
          {tab === "Profile" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>Profile Settings</h2>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "28px 26px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, border: "2px solid var(--border)", flexShrink: 0 }}>{user.avatar}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{user.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{user.handle}</div>
                  </div>
                  <button style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "7px 14px", border: "1.5px solid var(--border)", borderRadius: 8, background: "var(--bg)", color: "var(--muted)", cursor: "pointer" }}>
                    Change Avatar
                  </button>
                </div>
                {[
                  { label: "Display Name", value: user.name, type: "text" },
                  { label: "Handle", value: user.handle, type: "text" },
                  { label: "Bio", value: "Building the future, one commit at a time.", type: "textarea" },
                  { label: "University / Org", value: "IIT Bombay", type: "text" },
                  { label: "Country", value: user.country, type: "text" },
                  { label: "Website", value: "", type: "text", placeholder: "https://yoursite.com" },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 7, textTransform: "uppercase" }}>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea defaultValue={field.value} placeholder={field.placeholder} rows={3} style={{ width: "100%", padding: "10px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--bg)", color: "var(--text)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                    ) : (
                      <input type={field.type} defaultValue={field.value} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--bg)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleSave} style={{ padding: "11px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 14px rgba(255,69,0,0.3)" }}>
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ── Notifications ── */}
          {tab === "Notifications" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>Notification Preferences</h2>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, overflow: "hidden", marginBottom: 16 }}>
                {[
                  { key: "rankChange", label: "Rank Changes", desc: "When your NI Score or global rank changes" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of your progress and platform highlights" },
                  { key: "newFollower", label: "New Followers", desc: "When someone follows your profile" },
                  { key: "verificationUpdate", label: "Verification Updates", desc: "Status changes on your submitted credentials" },
                  { key: "platformNews", label: "Platform News", desc: "New features, announcements, and updates" },
                ].map((n, i, arr) => (
                  <div key={n.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{n.label}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{n.desc}</div>
                    </div>
                    <button onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof notifs] }))} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: notifs[n.key as keyof typeof notifs] ? "var(--accent3)" : "var(--border)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "left 0.2s", left: notifs[n.key as keyof typeof notifs] ? 23 : 3 }} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} style={{ padding: "11px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {saved ? "✓ Saved!" : "Save Preferences"}
              </button>
            </div>
          )}

          {/* ── Privacy ── */}
          {tab === "Privacy" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>Privacy Settings</h2>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, overflow: "hidden", marginBottom: 16 }}>
                {[
                  { key: "publicProfile", label: "Public Profile", desc: "Anyone can view your profile and NI Score" },
                  { key: "showScore", label: "Show NI Score", desc: "Display your exact score on your public profile" },
                  { key: "showPillars", label: "Show Pillar Breakdown", desc: "Reveal individual pillar scores to visitors" },
                  { key: "showAchievements", label: "Show Achievements", desc: "List your verified achievements publicly" },
                  { key: "allowEmbed", label: "Allow Rank Card Embed", desc: "Let others embed your rank card on their site" },
                  { key: "indexable", label: "Search Engine Indexing", desc: "Allow your profile to appear in Google search" },
                ].map((p, i, arr) => (
                  <div key={p.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.desc}</div>
                    </div>
                    <button onClick={() => setPrivacy(prev => ({ ...prev, [p.key]: !prev[p.key as keyof typeof privacy] }))} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: privacy[p.key as keyof typeof privacy] ? "var(--accent3)" : "var(--border)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "left 0.2s", left: privacy[p.key as keyof typeof privacy] ? 23 : 3 }} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} style={{ padding: "11px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {saved ? "✓ Saved!" : "Save Privacy Settings"}
              </button>
            </div>
          )}

          {/* ── API Keys ── */}
          {tab === "API Keys" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>API Keys</h2>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "24px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>API access is available on Pro and Elite plans. <Link href="/pricing" style={{ color: "var(--accent2)", textDecoration: "none" }}>Upgrade →</Link></div>
                <div style={{ background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)", letterSpacing: "0.05em" }}>meryt_sk_live_••••••••••••••••••••••••</code>
                  <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "5px 12px", border: "1.5px solid var(--border)", borderRadius: 7, background: "var(--bg)", color: "var(--muted)", cursor: "pointer" }}>Reveal</button>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", background: "var(--accent2)", color: "white", border: "none", borderRadius: 9, cursor: "pointer" }}>Generate New Key</button>
                  <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", background: "var(--bg)", color: "var(--muted)", border: "1.5px solid var(--border)", borderRadius: 9, cursor: "pointer" }}>Revoke All Keys</button>
                </div>
              </div>
              <Link href="/api-docs" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--accent2)", textDecoration: "none" }}>View API Documentation →</Link>
            </div>
          )}

          {/* ── Account ── */}
          {tab === "Account" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>Account Settings</h2>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "24px", marginBottom: 16 }}>
                {[
                  { label: "Email Address", value: "user@example.com", type: "email" },
                  { label: "Current Password", value: "", type: "password", placeholder: "Enter current password" },
                  { label: "New Password", value: "", type: "password", placeholder: "Minimum 8 characters" },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 7, textTransform: "uppercase" }}>{field.label}</label>
                    <input type={field.type} defaultValue={field.value} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--bg)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <button onClick={handleSave} style={{ padding: "11px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 11, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  {saved ? "✓ Saved!" : "Update Account"}
                </button>
              </div>
            </div>
          )}

          {/* ── Danger Zone ── */}
          {tab === "Danger Zone" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 22 }}>Danger Zone</h2>
              {[
                { title: "Export Data", desc: "Download all your profile data, NI Score history, and verifications as JSON.", action: "Export Data", color: "var(--accent2)" },
                { title: "Reset NI Score", desc: "Remove all pillar scores and start fresh. This cannot be undone.", action: "Reset Score", color: "var(--gold)" },
                { title: "Delete Account", desc: "Permanently delete your MERYT account and all associated data. This is irreversible.", action: "Delete Account", color: "var(--accent)" },
              ].map(item => (
                <div key={item.title} style={{ background: "var(--surface)", border: `1.5px solid ${item.color}33`, borderRadius: 18, padding: "20px 22px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", maxWidth: 400 }}>{item.desc}</div>
                  </div>
                  <button style={{ padding: "9px 18px", border: `1.5px solid ${item.color}`, borderRadius: 9, background: "transparent", color: item.color, fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", flexShrink: 0 }}>
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
