import type { AIPageConfig, AIStarterConfig } from '../components/ai/AIAssistantPanel';
import { accountantDemoStarter } from './accountantDemoScenario';

const accountsPayableStarters: AIStarterConfig[] = [
  {
    label: 'Which vendor invoices are past due?',
    answer:
      'Two ministry payables are past due — $2,185 total:\n\n• City Power & Light (UTIL-MAR-2026) — $385, due 03/25/2026\n• First Baptist Supply (FBS-4421) — $1,800, due 03/22/2026\n\nBoth are approved and ready to pay from Checking (operating).',
    source: 'AP Aging',
    followUps: [
      {
        label: 'Open AP aging',
        answer: 'Opening Accounts Payable Aging for detail by vendor and due date.',
        source: 'Reports',
        openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' },
      },
    ],
  },
  {
    label: 'What do we owe vendors in total right now?',
    answer:
      'Total outstanding accounts payable: $4,885 (approved + pending approval).\n\nLargest balances: First Baptist Supply $1,800, Office Depot $1,200, Green Landscaping $900 (pending approval), ABC Cleaning $600, City Power & Light $385.',
    source: 'Bills + AP summary',
  },
  {
    label: 'What vendor payments hit the next 30 days?',
    answer:
      'Cash needs for approved ministry payables (next 30 days from today):\n\n• Already overdue: $2,185 (2 invoices)\n• Due by 04/10: ABC Cleaning $600\n• Due by 04/15: Office Depot $1,200\n• Still in approval workflow: Green Landscaping $900, City Power April $410\n\nRough cash requirement ~$4,285 if you clear overdue plus near-term approved items.',
    source: 'AP schedule',
    followUps: [
      {
        label: 'Bills to Pay',
        answer: 'Use Bills to Pay to select approved bills and schedule or record payment.',
        source: 'Bills to Pay',
        openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' },
      },
    ],
  },
];

export const dashboardAI: AIPageConfig = {
  pageTitle: 'Dashboard',
  insights: [],
  starters: [
    accountantDemoStarter,
    {
      label: 'What needs my attention today?',
      answer:
        'March 2026 — ministry finance priorities:\n\n1. Vendor payables: 2 overdue invoices — $2,185 (City Power & Light, First Baptist Supply).\n2. Internal control: 2 bills awaiting approval — $1,310 (Green Landscaping, City Power April).\n3. Fund stewardship: Building / capital budget draw is ~73% with a quarter of the fiscal window left at current pace — align with campaign and board expectations before large commitments.\n\nTriage overdue payables first, then approvals.',
      source: 'Dashboard signals',
      followUps: [
        {
          label: 'Overdue bills',
          answer: 'Opening payable aging focused on overdue amounts.',
          source: 'Reports',
          openReports: { search: 'payable aging', tab: 'accounting', runReportId: 'accounts-payable-aging' },
        },
        {
          label: 'Open Budget to Actual',
          answer: 'Review funds trending over budget.',
          source: 'Reports',
          openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' },
        },
      ],
    },
    {
      label: 'How does this month’s giving and ministry spending compare to last month?',
      answer:
        'March vs February 2026 (Checking, church org view):\n\n• Cash out for ministry operations: March ~$3,372 vs February ~$2,850 (up ~18%) — utilities and facility-related payables drove most of the change.\n• Cash in (tithes, offerings, other deposits): March stronger (~$16k vs a typical mid-month) — seasonal giving pattern.\n• Liquidity: Checking still covers scheduled vendor payables; no inter-fund transfer suggested from this snapshot.\n\nFor fund-level detail (restricted vs unrestricted), run Comparative Income Statement for the period.',
      source: 'Register + Income Statement (mock)',
      followUps: [
        {
          label: 'Comparative Income Statement',
          answer: 'Open side-by-side periods for support, revenue, and expenses by fund.',
          source: 'Reports',
          openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' },
        },
      ],
    },
    {
      label: 'Which funds look at risk of exceeding their expense budget?',
      answer:
        'Watch list by fund (prototype):\n\n• Youth Programs (often temporarily restricted or board-designated) — draw is ahead of the calendar; summer programming could tighten the line.\n• Building / capital-type fund — spending pace could use the annual plan before major Q3–Q4 draws.\n• Utilities (usually General) — over line on Budget to Actual.\n\nGeneral operating and Missions are near plan; confirm donor restrictions before reclassing.',
      source: 'Budget to Actual by fund',
      followUps: [
        {
          label: 'Open Budget to Actual',
          answer: 'Review variance by fund and by each expense or revenue line.',
          source: 'Reports',
          openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' },
        },
      ],
    },
  ],
};

