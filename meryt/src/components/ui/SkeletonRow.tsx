export function SkeletonRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 110px 130px 130px 90px", gap: 12, padding: "14px 16px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, marginBottom: 8, alignItems: "center" }}>
      {/* Rank */}
      <div className="skeleton" style={{ height: 18, width: 32, borderRadius: 6 }} />
      {/* Avatar + name */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0 }} />
        <div>
          <div className="skeleton" style={{ height: 14, width: 120, borderRadius: 5, marginBottom: 6 }} />
          <div className="skeleton" style={{ height: 10, width: 80, borderRadius: 4 }} />
        </div>
      </div>
      {/* Score */}
      <div className="skeleton" style={{ height: 20, width: 70, borderRadius: 6 }} />
      {/* Skills */}
      <div style={{ display: "flex", gap: 4 }}>
        <div className="skeleton" style={{ height: 10, width: 40, borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 10, width: 40, borderRadius: 4 }} />
      </div>
      {/* Tags */}
      <div style={{ display: "flex", gap: 4 }}>
        <div className="skeleton" style={{ height: 20, width: 48, borderRadius: 100 }} />
        <div className="skeleton" style={{ height: 20, width: 48, borderRadius: 100 }} />
      </div>
      {/* Delta */}
      <div className="skeleton" style={{ height: 14, width: 36, borderRadius: 5 }} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "24px", overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 40, width: 40, borderRadius: 12, marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 28, width: "60%", borderRadius: 7, marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 14, width: "85%", borderRadius: 5, marginBottom: 7 }} />
      <div className="skeleton" style={{ height: 14, width: "70%", borderRadius: 5 }} />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      {/* Hero */}
      <div className="skeleton" style={{ height: 220, borderRadius: 20, marginBottom: 24 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        <div>
          <div className="skeleton" style={{ height: 120, borderRadius: 16, marginBottom: 14 }} />
          <div className="skeleton" style={{ height: 80, borderRadius: 16 }} />
        </div>
        <div>
          <div className="skeleton" style={{ height: 220, borderRadius: 16 }} />
        </div>
      </div>
    </div>
  );
}
