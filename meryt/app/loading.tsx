import { SkeletonRow, SkeletonCard } from "@/src/components/ui/SkeletonRow";

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", maxWidth: 1060, margin: "0 auto", padding: "40px 20px" }}>
      {/* Hero skeleton */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="skeleton" style={{ height: 22, width: 220, borderRadius: 100, margin: "0 auto 20px" }} />
        <div className="skeleton" style={{ height: 72, width: "60%", borderRadius: 12, margin: "0 auto 16px" }} />
        <div className="skeleton" style={{ height: 72, width: "80%", borderRadius: 12, margin: "0 auto 20px" }} />
        <div className="skeleton" style={{ height: 18, width: 420, borderRadius: 8, margin: "0 auto 28px" }} />
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <div className="skeleton" style={{ height: 48, width: 140, borderRadius: 13 }} />
          <div className="skeleton" style={{ height: 48, width: 140, borderRadius: 13 }} />
        </div>
      </div>

      {/* Stats skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 52 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 90, borderRadius: 16 }} />
        ))}
      </div>

      {/* Rows skeleton */}
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
