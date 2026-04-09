export interface Vendor {
  id: string;
  name: string;
  type: 'vendor' | 'individual' | 'company';
  email: string;
  outstanding: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  status: 'active' | 'inactive';
}

export interface Account {
  id: string;
  number: string;
  name: string;
  type: 'asset' | 'liability' | 'income' | 'expense' | 'equity';
  balance: number;
  parentId?: string;
}

export interface Fund {
  id: string;
  name: string;
  type: 'unrestricted' | 'temporarily-restricted' | 'permanently-restricted';
  balance: number;
  budgetTotal: number;
  ytdIncome: number;
  ytdExpense: number;
}

export interface BillAllocation {
  accountId: string;
  accountName: string;
  fundId: string;
  fundName: string;
  amount: number;
  memo: string;
}

export interface ApprovalStep {
  approver: string;
  action: 'approved' | 'rejected' | 'pending';
  date: string;
  note?: string;
}

export interface Bill {
  id: string;
  vendorId: string;
  vendorName: string;
  invoiceNumber: string;
  billDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'pending-approval' | 'approved' | 'paid' | 'overdue' | 'void';
  fundName: string;
  allocations: BillAllocation[];
  approvalHistory: ApprovalStep[];
  paidDate?: string;
  paidAmount?: number;
}

export interface Transaction {
  id: string;
  date: string;
  checkNumber?: string;
  contact: string;
  accountId: string;
  accountName: string;
  fundName: string;
  amount: number;
  balance: number;
  type: 'deposit' | 'payment' | 'transfer' | 'journal';
  reconciled: boolean;
  memo?: string;
  source?: 'ap' | 'cr' | 'manual';
}

export interface Report {
  id: string;
  name: string;
  category: 'financial' | 'fund' | 'budget' | 'donor' | 'custom';
  lastRun: string;
  description: string;
  favorite: boolean;
}

export interface Contact {
  id: string;
  name: string;
  type: 'vendor' | 'individual' | 'company';
  email: string;
  phone: string;
  outstanding: number;
  lastActivity: string;
  totalLifetime: number;
  status: 'active' | 'inactive';
}

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Office Depot', type: 'vendor', email: 'orders@officedepot.com', outstanding: 1200, lastPaymentDate: '03/03/2026', lastPaymentAmount: 1200, status: 'active' },
  { id: 'v2', name: 'Staples', type: 'vendor', email: 'billing@staples.com', outstanding: 0, lastPaymentDate: '02/15/2026', lastPaymentAmount: 450, status: 'active' },
  { id: 'v3', name: 'City Power & Light', type: 'company', email: 'billing@citypower.com', outstanding: 385, lastPaymentDate: '02/28/2026', lastPaymentAmount: 372, status: 'active' },
  { id: 'v4', name: 'Green Landscaping', type: 'vendor', email: 'info@greenland.com', outstanding: 900, lastPaymentDate: '01/15/2026', lastPaymentAmount: 900, status: 'active' },
  { id: 'v5', name: 'ABC Cleaning Services', type: 'vendor', email: 'service@abcclean.com', outstanding: 600, lastPaymentDate: '03/01/2026', lastPaymentAmount: 600, status: 'active' },
  { id: 'v6', name: 'Tech Solutions Inc', type: 'company', email: 'support@techsol.com', outstanding: 0, lastPaymentDate: '12/10/2025', lastPaymentAmount: 2500, status: 'inactive' },
  { id: 'v7', name: 'First Baptist Supply', type: 'vendor', email: 'orders@fbsupply.com', outstanding: 1800, lastPaymentDate: '03/10/2026', lastPaymentAmount: 750, status: 'active' },
];

