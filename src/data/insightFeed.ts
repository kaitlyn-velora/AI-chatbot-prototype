import type { InsightData } from '../components/ai/InsightCard';

const TYPE_PRIORITY_FALLBACK: Record<InsightData['type'], number> = {
  warning: 0,
  info: 1,
  success: 2,
};

/** Sort within a tier: explicit priority, then type severity. */
export function sortInsightsInTier(insights: InsightData[]): InsightData[] {
  return [...insights].sort((a, b) => {
    const pa = a.priority ?? TYPE_PRIORITY_FALLBACK[a.type] * 10;
    const pb = b.priority ?? TYPE_PRIORITY_FALLBACK[b.type] * 10;
    return pa - pb;
  });
}

/**
 * Tier 2+ insights stay in data (e.g. `dashboardPriorityFeed`) for PRD reference; UI only shows Tier 1 until approved.
 */
export const SHOW_INSIGHT_TIER_2 = false;

/**
 * Tier 1 — ship first: highest accuracy, lowest risk, immediately actionable.
 * Tier 2 — after chatbot trust (gated by SHOW_INSIGHT_TIER_2).
 * Tier 3 — PRD / later; see INSIGHT_TIER_3_NOT_SHIPPED.
 */
export function partitionInsightsByTier(insights: InsightData[]): {
  tier1: InsightData[];
  tier2: InsightData[];
} {
  const tier1 = insights.filter((i) => (i.insightTier ?? 1) === 1);
  const tier2Raw = insights.filter((i) => i.insightTier === 2);
  return {
    tier1: sortInsightsInTier(tier1),
    tier2: SHOW_INSIGHT_TIER_2 ? sortInsightsInTier(tier2Raw) : [],
  };
}

/** PRD / later — not shipped as read-only chatbot insights. */
export const INSIGHT_TIER_3_NOT_SHIPPED = [
  'Cash runway projections',
  'Donor lapse predictions',
  'Budget forecasting (predictive)',
] as const;
