/** Keys for full-page report runners opened from the catalog or AI. */
export type ReportRunId =
  | 'comparative-income-statement'
  | 'income-statement'
  | 'fund-balance-summary'
  | 'balance-sheet'
  | 'accounts-payable-aging'
  | 'budget-vs-actual'
  | 'vendor-payment-history'
  | 'contribution-statement'
  | 'bill-approval-queue';

const TITLES: Record<ReportRunId, string> = {
  'comparative-income-statement': 'Comparative Income Statement',
  'income-statement': 'Income Statement',
  'fund-balance-summary': 'Fund Balance Summary',
  'balance-sheet': 'Balance Sheet',
  'accounts-payable-aging': 'Accounts Payable Aging',
  'budget-vs-actual': 'Budget vs Actual',
  'vendor-payment-history': 'Vendor Payment History',
  'contribution-statement': 'Contribution Statement by Donor',
  'bill-approval-queue': 'Bill Approval Queue Summary',
};

export function reportRunTitle(id: string): string {
  return TITLES[id as ReportRunId] ?? 'Report';
}

/** Map saved/catalog report names to runner ids (first match wins). */
export function reportNameToRunId(name: string): ReportRunId | null {
  const n = name.toLowerCase();
  if (n.includes('comparative income')) return 'comparative-income-statement';
  if (n.includes('income statement')) return 'income-statement';
  if (n.includes('fund balance')) return 'fund-balance-summary';
  if (n.includes('balance sheet')) return 'balance-sheet';
  if (n.includes('payable aging')) return 'accounts-payable-aging';
  if (n.includes('budget') && n.includes('actual')) return 'budget-vs-actual';
  if (n.includes('vendor payment')) return 'vendor-payment-history';
  if (n.includes('contribution')) return 'contribution-statement';
  if (n.includes('approval queue')) return 'bill-approval-queue';
  return null;
}

export function isComparativeIncomeReport(id: string): boolean {
  return id === 'comparative-income-statement' || id === 'income-statement';
}