export const accounts: Account[] = [
  { id: 'a1', number: '1000', name: 'Checking', type: 'asset', balance: 45230.5 },
  { id: 'a2', number: '1010', name: 'Savings', type: 'asset', balance: 125000.0, parentId: 'a1' },
  { id: 'a3', number: '1010.1', name: 'Savings - Building Fund', type: 'asset', balance: 85000.0, parentId: 'a2' },
  { id: 'a4', number: '2000', name: 'Accounts Payable', type: 'liability', balance: 4885.0 },
  { id: 'a5', number: '4000', name: 'Tithes & Offerings', type: 'income', balance: 152000.0 },
  { id: 'a6', number: '4100', name: 'Program Revenue', type: 'income', balance: 28500.0 },
  { id: 'a7', number: '5000', name: 'Salaries & Wages', type: 'expense', balance: 98000.0 },
  { id: 'a8', number: '5100', name: 'Office Supplies', type: 'expense', balance: 4200.0 },
  { id: 'a9', number: '5200', name: 'Utilities', type: 'expense', balance: 6800.0 },
  { id: 'a10', number: '5300', name: 'Maintenance', type: 'expense', balance: 12500.0 },
  { id: 'a11', number: '5400', name: 'Programs', type: 'expense', balance: 22000.0 },
  { id: 'a12', number: '5500', name: 'Missions', type: 'expense', balance: 15000.0 },
];

export const funds: Fund[] = [
  { id: 'f1', name: 'General Fund', type: 'unrestricted', balance: 45230.5, budgetTotal: 350000, ytdIncome: 180500, ytdExpense: 155270 },
  { id: 'f2', name: 'Building Fund', type: 'temporarily-restricted', balance: 85000.0, budgetTotal: 120000, ytdIncome: 87600, ytdExpense: 15200 },
  { id: 'f3', name: 'Missions Fund', type: 'temporarily-restricted', balance: 32400.0, budgetTotal: 60000, ytdIncome: 42400, ytdExpense: 28000 },
  { id: 'f4', name: 'Youth Programs', type: 'temporarily-restricted', balance: 18750.0, budgetTotal: 40000, ytdIncome: 22000, ytdExpense: 15250 },
  { id: 'f5', name: 'Benevolence Fund', type: 'unrestricted', balance: 8200.0, budgetTotal: 25000, ytdIncome: 15600, ytdExpense: 12400 },
  { id: 'f6', name: 'Endowment', type: 'permanently-restricted', balance: 250000.0, budgetTotal: 0, ytdIncome: 8500, ytdExpense: 0 },
];

