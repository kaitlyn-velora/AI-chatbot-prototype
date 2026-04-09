import type { AIStarterConfig } from '../components/ai/AIAssistantPanel';
import { accountantDemoStarter } from './accountantDemoScenario';

export type AccountingScopeId =
  | 'all'
  | 'register'
  | 'accounts-payable'
  | 'accounts-receivable'
  | 'reporting'
  | 'contacts';

export const ACCOUNTING_SCOPES: { id: AccountingScopeId; label: string }[] = [
  { id: 'all', label: 'All accounting' },
  { id: 'register', label: 'Register' },
  { id: 'accounts-payable', label: 'Accounts Payable' },
  { id: 'accounts-receivable', label: 'Accounts Receivable' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'contacts', label: 'Contacts' },
];

const allStarters: AIStarterConfig[] = [
  accountantDemoStarter,
  {
    label: 'How are cash and payables looking this month?',
    answer:
      'Operating checking: **$87,420**. Outstanding AP: **$23,030**. Payroll 04/01: ~**$42,000**.\n\n' +
      'Headroom after both: ~**$22,390** — adequate, but watch restricted draws.',
    source: 'Cash + AP snapshot',
  },
  {
    label: 'Which reports should I run for month-end?',
    answer:
      '1. Comparative Income Statement\n' +
      '2. Budget to Actual\n' +
      '3. Fund Balance Summary\n' +
      '4. AP Aging (if payables are material)',
    source: 'Reporting checklist',
  },
  {
    label: 'Where are we over budget?',
    answer:
      '• **Facilities** — 12% over ($48.2k vs $43k) — HVAC repair.\n' +
      '• **Youth programs** — 8% over ($18.9k vs $17.5k) — spring retreat.\n' +
      '• Personnel and missions on plan.',
    source: 'Budget vs Actual',
  },
  {
    label: 'What is blocking month-end close?',
    answer:
      '5 unreconciled items ($4,120). One card charge needs a GL code. One deposit not linked to a giving batch. Insurance amortization not posted.',
    source: 'Register review',
  },
];

const registerStarters: AIStarterConfig[] = [
  {
    label: 'What should I reconcile first?',
    answer:
      'Start with the 3 largest uncleared amounts ($2,450 Metro Office, $1,800 City Water, $312 Amazon card). Then match the $1,750 deposit to its giving batch.',
    source: 'Register — Checking',
  },
  {
    label: 'Are there uncategorized transactions?',
    answer:
      '2 items need a GL code:\n\n• 03/14 — Card **$312** — memo "Amazon"\n• 03/22 — Deposit **$1,750** — batch not linked',
    source: 'Register review',
  },
  {
    label: 'What is the difference between cleared and uncleared?',
    answer:
      '**Cleared** = matched to bank statement. **Registered** = in Aplos. Month-end needs both true for the same dollars.',
    source: 'Terminology',
  },
  {
    label: 'What were our largest payments this month?',
    answer:
      'March disbursements over $1,000:\n\n• Apex HVAC — $6,200\n• Metro Office Supply — $3,450\n• Westside Janitorial — $2,830\n• City Water — $1,800\n• ADP Payroll — $42,000 (03/15)',
    source: 'Register — Checking',
  },
];

const apStarters: AIStarterConfig[] = [
  {
    label: 'Which invoices are overdue?',
    answer:
      '**$14,280** past due:\n\n• Apex HVAC — $6,200 (03/15)\n• Metro Office Supply — $3,450 (03/18)\n• Westside Janitorial — $2,830 (03/20)\n• City Water — $1,800 (03/22)',
    source: 'AP Aging',
    followUps: [
      {
        label: 'Open AP Aging',
        answer: 'Opening AP Aging report.',
        source: 'Reports',
        openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' },
      },
    ],
  },
  {
    label: 'Which bills are awaiting approval?',
    answer:
      '**$8,750** pending:\n\n• Reliable Electric — $4,200\n• Greenfield Landscaping — $2,950\n• Staples — $1,600',
    source: 'Bills list',
  },
  {
    label: 'How much do we owe vendors in total?',
    answer:
      'Outstanding AP: **$23,030** (approved + pending). Largest: Apex HVAC $6,200, Reliable Electric $4,200.',
    source: 'AP summary',
  },
  {
    label: 'In what order should I schedule payments?',
    answer:
      '1. Overdue approved ($14,280)\n2. Due within 7 days\n3. Remaining approved by vendor priority\n\nUse Bills to Pay in Aplos to execute.',
    source: 'Cash planning',
  },
];

