"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/src/components/layout/Header";
import { Ticker } from "@/src/components/layout/Ticker";
import { CategoryChips } from "@/src/components/leaderboard/CategoryChips";
import { FilterRow } from "@/src/components/leaderboard/FilterRow";
import { PodiumCard } from "@/src/components/leaderboard/PodiumCard";
import { LeaderboardRow } from "@/src/components/leaderboard/LeaderboardRow";
import { ProfileModal } from "@/src/components/profile/ProfileModal";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { Contestant, Category } from "@/src/types";
import { Footer } from "@/src/components/layout/Footer";

export default function Home() {
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [timeframe, setTimeframe] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return LEADERBOARD_DATA.filter((c) => {
      const matchCat = activeCategory === "all" || c.categories.includes(activeCategory);
      const matchSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.university.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const podium = filtered.filter((c) => c.rank <= 3);
  const rest = filtered.filter((c) => c.rank > 3);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <Ticker />

      <main style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ─── HERO ─── */}
        <div className="animate-fadeup-1" style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "7px 16px", borderRadius: 100, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent3)", display: "inline-block", animation: "livepulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.07em", color: "var(--muted)" }}>
              LIVE RANKINGS · 28,400 VERIFIED PROFILES · 142 COUNTRIES
            </span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7.5vw, 80px)", fontWeight: 800, letterSpacing: "clamp(-2px, -0.03em, -4px)", lineHeight: 1.0, color: "var(--text)", marginBottom: 18 }}>
            Global Verified<br />
            <span style={{ color: "var(--accent)" }}>Talent Rankings</span>
          </h1>

          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "var(--muted)", maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.65 }}>
            The NI Score — a dynamic proof-of-work identity graph for students, researchers, builders, creators, and professionals worldwide.
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/verify" style={{ padding: "13px 26px", borderRadius: 13, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(255,69,0,0.35)" }}>
              Get Ranked →
            </Link>
            <Link href="/about" style={{ padding: "13px 26px", borderRadius: 13, background: "var(--surface)", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>
              How It Works
            </Link>
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div className="animate-fadeup-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 52 }}>
          {[
            { icon: "🌐", value: "28,400", label: "Verified Profiles" },
            { icon: "🏆", value: "142", label: "Countries" },
            { icon: "✓", value: "99.1%", label: "Verification Accuracy" },
            { icon: "🔥", value: "1,284", label: "Rank Changes Today" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 7 }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--text)" }}>{stat.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ─── PODIUM ─── */}
        {podium.length > 0 && (
          <section className="animate-fadeup-3" style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>🏆 Top Performers</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "var(--text)", color: "white", padding: "3px 9px", borderRadius: 5, letterSpacing: "0.06em" }}>LIVE</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, alignItems: "end" }}>
              {podium
                .sort((a, b) => ({ 2: 0, 1: 1, 3: 2 } as Record<number, number>)[a.rank] - ({ 2: 0, 1: 1, 3: 2 } as Record<number, number>)[b.rank])
                .map((c) => (
                  <PodiumCard key={c.id} contestant={c} onClick={() => setSelectedContestant(c)} />
                ))}
            </div>
          </section>
        )}

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ marginBottom: 56, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 24, padding: "36px 32px" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 28, textAlign: "center" }}>How MERYT Works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { step: "01", icon: "🧑‍💻", title: "Create Profile", desc: "Sign up and set up your verified talent profile in minutes." },
              { step: "02", icon: "📤", title: "Submit Evidence", desc: "Upload transcripts, link GitHub, add publications — any verifiable proof-of-work." },
              { step: "03", icon: "✅", title: "Get Verified", desc: "AI + human reviewers confirm authenticity within 48 hours." },
              { step: "04", icon: "📈", title: "Earn Your Rank", desc: "Your NI Score is calculated and you join the global leaderboard." },
            ].map(s => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 10 }}>{s.step}</div>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NI SCORE PILLARS ─── */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>The NI Score System</span>
            <Link href="/about" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>Learn more →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {[
              { icon: "🎓", name: "Academic", weight: "25%", color: "#1A56FF", desc: "GPA, awards, degrees" },
              { icon: "🔬", name: "Research", weight: "25%", color: "#00BE6A", desc: "Papers & citations" },
              { icon: "💻", name: "Code", weight: "20%", color: "#9333EA", desc: "GitHub & competitions" },
              { icon: "✨", name: "Creator", weight: "15%", color: "#F5A200", desc: "Portfolio & content" },
              { icon: "🤝", name: "Social", weight: "15%", color: "#FF4500", desc: "Impact & mentoring" },
            ].map(p => (
              <div key={p.name} style={{ background: "var(--surface)", border: `1.5px solid ${p.color}33`, borderRadius: 18, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: p.color, marginBottom: 6, fontWeight: 500 }}>{p.weight}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FULL LEADERBOARD ─── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Full Rankings</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", background: "var(--surface)", border: "1.5px solid var(--border)", padding: "3px 9px", borderRadius: 5 }}>{filtered.length} profiles</span>
            </div>
            <Link href="/search" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent2)", textDecoration: "none" }}>Advanced Search →</Link>
          </div>

          <CategoryChips active={activeCategory} onChange={setActiveCategory} />
          <FilterRow timeframe={timeframe} onTimeframeChange={setTimeframe} search={search} onSearchChange={setSearch} />

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 110px 130px 130px 90px", padding: "7px 16px", gap: 12, marginBottom: 6 }}>
            {["#", "Talent", "NI Score", "Skills", "Tags", "Δ Week"].map((h) => (
              <div key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)" }}>{h}</div>
            ))}
          </div>

          {rest.map((c, i) => (
            <LeaderboardRow key={c.id} contestant={c} onClick={() => setSelectedContestant(c)} index={i} />
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              No results for &ldquo;{search}&rdquo;
            </div>
          )}
        </section>

        {/* ─── JOIN CTA ─── */}
        <section style={{ marginTop: 64, background: "var(--text)", borderRadius: 28, padding: "56px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, fontFamily: "'Syne', sans-serif", fontSize: 200, fontWeight: 800, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none", letterSpacing: -10 }}>NI</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: 18 }}>YOUR MERIT DESERVES RECOGNITION</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", color: "white", marginBottom: 14, lineHeight: 1.06 }}>
            Join 28,400 Verified<br />Professionals Worldwide
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
            Build your proof-of-work identity. Earn your global rank. Get discovered by top companies and universities.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/verify" style={{ padding: "14px 30px", borderRadius: 14, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 24px rgba(255,69,0,0.5)" }}>
              Get Ranked Free
            </Link>
            <Link href="/pricing" style={{ padding: "14px 30px", borderRadius: 14, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.14)" }}>
              View Pro Plans
            </Link>
          </div>
        </section>

        <Footer />
      </main>

      <ProfileModal contestant={selectedContestant} onClose={() => setSelectedContestant(null)} />
    </div>
  );
}