export const bills: Bill[] = [
  {
    id: 'b1',
    vendorId: 'v1',
    vendorName: 'Office Depot',
    invoiceNumber: 'INV-2026-0412',
    billDate: '03/15/2026',
    dueDate: '04/15/2026',
    amount: 1200.0,
    status: 'approved',
    fundName: 'General Fund',
    allocations: [
      { accountId: 'a8', accountName: '5100 - Office Supplies', fundId: 'f1', fundName: 'General Fund', amount: 800, memo: 'Printer paper and toner' },
      { accountId: 'a8', accountName: '5100 - Office Supplies', fundId: 'f4', fundName: 'Youth Programs', amount: 400, memo: 'Craft supplies' },
    ],
    approvalHistory: [{ approver: 'Sarah Johnson', action: 'approved', date: '03/17/2026', note: 'Looks good' }],
  },
  {
    id: 'b2',
    vendorId: 'v3',
    vendorName: 'City Power & Light',
    invoiceNumber: 'UTIL-MAR-2026',
    billDate: '03/01/2026',
    dueDate: '03/25/2026',
    amount: 385.0,
    status: 'overdue',
    fundName: 'General Fund',
    allocations: [{ accountId: 'a9', accountName: '5200 - Utilities', fundId: 'f1', fundName: 'General Fund', amount: 385, memo: 'March utilities' }],
    approvalHistory: [{ approver: 'Sarah Johnson', action: 'approved', date: '03/05/2026' }],
  },
  {
    id: 'b3',
    vendorId: 'v4',
    vendorName: 'Green Landscaping',
    invoiceNumber: 'GL-2026-Q1',
    billDate: '03/20/2026',
    dueDate: '04/20/2026',
    amount: 900.0,
    status: 'pending-approval',
    fundName: 'General Fund',
    allocations: [{ accountId: 'a10', accountName: '5300 - Maintenance', fundId: 'f1', fundName: 'General Fund', amount: 900, memo: 'Q1 grounds maintenance' }],
    approvalHistory: [{ approver: 'Mike Thompson', action: 'pending', date: '' }],
  },
  {
    id: 'b4',
    vendorId: 'v5',
    vendorName: 'ABC Cleaning Services',
    invoiceNumber: 'ACS-0326',
    billDate: '03/10/2026',
    dueDate: '04/10/2026',
    amount: 600.0,
    status: 'approved',
    fundName: 'General Fund',
    allocations: [{ accountId: 'a10', accountName: '5300 - Maintenance', fundId: 'f1', fundName: 'General Fund', amount: 600, memo: 'Monthly cleaning' }],
    approvalHistory: [{ approver: 'Sarah Johnson', action: 'approved', date: '03/12/2026' }],
  },
  {
    id: 'b5',
    vendorId: 'v7',
    vendorName: 'First Baptist Supply',
    invoiceNumber: 'FBS-4421',
    billDate: '03/08/2026',
    dueDate: '03/22/2026',
    amount: 1800.0,
    status: 'overdue',
    fundName: 'Youth Programs',
    allocations: [
      { accountId: 'a11', accountName: '5400 - Programs', fundId: 'f4', fundName: 'Youth Programs', amount: 1200, memo: 'VBS materials' },
      { accountId: 'a8', accountName: '5100 - Office Supplies', fundId: 'f4', fundName: 'Youth Programs', amount: 600, memo: 'Printing' },
    ],
    approvalHistory: [{ approver: 'Sarah Johnson', action: 'approved', date: '03/10/2026' }],
  },
  {
    id: 'b6',
    vendorId: 'v1',
    vendorName: 'Office Depot',
    invoiceNumber: 'INV-2026-0398',
    billDate: '02/20/2026',
    dueDate: '03/20/2026',
    amount: 450.0,
    status: 'paid',
    fundName: 'General Fund',
    allocations: [{ accountId: 'a8', accountName: '5100 - Office Supplies', fundId: 'f1', fundName: 'General Fund', amount: 450, memo: 'Ink cartridges' }],
    approvalHistory: [{ approver: 'Sarah Johnson', action: 'approved', date: '02/22/2026' }],
    paidDate: '03/03/2026',
    paidAmount: 450,
  },
  {
    id: 'b7',
    vendorId: 'v3',
    vendorName: 'City Power & Light',
    invoiceNumber: 'UTIL-APR-2026',
    billDate: '04/01/2026',
    dueDate: '04/25/2026',
    amount: 410.0,
    status: 'pending-approval',
    fundName: 'General Fund',
    allocations: [{ accountId: 'a9', accountName: '5200 - Utilities', fundId: 'f1', fundName: 'General Fund', amount: 410, memo: 'April utilities' }],
    approvalHistory: [
      { approver: 'Mike Thompson', action: 'pending', date: '' },
      { approver: 'Sarah Johnson', action: 'pending', date: '' },
    ],
  },
  {
    id: 'b8',
    vendorId: 'v5',
    vendorName: 'ABC Cleaning Services',
    invoiceNumber: 'ACS-0426',
    billDate: '04/01/2026',
    dueDate: '05/01/2026',
    amount: 600.0,
    status: 'draft',
    fundName: 'General Fund',
    allocations: [],
    approvalHistory: [],
  },
];

