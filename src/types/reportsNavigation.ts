export type ReportsCategoryTab = 'all' | 'accounting' | 'donation';

/** Applied when opening Reports from AI (or elsewhere) with context. */
export interface ReportsListFilter {
  search: string;
  tab?: ReportsCategoryTab;
  /** When set, opens the full-page report runner instead of the catalog only. */
  runReportId?: string;
}
