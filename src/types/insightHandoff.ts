import type { PageId } from '../pageIds';
import type { ReportsListFilter } from './reportsNavigation';

/** When an insight opens another screen, pass this so the assistant can thread the same conversation. */
export interface InsightHandoffContext {
  title: string;
  figureLine?: string;
}

export type AppNavigateFn = (page: PageId, handoff?: InsightHandoffContext) => void;

export type AppOpenReportsFn = (filter: ReportsListFilter, handoff?: InsightHandoffContext) => void;
