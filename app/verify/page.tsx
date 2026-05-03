"use client";

import { useState } from "react";
import Link from "next/link";

const VERIFICATION_STEPS = [
  {
    id: "academic",
    icon: "🎓",
    title: "Academic Credentials",
    desc: "GPA, degrees, academic awards",
    color: "#1A56FF",
    fields: [
      { label: "Institution Name", type: "text", placeholder: "MIT, Stanford, IIT Delhi..." },
      { label: "Degree / Program", type: "text", placeholder: "B.S. Computer Science" },
      { label: "GPA / Grade", type: "text", placeholder: "3.9 / 4.0" },
      { label: "Graduation Year", type: "text", placeholder: "2024" },
      { label: "Transcript or Award PDF", type: "file" },
    ],
  },
  {
    id: "research",
    icon: "🔬",
    title: "Research Publications",
    desc: "Papers, citations, preprints",
    color: "#00BE6A",
    fields: [
      { label: "Google Scholar URL", type: "url", placeholder: "https://scholar.google.com/..." },
      { label: "ORCID ID", type: "text", placeholder: "0000-0000-0000-0000" },
      { label: "Top Publication Title", type: "text", placeholder: "Attention Is All You Need" },
      { label: "Venue / Journal", type: "text", placeholder: "NeurIPS 2024" },
    ],
  },
  {
    id: "code",
    icon: "💻",
    title: "Code & Engineering",
    desc: "GitHub, open source, competition results",
    color: "#9333EA",
    fields: [
      { label: "GitHub Username", type: "text", placeholder: "@username" },
      { label: "LeetCode / Codeforces Handle", type: "text", placeholder: "@handle" },
      { label: "Top Project URL", type: "url", placeholder: "https://github.com/..." },
      { label: "Competition Certificate", type: "file" },
    ],
  },
  {
    id: "creator",
    icon: "✨",
    title: "Creative Work",
    desc: "Portfolio, content, design work",
    color: "#F5A200",
    fields: [
      { label: "Portfolio URL", type: "url", placeholder: "https://dribbble.com/..." },
      { label: "Social Handle (largest)", type: "text", placeholder: "@handle — 10k followers" },
      { label: "Notable Work URL", type: "url", placeholder: "https://..." },
    ],
  },
  {
    id: "social",
    icon: "🤝",
    title: "Social Impact",
    desc: "Mentoring, community leadership, volunteering",
    color: "#FF4500",
    fields: [
      { label: "Organization / Community", type: "text", placeholder: "Women in STEM, Google DSC..." },
      { label: "Role / Title", type: "text", placeholder: "Community Lead, Mentor" },
      { label: "Evidence URL or Letter", type: "url", placeholder: "https://..." },
      { label: "Number of People Impacted", type: "text", placeholder: "50 students mentored" },
    ],
  },
];

export default function VerifyPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});

  const handleSubmit = (stepId: string) => {
    setSubmitted(prev => ({ ...prev, [stepId]: true }));
    setActiveStep(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {[["Dashboard", "/dashboard"], ["Leaderboard", "/"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "7px 16px", borderRadius: 100 }}>
            <span style={{ width: 6, height: 6, background: "var(--accent3)", borderRadius: "50%", display: "inline-block", animation: "livepulse 2s infinite" }} />
            CREDENTIAL VERIFICATION SYSTEM
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.04, color: "var(--text)", marginBottom: 16 }}>
            Prove What You&apos;ve{" "}<span style={{ color: "var(--accent)" }}>Built</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>
            MERYT is not self-reported. Every NI Score point requires verified evidence. Submit your credentials across all 5 pillars to build your score.
          </p>
        </div>

        {/* Progress overview */}
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "20px 24px", marginBottom: 32, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: -1, color: "var(--text)" }}>{Object.keys(submitted).length} / 5</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>PILLARS SUBMITTED</div>
          </div>
          <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden", minWidth: 120 }}>
            <div style={{ height: "100%", borderRadius: 4, background: "var(--accent3)", width: `${(Object.keys(submitted).length / 5) * 100}%`, transition: "width 0.6s cubic-bezier(.22,1,.36,1)" }} />
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
            {Object.keys(submitted).length === 0 ? "Start with any pillar" : Object.keys(submitted).length < 5 ? "Keep going!" : "All pillars submitted! 🎉"}
          </div>
        </div>

        {/* Verification cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {VERIFICATION_STEPS.map(step => (
            <div key={step.id}>
              <div
                style={{
                  background: "var(--surface)",
                  border: `1.5px solid ${submitted[step.id] ? "#86EFAC" : activeStep === step.id ? step.color : "var(--border)"}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: "var(--bg)", border: `1.5px solid ${submitted[step.id] ? "#86EFAC" : "var(--border)"}`, flexShrink: 0 }}>
                    {submitted[step.id] ? "✅" : step.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{step.title}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{step.desc}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    {submitted[step.id] && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "#F0FDF4", color: "#16A34A", border: "1px solid #86EFAC", padding: "4px 10px", borderRadius: 6 }}>SUBMITTED</span>}
                    <span style={{ color: "var(--muted)", fontSize: 16, transition: "transform 0.2s", transform: activeStep === step.id ? "rotate(180deg)" : undefined }}>▾</span>
                  </div>
                </button>

                {activeStep === step.id && (
                  <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>
                    <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                      {step.fields.map(field => (
                        <div key={field.label}>
                          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6, letterSpacing: "0.04em" }}>{field.label.toUpperCase()}</label>
                          {field.type === "file" ? (
                            <div style={{ border: "2px dashed var(--border)", borderRadius: 12, padding: "20px", textAlign: "center", cursor: "pointer", background: "var(--bg)" }}>
                              <div style={{ fontSize: 24, marginBottom: 8 }}>📎</div>
                              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>Click to upload PDF or image</div>
                            </div>
                          ) : (
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[step.id]?.[field.label] ?? ""}
                              onChange={e => setFormData(prev => ({ ...prev, [step.id]: { ...prev[step.id], [field.label]: e.target.value } }))}
                              style={{ width: "100%", padding: "12px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--bg)", color: "var(--text)", outline: "none" }}
                            />
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => handleSubmit(step.id)}
                        style={{ marginTop: 8, padding: "13px", borderRadius: 12, border: "none", background: step.color, color: "white", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${step.color}44` }}
                      >
                        Submit {step.title} Verification →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{ marginTop: 52, borderTop: "1.5px solid var(--border)", paddingTop: 48 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textAlign: "center", marginBottom: 32 }}>How Verification Works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { step: "01", icon: "📤", title: "Submit Evidence", desc: "Upload transcripts, links, certificates, or connect your accounts." },
              { step: "02", icon: "🤖", title: "AI + Human Review", desc: "Our system and human reviewers verify authenticity within 48 hours." },
              { step: "03", icon: "📈", title: "Score Updates", desc: "Verified credentials are weighted and reflected in your live NI Score." },
            ].map(s => (
              <div key={s.step} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 18, padding: "22px 18px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
