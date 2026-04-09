import { Fragment } from 'react';
import { ChevronLeft, ChevronDown, Share2, Download, Pencil } from 'lucide-react';
import { Button } from '../../components/Button';
import { reportRunTitle, isComparativeIncomeReport } from '../../data/reportRunRegistry';

function FilterPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 min-w-0 max-w-full items-center gap-1.5 rounded-button border border-neutral-border-strong bg-neutral-bg px-3 text-neutral-text tracking-aplos hover:bg-neutral-bg-hover"
      style={{ fontSize: '13px' }}
    >
      <span className="truncate">{label}</span>
      <ChevronDown className="w-4 h-4 shrink-0 text-neutral-text-weak" strokeWidth={2} />
    </button>
  );
}

interface ComparativeRow {
  number: string;
  name: string;
  current: string;
  q2Amt: string;
  q2Var: string;
  q1Amt: string;
  q1Var: string;
  strong?: boolean;
}

const comparativeIncomeRows: { section: string; rows: ComparativeRow[] }[] = [
  {
    section: 'Income',
    rows: [
      { number: '4000', name: 'Contributions income', current: '$0.00', q2Amt: '$0.00', q2Var: '$0.00', q1Amt: '$0.00', q1Var: '$0.00' },
      { number: '4100', name: 'Building Grant Income', current: '$0.00', q2Amt: '$0.00', q2Var: '$0.00', q1Amt: '$0.00', q1Var: '$0.00' },
      { number: '4200', name: 'Interest Earned', current: '$0.00', q2Amt: '$0.00', q2Var: '$0.00', q1Amt: '$0.00', q1Var: '$0.00' },
      {
        number: '',
        name: 'Total Income',
        current: '$0.00',
        q2Amt: '$0.00',
        q2Var: '$0.00',
        q1Amt: '$0.00',
        q1Var: '$0.00',
        strong: true,
      },
    ],
  },
  {
    section: 'Expense',
    rows: [
      { number: '5000', name: 'Salaries', current: '$2,500.00', q2Amt: '$1,090,102,649.00', q2Var: '($12,000.00)', q1Amt: '$1,090,114,649.00', q1Var: '$0.00' },
      { number: '5100', name: 'Rent', current: '$200.00', q2Amt: '$48,000.00', q2Var: '$0.00', q1Amt: '$48,000.00', q1Var: '$0.00' },
      { number: '5200', name: 'Bank Fees', current: '$27.00', q2Amt: '$450.00', q2Var: '$0.00', q1Amt: '$450.00', q1Var: '$0.00' },
      { number: '5300', name: 'Office Supplies', current: '$50.00', q2Amt: '$12,200.00', q2Var: '$0.00', q1Amt: '$12,200.00', q1Var: '$0.00' },
      {
        number: '',
        name: 'Total Expense',
        current: '$2,777.00',
        q2Amt: '$1,090,163,299.00',
        q2Var: '($12,000.00)',
        q1Amt: '$1,090,175,299.00',
        q1Var: '$0.00',
        strong: true,
      },
    ],
  },
];

export interface ReportRunPageProps {
  reportId: string;
  onBack: () => void;
}