export const registerAI: AIPageConfig = {
  pageTitle: 'Fund Accounting — Transactions',
  insights: [],
  starters: [
    {
      label: 'Are any register lines missing an expense or revenue category?',
      answer:
        'Checking — March 2026: 2 items still need a final category (or a split between categories) for the books:\n\n• 03/14 — Card $89.50 — memo “Amazon” (likely 5100 Office Supplies once receipt is matched)\n• 03/22 — Deposit $240 — contribution batch not linked (tie to giving before posting)\n\nRemaining March lines already have both the right account and fund for ministry reporting.',
      source: 'Register review',
    },
    {
      label: 'Show me cash outflows over $X this month',
      answer:
        'March 2026 — disbursements over $500 on this Checking account:\n\n• 03/03 — Office Depot — $1,200 (Check #4518)\n• 03/10 — First Baptist Supply — $750 (Check #4519)\n• 03/01 — ABC Cleaning — $600 (Check #4517)\n\n(Threshold is configurable; $500 is the sample filter for board or audit review.)',
      source: 'Register — Checking',
      followUps: [
        {
          label: 'Income Statement detail',
          answer: 'Open Income Statement by account for the same period (program vs admin as you coded it).',
          source: 'Reports',
          openReports: { search: 'income statement', tab: 'accounting', runReportId: 'income-statement' },
        },
      ],
    },
    {
      label: 'Do any payments post without a fund (restricted vs unrestricted)?',
      answer:
        'Three March payments have expense categories filled in but the fund split is incomplete:\n\n• 03/03 Office Depot — $300 of $1,200 missing fund (default candidate: General unrestricted)\n• 03/15 Staples — $450 line has no fund\n• 03/20 transfer — $500 needs Missions vs General designation\n\nClean up before close so income and expenses by fund—and tax reporting by function—stay reliable.',
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
      label: 'How is change in net assets trending vs last year?',
      answer:
        'Year-to-date through March 2026 vs the same months last year (nonprofit view):\n\n• Change in net assets (surplus or deficit): prototype totals show a deeper deficit this period — driven by timing of utilities, program costs, and internal transfers between funds.\n• Support and revenue: up ~7% YoY (tithes/offerings, a few restricted gifts, modest program fees).\n• Expenses: personnel stable; mission/program and facility lines up vs prior year.\n\nUse Comparative Income Statement (by fund and column) for board-ready numbers and to split unrestricted vs temporarily restricted activity.',
      source: 'Comparative Income Statement',
      followUps: [
        {
          label: 'Comparative Income Statement',
          answer: 'Compare periods for support and revenue, expenses, and change in net assets.',
          source: 'Reports',
          openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' },
        },
      ],
    },
    {
      label: 'Which funds are furthest behind budget (revenue or expense)?',
      answer:
        'From Budget to Actual (March):\n\n• General / facility (utilities) — expense over approved budget line.\n• Youth Programs — expense pace ahead of calendar; watch donor intent if restricted.\n• Building / capital — contributions ahead of plan; major expense still weighted to later quarters.\n\nMissions and Benevolence are near budget; narrate any board-designated vs donor-restricted balances separately.',
      source: 'Budget to Actual',
      followUps: [
        {
          label: 'Open Budget to Actual',
          answer: 'Variance by fund and by each expense or revenue line.',
          source: 'Reports',
          openReports: { search: 'budget vs actual', tab: 'accounting', runReportId: 'budget-vs-actual' },
        },
      ],
    },
    {
      label: 'What should finance committee / board see this month?',
      answer:
        'Suggested nonprofit board packet for March:\n\n1. Liquidity — operating cash vs vendor payables (~$4.9k outstanding) and any line of credit.\n2. Compliance tone — overdue payables ($2,185) and approval queue.\n3. Budget to Actual story — utilities, youth/program spend, capital / Building trajectory; call out restricted vs unrestricted.\n4. Giving — March vs February; recurring vs one-time; any large restricted gifts.\n5. Decisions — policy limits, large Q2 commitments, investment / reserve if applicable.\n\nAttach: Comparative Income Statement, Budget to Actual, Fund Balance Summary (and Statement of Financial Position if you report balance sheet to the board).',
      source: 'Reporting checklist',
      followUps: [
        {
          label: 'Fund balance summary',
          answer: 'Fund-level balances for the board snapshot.',
          source: 'Reports',
          openReports: { search: 'fund balance', tab: 'accounting', runReportId: 'fund-balance-summary' },
        },
      ],
    },
  ],
};

