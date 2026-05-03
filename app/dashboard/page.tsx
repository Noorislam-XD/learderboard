"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { getRankTier } from "@/src/components/scoring/NIScoreEngine";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; handle: string; niScore: number; rank: number; avatar: string; country: string; flag: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("meryt_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const tier = user ? getRankTier(user.rank) : null;
  const top5 = LEADERBOARD_DATA.slice(0, 5);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24 }}>
        <div style={{ fontSize: 56 }}>🔒</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", textAlign: "center" }}>Sign in to view your dashboard</div>
        <p style={{ color: "var(--muted)", fontSize: 15, textAlign: "center", maxWidth: 340 }}>Create your verified talent profile and start building your NI Score today.</p>
        <Link href="/" style={{ background: "var(--accent)", color: "white", padding: "12px 28px", borderRadius: 14, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(255,69,0,0.35)" }}>Go to Leaderboard</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {[["Leaderboard", "/"], ["Verify", "/verify"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.04em" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 1060, margin: "0 auto", padding: "36px 24px 80px" }}>
        {/* Welcome hero */}
        <div style={{ background: "linear-gradient(135deg, var(--text), #2D2A22)", borderRadius: 24, padding: "32px 36px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 40, top: -10, fontFamily: "'Syne', sans-serif", fontSize: 120, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>{tier?.icon}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, border: "2px solid rgba(255,255,255,0.12)", flexShrink: 0 }}>{user.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: 4 }}>WELCOME BACK</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", color: "white", marginBottom: 4 }}>{user.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{user.handle} · {user.flag} {user.country}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, letterSpacing: -2, color: "var(--accent)", lineHeight: 1 }}>{user.niScore.toLocaleString()}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.07em", marginTop: 4 }}>NI SCORE</div>
              {tier && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: tier.color, marginTop: 6 }}>{tier.icon} {tier.tier} Tier</div>}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 28 }}>
          {[
            { icon: "✓", label: "Verify Credentials", href: "/verify", color: "var(--accent3)", desc: "Add proof-of-work" },
            { icon: "📊", label: "Score Breakdown", href: `/profile/${LEADERBOARD_DATA[0].id}`, color: "var(--accent2)", desc: "View NI pillars" },
            { icon: "🔍", label: "Discover Talent", href: "/search", color: "var(--gold)", desc: "Explore rankings" },
            { icon: "⭐", label: "Upgrade to Pro", href: "/pricing", color: "var(--accent)", desc: "Unlock analytics" },
          ].map(a => (
            <Link key={a.label} href={a.href} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "18px 16px", textDecoration: "none", display: "block", transition: "transform 0.2s" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{a.desc}</div>
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
          {/* Activity feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Recent Activity</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "🎓", text: "Academic credential verified", time: "2h ago", color: "var(--accent2)" },
                  { icon: "📈", text: "NI Score increased by +48 points", time: "1d ago", color: "var(--accent3)" },
                  { icon: "🏆", text: "Entered Top 25,000 globally", time: "3d ago", color: "var(--gold)" },
                  { icon: "✓", text: "Profile verification initiated", time: "5d ago", color: "var(--muted)" },
                  { icon: "🎉", text: "Welcome to MERYT!", time: "7d ago", color: "var(--accent)" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{item.text}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NI Score progress */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>NI Score Progress</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>Verify credentials to improve your score</div>
              {[
                { label: "Academic", score: 0, color: "#1A56FF", hint: "Add GPA, awards" },
                { label: "Research", score: 0, color: "#00BE6A", hint: "Link publications" },
                { label: "Code", score: 0, color: "#9333EA", hint: "Connect GitHub" },
                { label: "Creator", score: 0, color: "#F5A200", hint: "Add portfolio" },
                { label: "Social", score: 0, color: "#FF4500", hint: "Verify impact" },
              ].map(p => (
                <div key={p.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{p.label}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: p.score > 0 ? p.color : "var(--muted)" }}>{p.score > 0 ? p.score : p.hint}</span>
                  </div>
                  <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: p.score > 0 ? p.color : "var(--border)", width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
              <Link href="/verify" style={{ display: "block", marginTop: 16, padding: "12px", borderRadius: 12, background: "var(--accent)", color: "white", textAlign: "center", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 3px 14px rgba(255,69,0,0.3)" }}>
                Start Verification →
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "20px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Top 5 This Week</div>
              {top5.map((c, i) => (
                <Link key={c.id} href={`/profile/${c.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none", textDecoration: "none" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: i === 0 ? "var(--gold)" : "var(--muted)", width: 22, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: "1px solid var(--border)", flexShrink: 0 }}>{c.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{c.niScore.toLocaleString()} pts</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent3)", flexShrink: 0 }}>▲{c.scoreChange}</div>
                </Link>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg,#FFF8E3,#FFF0C3)", border: "1.5px solid #F5A200", borderRadius: 20, padding: "20px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#B87800", letterSpacing: "0.08em", marginBottom: 8 }}>✦ MERYT PRO</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "#18160F", marginBottom: 8, lineHeight: 1.2 }}>Unlock Advanced Analytics</div>
              <div style={{ fontSize: 13, color: "#5A4A2A", lineHeight: 1.6, marginBottom: 16 }}>Get detailed score breakdowns, peer comparisons, and recruiter visibility.</div>
              <Link href="/pricing" style={{ display: "block", padding: "10px", borderRadius: 10, background: "#F5A200", color: "white", textAlign: "center", fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>View Plans →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
