export type PageId =
  | 'dashboard'
  | 'register'
  | 'bills-list'
  | 'new-bill'
  | 'bill-detail'
  | 'bills-to-pay'
  | 'my-approvals'
  | 'reporting'
  | 'report-run'
  | 'fund-accounting'
  | 'contacts'
  | 'donations'
  | 'marketing'
  | 'components';

export const FUND_ACCOUNTING_PAGES: PageId[] = [
  'fund-accounting',
  'register',
  'bills-list',
  'new-bill',
  'bill-detail',
  'bills-to-pay',
  'my-approvals',
];
