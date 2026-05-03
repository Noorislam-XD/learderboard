"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "silver" | "bronze" | "tech" | "research" | "creative" | "gaming" | "social" | "verified" | "premium";
}

const VARIANTS: Record<string, React.CSSProperties> = {
  default: { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" },
  gold: { background: "#FFF8E3", border: "1px solid #F5A200", color: "#B87800" },
  silver: { background: "#F4F6F8", border: "1px solid #A2AFBE", color: "#566476" },
  bronze: { background: "#FDF3EC", border: "1px solid #C4793A", color: "#8B4B1A" },
  tech: { background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8" },
  research: { background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803D" },
  creative: { background: "#FFF7ED", border: "1px solid #FED7AA", color: "#C2410C" },
  gaming: { background: "#EEF2FF", border: "1px solid #C7D2FE", color: "#4338CA" },
  social: { background: "#FDF4FF", border: "1px solid #E9D5FF", color: "#7E22CE" },
  verified: { background: "#F0FDF4", border: "1px solid #86EFAC", color: "#16A34A" },
  premium: { background: "linear-gradient(135deg,#FFF8E3,#FFF0C3)", border: "1px solid #F5A200", color: "#B87800" },
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.05em",
        padding: "3px 8px",
        borderRadius: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        ...VARIANTS[variant],
      }}
    >
      {children}
    </span>
  );
}
