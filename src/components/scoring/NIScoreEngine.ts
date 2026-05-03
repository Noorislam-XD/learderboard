import { Contestant, ScorePillar } from "@/src/types";

export const PILLAR_WEIGHTS = {
  academic: 0.25,
  research: 0.25,
  code: 0.20,
  creator: 0.15,
  social: 0.15,
};

export function calculateNIScore(pillars: ScorePillar[]): number {
  const weightMap = PILLAR_WEIGHTS as Record<string, number>;
  let weighted = 0;
  let totalWeight = 0;

  for (const pillar of pillars) {
    const weight = weightMap[pillar.id] ?? 0.1;
    weighted += pillar.score * weight;
    totalWeight += weight;
  }

  const base = totalWeight > 0 ? weighted / totalWeight : 0;
  return Math.round(base * 100);
}

export function getScoreGrade(score: number): { grade: string; label: string; color: string } {
  if (score >= 95) return { grade: "S+", label: "Legendary", color: "#F5A200" };
  if (score >= 90) return { grade: "S", label: "Elite", color: "#FF4500" };
  if (score >= 80) return { grade: "A+", label: "Expert", color: "#1A56FF" };
  if (score >= 70) return { grade: "A", label: "Advanced", color: "#00BE6A" };
  if (score >= 60) return { grade: "B+", label: "Proficient", color: "#9333EA" };
  if (score >= 50) return { grade: "B", label: "Intermediate", color: "#6B7280" };
  return { grade: "C", label: "Developing", color: "#9CA3AF" };
}

export function getRankTier(rank: number): { tier: string; color: string; icon: string } {
  if (rank <= 10) return { tier: "Legend", color: "#F5A200", icon: "👑" };
  if (rank <= 100) return { tier: "Diamond", color: "#60A5FA", icon: "💎" };
  if (rank <= 500) return { tier: "Platinum", color: "#A78BFA", icon: "⚡" };
  if (rank <= 1000) return { tier: "Gold", color: "#F5A200", icon: "🥇" };
  if (rank <= 5000) return { tier: "Silver", color: "#A2AFBE", icon: "🥈" };
  if (rank <= 10000) return { tier: "Bronze", color: "#C4793A", icon: "🥉" };
  return { tier: "Unranked", color: "#6B7280", icon: "○" };
}

export function getScoreBreakdown(contestant: Contestant) {
  return contestant.pillars.map(p => ({
    ...p,
    weightedScore: Math.round(p.score * (PILLAR_WEIGHTS[p.id as keyof typeof PILLAR_WEIGHTS] ?? 0.1)),
    grade: getScoreGrade(p.score),
  }));
}

export function getTopStrength(contestant: Contestant): ScorePillar {
  return [...contestant.pillars].sort((a, b) => b.score - a.score)[0];
}

export function getWeakestPillar(contestant: Contestant): ScorePillar {
  return [...contestant.pillars].sort((a, b) => a.score - b.score)[0];
}
