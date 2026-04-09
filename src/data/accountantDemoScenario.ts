import type { AIFollowUpConfig, AIStarterConfig } from '../components/ai/AIAssistantPanel';
import type { ReportsListFilter } from '../types/reportsNavigation';

/**
 * Crossroads Community Church — $2.4M annual budget, 15 staff, 5 funds.
 * Month-end walkthrough for a finance manager prepping the March 2026 board packet.
 */
export const accountantDemoStarter: AIStarterConfig = {
  label: 'How do I walk through month-end close?',
  answer:
    '**Crossroads Community Church — March 2026**\n\n' +
    'Walking through five steps: payables → cash → budget → close blockers → board story.\n\n' +
    'Tap **Next step** to continue.',
  source: 'Demo script',
  followUps: [
    {
      label: 'Next: Overdue payables',
      answer:
        '**$14,280** past due across 4 vendors:\n\n' +
        '• Apex HVAC — **$6,200**, due 03/15\n' +
        '• Metro Office Supply — **$3,450**, due 03/18\n' +
        '• Westside Janitorial — **$2,830**, due 03/20\n' +
        '• City Water Authority — **$1,800**, due 03/22\n\n' +
        'Another **$8,750** is awaiting approval.',
      source: 'AP Aging',
      followUps: [
        {
          label: 'Next: Cash coverage',
          answer:
            '**Operating checking: $87,420**\n\n' +
            'Approved AP outstanding: **$23,030** (overdue + current).\n' +
            'Payroll next run (04/01): ~**$42,000**.\n' +
            'Headroom after both: ~**$22,390**.\n\n' +
            'No emergency — but thin if a large restricted draw hits before April giving.',
          source: 'Cash + AP schedule',
          followUps: [
            {
              label: 'Next: Budget variances',
              answer:
                '**YTD through March — watch items:**\n\n' +
                '• Facilities — **12% over** ($48,200 vs $43,000 budget) — HVAC repair drove it.\n' +
                '• Youth programs — **8% over** ($18,900 vs $17,500) — spring retreat.\n' +
                '• Personnel — **on plan** ($126,000 vs $127,500).\n' +
                '• Missions — **under** ($9,400 vs $12,000) — Q2 disbursement pending.',
              source: 'Budget vs Actual',
              followUps: [
                {
                  label: 'Next: Close blockers',
                  answer:
                    'Before locking March:\n\n' +
                    '• **5 unreconciled** items on checking ($4,120 total).\n' +
                    '• Card charge **$312** — memo "Amazon" — needs GL code.\n' +
                    '• Deposit **$1,750** — giving batch not linked.\n' +
                    '• Prepaid insurance amortization entry not posted.',
                  source: 'Register review',
                  followUps: [
                    {
                      label: 'Next: Board talking points',
                      answer:
                        '**Three points for the board:**\n\n' +
                        '1. **Cash** — operating checking covers AP + payroll with ~$22k headroom; no borrowing needed.\n' +
                        '2. **Budget** — facilities over line (HVAC); youth retreat timing; everything else on plan.\n' +
                        '3. **Close** — five rec items to clear; no material risk to reported totals.\n\n' +
                        'Attach: Comparative Income Statement, Budget to Actual, Fund Balance Summary.',
                      source: 'Board packet',
                      followUps: [
                        {
                          label: 'Open Comparative Income Statement',
                          answer:
                            'Opening **Comparative Income Statement** — March vs prior period.\n\n' +
                            '**Demo complete.** Close the assistant and reopen to restart.',
                          source: 'Reports',
                          openReports: {
                            search: 'comparative income',
                            tab: 'accounting',
                            runReportId: 'comparative-income-statement',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export type AccountantDemoTurn = {
  answer: string;
  source?: string;
  followUps?: AIFollowUpConfig[];
  openReports?: ReportsListFilter;
};

function normalizeDemoQuery(s: string): string {
  return s
    .trim()
    .replace(/[\u200b-\u200d\ufeff]/g, '')
    .replace(/^[\s\u201c\u2018]+/g, '')
    .replace(/[\s\u201d\u2019]+$/g, '')
    .toLowerCase()
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u02bc/g, "'")
    .replace(/\u201c|\u201d/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\?+$/g, '')
    .replace(/^next:\s*/i, '')
    .trim();
}

function matchKeysForLabel(label: string): string[] {
  const raw = label.trim();
  const keys = new Set<string>();
  keys.add(normalizeDemoQuery(raw));
  keys.add(normalizeDemoQuery(raw.replace(/^next:\s*/i, '')));
  keys.add(normalizeDemoQuery(raw.replace(/\?/g, '')));
  return [...keys].filter((k) => k.length > 0);
}

function collectDemoMatches(): { keys: Set<string>; turn: AccountantDemoTurn }[] {
  const rows: { keys: Set<string>; turn: AccountantDemoTurn }[] = [];

  const push = (label: string, turn: AccountantDemoTurn) => {
    rows.push({ keys: new Set(matchKeysForLabel(label)), turn });
  };

  push(accountantDemoStarter.label, {
    answer: accountantDemoStarter.answer,
    source: accountantDemoStarter.source,
    followUps: accountantDemoStarter.followUps,
  });

  const walk = (fus: AIFollowUpConfig[]) => {
    for (const fu of fus) {
      push(fu.label, {
        answer: fu.answer,
        source: fu.source,
        followUps: fu.followUps,
        openReports: fu.openReports,
      });
      if (fu.followUps?.length) walk(fu.followUps);
    }
  };

  if (accountantDemoStarter.followUps?.length) {
    walk(accountantDemoStarter.followUps);
  }

  const aliases: [string, AccountantDemoTurn][] = [
    ['month end walkthrough', { answer: accountantDemoStarter.answer, source: accountantDemoStarter.source, followUps: accountantDemoStarter.followUps }],
    ['month-end walkthrough', { answer: accountantDemoStarter.answer, source: accountantDemoStarter.source, followUps: accountantDemoStarter.followUps }],
    ['demo walkthrough', { answer: accountantDemoStarter.answer, source: accountantDemoStarter.source, followUps: accountantDemoStarter.followUps }],
  ];
  for (const [phrase, turn] of aliases) {
    rows.push({ keys: new Set([normalizeDemoQuery(phrase)]), turn });
  }

  const fu0 = accountantDemoStarter.followUps![0];
  const fu1 = fu0.followUps![0];
  const fu2 = fu1.followUps![0];
  const fu3 = fu2.followUps![0];
  const fu4 = fu3.followUps![0];
  const fu5 = fu4.followUps![0];

  const aliasTurns: { phrases: string[]; turn: AccountantDemoTurn }[] = [
    { phrases: ['overdue in ap', 'ap overdue', 'overdue payables', 'overdue invoices'], turn: { answer: fu0.answer, source: fu0.source, followUps: fu0.followUps } },
    { phrases: ['cash for payables', 'liquidity', 'do we have enough cash', 'cash coverage'], turn: { answer: fu1.answer, source: fu1.source, followUps: fu1.followUps } },
    { phrases: ['vs budget', 'budget variance', 'budget to actual'], turn: { answer: fu2.answer, source: fu2.source, followUps: fu2.followUps } },
    { phrases: ['blocking close', 'month end close', 'unreconciled'], turn: { answer: fu3.answer, source: fu3.source, followUps: fu3.followUps } },
    { phrases: ['tell the board', 'board talking points', 'finance committee'], turn: { answer: fu4.answer, source: fu4.source, followUps: fu4.followUps } },
    { phrases: ['comparative income', 'income statement report'], turn: { answer: fu5.answer, source: fu5.source, followUps: fu5.followUps, openReports: fu5.openReports } },
  ];

  for (const { phrases, turn } of aliasTurns) {
    const keys = new Set<string>();
    for (const p of phrases) {
      const x = normalizeDemoQuery(p);
      if (x) keys.add(x);
    }
    if (keys.size > 0) rows.push({ keys, turn });
  }

  return rows;
}

const ACCOUNTANT_DEMO_MATCH_ROWS = collectDemoMatches();

export function matchAccountantDemoQuestion(raw: string): AccountantDemoTurn | null {
  const n = normalizeDemoQuery(raw);
  if (!n) return null;

  for (const { keys, turn } of ACCOUNTANT_DEMO_MATCH_ROWS) {
    for (const k of keys) {
      if (!k) continue;
      if (n === k) return turn;
      if (k.length >= 10 && n.includes(k)) return turn;
      if (n.length >= 8 && k.length >= n.length && k.includes(n)) return turn;
    }
  }
  return null;
}
