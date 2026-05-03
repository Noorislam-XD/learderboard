import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MERYT, the NI Score, verification, and rankings.",
};

const FAQS = [
  {
    category: "General",
    items: [
      { q: "What is MERYT?", a: "MERYT is a global talent ranking platform that quantifies verifiable professional achievement. Every rank is backed by real, verified credentials — not self-reported claims, not follower counts, not connections." },
      { q: "Is this social credit scoring?", a: "No. Explicitly not. Social credit systems score behavior, compliance, or social conformity. MERYT scores professional output only — papers you published, code you shipped, credentials you earned. There is no political scoring, no behavior scoring, and no lifestyle scoring of any kind." },
      { q: "Who is MERYT for?", a: "Students, PhD candidates, engineers, researchers, designers, competitive programmers, content creators, and any professional whose work can be independently verified." },
      { q: "Is it free?", a: "Yes — the Explorer plan is free forever. It includes a public profile, verified NI Score, and global leaderboard ranking. Pro ($19/mo) and Elite ($49/mo) plans unlock advanced features like API access, bulk verification, and custom org pages." },
    ],
  },
  {
    category: "NI Score",
    items: [
      { q: "What is an NI Score?", a: "The NI Score is a weighted composite score across 5 pillars: Academic (25%), Research (25%), Code (20%), Creator (15%), and Social Impact (15%). Each pillar score is based on verified evidence. The total is normalized to a 0–10,000 scale." },
      { q: "How often does the NI Score update?", a: "Scores update within 24 hours of a successful verification. The leaderboard rankings update in real time as scores change." },
      { q: "Can my score go down?", a: "Yes. Scores can decrease if: verified credentials expire, our verification standards become more rigorous, or you lose ranking relative to other users as the platform grows." },
      { q: "What is a good NI Score?", a: "The global average is ~4,200. Top 10% is ~6,800. Top 1% is ~8,400. #1 globally is currently 9,847. Getting above 5,000 puts you in the top 25% worldwide." },
      { q: "Does my NI Score affect my life outside MERYT?", a: "Your NI Score is a platform metric. It cannot affect your credit score, insurance, government services, housing, or employment unless you explicitly share it with an employer or institution — and only then." },
    ],
  },
  {
    category: "Verification",
    items: [
      { q: "How does verification work?", a: "You submit evidence for each pillar (transcripts, paper DOIs, GitHub profiles, portfolio links, etc.). Our AI pre-screens submissions, then human reviewers confirm. Average review time is 28 hours." },
      { q: "What counts as valid evidence?", a: "Official documents (transcripts, certificates), publicly accessible publications (DOI links), verifiable online profiles (GitHub, ORCID, Google Scholar), and portfolio links with public work. Self-reported claims without evidence are not accepted." },
      { q: "Can I appeal a rejection?", a: "Yes. If your verification is rejected, you'll receive a detailed reason. You can resubmit with additional or corrected evidence. Pro and Elite users get priority review queues and a dedicated appeals channel." },
      { q: "How long does verification take?", a: "Average: 28 hours. Range: 4–72 hours depending on complexity and evidence quality. Academic credentials typically take longer than GitHub profiles." },
    ],
  },
  {
    category: "Privacy & Data",
    items: [
      { q: "Who can see my profile?", a: "By default, your profile is public (name, handle, NI Score, rank, verified pillars). You can make your profile private or hide specific pillars in Settings → Privacy." },
      { q: "Can I delete my account?", a: "Yes. Settings → Danger Zone → Delete Account. All your data is removed within 30 days. This is irreversible." },
      { q: "Do you sell data?", a: "Never. We don't sell user data to third parties. The API is available to authorized developers only, and it exposes only public profile data that users have chosen to make visible." },
    ],
  },
  {
    category: "Organizations",
    items: [
      { q: "Can universities claim a page on MERYT?", a: "Yes. Organization pages at /org/[slug] show verified statistics for a university or company. To claim a page, click 'Claim Page' and submit institutional verification. Available on Pro and Elite plans." },
      { q: "How is an organization's average NI Score calculated?", a: "It's the mean NI Score of all verified profiles that have linked themselves to that organization. Unverified profiles are excluded from the calculation." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["About", "/about"], ["Contact", "/contact"], ["← Home", "/"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 740, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>FAQ</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 14, lineHeight: 1.05 }}>
          Frequently Asked<br />Questions
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 52, lineHeight: 1.65 }}>
          Everything about MERYT, the NI Score, and how verification works.
        </p>

        {FAQS.map((section, si) => (
          <div key={section.category} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span>{section.category}</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {section.items.map((item, ii) => (
                <details key={ii} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
                  <summary style={{ padding: "16px 20px", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.q}
                    <span style={{ fontSize: 18, color: "var(--muted)", flexShrink: 0, marginLeft: 14 }}>+</span>
                  </summary>
                  <div style={{ padding: "4px 20px 18px", fontSize: 14, color: "var(--muted)", lineHeight: 1.7, borderTop: "1px solid var(--border)" }}>
                    <div style={{ paddingTop: 14 }}>{item.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "28px 26px", textAlign: "center", marginTop: 52 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Still have questions?</div>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>Our team replies within 24 hours.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Link href="/contact" style={{ padding: "10px 20px", background: "var(--text)", color: "white", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Contact Us</Link>
            <Link href="/about" style={{ padding: "10px 20px", background: "var(--bg)", color: "var(--muted)", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--border)" }}>About MERYT</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
