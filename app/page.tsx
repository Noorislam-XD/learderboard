"use client";

import { useState, useMemo } from "react";
import { Header } from "@/src/components/layout/Header";
import { Ticker } from "@/src/components/layout/Ticker";
import { CategoryChips } from "@/src/components/leaderboard/CategoryChips";
import { FilterRow } from "@/src/components/leaderboard/FilterRow";
import { PodiumCard } from "@/src/components/leaderboard/PodiumCard";
import { LeaderboardRow } from "@/src/components/leaderboard/LeaderboardRow";
import { ProfileModal } from "@/src/components/profile/ProfileModal";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { Contestant, Category } from "@/src/types";

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
      <Header onProfileClick={() => setSelectedContestant(LEADERBOARD_DATA[0])} />
      <Ticker />

      <main style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Hero */}
        <div className="animate-fadeup-1" style={{ marginBottom: 44, textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              padding: "7px 16px",
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent3)",
                display: "inline-block",
                animation: "livepulse 2s infinite",
              }}
            />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.07em", color: "var(--muted)" }}>
              LIVE RANKINGS · 28,400 VERIFIED PROFILES
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 7vw, 72px)",
              fontWeight: 800,
              letterSpacing: "clamp(-2px, -0.03em, -3px)",
              lineHeight: 1.02,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Global Verified
            <br />
            <span style={{ color: "var(--accent)" }}>Talent Rankings</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--muted)",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            The NI Score — a dynamic proof-of-work identity graph for students,
            researchers, builders, creators, and professionals worldwide.
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="animate-fadeup-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
            marginBottom: 44,
          }}
        >
          {[
            { icon: "🌐", value: "28,400", label: "Verified Profiles" },
            { icon: "🏆", value: "142", label: "Countries Represented" },
            { icon: "✓", value: "99.1%", label: "Verification Accuracy" },
            { icon: "🔥", value: "1,284", label: "Rank Changes Today" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: 16,
                padding: "16px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--text)" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Podium */}
        {podium.length > 0 && (
          <section className="animate-fadeup-3" style={{ marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
                🏆 Top Performers
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  background: "var(--text)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: 5,
                  letterSpacing: "0.06em",
                }}
              >
                LIVE
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 14,
                alignItems: "end",
              }}
            >
              {podium
                .sort((a, b) => {
                  const order: Record<number, number> = { 2: 0, 1: 1, 3: 2 };
                  return order[a.rank] - order[b.rank];
                })
                .map((c) => (
                  <PodiumCard
                    key={c.id}
                    contestant={c}
                    onClick={() => setSelectedContestant(c)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Main leaderboard */}
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
              Full Rankings
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
              {filtered.length} results
            </span>
          </div>

          <CategoryChips active={activeCategory} onChange={setActiveCategory} />
          <FilterRow
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            search={search}
            onSearchChange={setSearch}
          />

          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr 110px 130px 130px 90px",
              padding: "7px 16px",
              gap: 12,
              marginBottom: 6,
            }}
          >
            {["#", "Talent", "NI Score", "Skills", "Tags", "Δ Week"].map((h) => (
              <div
                key={h}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {rest.map((c, i) => (
            <LeaderboardRow
              key={c.id}
              contestant={c}
              onClick={() => setSelectedContestant(c)}
              index={i}
            />
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--muted)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
              }}
            >
              No results found for &quot;{search}&quot;
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{ marginTop: 80, textAlign: "center", borderTop: "1.5px solid var(--border)", paddingTop: 36 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10, color: "var(--text)" }}>
            MERY<span style={{ color: "var(--accent)" }}>T</span>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
            Global Verified Talent Rankings · Powered by NI Score
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", opacity: 0.6 }}>
            © 2025 MERYT · Not social credit scoring · Proof-of-work only
          </p>
        </footer>
      </main>

      <ProfileModal contestant={selectedContestant} onClose={() => setSelectedContestant(null)} />
    </div>
  );
}
