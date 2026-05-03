"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_NOTIFS = [
  { id: "1", type: "rank", icon: "📈", title: "Your rank improved!", body: "You moved up 3 spots to #8 Global.", time: "2 minutes ago", read: false },
  { id: "2", type: "verify", icon: "✅", title: "Verification approved", body: "Your GitHub Code pillar has been verified. +142 NI Score points.", time: "1 hour ago", read: false },
  { id: "3", type: "follow", icon: "👤", title: "New follower", body: "Aryan Kapoor (@aryan.k) started following you.", time: "3 hours ago", read: false },
  { id: "4", type: "score", icon: "🔥", title: "Weekly score update", body: "Your NI Score increased by +89 this week. You're on a 4-week streak!", time: "Yesterday", read: true },
  { id: "5", type: "verify", icon: "⏳", title: "Verification pending", body: "Your Research Publications pillar is under review. Expected: 48h.", time: "2 days ago", read: true },
  { id: "6", type: "system", icon: "🎉", title: "Welcome to MERYT!", body: "Your profile is live. Start verifying your credentials to build your NI Score.", time: "3 days ago", read: true },
  { id: "7", type: "rank", icon: "🏆", title: "Top 1% milestone!", body: "You've entered the Top 1% of all global rankings. Keep going!", time: "1 week ago", read: true },
  { id: "8", type: "follow", icon: "👥", title: "50 followers reached", body: "Your profile now has 50 followers. Share your rank card to grow faster.", time: "1 week ago", read: true },
];

const TYPE_COLORS: Record<string, string> = {
  rank: "var(--accent3)",
  verify: "var(--accent2)",
  follow: "var(--gold)",
  score: "var(--accent)",
  system: "var(--muted)",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter(n => !n.read).length;
  const visible = filter === "unread" ? notifs.filter(n => !n.read) : notifs;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/dashboard" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/settings" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>Settings</Link>
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)", marginBottom: 4 }}>Notifications</h1>
            {unreadCount > 0 && (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", background: "rgba(255,69,0,0.1)", padding: "3px 10px", borderRadius: 100 }}>{unreadCount} unread</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["all", "unread"].map(f => (
              <button key={f} onClick={() => setFilter(f as "all" | "unread")} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 100, border: `1.5px solid ${filter === f ? "var(--text)" : "var(--border)"}`, background: filter === f ? "var(--text)" : "transparent", color: filter === f ? "white" : "var(--muted)", cursor: "pointer" }}>{f}</button>
            ))}
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent2)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>Mark all read</button>
            )}
          </div>
        </div>

        {/* Notifications list */}
        {visible.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700 }}>All caught up!</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {visible.map(n => (
              <div key={n.id} onClick={() => markRead(n.id)} style={{ display: "flex", gap: 14, padding: "16px 18px", background: "var(--surface)", border: `1.5px solid ${n.read ? "var(--border)" : TYPE_COLORS[n.type] + "44"}`, borderRadius: 16, cursor: "pointer", transition: "all 0.18s", position: "relative", boxShadow: n.read ? "none" : `0 2px 12px ${TYPE_COLORS[n.type]}18` }}>
                {!n.read && <div style={{ position: "absolute", top: 18, right: 18, width: 7, height: 7, borderRadius: "50%", background: TYPE_COLORS[n.type] }} />}
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${TYPE_COLORS[n.type]}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: n.read ? 600 : 800, color: "var(--text)", marginBottom: 3 }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginBottom: 6 }}>{n.body}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", opacity: 0.6 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
