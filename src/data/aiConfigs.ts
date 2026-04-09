import type { AIPageConfig, AIStarterConfig } from '../components/ai/AIAssistantPanel';
import { accountantDemoStarter } from './accountantDemoScenario';

const accountsPayableStarters: AIStarterConfig[] = [
  {
    label: 'Overdue invoices',
    answer:
      '**$14,280** past due:\n\n• Apex HVAC — $6,200 (03/15)\n• Metro Office Supply — $3,450 (03/18)\n• Westside Janitorial — $2,830 (03/20)\n• City Water — $1,800 (03/22)',
    source: 'AP Aging',
    followUps: [
      { label: 'Open AP Aging', answer: 'Opening AP Aging report.', source: 'Reports', openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' } },
    ],
  },
  {
    label: 'Total vendor balance',
    answer: 'Outstanding AP: **$23,030** (approved + pending). Largest: Apex HVAC $6,200, Reliable Electric $4,200.',
    source: 'AP summary',
  },
  {
    label: 'Payments due next 30 days',
    answer:
      '• Overdue: $14,280 (4 invoices)\n• Due by 04/15: Reliable Electric $4,200, Greenfield Landscaping $2,950\n• Pending approval: Staples $1,600\n\nCash needed: ~$23,030 if you clear everything.',
    source: 'AP schedule',
    followUps: [
      { label: 'Open Bills to Pay', answer: 'Opening Bills to Pay.', source: 'Bills to Pay', openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' } },
    ],
  },
];

export const dashboardAI: AIPageConfig = {
  pageTitle: 'Dashboard',
  insights: [],
  starters: [
    accountantDemoStarter,
    {
      label: 'What needs attention today?',
      answer:
        '1. **AP**: 4 overdue invoices — $14,280 total.\n' +
        '2. **Approvals**: 3 bills pending — $8,750.\n' +
        '3. **Budget**: Facilities 12% over (HVAC repair).\n\n' +
        'Triage overdue payables first.',
      source: 'Dashboard signals',
      followUps: [
        { label: 'Open AP Aging', answer: 'Opening AP Aging report.', source: 'Reports', openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' } },
        { label: 'Open Budget to Actual', answer: 'Opening Budget to Actual.', source: 'Reports', openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' } },
      ],
    },
    {
      label: 'Month-over-month comparison',
      answer:
        'March vs February:\n\n• Expenses: $214k vs $198k (+8%) — HVAC and spring retreat.\n• Revenue: $205k vs $191k (+7%) — seasonal giving uptick.\n• Cash: Operating checking $87,420 (up from $79,100).',
      source: 'Register + Income Statement',
      followUps: [
        { label: 'Comparative Income Statement', answer: 'Opening Comparative Income Statement.', source: 'Reports', openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' } },
      ],
    },
    {
      label: 'Funds at risk of exceeding budget',
      answer:
        '• **Facilities** — 12% over ($48.2k vs $43k YTD).\n• **Youth Programs** — 8% over ($18.9k vs $17.5k).\n\nPersonnel, missions, and benevolence on plan.',
      source: 'Budget vs Actual by fund',
      followUps: [
        { label: 'Open Budget to Actual', answer: 'Opening Budget to Actual.', source: 'Reports', openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' } },
      ],
    },
  ],
};

export const registerAI: AIPageConfig = {
  pageTitle: 'Transactions',
  insights: [],
  starters: [
    {
      label: 'Uncategorized transactions',
      answer:
        '2 items need a GL code:\n\n• 03/14 — Card $312 — memo "Amazon"\n• 03/22 — Deposit $1,750 — giving batch not linked',
      source: 'Register review',
    },
    {
      label: 'Large disbursements this month',
      answer:
        'March over $1,000:\n\n• ADP Payroll — $42,000\n• Apex HVAC — $6,200\n• Metro Office — $3,450\n• Westside Janitorial — $2,830\n• City Water — $1,800',
      source: 'Register — Checking',
      followUps: [
        { label: 'Income Statement detail', answer: 'Opening Income Statement.', source: 'Reports', openReports: { search: 'income statement', tab: 'accounting', runReportId: 'income-statement' } },
      ],
    },
    {
      label: 'Missing fund assignments',
      answer:
        '3 March payments missing fund split:\n\n• Metro Office — $1,200 of $3,450 unassigned\n• Staples — $450 no fund\n• Internal transfer — $500 needs Missions vs General',
      source: 'Register validation',
    },
  ],
};

export const billsListAI: AIPageConfig = {
  pageTitle: 'Bills List',
  insights: [],
  starters: accountsPayableStarters,
};

export const newBillAI: AIPageConfig = {
  pageTitle: 'New Bill',
  insights: [],
  starters: accountsPayableStarters,
};

export const billDetailAI: AIPageConfig = {
  pageTitle: 'Bill Detail — INV-2026-0412',
  insights: [],
  starters: accountsPayableStarters,
};

export const billsToPayAI: AIPageConfig = {
  pageTitle: 'Bills to Pay',
  insights: [],
  starters: accountsPayableStarters,
};

export const myApprovalsAI: AIPageConfig = {
  pageTitle: 'My Approvals',
  insights: [],
  starters: accountsPayableStarters,
};

export const reportingAI: AIPageConfig = {
  pageTitle: 'Reports',
  insights: [],
  starters: [
    accountantDemoStarter,
    {
      label: 'Net assets trend',
      answer:
        'YTD change in net assets: **–$26k** (vs –$32k same period last year). Revenue up 3%, expenses up 2%.',
      source: 'Comparative Income Statement',
      followUps: [
        { label: 'Open Comparative Income Statement', answer: 'Opening report.', source: 'Reports', openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' } },
      ],
    },
    {
      label: 'Budget variance by fund',
      answer:
        '• Facilities — 12% over (HVAC).\n• Youth — 8% over (retreat).\n• Missions — 22% under (Q2 disbursement pending).\n• General and personnel on plan.',
      source: 'Budget vs Actual',
      followUps: [
        { label: 'Open Budget to Actual', answer: 'Opening report.', source: 'Reports', openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' } },
      ],
    },
    {
      label: 'Board packet checklist',
      answer:
        '1. Comparative Income Statement\n2. Budget to Actual\n3. Fund Balance Summary\n4. AP Aging\n5. Variance narrative',
      source: 'Reporting checklist',
      followUps: [
        { label: 'Fund Balance Summary', answer: 'Opening Fund Balance Summary.', source: 'Reports', openReports: { search: 'fund balance', tab: 'accounting', runReportId: 'fund-balance-summary' } },
      ],
    },
  ],
};

export const fundAccountingAI: AIPageConfig = {
  pageTitle: 'Fund Accounting',
  insights: [],
  starters: [
    {
      label: 'Fund balances overview',
      answer:
        '**General** — $142,300 (unrestricted)\n**Building** — $89,750 (restricted)\n**Youth** — $23,400 (designated)\n**Missions** — $31,200 (restricted)\n**Benevolence** — $8,900 (restricted)',
      source: 'Fund Balance Summary',
    },
    {
      label: 'COA cleanup suggestions',
      answer:
        '• Consolidate 3 low-balance misc accounts.\n• Deactivate unused 5200 series (old program).\n• Add fund default to vendor templates.\n• Separate restricted giving lines from operating.',
      source: 'COA review',
    },
    {
      label: 'Default accounts check',
      answer:
        'Vendor defaults: 8 of 24 active vendors missing default GL. Giving: online channel defaults set; batch import needs Missions fund added.',
      source: 'Org defaults',
    },
  ],
};

export const contactsAI: AIPageConfig = {
  pageTitle: 'People & Groups',
  insights: [],
  starters: [
    {
      label: 'Top vendors by spend',
      answer:
        'YTD: ADP Payroll $126k, Apex HVAC $18.6k, Reliable Electric $14.2k, Metro Office $9.8k, Westside Janitorial $8.5k.',
      source: 'Vendor summary',
    },
    {
      label: 'Lapsed contributors (12+ months)',
      answer:
        "3 households with no gift in 12+ months:\n\n\u2022 Jordan Lee \u2014 last 02/14/2025 ($100)\n\u2022 Morgan Ruiz \u2014 last 11/03/2024 ($250)\n\u2022 Pat O\u2019Neill \u2014 last 08/30/2024 ($50)",
      source: 'Giving history',
      followUps: [
        { label: 'Contribution statement', answer: 'Opening contribution reporting.', source: 'Reports', openReports: { search: 'contribution', tab: 'donation', runReportId: 'contribution-statement' } },
      ],
    },
  ],
};

export const donationsAI: AIPageConfig = {
  pageTitle: 'Donations',
  insights: [],
  starters: [
    {
      label: 'Top contributors this month',
      answer:
        'March:\n\n1. Harrison Family — $8,000 (Building)\n2. Anonymous — $5,000 (General)\n3. Chen Household — $2,400 (General + Missions)\n4. Rivera Trust — $1,500 (Youth)\n5. Kim/Park — $1,200 (General)\n\nMarch total: $48,200.',
      source: 'Donation register',
      followUps: [
        { label: 'Contribution statement', answer: 'Opening contribution reporting.', source: 'Reports', openReports: { search: 'contribution', tab: 'donation', runReportId: 'contribution-statement' } },
      ],
    },
    {
      label: 'Recurring giving health',
      answer:
        '• 2 ACH soft-declines on 03/28 — auto-retry 04/02.\n• 1 expired card — contributor notified.\n• Recurring failure rate: under 1%.',
      source: 'Processor',
    },
    {
      label: 'Giving vs last year',
      answer:
        'March 2026 vs 2025: $48.2k vs $41.8k (+15%). Recurring flat +2%. One-time up — capital campaign and Easter giving.',
      source: 'Giving analytics',
      followUps: [
        { label: 'Comparative Income Statement', answer: 'Opening report.', source: 'Reports', openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' } },
      ],
    },
  ],
};

export const marketingAI: AIPageConfig = {
  pageTitle: 'Marketing',
  insights: [],
  starters: [
    {
      label: 'What can I do here?',
      answer: 'This assistant focuses on accounting surfaces. Use the sidebar to explore Dashboard, AP, Reports, or Fund Accounting.',
      source: 'Scope',
    },
  ],
};
