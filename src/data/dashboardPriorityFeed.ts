import type { InsightData } from '../components/ai/InsightCard';

/**
 * Dashboard + AI assistant “For you” feed.
 *
 * Tier 1: shown when `SHOW_INSIGHT_TIER_2` is false (default) — past-due AP, reconciliation, budget threshold.
 * Tier 2: kept for PRD; enable in UI via `SHOW_INSIGHT_TIER_2` in insightFeed.ts when approved.
 */
export const dashboardPriorityFeed: InsightData[] = [
  // —— Tier 1 ——
  {
    insightTier: 1,
    priority: 1,
    type: 'warning',
    title: '2 bills past due ($2,185)',
    navigateTo: 'bills-list',
  },
  {
    insightTier: 1,
    priority: 2,
    type: 'warning',
    title: 'Checking (1000) is not fully reconciled for March — 3 uncleared lines',
    navigateTo: 'register',
  },
  {
    insightTier: 1,
    priority: 3,
    type: 'info',
    title: 'Youth Programs fund crossed 80% of annual budget',
    figureLine: '$32,800 of $40,000 used (82%) · 3 months left in budget period',
    openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' },
  },
  // —— Tier 2 (interpretive — confirm in Aplos) ——
  {
    insightTier: 2,
    priority: 1,
    type: 'info',
    title: 'Office Depot payment looks large vs typical ($1,200 vs ~$670 recent average)',
    figureLine: '5100 Office Supplies · March',
    navigateTo: 'register',
  },
  {
    insightTier: 2,
    priority: 2,
    type: 'warning',
    title: '3 recurring gifts had a processor soft-decline (retries scheduled)',
    navigateTo: 'donations',
  },
  {
    insightTier: 2,
    priority: 3,
    type: 'info',
    title: '3 restricted funds had zero activity in March',
    openReports: { search: 'fund balance', tab: 'accounting', runReportId: 'fund-balance-summary' },
  },
];
