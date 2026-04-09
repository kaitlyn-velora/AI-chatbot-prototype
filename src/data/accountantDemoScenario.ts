import type { AIFollowUpConfig, AIStarterConfig } from '../components/ai/AIAssistantPanel';
import type { ReportsListFilter } from '../types/reportsNavigation';

/**
 * Linear demo for live walkthroughs: open Copilot on Dashboard → tap the first suggestion,
 * then use each “Next step” chip to advance. Aligns with mock AP, budget, and register data.
 */
export const accountantDemoStarter: AIStarterConfig = {
  label: 'Demo: Month-end walkthrough (evidence-first)',
  answer:
    '**Grace Community Church — March 2026 (prototype data)**\n\n' +
    "You’re prepping for finance committee. The **accounting copilot** is **read-only** and **evidence-first** — it summarizes what’s already in Aplos, cites report/screen-level evidence, and can open reports; it won’t post, pay, or approve.\n\n" +
    '**This demo** walks five accountant-style questions: payables → cash → budget → close blockers → board story, then opens a report.\n\n' +
    'Use **Next step** after each answer to continue.',
  source: 'Demo script',
  followUps: [
    {
      label: 'Next: What’s overdue in accounts payable?',
      answer:
        '**AP aging (as of this snapshot)**\n\n' +
        'Two ministry invoices are **past due** — **$2,185** total:\n\n' +
        '• City Power & Light (UTIL-MAR-2026) — **$385**, due 03/25/2026 — approved\n' +
        '• First Baptist Supply (FBS-4421) — **$1,800**, due 03/22/2026 — approved\n\n' +
        'There is also **$1,310** in bills **awaiting approval** (Green Landscaping $900, City Power April $410) — not overdue until approved and dated.\n\n' +
        'Triage approved overdue first so cash planning matches what you can actually pay.',
      source: 'AP Aging (demo)',
      followUps: [
        {
          label: 'Next: Do we have cash to cover near-term payables?',
          answer:
            '**Liquidity check (Checking — operating, demo)**\n\n' +
            'Operating cash **covers** approved outstanding payables (~**$4.9k** total AP) with headroom in this mock set.\n\n' +
            '**Cash needs next ~30 days** if you clear overdue plus near-term approved items: roughly **$4.3k** (includes the $2,185 overdue plus ABC Cleaning $600, Office Depot $1,200, and timing on other approved bills).\n\n' +
            '**Insight:** You’re not “out of cash” on paper — the story for leadership is **discipline on approvals and due dates**, not emergency borrowing (unless your real balances differ).',
          source: 'Cash + AP schedule (demo)',
          followUps: [
            {
              label: 'Next: Where are we vs budget?',
              answer:
                '**Budget to Actual — hotspots (March, demo)**\n\n' +
                '• **Utilities (General)** — about **15% over** budget line ($6,800 actual vs $5,900 budget) — explain weather, timing, or accrual true-ups.\n' +
                '• **Youth Programs** — spend **pace ahead of the calendar**; confirm donor restrictions before reclassing or moving money.\n' +
                '• **Building / capital** — contributions ahead of plan; large expense still weighted to later quarters — align with campaign and board.\n\n' +
                'Missions and Benevolence are **near plan** in this sample — good news for the narrative.',
              source: 'Budget vs Actual (demo)',
              followUps: [
                {
                  label: 'Next: Anything blocking month-end close?',
                  answer:
                    '**Close readiness — register & categorization (demo)**\n\n' +
                    'Before you lock March:\n\n' +
                    '• **3 unreconciled transactions** called out on the register — Office Depot, First Baptist Supply, ABC Cleaning (tie each to bank / card feed).\n' +
                    '• **03/14** — Card **$89.50**, memo “Amazon” — likely **5100 Office Supplies** once receipt matched.\n' +
                    '• **03/22** — Deposit **$240** — **giving batch not linked**; tie to contributions before posting.\n\n' +
                    'Clearing these avoids surprises when the Comparative Income Statement lands on the finance committee packet.',
                  source: 'Register review (demo)',
                  followUps: [
                    {
                      label: 'Next: What do I tell the board?',
                      answer:
                        '**Finance committee / board — 3 talking points (demo)**\n\n' +
                        '1. **Liquidity** — Operating cash supports approved payables; focus on **approval workflow** and **due-date discipline** ($2,185 overdue is a process story).\n' +
                        '2. **Stewardship** — Utilities over line; **Youth** pace vs budget; **Building** contributions vs future draws — separate **restricted vs unrestricted** in your spoken narrative.\n' +
                        '3. **Close quality** — A few **rec items** (uncategorized card, unlinked deposit, reconciliations) — you’re on top of them before final March packet.\n\n' +
                        'Attach: Comparative Income Statement, Budget to Actual, Fund Balance Summary (and balance sheet if your board expects it).',
                      source: 'Reporting checklist (demo)',
                      followUps: [
                        {
                          label: 'Open Comparative Income Statement',
                          answer:
                            'Opening **Comparative Income Statement** in the report runner with March vs prior-period columns (prototype).\n\n' +
                            'Use it to **tie** the story above to line-level support, revenue, and expenses — and to split **by fund** if your board packet is fund-aware.\n\n' +
                            '**Demo complete** — you can start over by closing Copilot and opening this walkthrough again.',
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

  /** Short aliases so free-typing matches without the exact chip label. */
  const aliases: [string, AccountantDemoTurn][] = [
    [
      'month end walkthrough',
      {
        answer: accountantDemoStarter.answer,
        source: accountantDemoStarter.source,
        followUps: accountantDemoStarter.followUps,
      },
    ],
    [
      'month-end walkthrough',
      {
        answer: accountantDemoStarter.answer,
        source: accountantDemoStarter.source,
        followUps: accountantDemoStarter.followUps,
      },
    ],
    [
      'demo walkthrough',
      {
        answer: accountantDemoStarter.answer,
        source: accountantDemoStarter.source,
        followUps: accountantDemoStarter.followUps,
      },
    ],
    [
      'demo: month-end walkthrough with insights',
      {
        answer: accountantDemoStarter.answer,
        source: accountantDemoStarter.source,
        followUps: accountantDemoStarter.followUps,
      },
    ],
  ];
  for (const [phrase, turn] of aliases) {
    rows.push({ keys: new Set([normalizeDemoQuery(phrase)]), turn });
  }

  /** Refs to nested steps for extra free-type phrases (same objects as the live demo tree). */
  const fu0 = accountantDemoStarter.followUps![0];
  const fu1 = fu0.followUps![0];
  const fu2 = fu1.followUps![0];
  const fu3 = fu2.followUps![0];
  const fu4 = fu3.followUps![0];
  const fu5 = fu4.followUps![0];

  const aliasTurns: { phrases: string[]; turn: AccountantDemoTurn }[] = [
    {
      phrases: [
        'overdue in ap',
        'ap overdue',
        'overdue payables',
        'overdue invoices',
        'what is overdue in accounts payable',
        'whats overdue in accounts payable',
      ],
      turn: { answer: fu0.answer, source: fu0.source, followUps: fu0.followUps },
    },
    {
      phrases: [
        'cash for payables',
        'liquidity',
        'do we have enough cash',
        'cash to cover payables',
        'near-term payables',
      ],
      turn: { answer: fu1.answer, source: fu1.source, followUps: fu1.followUps },
    },
    {
      phrases: [
        'vs budget',
        'budget variance',
        'over under budget',
        'where are we on budget',
        'budget to actual',
      ],
      turn: { answer: fu2.answer, source: fu2.source, followUps: fu2.followUps },
    },
    {
      phrases: [
        'blocking close',
        'month end close',
        'month-end close',
        'close the books',
        'unreconciled',
        'reconciliation status',
      ],
      turn: { answer: fu3.answer, source: fu3.source, followUps: fu3.followUps },
    },
    {
      phrases: [
        'tell the board',
        'board talking points',
        'finance committee',
        'what should i tell leadership',
      ],
      turn: { answer: fu4.answer, source: fu4.source, followUps: fu4.followUps },
    },
    {
      phrases: [
        'comparative income',
        'income statement report',
        'open cis',
        'cis report',
      ],
      turn: {
        answer: fu5.answer,
        source: fu5.source,
        followUps: fu5.followUps,
        openReports: fu5.openReports,
      },
    },
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

/** Same scripted answers as the demo chips; supports free-typed questions (normalized match). */
export function matchAccountantDemoQuestion(raw: string): AccountantDemoTurn | null {
  const n = normalizeDemoQuery(raw);
  if (!n) return null;

  for (const { keys, turn } of ACCOUNTANT_DEMO_MATCH_ROWS) {
    for (const k of keys) {
      if (!k) continue;
      if (n === k) return turn;
      /* User typed a superset of the script phrase. */
      if (k.length >= 10 && n.includes(k)) return turn;
      /* User typed a shorter paraphrase that still appears inside the canonical label. */
      if (n.length >= 8 && k.length >= n.length && k.includes(n)) return turn;
    }
  }
  return null;
}
