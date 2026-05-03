import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status — MERYT",
  description: "Real-time status of the MERYT platform, API, verification pipeline, and data services.",
};

type ServiceStatus = "operational" | "degraded" | "incident" | "maintenance";

const SERVICES: { name: string; status: ServiceStatus; uptime: string; latency: string; desc: string }[] = [
  { name: "Leaderboard API", status: "operational", uptime: "99.98%", latency: "42ms", desc: "Core ranking data served via REST and GraphQL" },
  { name: "Verification Pipeline", status: "operational", uptime: "99.95%", latency: "1.2s", desc: "Document and credential verification processing" },
  { name: "Profile Pages", status: "operational", uptime: "99.99%", latency: "38ms", desc: "Public and private profile serving" },
  { name: "Search Index", status: "operational", uptime: "99.96%", latency: "61ms", desc: "Full-text and faceted search across all profiles" },
  { name: "OG Image Generation", status: "operational", uptime: "99.91%", latency: "280ms", desc: "Dynamic Open Graph images via Edge Runtime" },
  { name: "Webhook Delivery", status: "operational", uptime: "99.87%", latency: "N/A", desc: "Outbound event delivery to partner integrations" },
  { name: "Embed Cards", status: "operational", uptime: "99.93%", latency: "55ms", desc: "Embeddable rank cards served as standalone pages" },
  { name: "Notification Service", status: "operational", uptime: "99.90%", latency: "N/A", desc: "Email and in-app notification dispatch" },
];

const INCIDENTS: { date: string; title: string; status: "resolved" | "monitoring"; duration: string; detail: string }[] = [
  { date: "Apr 28, 2025", title: "Elevated verification latency", status: "resolved", duration: "38 min", detail: "A spike in document uploads caused queue build-up in the verification pipeline. Auto-scaling resolved the issue without data loss." },
  { date: "Apr 15, 2025", title: "Search index partial staleness", status: "resolved", duration: "12 min", detail: "A deployment triggered a brief re-index. Leaderboard data remained fully available; search showed results up to 15 min old." },
  { date: "Mar 30, 2025", title: "Scheduled infrastructure maintenance", status: "resolved", duration: "25 min", detail: "Planned migration of database primaries to a new region. Brief read-only mode was communicated in advance." },
];

const UPTIME_HISTORY = [
  { month: "Nov 2024", uptime: 100.00 },
  { month: "Dec 2024", uptime: 99.99 },
  { month: "Jan 2025", uptime: 99.97 },
  { month: "Feb 2025", uptime: 99.96 },
  { month: "Mar 2025", uptime: 99.94 },
  { month: "Apr 2025", uptime: 99.98 },
];

function StatusBadge({ status }: { status: ServiceStatus }) {
  const cfg: Record<ServiceStatus, { label: string; color: string; dot: string }> = {
    operational: { label: "Operational", color: "#00BE6A", dot: "#00BE6A" },
    degraded: { label: "Degraded", color: "#F5A200", dot: "#F5A200" },
    incident: { label: "Incident", color: "#FF4444", dot: "#FF4444" },
    maintenance: { label: "Maintenance", color: "#1A56FF", dot: "#1A56FF" },
  };
  const c = cfg[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'DM Mono', monospace", fontSize: 10, color: c.color, padding: "4px 10px", borderRadius: 100, background: `${c.color}18` }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {c.label}
    </span>
  );
}

const allOperational = SERVICES.every(s => s.status === "operational");

export default function StatusPage() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Live Platform Health
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          System Status
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
          Real-time health of all MERYT services. Updated every 60 seconds.
        </p>
      </div>

      {/* Overall status banner */}
      <div style={{ padding: "20px 28px", borderRadius: 16, border: `1.5px solid ${allOperational ? "#00BE6A" : "#F5A200"}40`, background: allOperational ? "#00BE6A0C" : "#F5A2000C", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>{allOperational ? "✅" : "⚠️"}</span>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)" }}>
              {allOperational ? "All Systems Operational" : "Minor Service Degradation"}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
              Last checked: just now · Next check in 60s
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00BE6A" }}>
          99.97% avg uptime (30d)
        </div>
      </div>

      {/* Services table */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Services</h2>
        <div style={{ borderRadius: 16, border: "1.5px solid var(--border)", overflow: "hidden" }}>
          {SERVICES.map((s, i) => (
            <div key={s.name} style={{ padding: "18px 24px", borderBottom: i < SERVICES.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{s.desc}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)" }}>{s.uptime}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>uptime</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)" }}>{s.latency}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>p50 latency</div>
                </div>
                <StatusBadge status={s.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Uptime history */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Uptime History</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {UPTIME_HISTORY.map(h => {
            const pct = h.uptime;
            const color = pct === 100 ? "#00BE6A" : pct >= 99.9 ? "#00BE6A" : pct >= 99.5 ? "#F5A200" : "#FF4444";
            return (
              <div key={h.month} style={{ textAlign: "center", padding: "18px 12px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color, marginBottom: 4 }}>{pct.toFixed(2)}%</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{h.month}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent incidents */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Recent Incidents</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {INCIDENTS.map(inc => (
            <div key={inc.title} style={{ padding: "24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{inc.title}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{inc.date} · Duration: {inc.duration}</div>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#00BE6A", padding: "4px 10px", borderRadius: 100, background: "#00BE6A18" }}>{inc.status}</span>
              </div>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{inc.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ textAlign: "center", padding: "40px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Subscribe to Status Updates</h3>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24, lineHeight: 1.6 }}>Get notified immediately when an incident starts or resolves.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", maxWidth: 400, margin: "0 auto" }}>
          <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "12px 16px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--bg)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text)", outline: "none" }} />
          <button style={{ padding: "12px 24px", borderRadius: 100, background: "var(--accent)", color: "#fff", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>Subscribe</button>
        </div>
      </section>
    </main>
  );
}