const arStarters: AIStarterConfig[] = [
  {
    label: 'What is outstanding from customers?',
    answer:
      '**$18,600** open across 12 invoices. Largest: Riverside School rental — $4,800 (45 days), Community Arts Council — $3,200 (32 days).',
    source: 'AR Aging',
  },
  {
    label: 'Which invoices are past terms?',
    answer:
      '3 invoices past 30 days totaling **$9,150**:\n\n• Riverside School — $4,800 (45 days)\n• Community Arts Council — $3,200 (32 days)\n• Private event deposit — $1,150 (35 days)',
    source: 'AR Aging',
  },
  {
    label: 'How does AR tie to the income statement?',
    answer:
      'Revenue recognized when earned; cash recorded when received. Use Comparative Income Statement + AR Aging together for accrual vs cash view.',
    source: 'Reporting',
  },
  {
    label: 'Which invoices have partial payments?',
    answer:
      '2 invoices have partial payments: Riverside School ($2,400 of $4,800 received), Community Arts ($1,000 of $3,200).',
    source: 'AR detail',
  },
];

const reportingStarters: AIStarterConfig[] = [
  {
    label: 'What are our fund balances?',
    answer:
      '**General** — $142,300 (unrestricted)\n**Building** — $89,750 (restricted)\n**Youth** — $23,400 (board-designated)\n**Missions** — $31,200 (restricted)\n**Benevolence** — $8,900 (restricted)',
    source: 'Fund Balance Summary',
  },
  {
    label: 'How does Budget to Actual look?',
    answer:
      'YTD March: Revenue $612k vs $595k budget (+3%). Expenses $638k vs $627k (+2%). Facilities and youth over line; personnel on plan.',
    source: 'Budget vs Actual',
    followUps: [
      {
        label: 'Open Budget to Actual',
        answer: 'Opening Budget to Actual report.',
        source: 'Reports',
        openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' },
      },
    ],
  },
  {
    label: 'How is net assets trending?',
    answer:
      'YTD change in net assets: **–$26k** (vs –$32k same period last year). Revenue up 3%; expenses up 2%. Improvement driven by giving growth.',
    source: 'Comparative Income Statement',
  },
  {
    label: 'How do I explain restricted vs unrestricted?',
    answer:
      '**Restricted** = donor/grant limits purpose or timing. **Board-designated** = still unrestricted under GAAP. Make the distinction in board materials.',
    source: 'Fund accounting',
  },
  {
    label: 'What should go in the board packet?',
    answer:
      '1. Comparative Income Statement\n2. Budget to Actual\n3. Fund Balance Summary\n4. AP/AR aging if material\n5. Narrative on variances',
    source: 'Committee packet',
  },
];

const contactsStarters: AIStarterConfig[] = [
  {
    label: 'How do contacts relate to AP and AR?',
    answer:
      'Vendors anchor bills; customers anchor invoices. Contacts here are accounting-adjacent — not full CRM.',
    source: 'AP/AR context',
  },
  {
    label: 'Where do I update vendor payment details?',
    answer:
      'Open the vendor record for address, 1099 flags, and default GL. Changes affect future bills only.',
    source: 'Navigation',
  },
  {
    label: 'Who are our top vendors by spend?',
    answer:
      'YTD: ADP Payroll $126k, Apex HVAC $18.6k, Reliable Electric $14.2k, Metro Office $9.8k, Westside Janitorial $8.5k.',
    source: 'Vendor summary',
  },
  {
    label: 'Should donor contacts live in this assistant?',
    answer:
      'Stewardship / donor CRM lives in sibling products. Here, focus on AP/AR-facing contacts that hit the ledger.',
    source: 'Scope',
  },
];

