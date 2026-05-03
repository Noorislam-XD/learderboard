import Link from "next/link";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/leaderboard",
    desc: "Returns paginated leaderboard rankings",
    params: [
      { name: "limit", type: "number", default: "10", desc: "Number of results to return" },
      { name: "offset", type: "number", default: "0", desc: "Pagination offset" },
      { name: "category", type: "string", default: "all", desc: "Filter by category: tech, research, creative, gaming, social" },
      { name: "q", type: "string", default: "", desc: "Search query (name, handle, university)" },
    ],
    example: `GET /api/leaderboard?limit=5&category=tech

{
  "data": [
    {
      "id": "1",
      "name": "Aryan Kapoor",
      "handle": "@aryan.k",
      "niScore": 9847,
      "rank": 1,
      "scoreChange": 142
    }
  ],
  "meta": {
    "total": 20,
    "limit": 5,
    "offset": 0,
    "hasMore": true
  }
}`,
  },
  {
    method: "GET",
    path: "/api/profile/:id",
    desc: "Returns a single contestant's full profile",
    params: [
      { name: "id", type: "string", default: "—", desc: "Contestant ID (path param)" },
    ],
    example: `GET /api/profile/1

{
  "data": {
    "id": "1",
    "name": "Aryan Kapoor",
    "niScore": 9847,
    "rank": 1,
    "pillars": [...],
    "achievements": [...],
    "socials": [...]
  }
}`,
  },
  {
    method: "GET",
    path: "/api/scores",
    desc: "Returns NI Score breakdown for all contestants",
    params: [],
    example: `GET /api/scores

{
  "data": [
    {
      "id": "1",
      "niScore": 9847,
      "rank": 1,
      "pillars": [
        { "id": "academic", "score": 94, "weight": "25%" },
        { "id": "research", "score": 91, "weight": "25%" },
        ...
      ]
    }
  ],
  "meta": {
    "lastUpdated": "2025-01-01T00:00:00Z",
    "updateFrequency": "real-time"
  }
}`,
  },
  {
    method: "POST",
    path: "/api/verify",
    desc: "Submit a verification request for a pillar",
    params: [
      { name: "pillar", type: "string", default: "—", desc: "Pillar ID: academic, research, code, creator, social" },
      { name: "userId", type: "string", default: "—", desc: "Your user ID" },
      { name: "evidence", type: "object", default: "null", desc: "Evidence object (URLs, file metadata)" },
    ],
    example: `POST /api/verify
Content-Type: application/json

{
  "pillar": "research",
  "userId": "usr_abc123",
  "evidence": {
    "type": "google_scholar",
    "url": "https://scholar.google.com/..."
  }
}

// Response
{
  "success": true,
  "verificationId": "vfy_1704067200000",
  "status": "pending",
  "estimatedReview": "48h"
}`,
  },
];

const METHOD_STYLES: Record<string, { bg: string; color: string }> = {
  GET: { bg: "#EFF6FF", color: "#1D4ED8" },
  POST: { bg: "#F0FDF4", color: "#15803D" },
  PUT: { bg: "#FFF7ED", color: "#C2410C" },
  DELETE: { bg: "#FEF2F2", color: "#DC2626" },
};

export default function ApiDocsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <nav style={{ display: "flex", gap: 16 }}>
          {[["Leaderboard", "/"], ["About", "/about"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
      </header>

      <div style={{ display: "flex", maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
        {/* Sidebar */}
        <aside style={{ width: 200, paddingTop: 40, paddingRight: 32, flexShrink: 0, position: "sticky", top: 52, alignSelf: "flex-start", maxHeight: "calc(100vh - 52px)", overflowY: "auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 12, textTransform: "uppercase" }}>API Reference</div>
          {ENDPOINTS.map(ep => (
            <a key={ep.path} href={`#${ep.path}`} style={{ display: "block", padding: "7px 0", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
              <span style={{ ...METHOD_STYLES[ep.method], padding: "1px 5px", borderRadius: 3, fontSize: 9, marginRight: 6 }}>{ep.method}</span>
              {ep.path.replace("/api", "")}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "40px 0 80px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "7px 16px", borderRadius: 100 }}>
            ⚡ REST API
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 12, lineHeight: 1.04 }}>
            MERYT API
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 40, lineHeight: 1.65, maxWidth: 540 }}>
            Access leaderboard data, profiles, and NI Score breakdowns programmatically. The MERYT REST API is available to Pro and Elite subscribers.
          </p>

          {/* Auth block */}
          <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px", marginBottom: 36 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Authentication</div>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 14 }}>
              Include your API key in the <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, background: "var(--bg)", padding: "2px 6px", borderRadius: 4 }}>Authorization</code> header on every request.
            </p>
            <pre style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text)", overflowX: "auto", lineHeight: 1.6 }}>
              {`Authorization: Bearer meryt_sk_live_xxxxxxxxxxxx
Base URL: https://meryt.app`}
            </pre>
          </div>

          {/* Endpoints */}
          {ENDPOINTS.map(ep => {
            const ms = METHOD_STYLES[ep.method] || { bg: "var(--bg)", color: "var(--muted)" };
            return (
              <div key={ep.path} id={ep.path} style={{ marginBottom: 40, scrollMarginTop: 70 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: ms.bg, color: ms.color }}>{ep.method}</span>
                  <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "var(--text)", background: "var(--surface)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 8 }}>{ep.path}</code>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>{ep.desc}</p>

                {ep.params.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>Parameters</div>
                    <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                      {ep.params.map((p, i) => (
                        <div key={p.name} style={{ display: "grid", gridTemplateColumns: "120px 70px 80px 1fr", gap: 12, padding: "10px 16px", borderBottom: i < ep.params.length - 1 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
                          <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#1A56FF" }}>{p.name}</code>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.type}</span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.default}</span>
                          <span style={{ fontSize: 12, color: "var(--muted)" }}>{p.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>Example</div>
                  <pre style={{ background: "#0F0E0B", border: "1px solid #2E2C27", borderRadius: 12, padding: "18px 20px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#F0EDE6", overflowX: "auto", lineHeight: 1.65 }}>
                    {ep.example}
                  </pre>
                </div>
              </div>
            );
          })}

          {/* Rate limits */}
          <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "22px 24px", marginTop: 20 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Rate Limits</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { tier: "Free (Explorer)", limit: "None — no API access" },
                { tier: "Pro", limit: "500 requests / hour" },
                { tier: "Elite", limit: "5,000 requests / hour + webhook support" },
              ].map(r => (
                <div key={r.tier} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{r.tier}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)" }}>{r.limit}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
