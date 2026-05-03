"use client";

import { useParams } from "next/navigation";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { getScoreBreakdown, getRankTier, getTopStrength } from "@/src/components/scoring/NIScoreEngine";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const contestant = LEADERBOARD_DATA.find(c => c.id === id || c.handle === `@${id}`);

  if (!contestant) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 52 }}>😶</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Profile not found</div>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>← Back to Leaderboard</Link>
      </div>
    );
  }

  const { rank, avatar, name, handle, country, flag, university, niScore, scoreChange, bio, pillars, achievements, socials, followers, following, rankPercentile, joinedDate, skills } = contestant;
  const breakdown = getScoreBreakdown(contestant);
  const tier = getRankTier(rank);
  const topStrength = getTopStrength(contestant);
  const changeColor = scoreChange > 0 ? "var(--accent3)" : scoreChange < 0 ? "var(--accent)" : "var(--muted)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sticky mini header */}
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>
          MERY<span style={{ color: "var(--accent)" }}>T</span>
        </Link>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
          ← Leaderboard
        </Link>
      </header>

      {/* Hero banner */}
      <div style={{ background: "linear-gradient(135deg, var(--text) 0%, #2D2A22 100%)", padding: "52px 24px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 60, top: 20, fontFamily: "'Syne', sans-serif", fontSize: 160, fontWeight: 800, color: "rgba(255,255,255,0.04)", letterSpacing: -10, lineHeight: 1, userSelect: "none" }}>
          #{rank}
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, flexWrap: "wrap", paddingBottom: 32 }}>
            <div style={{ width: 100, height: 100, borderRadius: 24, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, border: "3px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
              {avatar}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>#{rank} GLOBAL</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: `${tier.color}22`, color: tier.color, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", border: `1px solid ${tier.color}44` }}>{tier.icon} {tier.tier}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: "rgba(0,190,106,0.15)", color: "#00D97E", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>✓ VERIFIED</span>
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", color: "white", marginBottom: 6, lineHeight: 1.05 }}>{name}</h1>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span>{handle}</span>
                <span>·</span>
                <span>{flag} {country}</span>
                <span>·</span>
                <span>🎓 {university}</span>
                <span>·</span>
                <span>Joined {joinedDate}</span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: -2, color: "var(--accent)", lineHeight: 1 }}>{niScore.toLocaleString()}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.07em", marginTop: 4 }}>NI SCORE</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: changeColor, marginTop: 6 }}>
                {scoreChange > 0 ? "▲" : scoreChange < 0 ? "▼" : "—"} {Math.abs(scoreChange)} this week
              </div>
            </div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 36 }}>
          {[
            { label: "NI Score", val: niScore.toLocaleString(), color: "var(--accent)" },
            { label: "Global Rank", val: `#${rank}`, color: "var(--text)" },
            { label: "Followers", val: followers.toLocaleString(), color: "var(--text)" },
            { label: "Rank Percentile", val: rankPercentile, color: "var(--accent3)" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Bio */}
            {bio && (
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>About</div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)" }}>{bio}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}><strong style={{ color: "var(--text)" }}>{followers.toLocaleString()}</strong> followers</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}><strong style={{ color: "var(--text)" }}>{following.toLocaleString()}</strong> following</span>
                </div>
              </div>
            )}

            {/* NI Score Pillars */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>NI Score Breakdown</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", background: "var(--bg)", padding: "4px 10px", borderRadius: 6 }}>5 PILLARS</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {breakdown.map(pillar => (
                  <div key={pillar.id}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{pillar.icon}</span>
                        <div>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{pillar.name}</div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>weight {pillar.weight}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: pillar.color }}>{pillar.score}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>grade {pillar.grade.grade}</div>
                      </div>
                    </div>
                    <div style={{ height: 8, background: "var(--bg)", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 100, background: pillar.color, width: `${pillar.score}%`, transition: "width 1.2s cubic-bezier(.22,1,.36,1)" }} />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                      {pillar.items.map(item => (
                        <span key={item} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Skills</div>
              {skills.map(skill => (
                <div key={skill.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", width: 100, letterSpacing: "0.04em" }}>{skill.label}</div>
                  <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 4, background: skill.color, width: `${skill.value}%` }} />
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, width: 30, textAlign: "right", color: "var(--text)", fontWeight: 500 }}>{skill.value}</div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Achievements</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {achievements.map(ach => (
                  <div key={ach.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--bg)", borderRadius: 12, border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 22 }}>{ach.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, flex: 1, color: "var(--text)" }}>{ach.title}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>{ach.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* AI Insight */}
            <div style={{ background: "linear-gradient(135deg,#F0F4FF,#F5F0FF)", border: "1.5px solid #D0DAFF", borderRadius: 20, padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#1A56FF,#9333EA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "white" }}>✦</div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#5B6AF0", letterSpacing: "0.08em" }}>AI INSIGHT</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "#2D3A8C" }}>
                <strong>{name}</strong> is in the <strong>{rankPercentile}</strong> globally. Top strength: <strong>{topStrength.name}</strong> ({topStrength.score}/100). Consistent upward trajectory — weekly gain of +{Math.abs(scoreChange)} NI points.
              </p>
            </div>

            {/* Social links */}
            {socials.length > 0 && (
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "20px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Links</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {socials.map(s => (
                    <a key={s.platform} href={s.url} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--bg)", textDecoration: "none" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{s.platform}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)", fontWeight: 500 }}>{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Rank history (simulated) */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "20px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Rank History</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { period: "This Week", rank, change: scoreChange },
                  { period: "Last Month", rank: rank + 12, change: -89 },
                  { period: "3 Months Ago", rank: rank + 38, change: 134 },
                  { period: "6 Months Ago", rank: rank + 91, change: 267 },
                ].map(h => (
                  <div key={h.period} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{h.period}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>#{h.rank}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: h.change > 0 ? "var(--accent3)" : h.change < 0 ? "var(--accent)" : "var(--muted)" }}>
                        {h.change > 0 ? "▲" : "▼"}{Math.abs(h.change)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar profiles */}
            <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "20px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Similar Profiles</div>
              {LEADERBOARD_DATA.filter(c => c.id !== contestant.id).slice(0, 3).map(c => (
                <Link key={c.id} href={`/profile/${c.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)", textDecoration: "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: "1px solid var(--border)", flexShrink: 0 }}>{c.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>#{c.rank} · {c.niScore.toLocaleString()} pts</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
