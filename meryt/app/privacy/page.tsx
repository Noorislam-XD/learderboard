import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MERYT",
  description: "How MERYT collects, stores, and uses your data. Your privacy is foundational to our platform.",
};

const SECTIONS = [
  {
    title: "What We Collect",
    body: `We collect information you provide directly: name, email, handle, university, country, professional credentials, and evidence submitted for verification. We also collect usage data (pages visited, features used) to improve the platform. We do not collect data about your political views, beliefs, relationships, purchases, or lifestyle.`,
  },
  {
    title: "How We Use Your Data",
    body: `Your profile data is used to calculate your NI Score and display your public rank. We use usage data to improve the platform. We never sell your data to third parties. We never use your data for advertising targeting. API keys allow third-party services to read your public NI Score only if you explicitly enable it.`,
  },
  {
    title: "The NI Score Is Not Social Credit",
    body: `MERYT scores professional achievement only — things you deliberately built, published, or contributed. There is no political scoring, behavior scoring, or lifestyle scoring. Your NI Score is purely a measure of verifiable professional output. It cannot be used to restrict access to services, financial products, housing, or employment outside of platforms you explicitly authorize.`,
  },
  {
    title: "Data Storage & Security",
    body: `Your data is stored in encrypted databases hosted in the EU and US. We use industry-standard TLS encryption in transit and AES-256 at rest. Passwords are hashed using bcrypt with per-user salts. We conduct quarterly security audits and maintain a responsible disclosure program.`,
  },
  {
    title: "Verification Evidence",
    body: `Evidence you submit for credential verification (papers, certificates, GitHub links, etc.) is stored securely and used only for the verification process. Raw evidence files are retained for 90 days post-verification, then deleted. Verification outcomes (pass/fail) are retained indefinitely as part of your score history.`,
  },
  {
    title: "Third-Party Integrations",
    body: `When you connect third-party accounts (GitHub, ORCID, Google Scholar), we access only the specific data needed for verification. We do not store your third-party passwords. We do not access private repositories, private messages, or any data beyond what is required. You can revoke access at any time from Settings.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to: access all data we hold about you (export from Settings → Danger Zone), correct inaccurate data, delete your account and all associated data, opt out of non-essential emails, and restrict processing. We respond to all privacy requests within 30 days. EU/UK residents have additional rights under GDPR.`,
  },
  {
    title: "Data Retention",
    body: `Active accounts: data retained while your account exists. Deleted accounts: profile and score data deleted within 30 days. API logs: retained for 90 days. Verification evidence: retained for 90 days post-verification. Anonymized analytics: retained indefinitely.`,
  },
  {
    title: "Cookies",
    body: `We use session cookies for authentication and local preferences (dark mode, filters). We do not use third-party advertising cookies. We do not use cross-site tracking. You can disable non-essential cookies in your browser settings without affecting core functionality.`,
  },
  {
    title: "Contact Us",
    body: `Privacy questions: privacy@meryt.app. Data protection officer: dpo@meryt.app. For EU/GDPR requests: gdpr@meryt.app. Response time: within 30 days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/terms" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>Terms</Link>
          <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Back</Link>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 14, textTransform: "uppercase" }}>Legal</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>Privacy Policy</h1>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 48 }}>Last updated: May 1, 2025 · Effective: May 1, 2025</div>

        <div style={{ background: "rgba(0,190,106,0.07)", border: "1.5px solid rgba(0,190,106,0.2)", borderRadius: 16, padding: "18px 22px", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--accent3)", marginBottom: 6 }}>Our commitment in plain English</div>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>
            We score your professional achievements. We do not score your behavior, politics, or lifestyle. We never sell your data. You can delete everything at any time. The NI Score is not social credit.
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--border)" : "none" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.3px" }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/terms" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 9, color: "var(--muted)", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/settings" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 9, color: "var(--muted)", textDecoration: "none" }}>Manage Your Data</Link>
          <Link href="/contact" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 9, color: "var(--muted)", textDecoration: "none" }}>Contact Us</Link>
        </div>
      </main>
    </div>
  );
}