export const transactions: Transaction[] = [
  { id: 't1', date: '03/28/2026', contact: 'Weekly Offering', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: 4250.0, balance: 45230.5, type: 'deposit', reconciled: true, memo: 'Sunday offering 3/28' },
  { id: 't2', date: '03/25/2026', contact: 'City Power & Light', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: -372.0, balance: 40980.5, type: 'payment', reconciled: true, checkNumber: '4521', source: 'ap' },
  { id: 't3', date: '03/20/2026', contact: 'Weekly Offering', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: 3800.0, balance: 41352.5, type: 'deposit', reconciled: true, memo: 'Sunday offering 3/21' },
  { id: 't4', date: '03/15/2026', checkNumber: '4520', contact: 'Staples', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: -450.0, balance: 37552.5, type: 'payment', reconciled: true, source: 'manual' },
  { id: 't5', date: '03/12/2026', contact: 'Building Fund Donation', accountId: 'a1', accountName: '1000 - Checking', fundName: 'Building Fund', amount: 5000.0, balance: 38002.5, type: 'deposit', reconciled: true, memo: 'Smith family donation' },
  { id: 't6', date: '03/10/2026', checkNumber: '4519', contact: 'First Baptist Supply', accountId: 'a1', accountName: '1000 - Checking', fundName: 'Youth Programs', amount: -750.0, balance: 33002.5, type: 'payment', reconciled: false, source: 'ap' },
  { id: 't7', date: '03/07/2026', contact: 'Weekly Offering', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: 3950.0, balance: 33752.5, type: 'deposit', reconciled: true, memo: 'Sunday offering 3/7' },
  { id: 't8', date: '03/05/2026', contact: 'Transfer to Savings', accountId: 'a1', accountName: '1000 - Checking', fundName: 'Building Fund', amount: -10000.0, balance: 29802.5, type: 'transfer', reconciled: true },
  { id: 't9', date: '03/03/2026', checkNumber: '4518', contact: 'Office Depot', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: -1200.0, balance: 39802.5, type: 'payment', reconciled: false, source: 'ap' },
  { id: 't10', date: '03/01/2026', contact: 'ABC Cleaning Services', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: -600.0, balance: 41002.5, type: 'payment', reconciled: false, checkNumber: '4517', source: 'ap' },
  { id: 't11', date: '04/04/2026', contact: 'Weekly Offering', accountId: 'a1', accountName: '1000 - Checking', fundName: 'General Fund', amount: 4100.0, balance: 49330.5, type: 'deposit', reconciled: false, memo: 'Sunday offering 4/4' },
  { id: 't12', date: '04/02/2026', contact: 'Missions Donation', accountId: 'a1', accountName: '1000 - Checking', fundName: 'Missions Fund', amount: 2400.0, balance: 45230.5, type: 'deposit', reconciled: false, memo: 'Monthly missions giving' },
];

export const reports: Report[] = [
  { id: 'r1', name: 'Income Statement', category: 'financial', lastRun: '04/01/2026', description: 'Income and expenses for a given period', favorite: true },
  { id: 'r2', name: 'Balance Sheet', category: 'financial', lastRun: '04/01/2026', description: 'Assets, liabilities, and net assets at a point in time', favorite: true },
  { id: 'r3', name: 'Budget vs Actual', category: 'budget', lastRun: '03/31/2026', description: 'Compare actual spending against budget by fund and account', favorite: true },
  { id: 'r4', name: 'Fund Balance Summary', category: 'fund', lastRun: '03/31/2026', description: 'Balances and activity across all funds', favorite: false },
  { id: 'r5', name: 'Contribution Statement', category: 'donor', lastRun: '03/15/2026', description: 'Year-to-date giving by donor', favorite: false },
  { id: 'r6', name: 'Accounts Payable Aging', category: 'financial', lastRun: '04/01/2026', description: 'Outstanding bills grouped by aging period', favorite: false },
  { id: 'r7', name: 'Cash Flow Statement', category: 'financial', lastRun: '03/31/2026', description: 'Cash inflows and outflows for a period', favorite: false },
  { id: 'r8', name: 'Vendor Payment History', category: 'custom', lastRun: '03/20/2026', description: 'All payments to a specific vendor', favorite: false },
];

