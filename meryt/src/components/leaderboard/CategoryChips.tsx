"use client";

import { Category } from "@/src/types";

const CATEGORIES: { id: Category; label: string; icon: string; count: number }[] = [
  { id: "all", label: "All", icon: "🌐", count: 28400 },
  { id: "research", label: "Research", icon: "🔬", count: 4210 },
  { id: "tech", label: "Tech", icon: "💻", count: 9830 },
  { id: "creative", label: "Creative", icon: "✨", count: 3740 },
  { id: "gaming", label: "Gaming", icon: "🎮", count: 6120 },
  { id: "social", label: "Social", icon: "🤝", count: 4500 },
];

interface CategoryChipsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              background: isActive ? "var(--text)" : "var(--surface)",
              border: `1.5px solid ${isActive ? "var(--text)" : "var(--border)"}`,
              borderRadius: 100,
              cursor: "pointer",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: isActive ? "white" : "var(--muted)",
              transform: isActive ? "translateY(-2px)" : undefined,
              boxShadow: isActive ? "0 4px 14px var(--shadow-lg)" : undefined,
              transition: "all 0.22s cubic-bezier(.34,1.3,.64,1)",
            }}
          >
            <span style={{ fontSize: 15 }}>{cat.icon}</span>
            {cat.label}
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.04em",
                background: isActive ? "rgba(255,255,255,0.2)" : "var(--bg)",
                color: isActive ? "white" : "var(--muted)",
                padding: "2px 7px",
                borderRadius: 100,
              }}
            >
              {cat.count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
