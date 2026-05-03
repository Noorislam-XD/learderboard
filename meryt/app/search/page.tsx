"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { Category } from "@/src/types";
const CATEGORIES: { id: Category | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🌐" },
  { id: "research", label: "Research", icon: "🔬" },
  { id: "tech", label: "Tech", icon: "💻" },
  { id: "creative", label: "Creative", icon: "✨" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "social", label: "Social", icon: "🤝" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<"score" | "rank" | "change">("score");

  const results = useMemo(() => {
    let data = [...LEADERBOARD_DATA];
    if (query) {
      const q = query.toLowerCase();
      data = data.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.university.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.tags.some(t => t.includes(q))
      );
    }
    if (category !== "all") {
      data = data.filter(c => c.categories.includes(category as Category));
    }
    if (sortBy === "score") data.sort((a, b) => b.niScore - a.niScore);
    else if (sortBy === "rank") data.sort((a, b) => a.rank - b.rank);
    else if (sortBy === "change") data.sort((a, b) => b.scoreChange - a.scoreChange);
    return data;
  }, [query, category, sortBy]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Leaderboard", "/"], ["Verify", "/verify"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text)", marginBottom: 10 }}>
            Discover <span style={{ color: "var(--accent)" }}>Talent</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)" }}>Search 28,400 verified profiles by name, university, country, or skill.</p>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search by name, university, country, or skill..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ width: "100%", padding: "16px 18px 16px 50px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, border: "1.5px solid var(--border)", borderRadius: 16, background: "var(--surface)", color: "var(--text)", outline: "none", boxShadow: "0 4px 20px var(--shadow)" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--muted)" }}>✕</button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as Category | "all")}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 100,
                  border: `1.5px solid ${category === cat.id ? "var(--text)" : "var(--border)"}`,
                  background: category === cat.id ? "var(--text)" : "var(--surface)",
                  color: category === cat.id ? "white" : "var(--muted)",
                  fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", letterSpacing: "0.04em",
                  transition: "all 0.18s",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as "score" | "rank" | "change")}
            style={{ padding: "8px 14px", fontFamily: "'DM Mono', monospace", fontSize: 11, border: "1.5px solid var(--border)", borderRadius: 100, background: "var(--surface)", color: "var(--muted)", cursor: "pointer", outline: "none" }}
          >
            <option value="score">Sort: Highest Score</option>
            <option value="rank">Sort: Best Rank</option>
            <option value="change">Sort: Biggest Gain</option>
          </select>
        </div>

        {/* Results count */}
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.04em" }}>
          {results.length} result{results.length !== 1 ? "s" : ""}{query ? ` for "${query}"` : ""}
        </div>

        {/* Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {results.map((c, i) => (
            <Link
              key={c.id}
              href={`/profile/${c.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 100px 80px",
                gap: 12, alignItems: "center",
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: 14, padding: "14px 18px",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                animationDelay: `${i * 0.03}s`,
              }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: i < 3 ? ["var(--gold)", "var(--silver)", "var(--bronze)"][i] : "var(--muted)", letterSpacing: -0.5 }}>#{c.rank}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: "1.5px solid var(--border)", flexShrink: 0 }}>{c.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", display: "flex", gap: 6 }}>
                    {c.handle} · {c.flag} · {c.university}
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textAlign: "right" }}>
                {c.niScore.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: c.scoreChange > 0 ? "var(--accent3)" : c.scoreChange < 0 ? "var(--accent)" : "var(--muted)", textAlign: "right" }}>
                {c.scoreChange > 0 ? "▲" : c.scoreChange < 0 ? "▼" : "—"}{Math.abs(c.scoreChange)}
              </div>
            </Link>
          ))}
          {results.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>No results found</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>Try a different search term</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