export const contacts: Contact[] = [
  { id: 'c1', name: 'Office Depot', type: 'vendor', email: 'orders@officedepot.com', phone: '(555) 100-2000', outstanding: 1200, lastActivity: '03/15/2026', totalLifetime: 14500, status: 'active' },
  { id: 'c2', name: 'Staples', type: 'vendor', email: 'billing@staples.com', phone: '(555) 200-3000', outstanding: 0, lastActivity: '02/15/2026', totalLifetime: 6200, status: 'active' },
  { id: 'c3', name: 'City Power & Light', type: 'company', email: 'billing@citypower.com', phone: '(555) 300-4000', outstanding: 385, lastActivity: '03/01/2026', totalLifetime: 28400, status: 'active' },
  { id: 'c4', name: 'Green Landscaping', type: 'vendor', email: 'info@greenland.com', phone: '(555) 400-5000', outstanding: 900, lastActivity: '03/20/2026', totalLifetime: 10800, status: 'active' },
  { id: 'c5', name: 'ABC Cleaning Services', type: 'vendor', email: 'service@abcclean.com', phone: '(555) 500-6000', outstanding: 600, lastActivity: '03/10/2026', totalLifetime: 7200, status: 'active' },
  { id: 'c6', name: 'Tech Solutions Inc', type: 'company', email: 'support@techsol.com', phone: '(555) 600-7000', outstanding: 0, lastActivity: '12/10/2025', totalLifetime: 5000, status: 'inactive' },
  { id: 'c7', name: 'First Baptist Supply', type: 'vendor', email: 'orders@fbsupply.com', phone: '(555) 700-8000', outstanding: 1800, lastActivity: '03/10/2026', totalLifetime: 22100, status: 'active' },
  { id: 'c8', name: 'Smith Family', type: 'individual', email: 'smithfam@email.com', phone: '(555) 800-9000', outstanding: 0, lastActivity: '03/12/2026', totalLifetime: 45000, status: 'active' },
  { id: 'c9', name: 'Johnson Foundation', type: 'company', email: 'grants@johnsonfdn.org', phone: '(555) 900-1000', outstanding: 0, lastActivity: '01/15/2026', totalLifetime: 75000, status: 'active' },
];

