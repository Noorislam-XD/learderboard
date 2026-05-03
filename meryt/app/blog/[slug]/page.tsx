import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const POSTS: Record<string, {
  title: string; excerpt: string; author: string; authorRole: string; avatar: string;
  date: string; readTime: string; tag: string; tagColor: string; body: string[];
}> = {
  "ni-score-explained": {
    title: "The NI Score: How We Quantify Merit Without Gamification",
    excerpt: "A deep dive into the weighted 5-pillar system, why we chose these metrics, and how we prevent gaming.",
    author: "Noor Islam", authorRole: "Founder", avatar: "👨‍💻",
    date: "May 1, 2025", readTime: "8 min", tag: "Engineering", tagColor: "#1A56FF",
    body: [
      "When we set out to build MERYT, the core challenge was deceptively simple: how do you measure talent without rewarding people for being good at measuring talent?",
      "Every ranking system eventually faces Goodhart's Law — once a measure becomes a target, it ceases to be a good measure. We've seen this play out in citation counts (researchers gaming h-index), GitHub contributions (green squares heatmaps filled with empty commits), follower counts (bought audiences), and GPA (credential inflation across institutions).",
      "The NI Score is built around five pillars: Academic (25%), Research (25%), Code (20%), Creator (15%), and Social Impact (15%). Each pillar is scored from 0–100, then weighted and normalized to produce a final score on the 0–10,000 scale.",
      "The Academic pillar scores institutional credentials, GPA, coursework rigor, and academic awards — but normalized by institution difficulty. A 3.9 from a top-20 university and a 4.0 from an unranked institution are not treated identically. We apply institutional weighting factors that are updated annually based on published university rankings and employer outcome data.",
      "The Research pillar goes beyond raw citation counts. We weight by journal impact factor, recency, author position (first author vs. contributing author), and replication success where data is available. We apply a decay function to citations — a 10-year-old highly-cited paper contributes less than a recent breakthrough, reflecting forward contribution to the field.",
      "The Code pillar avoids the green-squares trap. We don't count raw commits. Instead we score: repository stars, project longevity (is the project still maintained?), contribution significance (are you the maintainer or a typo-fixer?), code quality signals (test coverage, documentation), and real-world usage (npm downloads, PyPI installs, GitHub dependents).",
      "The Creator pillar scores original technical content — not follower counts. A 20-post highly-engaged technical blog with no followers scores higher than a 100k-follower account that reposts infographics. We measure: original posts per quarter, average engagement rate on technical content, and course/tutorial completion rates.",
      "The Social Impact pillar is the hardest to fake and the hardest to measure. We look at: conference talks, open-source mentorship programs, community leadership, and verifiable volunteering with technical organizations. These require the most manual review and carry the highest trust weight.",
      "Anti-gaming measures are baked in at every layer. Our verification pipeline requires primary source evidence — not self-reported claims. We cross-reference paper authorship against ORCID and CrossRef. We verify GitHub activity against repository history. We check conference speaker lists against official programs. Suspicious patterns (sudden score jumps, circular citation rings, fake repositories with inflated stars) are flagged automatically and queued for human review.",
      "The result isn't a perfect measurement of talent — nothing is. But it's a resilient, manipulation-resistant approximation of professional output that grows harder to game as you try to game it.",
    ],
  },
  "not-social-credit": {
    title: "Why MERYT Is Not Social Credit Scoring (And Never Will Be)",
    excerpt: "The philosophical and technical boundaries we have built into MERYT to ensure we're measuring merit — not compliance.",
    author: "Priya Sharma", authorRole: "Head of Verification", avatar: "👩‍🔬",
    date: "Apr 22, 2025", readTime: "6 min", tag: "Policy", tagColor: "#00BE6A",
    body: [
      "We get this question constantly. It's a fair concern. We want to address it directly and specifically — not with platitudes, but with the actual technical and policy decisions we've made.",
      "Social credit systems score behavior relative to social norms. They reward compliance with government or institutional preferences and punish deviations. They are inherently political — the score goes up when you behave the way those in power want you to behave, and down when you don't.",
      "MERYT scores outputs, not behaviors. The distinction is not just semantic — it's fundamental. We don't have access to your financial transactions, travel history, social connections, speech content, or relationships. We don't score what you say, who you associate with, or whether you comply with any authority's preferences.",
      "Specifically: your NI Score cannot go down because of anything you say publicly, any political opinion you hold, any country you live in or travel to, any religion you practice, any lifestyle choice you make, or any association you have. These things are invisible to our system by design.",
      "What we score: papers you submitted to peer review (the scientific community's own measure of quality), code you shipped (objectively measurable output), credentials institutions awarded you (their own verification, not ours), content you published (reader engagement, not content moderation).",
      "The NI Score also cannot be weaponized externally. We have explicitly designed against it. Your score cannot restrict your access to financial products, housing, government services, travel, or employment. We don't offer an API for those use cases, and we would refuse to partner with any entity attempting to build them.",
      "Finally: participation is voluntary. You create an account. You submit evidence. You choose what's public and what's private. You can delete your account and all your data permanently at any time. This is the opposite of a social credit system, which is applied to citizens without consent.",
    ],
  },
  "verification-accuracy": {
    title: "How We Achieve 99.1% Verification Accuracy",
    excerpt: "Our hybrid AI + human review pipeline, the edge cases that fool automated systems, and how we handle appeals.",
    author: "Priya Sharma", authorRole: "Head of Verification", avatar: "👩‍🔬",
    date: "Apr 10, 2025", readTime: "10 min", tag: "Trust & Safety", tagColor: "#F5A200",
    body: [
      "Verification is the hardest part of what we do. Getting it wrong in either direction is costly: too permissive, and the rankings become meaningless; too strict, and legitimate achievers can't get their work recognized.",
      "Our pipeline has four stages: automated extraction, AI pre-screening, human spot-check, and cross-reference verification. Every submission goes through all four.",
      "Automated extraction parses submitted URLs and documents to extract raw data points — publication DOIs, GitHub username, university name, degree type. This stage handles about 60% of submissions fully automatically with high confidence.",
      "AI pre-screening runs a classification model trained on 40,000 verified and rejected submissions. It scores each data point for authenticity likelihood and flags anomalies. Submissions scoring above 0.94 confidence go directly to cross-reference. Submissions below 0.7 go to human review. Everything in between gets spot-checked.",
      "Human review is where the edge cases get handled. Our reviewers check about 30% of all submissions. Common edge cases: institutional email addresses that can be created by anyone, preprint papers (not peer-reviewed), GitHub repositories with artificially inflated stars, personal websites claiming degrees without verifiable sources.",
      "Cross-reference verification is our final layer. We check paper authorship against ORCID, CrossRef, and Semantic Scholar. We verify GitHub identity via API. We check conference speaker lists against official program archives. We use institutional lookup services for degree verification.",
      "Our 99.1% accuracy figure comes from a quarterly audit where we re-verify a random sample of accepted submissions using additional sources. The 0.9% error rate is almost entirely from edge cases involving institutions in countries with poor digital record-keeping, not from fraud attempts.",
      "Appeals work as follows: rejected submissions receive a detailed explanation of what was missing or what failed verification. Users can resubmit with corrected or additional evidence. About 12% of appealed submissions are ultimately approved — meaning our rejection was wrong and the user's credentials were legitimate.",
    ],
  },
  "global-talent-map": {
    title: "Mapping Global Talent: What 28,400 Profiles Reveal",
    excerpt: "Data analysis across 142 countries — which regions produce the most research output, best coders, and highest NI Scores.",
    author: "Noor Islam", authorRole: "Founder", avatar: "👨‍💻",
    date: "Mar 28, 2025", readTime: "12 min", tag: "Data", tagColor: "#FF4500",
    body: [
      "With 28,400 verified profiles across 142 countries, we now have enough data to draw some interesting — and occasionally surprising — conclusions about where high-achievement talent is concentrated globally.",
      "The overall NI Score distribution follows a power law: the top 1% (284 profiles) account for approximately 18% of total verified credentials on the platform. The median NI Score is 4,210. The average is 5,034 — pulled up significantly by the long tail of high achievers.",
      "Research output (the 25% Research pillar) is geographically concentrated in ways that mirror academic publishing patterns but with some important differences. India, China, South Korea, and Germany are the top four by total research output. The US ranks fifth — surprising given US dominance in absolute publication counts — but this is explained by normalization: we score research quality per-person, not total institutional output.",
      "Code output (the 20% Code pillar) has the most geographically diverse top performers. Eastern Europe — particularly Poland, Romania, and Ukraine — consistently punches above its weight in competitive programming and open-source contribution. Brazil and Nigeria have the fastest-growing cohorts of new developers by NI Score gain per year.",
      "The Creator pillar shows the most English-language bias in our current dataset. We're actively working on multilingual content scoring — currently, non-English technical content is underweighted because our quality metrics rely heavily on engagement data that skews toward English-speaking audiences.",
      "The most striking finding: country of university affiliation is not a strong predictor of high NI Scores once you control for pillar-specific variance. A student at a state university who has published two papers and maintains a popular open-source project will consistently outrank a student at a top-20 university who has only their GPA and a few internships.",
      "This is the core thesis of MERYT: talent is global, distributed, and not well-captured by institutional prestige alone. Our data increasingly confirms it.",
    ],
  },
  "api-v1-launch": {
    title: "API v1 Is Live: Build on Top of MERYT Rankings",
    excerpt: "What you can build with the MERYT API, rate limits, authentication, and example use cases from our first integrators.",
    author: "Marcus Chen", authorRole: "Design Lead", avatar: "🧑‍🎨",
    date: "Mar 14, 2025", readTime: "5 min", tag: "Product", tagColor: "#1A56FF",
    body: [
      "The MERYT API v1 is now available for Pro and Elite subscribers. Here's everything you need to know to start building.",
      "The API exposes four core endpoints: GET /api/v1/leaderboard (paginated global rankings), GET /api/v1/profile/:id (full profile with pillar breakdown), GET /api/v1/scores (aggregate score distributions), and POST /api/v1/verify (initiate a verification request programmatically).",
      "Rate limits: Pro plan gets 1,000 requests/day. Elite gets 10,000 requests/day with burst allowances. Rate limit headers are included in every response so your application can adapt accordingly.",
      "Authentication uses API keys scoped to your account. Generate and rotate keys from Settings → API Keys. Keys can be scoped to read-only or read-write access. Never expose API keys in client-side code.",
      "Use cases from our first integrators: a university career center built a dashboard that surfaces their top MERYT-ranked alumni to recruiters. A competitive programming platform added MERYT NI Score as a profile badge. A job board shows NI Score as a verified signal alongside resumes. An academic department uses the org API to track their cohort's collective research output over time.",
      "Planned for API v2 (Q4 2025): webhooks for score changes, batch profile lookups, and a search endpoint with full filter support. If you're building something interesting on the API, we'd love to feature it — reach out at dev@meryt.app.",
    ],
  },
  "rank-card-embeds": {
    title: "Your Rank, Everywhere: Introducing Embeddable Rank Cards",
    excerpt: "How to embed your verified NI Score on your portfolio, GitHub README, or university website.",
    author: "Marcus Chen", authorRole: "Design Lead", avatar: "🧑‍🎨",
    date: "Feb 28, 2025", readTime: "4 min", tag: "Feature", tagColor: "#00BE6A",
    body: [
      "Rank cards let you show your verified NI Score and global rank anywhere on the web — your personal portfolio, GitHub README, university lab page, or conference bio.",
      "To get your rank card: go to your profile → click Share → choose Embed. You'll get a URL you can use in an iframe, and an HTML snippet you can paste directly.",
      "The embed is responsive. On screens under 400px, it shows a compact version with just your name, score, and rank badge. On larger screens, it shows your full rank card with pillar indicators and weekly change.",
      "The card updates in real time — when your NI Score changes, the embed automatically reflects the new score within 24 hours. There's no manual update needed.",
      "For GitHub READMEs, we provide a static badge URL in addition to the iframe embed, since GitHub doesn't render iframes. The badge updates daily and shows your current NI Score and rank percentile.",
      "One important note: rank cards only show data you've chosen to make public. If you've hidden specific pillars or set your profile to private, those won't appear in the embed. Your privacy settings control everything.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const otherPosts = Object.entries(POSTS).filter(([s]) => s !== slug).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <Link href="/blog" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Blog</Link>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 10px", borderRadius: 5, background: `${post.tagColor}18`, color: post.tagColor, letterSpacing: "0.06em" }}>{post.tag}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center" }}>{post.date} · {post.readTime} read</span>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text)", marginBottom: 22, lineHeight: 1.1 }}>
          {post.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 32, borderBottom: "1.5px solid var(--border)", marginBottom: 40 }}>
          <span style={{ fontSize: 28 }}>{post.avatar}</span>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{post.author}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{post.authorRole} at MERYT</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {post.body.map((para, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: i === 0 ? "var(--text)" : "var(--muted)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {para}
            </p>
          ))}
        </div>

        {/* More posts */}
        <div style={{ marginTop: 64, paddingTop: 36, borderTop: "1.5px solid var(--border)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 20 }}>More from the blog</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {otherPosts.map(([s, p]) => (
              <Link key={s} href={`/blog/${s}`} style={{ display: "block", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "16px 18px", textDecoration: "none" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "2px 8px", borderRadius: 4, background: `${p.tagColor}14`, color: p.tagColor, display: "inline-block", marginBottom: 8, letterSpacing: "0.05em" }}>{p.tag}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.author} · {p.readTime} read</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