const SCOPE_STARTERS: Record<Exclude<AccountingScopeId, 'all'>, AIStarterConfig[]> = {
  register: registerStarters,
  'accounts-payable': apStarters,
  'accounts-receivable': arStarters,
  reporting: reportingStarters,
  contacts: contactsStarters,
};

function labelForId(id: AccountingScopeId): string {
  return ACCOUNTING_SCOPES.find((s) => s.id === id)?.label ?? id;
}

/** Single-scope label (legacy). */
export function scopeLabel(scopeId: AccountingScopeId): string {
  return labelForId(scopeId);
}

/** Text for the scope pill from a multiselect set. */
export function scopeSelectionSummary(selected: ReadonlySet<AccountingScopeId>): string {
  if (selected.size === 0 || (selected.size === 1 && selected.has('all'))) {
    return labelForId('all');
  }
  const ordered = ACCOUNTING_SCOPES.map((s) => s.id).filter((id) => id !== 'all' && selected.has(id));
  if (ordered.length === 0) return labelForId('all');
  if (ordered.length === 1) return labelForId(ordered[0]);
  if (ordered.length === 2) return `${labelForId(ordered[0])}, ${labelForId(ordered[1])}`;
  return `${labelForId(ordered[0])}, ${labelForId(ordered[1])} +${ordered.length - 2}`;
}

/** Toggle one scope. "All accounting" is exclusive; picking a specific clears "all". */
export function toggleAccountingScope(
  current: ReadonlySet<AccountingScopeId>,
  id: AccountingScopeId
): Set<AccountingScopeId> {
  if (id === 'all') {
    return new Set<AccountingScopeId>(['all']);
  }
  const next = new Set(current);
  next.delete('all');
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  if (next.size === 0) {
    return new Set<AccountingScopeId>(['all']);
  }
  return next;
}

function dedupeStartersByLabel(starters: AIStarterConfig[]): AIStarterConfig[] {
  const seen = new Set<string>();
  const out: AIStarterConfig[] = [];
  for (const s of starters) {
    const key = s.label.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

/** Round-robin merge from multiple scope lists, then dedupe by label. */
export function getStartersForScopes(selected: ReadonlySet<AccountingScopeId>, max: number): AIStarterConfig[] {
  if (selected.size === 0 || (selected.size === 1 && selected.has('all'))) {
    return allStarters.slice(0, max);
  }
  const ids = ACCOUNTING_SCOPES.map((s) => s.id).filter((id) => id !== 'all' && selected.has(id)) as Exclude<
    AccountingScopeId,
    'all'
  >[];
  if (ids.length === 0) {
    return allStarters.slice(0, max);
  }
  const pools = ids.map((scopeId) => [...SCOPE_STARTERS[scopeId]]);
  const merged: AIStarterConfig[] = [];
  let added = true;
  let safety = 0;
  while (added && merged.length < max * 3 && safety < 200) {
    safety += 1;
    added = false;
    for (const pool of pools) {
      if (pool.length > 0 && merged.length < max * 3) {
        merged.push(pool.shift()!);
        added = true;
      }
    }
  }
  return dedupeStartersByLabel(merged).slice(0, max);
}

/** @deprecated Use getStartersForScopes with a Set */
export function getStartersForScope(scopeId: AccountingScopeId): AIStarterConfig[] {
  if (scopeId === 'all') return allStarters;
  return SCOPE_STARTERS[scopeId] ?? allStarters;
}
