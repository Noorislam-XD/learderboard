"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explorer free plan, Pro at $19/mo, Elite at $49/mo. Get your verified NI Score and global talent ranking.",
};

const PLANS = [
  {
    id: "free",
    name: "Explorer",
    price: 0,
    period: "forever",
    icon: "🌱",
    color: "var(--text)",
    desc: "Get started with your verified talent profile.",
    features: [
      "Public profile & NI Score",
      "1 verification per pillar",
      "Basic leaderboard access",
      "Community ranking",
      "Basic score breakdown",
    ],
    missing: [
      "Advanced analytics",
      "Recruiter visibility badge",
      "Priority verification (48h → 2h)",
      "Score trajectory & history",
      "API access",
    ],
    cta: "Get Started Free",
    ctaHref: "/dashboard",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "month",
    icon: "⚡",
    color: "#1A56FF",
    desc: "For serious candidates who want to stand out.",
    features: [
      "Everything in Explorer",
      "Unlimited verifications",
      "Priority review (2-hour SLA)",
      "Advanced analytics dashboard",
      "Score trajectory & history",
      "Recruiter visibility badge",
      "Custom profile URL",
      "Export PDF profile",
    ],
    missing: [
      "API access",
      "White-label profile",
    ],
    cta: "Start Pro Trial",
    ctaHref: "#",
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 49,
    period: "month",
    icon: "👑",
    color: "#F5A200",
    desc: "For top performers who need maximum visibility.",
    features: [
      "Everything in Pro",
      "Verified Elite badge",
      "Recruiter direct contact",
      "Featured on homepage",
      "API access (read/write)",
      "White-label profile page",
      "Dedicated account manager",
      "AI-powered score coaching",
    ],
    missing: [],
    cta: "Go Elite",
    ctaHref: "#",
    popular: false,
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const discount = 0.2;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Leaderboard", "/"], ["Verify", "/verify"], ["Dashboard", "/dashboard"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 940, margin: "0 auto", padding: "60px 24px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "7px 16px", borderRadius: 100 }}>
            ⭐ MERYT PLANS
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(34px,6vw,64px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.04, color: "var(--text)", marginBottom: 16 }}>
            Invest in Your<br /><span style={{ color: "var(--accent)" }}>Verified Identity</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.65 }}>
            Your NI Score is your professional currency. MERYT Pro gives you the tools to maximize it.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", gap: 4, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 4 }}>
            {(["monthly", "yearly"] as const).map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{ padding: "9px 20px", borderRadius: 10, border: "none", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.04em", background: billing === b ? "var(--text)" : "transparent", color: billing === b ? "white" : "var(--muted)", cursor: "pointer", transition: "all 0.2s" }}>
                {b === "monthly" ? "Monthly" : <>Yearly <span style={{ color: billing === "yearly" ? "#86EFAC" : "var(--accent3)", fontSize: 10 }}>Save 20%</span></>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 60 }}>
          {PLANS.map(plan => {
            const displayPrice = billing === "yearly" && plan.price > 0 ? Math.round(plan.price * (1 - discount)) : plan.price;
            return (
              <div
                key={plan.id}
                style={{
                  background: plan.popular ? "var(--text)" : "var(--surface)",
                  border: `1.5px solid ${plan.popular ? "var(--text)" : plan.id === "elite" ? "var(--gold)" : "var(--border)"}`,
                  borderRadius: 24,
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {plan.popular && (
                  <div style={{ position: "absolute", top: 20, right: 20, fontFamily: "'DM Mono', monospace", fontSize: 10, background: "var(--accent)", color: "white", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>POPULAR</div>
                )}
                <div style={{ fontSize: 30, marginBottom: 12 }}>{plan.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: plan.popular ? "white" : "var(--text)", marginBottom: 4 }}>{plan.name}</div>
                <div style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.5)" : "var(--muted)", marginBottom: 20 }}>{plan.desc}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, letterSpacing: -1, color: plan.popular ? "white" : "var(--text)" }}>
                    {displayPrice === 0 ? "Free" : `$${displayPrice}`}
                  </span>
                  {displayPrice > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: plan.popular ? "rgba(255,255,255,0.4)" : "var(--muted)" }}>/mo</span>}
                </div>
                <Link
                  href={plan.ctaHref}
                  style={{
                    display: "block", textAlign: "center", padding: "13px", borderRadius: 12,
                    background: plan.popular ? "var(--accent)" : plan.id === "elite" ? "var(--gold)" : "var(--bg)",
                    color: plan.popular || plan.id === "elite" ? "white" : "var(--text)",
                    fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
                    textDecoration: "none", marginBottom: 24,
                    border: plan.popular || plan.id === "elite" ? "none" : "1.5px solid var(--border)",
                    boxShadow: plan.popular ? "0 4px 20px rgba(255,69,0,0.4)" : "none",
                  }}
                >
                  {plan.cta}
                </Link>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "var(--accent3)", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--muted)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, opacity: 0.4 }}>
                      <span style={{ color: "var(--muted)", fontSize: 14, flexShrink: 0, marginTop: 1 }}>—</span>
                      <span style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.5)" : "var(--muted)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--text)", textAlign: "center", marginBottom: 32 }}>Frequently Asked</div>
          {[
            { q: "Is MERYT free to use?", a: "Yes! You can create a profile, get verified, and appear on the leaderboard for free. Pro features unlock advanced analytics and recruiter visibility." },
            { q: "How is the NI Score calculated?", a: "NI Score is a weighted composite of 5 pillars: Academic (25%), Research (25%), Code (20%), Creator (15%), Social Impact (15%). Only verified credentials count." },
            { q: "Is this social credit scoring?", a: "No. MERYT exclusively tracks verifiable proof-of-work — papers published, code committed, projects shipped. No social behavior or personal data is scored." },
            { q: "How long does verification take?", a: "Free tier: up to 48 hours. Pro tier: 2-hour SLA. Elite tier: near-instant with dedicated reviewers." },
            { q: "Can employers see my profile?", a: "Your public profile is visible to anyone with the link. Pro users get an optional Recruiter Visibility badge that surfaces your profile in recruiter searches." },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)", padding: "18px 0" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{faq.q}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{faq.a}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 64, background: "var(--text)", borderRadius: 28, padding: "52px 36px" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, letterSpacing: "-1px", color: "white", marginBottom: 12 }}>Your Merit Deserves Recognition</div>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>Join 28,400 verified professionals building their proof-of-work identity.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{ padding: "14px 28px", borderRadius: 14, background: "var(--accent)", color: "white", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 24px rgba(255,69,0,0.5)" }}>Get Started Free</Link>
            <Link href="/" style={{ padding: "14px 28px", borderRadius: 14, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)" }}>View Leaderboard</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
