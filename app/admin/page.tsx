"use client";

import { useState } from "react";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "MERYT admin panel — verification queue, user management, and score analytics.",
  robots: { index: false, follow: false },
};

const TABS = ["overview", "users", "verifications", "scores", "reports"];

const FAKE_VERIFICATIONS = [
  { id: "v1", name: "James Owusu", handle: "@james.o", type: "Academic", status: "pending", submitted: "2h ago", flag: "🇬🇭" },
  { id: "v2", name: "Yuki Tanaka", handle: "@yuki.t", type: "Research", status: "pending", submitted: "4h ago", flag: "🇯🇵" },
  { id: "v3", name: "Aisha Patel", handle: "@aisha.p", type: "Code", status: "reviewing", submitted: "6h ago", flag: "🇮🇳" },
  { id: "v4", name: "Carlos Mendez", handle: "@carlos.m", type: "Creator", status: "approved", submitted: "8h ago", flag: "🇲🇽" },
  { id: "v5", name: "Emma Larsson", handle: "@emma.l", type: "Social", status: "rejected", submitted: "12h ago", flag: "🇸🇪" },
];

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  pending: { background: "#FFF7ED", border: "1px solid #FED7AA", color: "#C2410C" },
  reviewing: { background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8" },
  approved: { background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803D" },
  rejected: { background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626" },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [verifications, setVerifications] = useState(FAKE_VERIFICATIONS);

  const approve = (id: string) => setVerifications(v => v.map(x => x.id === id ? { ...x, status: "approved" } : x));
  const reject = (id: string) => setVerifications(v => v.map(x => x.id === id ? { ...x, status: "rejected" } : x));

  const pendingCount = verifications.filter(v => v.status === "pending" || v.status === "reviewing").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ background: "var(--text)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "white", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "var(--accent)", color: "white", padding: "3px 9px", borderRadius: 5, letterSpacing: "0.06em" }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {pendingCount > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: "var(--accent)", color: "white", padding: "4px 10px", borderRadius: 100 }}>{pendingCount} pending</span>}
          <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>← View Site</Link>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 80px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 4, marginBottom: 28, overflowX: "auto" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, minWidth: 80, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.04em", padding: "9px 12px", borderRadius: 10, border: "none",
              background: activeTab === tab ? "var(--text)" : "transparent",
              color: activeTab === tab ? "white" : "var(--muted)", cursor: "pointer", textTransform: "capitalize", whiteSpace: "nowrap",
            }}>
              {tab === "verifications" && pendingCount > 0 ? `${tab} (${pendingCount})` : tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { icon: "👥", label: "Total Users", val: "28,400", trend: "+142 today" },
                { icon: "✓", label: "Verified", val: "21,840", trend: "77.0% rate" },
                { icon: "⏳", label: "Pending Reviews", val: String(pendingCount), trend: "< 48h SLA" },
                { icon: "📈", label: "Avg NI Score", val: "4,210", trend: "+89 this month" },
              ].map(s => (
                <div key={s.label} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "18px 16px" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)" }}>{s.val}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.04em" }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent3)", marginTop: 4 }}>{s.trend}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Category Breakdown</div>
                {[
                  { label: "Tech", pct: 35, color: "#1A56FF" },
                  { label: "Research", pct: 25, color: "#00BE6A" },
                  { label: "Gaming", pct: 18, color: "#9333EA" },
                  { label: "Creative", pct: 13, color: "#F5A200" },
                  { label: "Social", pct: 9, color: "#FF4500" },
                ].map(c => (
                  <div key={c.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{c.label}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)" }}>{c.pct}%</span>
                    </div>
                    <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 3, background: c.color, width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Top Countries</div>
                {[
                  { flag: "🇮🇳", country: "India", users: 4820, pct: 17 },
                  { flag: "🇺🇸", country: "USA", users: 3910, pct: 14 },
                  { flag: "🇨🇳", country: "China", users: 3120, pct: 11 },
                  { flag: "🇩🇪", country: "Germany", users: 1840, pct: 6 },
                  { flag: "🇧🇷", country: "Brazil", users: 1560, pct: 5 },
                ].map(c => (
                  <div key={c.country} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{c.flag}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", flex: 1 }}>{c.country}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{c.users.toLocaleString()}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>All Users</div>
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 120px 100px 100px 90px", gap: 12, padding: "12px 16px", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
                {["#", "User", "NI Score", "Rank", "Status", "Actions"].map(h => (
                  <div key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {LEADERBOARD_DATA.map(c => (
                <div key={c.id} style={{ display: "grid", gridTemplateColumns: "48px 1fr 120px 100px 100px 90px", gap: 12, padding: "12px 16px", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--muted)" }}>{c.rank}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: "1px solid var(--border)", flexShrink: 0 }}>{c.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{c.handle}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{c.niScore.toLocaleString()}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>#{c.rank}</div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803D" }}>verified</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Link href={`/profile/${c.id}`} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "4px 8px", borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none" }}>View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFICATIONS */}
        {activeTab === "verifications" && (
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Verification Queue</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {verifications.map(v => (
                <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "14px 16px" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{v.flag}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{v.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{v.handle} · {v.type} verification · {v.submitted}</div>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 5, flexShrink: 0, ...STATUS_STYLE[v.status] }}>{v.status}</span>
                  {(v.status === "pending" || v.status === "reviewing") && (
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => approve(v.id)} style={{ padding: "6px 12px", borderRadius: 7, border: "none", background: "#F0FDF4", color: "#16A34A", fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer" }}>Approve</button>
                      <button onClick={() => reject(v.id)} style={{ padding: "6px 12px", borderRadius: 7, border: "none", background: "#FEF2F2", color: "#DC2626", fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer" }}>Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCORES */}
        {activeTab === "scores" && (
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Score Analytics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Score Distribution</div>
                {[
                  { range: "9000–10000", count: 142, pct: 0.5 },
                  { range: "8000–9000", count: 840, pct: 3 },
                  { range: "7000–8000", count: 2400, pct: 8.5 },
                  { range: "5000–7000", count: 7200, pct: 25.4 },
                  { range: "3000–5000", count: 9800, pct: 34.5 },
                  { range: "0–3000", count: 8018, pct: 28.1 },
                ].map(d => (
                  <div key={d.range} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", width: 90, flexShrink: 0 }}>{d.range}</span>
                    <div style={{ flex: 1, height: 18, background: "var(--bg)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,var(--accent2),var(--accent3))", width: `${d.pct * 3}%`, display: "flex", alignItems: "center" }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "white", paddingLeft: 6 }}>{d.count.toLocaleString()}</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", width: 36, textAlign: "right", flexShrink: 0 }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Weekly Score Changes</div>
                {LEADERBOARD_DATA.slice(0, 7).map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{c.avatar}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, flex: 1, color: "var(--text)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: c.scoreChange > 0 ? "var(--accent3)" : c.scoreChange < 0 ? "var(--accent)" : "var(--muted)", flexShrink: 0 }}>
                      {c.scoreChange > 0 ? "▲" : c.scoreChange < 0 ? "▼" : "—"}{Math.abs(c.scoreChange)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {activeTab === "reports" && (
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Reports</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { type: "Fake verification", reporter: "@user123", target: "@bad.actor", time: "1h ago", severity: "high" },
                { type: "Incorrect score claim", reporter: "@verify.check", target: "@fake.phd", time: "3h ago", severity: "medium" },
                { type: "Plagiarized portfolio", reporter: "@original.creator", target: "@copy.paste", time: "6h ago", severity: "high" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--surface)", border: `1.5px solid ${r.severity === "high" ? "#FECACA" : "var(--border)"}`, borderRadius: 14, padding: "14px 16px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: r.severity === "high" ? "#FEF2F2" : "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⚠️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{r.type}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>Reported by {r.reporter} · Target: {r.target} · {r.time}</div>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 5, background: r.severity === "high" ? "#FEF2F2" : "#FFF7ED", color: r.severity === "high" ? "#DC2626" : "#C2410C", border: `1px solid ${r.severity === "high" ? "#FECACA" : "#FED7AA"}`, flexShrink: 0 }}>{r.severity}</span>
                  <button style={{ padding: "6px 12px", borderRadius: 7, border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", flexShrink: 0 }}>Review</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
