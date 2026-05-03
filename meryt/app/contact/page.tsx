"use client";

import { useState } from "react";
import Link from "next/link";

const TOPICS = [
  { id: "general", label: "General Question", icon: "💬" },
  { id: "verification", label: "Verification Issue", icon: "✓" },
  { id: "account", label: "Account Problem", icon: "👤" },
  { id: "api", label: "API / Developer", icon: "⚡" },
  { id: "partnership", label: "Partnership / Press", icon: "🤝" },
  { id: "privacy", label: "Privacy / Legal", icon: "🔒" },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("general");
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Back</Link>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px 80px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "start" }}>
        {/* Form */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>Contact</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>Get in Touch</h1>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 36, lineHeight: 1.65 }}>We reply within 24 hours on business days.</p>

          {sent ? (
            <div style={{ background: "rgba(0,190,106,0.08)", border: "1.5px solid rgba(0,190,106,0.25)", borderRadius: 20, padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Message sent!</div>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>We&apos;ll reply within 24 hours. Check your email for confirmation.</p>
            </div>
          ) : (
            <div>
              {/* Topic selector */}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 10, textTransform: "uppercase" }}>Topic</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {TOPICS.map(t => (
                    <button key={t.id} onClick={() => setTopic(t.id)} style={{ padding: "10px 12px", borderRadius: 11, border: `1.5px solid ${topic === t.id ? "var(--text)" : "var(--border)"}`, background: topic === t.id ? "var(--text)" : "var(--surface)", color: topic === t.id ? "white" : "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, letterSpacing: "0.04em", transition: "all 0.15s" }}>
                      <span>{t.icon}</span> {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              {[
                { label: "Name", type: "text", placeholder: "Your full name" },
                { label: "Email", type: "email", placeholder: "you@example.com" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 7, textTransform: "uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 11, background: "var(--bg)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 7, textTransform: "uppercase" }}>Message</label>
                <textarea rows={5} placeholder="Describe your question or issue in detail..." style={{ width: "100%", padding: "11px 14px", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, border: "1.5px solid var(--border)", borderRadius: 11, background: "var(--bg)", color: "var(--text)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: "13px 28px", background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 14px rgba(255,69,0,0.3)" }}>
                Send Message →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { title: "General Support", email: "support@meryt.app", resp: "< 24 hours" },
            { title: "Verification Issues", email: "verify@meryt.app", resp: "< 12 hours" },
            { title: "API & Developer", email: "dev@meryt.app", resp: "< 48 hours" },
            { title: "Privacy & Legal", email: "privacy@meryt.app", resp: "< 30 days" },
            { title: "Partnerships & Press", email: "press@meryt.app", resp: "< 72 hours" },
          ].map(item => (
            <div key={item.title} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent2)", marginBottom: 4 }}>{item.email}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", opacity: 0.6 }}>Response: {item.resp}</div>
            </div>
          ))}
          <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Quick answers</div>
            {[["FAQ", "/faq"], ["About MERYT", "/about"], ["Changelog", "/changelog"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent2)", textDecoration: "none", marginBottom: 6 }}>→ {l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