export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const formatted = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return isNegative ? `($${formatted})` : `$${formatted}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'text-success-text-default';
    case 'approved':
      return 'text-primary-700';
    case 'pending-approval':
      return 'text-warning-text-default';
    case 'overdue':
      return 'text-danger-text-default';
    case 'draft':
      return 'text-neutral-text-weak';
    case 'void':
      return 'text-neutral-text-weak';
    default:
      return 'text-neutral-text';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'bg-success-bg-default';
    case 'approved':
      return 'bg-primary-bg-default';
    case 'pending-approval':
      return 'bg-warning-bg-default';
    case 'overdue':
      return 'bg-danger-bg-default';
    case 'draft':
      return 'bg-neutral-bg-weak';
    case 'void':
      return 'bg-neutral-bg-weak';
    default:
      return 'bg-neutral-bg-weak';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'pending-approval':
      return 'Pending Approval';
    case 'paid':
      return 'Paid';
    case 'approved':
      return 'Approved';
    case 'overdue':
      return 'Overdue';
    case 'draft':
      return 'Draft';
    case 'void':
      return 'Void';
    default:
      return status;
  }
}

/** Dashboard-style currency (matches live Aplos: leading minus, no parentheses). */
export function formatAplosCurrency(amount: number): string {
  const formatted = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (amount < 0) return `-$${formatted}`;
  return `$${formatted}`;
}

export interface DashboardCashPoint {
  month: string;
  checking: number;
  savings: number;
}

export const dashboardCashSeries: DashboardCashPoint[] = [
  { month: 'Nov', checking: 12000, savings: 980000 },
  { month: 'Dec', checking: 11800, savings: 975000 },
  { month: 'Jan', checking: 11500, savings: 12000 },
  { month: 'Feb', checking: 11200, savings: 15000 },
  { month: 'Mar', checking: -13147, savings: -1000012260 },
];

export interface CoaFundRow {
  id: string;
  name: string;
  variant: 'default' | 'bold' | 'orange' | 'green' | 'purple';
}

export const coaFundRows: CoaFundRow[] = [
  { id: 'cf1', name: 'Allocate Fund', variant: 'default' },
  { id: 'cf2', name: 'Building Fund', variant: 'bold' },
  { id: 'cf3', name: 'Equity TEST', variant: 'orange' },
  { id: 'cf4', name: 'Equity Test 2', variant: 'green' },
  { id: 'cf5', name: 'Equity Test 3', variant: 'purple' },
  { id: 'cf6', name: 'General Fund', variant: 'bold' },
];

export interface CoaAccountRow {
  id: string;
  code: string;
  name: string;
  indent: number;
  bank?: boolean;
}

export const coaAccountRows: CoaAccountRow[] = [
  { id: 'ca1', code: '654', name: 'All Funds Account', indent: 0 },
  { id: 'ca2', code: '1000.1000', name: 'Register A', indent: 0, bank: true },
  { id: 'ca3', code: '333', name: 'Sub Account', indent: 1, bank: true },
  { id: 'ca4', code: '1000.2', name: 'Register B', indent: 0 },
  { id: 'ca5', code: '1000.3', name: 'Register C', indent: 0 },
  { id: 'ca6', code: '1000.500', name: 'Checking', indent: 0, bank: true },
  { id: 'ca7', code: '1010', name: 'Savings', indent: 0, bank: true },
  { id: 'ca8', code: '1100', name: 'Accounts Receivable', indent: 0, bank: true },
];

export interface ReportCardItem {
  id: string;
  name: string;
  lastAccessed: string;
  favorite: boolean;
  newExperience?: boolean;
  /** For Reports category pills (default accounting). */
  category?: 'accounting' | 'donation';
}

export const reportFavoritesDisplay: ReportCardItem[] = [
  { id: 'rf1', name: 'Income Statement: Current Month v. Year', lastAccessed: '11/20/2025', favorite: true },
  { id: 'rf2', name: 'Comparative Income Statement Periods', lastAccessed: '11/20/2025', favorite: true, newExperience: true },
  { id: 'rf3', name: 'Income Statement: Current Month v. Year', lastAccessed: '11/20/2025', favorite: true },
  { id: 'rf4', name: 'Comparative Income Statement Periods', lastAccessed: '11/20/2025', favorite: true, newExperience: true },
];

export const reportRecentDisplay: ReportCardItem[] = [
  { id: 'rr1', name: 'Income Statement: Current Month v. Year', lastAccessed: '11/20/2025', favorite: true },
  { id: 'rr2', name: 'Comparative Income Statement Periods', lastAccessed: '11/20/2025', favorite: false, newExperience: true },
  { id: 'rr3', name: 'Income Statement: Current Month v. Year', lastAccessed: '11/20/2025', favorite: true },
  { id: 'rr4', name: 'Comparative Income Statement Periods', lastAccessed: '11/20/2025', favorite: false, newExperience: true },
];

export const reportSavedGrid: ReportCardItem[] = [
  { id: 'rs1', name: '123', lastAccessed: '11/20/2025', favorite: false },
  { id: 'rs2', name: 'income leigh', lastAccessed: '11/20/2025', favorite: false },
  { id: 'rs3', name: 'balance sheet test', lastAccessed: '11/20/2025', favorite: false },
  { id: 'rs4', name: 'Income Statement: Current Month v. Year', lastAccessed: '11/20/2025', favorite: false },
  { id: 'rs5', name: 'Comparative Income Statement Periods', lastAccessed: '11/20/2025', favorite: false, newExperience: true },
  { id: 'rs6', name: 'Custom Report A', lastAccessed: '10/02/2025', favorite: false },
  { id: 'rs7', name: 'Fund Balance Summary', lastAccessed: '03/31/2026', favorite: false },
  { id: 'rs8', name: 'Accounts Payable Aging', lastAccessed: '04/01/2026', favorite: false },
  { id: 'rs9', name: 'Vendor Payment History', lastAccessed: '03/20/2026', favorite: false },
  { id: 'rs10', name: 'Budget vs Actual', lastAccessed: '03/31/2026', favorite: false },
  {
    id: 'rs11',
    name: 'Contribution Statement by Donor',
    lastAccessed: '03/15/2026',
    favorite: false,
    category: 'donation',
  },
  { id: 'rs12', name: 'Bill Approval Queue Summary', lastAccessed: '04/01/2026', favorite: false },
];
