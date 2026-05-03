import { SkeletonRow } from "@/src/components/ui/SkeletonRow";

export default function LeaderboardLoading() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 20px" }}>
      {/* Filter row skeleton */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 36, width: i === 0 ? 80 : i === 1 ? 90 : 70, borderRadius: 100 }} />
        ))}
        <div className="skeleton" style={{ height: 36, flex: 1, minWidth: 180, borderRadius: 100, marginLeft: "auto" }} />
      </div>

      {/* Podium skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
        {[1, 0, 2].map(i => (
          <div key={i} className="skeleton" style={{ height: i === 0 ? 220 : 190, borderRadius: 20 }} />
        ))}
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