export function ReportRunPage({ reportId, onBack }: ReportRunPageProps) {
  const title = reportRunTitle(reportId);
  const showComparative = isComparativeIncomeReport(reportId);

  return (
    <div className="space-y-4 -mx-2">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-primary-700 font-vl-medium tracking-aplos hover:underline"
        style={{ fontSize: '14px' }}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        Back to reports
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '24px', lineHeight: '32px' }}>
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-btn items-center gap-1.5 rounded-button border border-neutral-border-strong bg-neutral-bg px-4 text-neutral-text tracking-aplos hover:bg-neutral-bg-hover"
            style={{ fontSize: '13px' }}
          >
            <Share2 className="w-icon h-icon text-primary-700" strokeWidth={2} />
            Share
          </button>
          <button
            type="button"
            className="inline-flex h-btn items-center gap-1.5 rounded-button border border-neutral-border-strong bg-neutral-bg px-4 text-neutral-text tracking-aplos hover:bg-neutral-bg-hover"
            style={{ fontSize: '13px' }}
          >
            <Download className="w-icon h-icon text-primary-700" strokeWidth={2} />
            Export
          </button>
          <Button variant="primary" type="button">
            Save Report
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterPill label="This month to date" />
          <FilterPill label="Comparing quarters" />
          <FilterPill label="Accrual" />
          <FilterPill label="Filter by accounts" />
          <FilterPill label="Filter by funds" />
          <FilterPill label="Filter by tags" />
        </div>
        <button
          type="button"
          className="h-btn rounded-button border border-neutral-border-strong bg-neutral-bg px-4 text-neutral-text tracking-aplos hover:bg-neutral-bg-hover"
          style={{ fontSize: '13px' }}
        >
          Customize
        </button>
      </div>

      {showComparative ? (
        <div className="rounded-xl border border-neutral-border bg-neutral-bg overflow-hidden">
          <div className="border-b border-neutral-border px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-bg-default text-primary-700 font-vl-semibold border border-primary-border-default"
                style={{ fontSize: '18px' }}
              >
                T
              </div>
              <div className="min-w-0">
                <p className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '18px' }}>
                  TEST ABC
                </p>
                <p className="text-neutral-text tracking-aplos mt-1 flex items-center gap-2 flex-wrap" style={{ fontSize: '15px' }}>
                  <span className="font-vl-medium">{title}</span>
                  <button type="button" className="text-primary-700 p-0.5 rounded-button hover:bg-primary-bg-default" aria-label="Edit report title">
                    <Pencil className="w-4 h-4" strokeWidth={2} />
                  </button>
                </p>
                <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '13px' }}>
                  for the period of 04/01/2026 to 04/07/2026
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left tracking-aplos">
              <thead>
                <tr className="border-b border-neutral-border bg-neutral-bg-weak">
                  <th className="px-4 py-3 text-neutral-text-weak font-vl-semibold" style={{ fontSize: '11px', width: '100px' }}>
                    Account #
                  </th>
                  <th className="px-4 py-3 text-neutral-text-weak font-vl-semibold" style={{ fontSize: '11px' }}>
                    Account name
                  </th>
                  <th className="px-4 py-3 text-neutral-text-weak font-vl-semibold text-right" style={{ fontSize: '11px' }}>
                    Amount
                  </th>
                  <th className="px-4 py-3 text-neutral-text-weak font-vl-semibold text-right border-l border-neutral-border" style={{ fontSize: '11px' }} colSpan={2}>
                    FY 2026 Q2
                  </th>
                  <th className="px-4 py-3 text-neutral-text-weak font-vl-semibold text-right border-l border-neutral-border" style={{ fontSize: '11px' }} colSpan={2}>
                    FY 2026 Q1
                  </th>
                </tr>
                <tr className="border-b border-neutral-border bg-neutral-bg text-neutral-text-weak" style={{ fontSize: '11px' }}>
                  <th className="px-4 py-2" colSpan={2} />
                  <th className="px-4 py-2 text-right font-vl-medium" />
                  <th className="px-4 py-2 text-right font-vl-medium border-l border-neutral-border">Amount</th>
                  <th className="px-4 py-2 text-right font-vl-medium">Variance $</th>
                  <th className="px-4 py-2 text-right font-vl-medium border-l border-neutral-border">Amount</th>
                  <th className="px-4 py-2 text-right font-vl-medium">Variance $</th>
                </tr>
              </thead>
              <tbody className="text-neutral-text" style={{ fontSize: '13px' }}>
                {comparativeIncomeRows.map((block) => (
                  <Fragment key={block.section}>
                    <tr className="bg-primary-bg-default/50">
                      <td colSpan={7} className="px-4 py-2 font-vl-semibold text-primary-900" style={{ fontSize: '12px' }}>
                        {block.section}
                      </td>
                    </tr>
                    {block.rows.map((row, idx) => (
                      <tr key={`${block.section}-${idx}`} className="border-b border-neutral-border hover:bg-neutral-bg-weak/80">
                        <td className="px-4 py-2.5 text-neutral-text-weak font-mono tabular-nums">{row.number}</td>
                        <td className={`px-4 py-2.5 ${row.strong ? 'font-vl-semibold' : ''}`}>{row.name}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.current}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums border-l border-neutral-border">{row.q2Amt}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.q2Var}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums border-l border-neutral-border">{row.q1Amt}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.q1Var}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr className="border-t-2 border-neutral-border bg-neutral-bg-weak">
                  <td colSpan={2} className="px-4 py-3 font-vl-semibold">
                    Net Income (Loss)
                  </td>
                  <td className="px-4 py-3 text-right font-vl-semibold tabular-nums">($2,777.00)</td>
                  <td className="px-4 py-3 text-right font-vl-semibold tabular-nums border-l border-neutral-border">($1,090,163,299.00)</td>
                  <td className="px-4 py-3 text-right font-vl-semibold tabular-nums">$12,000.00</td>
                  <td className="px-4 py-3 text-right font-vl-semibold tabular-nums border-l border-neutral-border">($1,090,175,299.00)</td>
                  <td className="px-4 py-3 text-right font-vl-semibold tabular-nums">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-border bg-neutral-bg-weak px-6 py-12 text-center">
          <p className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>
            {title}
          </p>
          <p className="text-neutral-text-weak tracking-aplos mt-2 max-w-md mx-auto" style={{ fontSize: '14px' }}>
            This prototype includes a full runner for the Comparative Income Statement. Other reports would load real data from Aplos here using the same header, filters, and export actions.
          </p>
        </div>
      )}
    </div>
  );
}