export const fundAccountingAI: AIPageConfig = {
  pageTitle: 'Fund Accounting — Accounts',
  insights: [],
  starters: [
    {
      label: 'Is our chart of accounts set up well for a nonprofit (funds, accounts, and summaries)?',
      answer:
        'Quick health check on structure:\n\n• You use separate funds (General, Building, Youth, Missions, etc.) with clear expense and revenue accounts — a solid base for restricted vs unrestricted reporting.\n• Summary groupings: keep program-type costs, admin, and fundraising in ranges that match how Budget to Actual and board reports are built (for example 4xxx–5xxx program, 6xxx admin, 7xxx fundraising).\n• Watch for catch-all “misc” accounts that hide detail (they make grant reports and tax “by function” harder).\n\nNext step: write a short chart-of-accounts guide so new staff don’t create duplicate accounts.',
      source: 'COA design',
    },
    {
      label: 'What chart-of-accounts cleanups would tighten our books before year-end or an audit?',
      answer:
        'Improvement backlog (prototype-style suggestions):\n\n• Turn off true duplicates (same purpose, same type) after moving history to one account.\n• Combine rarely used accounts with tiny balances into a broader ministry line.\n• Fix “suspense” or vague codes where bills and giving always land.\n• Make sure every active revenue line has a clear rule: restricted gift vs unrestricted operating.\n\nMake big cleanup moves outside peak giving season, then refresh Budget to Actual.',
      source: 'COA hygiene',
    },
    {
      label: 'Are default accounts and fund defaults set up so everyday posting stays consistent?',
      answer:
        'Org setup checklist:\n\n• Default bank / cash accounts per fund (operating vs savings) — fewer wrong deposits.\n• Default bill and expense categories by vendor type where your software allows it.\n• Giving: default revenue lines by fund and channel (online vs batch) so totals match the processor.\n• Moving cash between restricted and operating: use the same transfer accounts every time so the trail is clear.\n\nIf people still guess the account on every entry, tighten defaults or training.',
      source: 'Org defaults',
    },
  ],
};

export const contactsAI: AIPageConfig = {
  pageTitle: 'People & Groups',
  insights: [],
  starters: [
    {
      label: 'Which contributors have not given in 12+ months?',
      answer:
        'Households with no recorded gift in 12+ months (sample):\n\n• Jordan Lee — last gift 02/14/2025 ($100, General)\n• Morgan & Casey Ruiz — last gift 11/03/2024 ($250, Building)\n• Pat O’Neill — last gift 08/30/2024 ($50, General)\n\nPastoral / stewardship follow-up: note, pledge reminder, or re-engagement touch (verify in giving system before bulk outreach).',
      source: 'Giving history',
      followUps: [
        {
          label: 'Contribution statement report',
          answer: 'Run contribution statements for a defined period to verify before outreach.',
          source: 'Reports',
          openReports: { search: 'contribution', tab: 'donation', runReportId: 'contribution-statement' },
        },
      ],
    },
    {
      label: 'Which ministry groups show the strongest engagement?',
      answer:
        'Last 90 days — attendance, serving, or giving signal:\n\n1. Youth Parents — 42 active households\n2. Serve Team — 28 members with volunteer hours\n3. Small Groups (Spring) — 65 enrolled; 52 with 2+ touches\n4. Building Committee — 9 members; all active\n\nPrototype logic only; align with your ChMS / groups data.',
      source: 'Groups + engagement',
    },
  ],
};

export const donationsAI: AIPageConfig = {
  pageTitle: 'Donations',
  insights: [],
  starters: [
    {
      label: 'Who were our largest contributors this month?',
      answer:
        'March 2026 — top gifts by household (prototype):\n\n1. Smith Family — $5,000 (Building / capital)\n2. Anonymous — $2,500 (General operating)\n3. Chen Household — $1,200 (General + Missions)\n4. Rivera Trust — $800 (Youth)\n5. Kim / Park — $650 (General)\n\nMarch total in sample: $36,400 across restricted and unrestricted funds.',
      source: 'Donation register',
      followUps: [
        {
          label: 'Contribution statement',
          answer: 'Open contribution reporting for official donor detail.',
          source: 'Reports',
          openReports: { search: 'contribution', tab: 'donation', runReportId: 'contribution-statement' },
        },
      ],
    },
    {
      label: 'Is any recurring online giving failing?',
      answer:
        'Recurring gifts (mock processor):\n\n• 3 ACH profiles soft-declined 03/28 — auto-retry 04/02.\n• 1 expired card (••••1004) — contributor notified.\n• No sustained failures over 30 days; under 1% of recurring volume.',
      source: 'Processor + recurring gifts',
    },
    {
      label: 'How does this month’s total giving compare to last year?',
      answer:
        'March 2026 vs March 2025 (all funds):\n\n• Total support: ~$36,400 vs ~$31,200 (+17%)\n• Recurring giving: roughly flat to +3%\n• One-time / special: up (capital campaign and Easter-season gifts)\n• Average gift: higher due to a few larger contributions\n\nPull YTD Comparative Income Statement for board / finance committee totals.',
      source: 'Giving analytics',
      followUps: [
        {
          label: 'Comparative Income Statement',
          answer: 'Support and revenue by period (matches how you posted each line).',
          source: 'Reports',
          openReports: { search: 'comparative income', tab: 'accounting', runReportId: 'comparative-income-statement' },
        },
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
      answer:
        'This prototype focuses on accounting surfaces — Dashboard, Chart of Accounts, and Reports. Use the sidebar to explore those areas, or open **Copilot** from the header for evidence-first, read-only help.',
      source: 'Prototype scope',
    },
  ],
};
