import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { formatAplosCurrency, dashboardCashSeries } from '../data/mockData';
import { Checkbox } from '../components/Checkbox';
import type { AppNavigateFn, AppOpenReportsFn } from '../types/insightHandoff';

export interface DashboardPageProps {
  onNavigate?: AppNavigateFn;
  onOpenReportsFiltered?: AppOpenReportsFn;
}

const incomeExpenseBars = [
  { name: 'Jul', value: -120000000 },
  { name: 'Aug', value: -180000000 },
  { name: 'Sep', value: -95000000 },
  { name: 'Oct', value: -210000000 },
  { name: 'Nov', value: -140000000 },
  { name: 'Dec', value: -190000000 },
];

const expensePie = [
  { name: 'Programs', value: 45 },
  { name: 'Admin', value: 30 },
  { name: 'Fundraising', value: 15 },
  { name: 'Other', value: 10 },
];

const PIE_COLORS = [
  'var(--vl-color-primary-700)',
  'var(--vl-color-primary-500)',
  'var(--vl-color-primary-300)',
  'var(--vl-color-primary-200)',
];

export function DashboardPage({ onNavigate, onOpenReportsFiltered }: DashboardPageProps = {}) {
  const [cashFilter, setCashFilter] = useState<'90' | '6m' | 'ytd'>('6m');

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Entity + KPI row */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-border bg-neutral-bg-weak px-4 py-3 shrink-0">
            <div
              className="rounded-full bg-primary-bg-default border border-primary-border-default flex items-center justify-center text-primary-700 font-vl-semibold shrink-0"
              style={{ width: 48, height: 48, fontSize: '18px' }}
            >
              T
            </div>
            <span className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '20px', lineHeight: '28px' }}>
              TEST ABC
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1 lg:grid-cols-4">
            {[
              { label: 'TOTAL CASH BALANCE', value: -1000026307, sub: null },
              { label: 'NET INCOME / YEAR', value: -1090153649, sub: 'Year to Date' },
              { label: 'NET INCOME / MONTH', value: -1110, sub: 'Last Month' },
              { label: 'ENGAGED DONORS', value: 0, sub: null, plain: true },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-neutral-border bg-neutral-bg-weak px-4 py-3">
                <p className="text-neutral-text-weak tracking-aplos uppercase font-vl-medium" style={{ fontSize: '11px', lineHeight: '16px' }}>
                  {k.label}
                </p>
                <p className="text-primary-900 font-vl-semibold tracking-aplos mt-1" style={{ fontSize: '22px', lineHeight: '28px' }}>
                  {k.plain ? String(k.value) : formatAplosCurrency(k.value as number)}
                </p>
                {k.sub && (
                  <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '12px' }}>
                    {k.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cash balance */}
        <section className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-border px-4 py-3">
            <h2 className="text-neutral-text-weak tracking-aplos font-vl-semibold uppercase" style={{ fontSize: '12px', letterSpacing: '0.04em' }}>
              Cash balance
            </h2>
            <button
              type="button"
              className="h-btn px-4 rounded-button bg-btn-primary text-btn-primary-text tracking-aplos font-vl-medium hover:bg-btn-primary-hover transition-colors"
              style={{ fontSize: '13px' }}
            >
              View reports
            </button>
          </div>
          <div className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-h-[240px] min-w-0 text-primary-800">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={dashboardCashSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--vl-color-border-neutral-default)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--vl-color-text-neutral-weak)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--vl-color-text-neutral-weak)' }} tickFormatter={(v) => `${v / 1e6}M`} width={48} />
                  <Tooltip
                    formatter={(value) => [
                      typeof value === 'number' ? formatAplosCurrency(value) : String(value ?? ''),
                      '',
                    ]}
                    contentStyle={{ borderRadius: 8, border: '1px solid var(--vl-color-border-neutral-default)' }}
                  />
                  <Line type="monotone" dataKey="checking" name="1000.900 — Checking" stroke="var(--vl-color-primary-800)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="savings" name="1010 — Savings" stroke="var(--vl-color-bg-warning-strong-active)" strokeWidth={2} dot={false} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:w-52 shrink-0 flex flex-col justify-center gap-2 border-t lg:border-t-0 lg:border-l border-neutral-border pt-4 lg:pt-0 lg:pl-4">
              <p className="font-vl-semibold tracking-aplos" style={{ fontSize: '24px', color: 'var(--vl-color-bg-warning-strong-active)' }}>
                {formatAplosCurrency(-1000025407)}
              </p>
              <p className="text-primary-700 font-vl-medium tracking-aplos" style={{ fontSize: '15px' }}>
                {formatAplosCurrency(-13147)}
              </p>
              <p className="font-vl-medium tracking-aplos" style={{ fontSize: '15px', color: 'var(--vl-color-bg-warning-strong-active)' }}>
                {formatAplosCurrency(-1000012260)}
              </p>
              <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '11px' }}>
                Checking / Savings
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 px-4 py-3 border-t border-neutral-border bg-neutral-bg">
            {(
              [
                { id: '90' as const, label: 'Last 90 Days' },
                { id: '6m' as const, label: 'Last 6 Months' },
                { id: 'ytd' as const, label: 'Year to Date' },
              ]
            ).map((f) => (
              <label key={f.id} className="flex items-center gap-2 text-neutral-text tracking-aplos cursor-pointer" style={{ fontSize: '13px' }}>
                <Checkbox
                  checked={cashFilter === f.id}
                  onChange={(e) => {
                    if (e.target.checked) setCashFilter(f.id);
                  }}
                />
                {f.label}
              </label>
            ))}
          </div>
        </section>

        {/* Bottom charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-border px-4 py-3">
              <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
                Income expense
              </h2>
              <button
                type="button"
                className="h-btn px-3 rounded-button bg-btn-primary text-btn-primary-text tracking-aplos text-sm font-vl-medium hover:bg-btn-primary-hover"
              >
                View reports
              </button>
            </div>
            <div className="p-4 h-56 text-primary-800">
              <p className="text-primary-900 font-vl-semibold tracking-aplos mb-2" style={{ fontSize: '18px' }}>
                {formatAplosCurrency(-1090102649)}
              </p>
              <p className="text-neutral-text-weak tracking-aplos mb-2" style={{ fontSize: '12px' }}>
                Total accumulated
              </p>
              <ResponsiveContainer width="100%" height="70%">
                <BarChart data={incomeExpenseBars} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--vl-color-border-neutral-default)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--vl-color-text-neutral-weak)' }} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="var(--vl-color-primary-600)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-border px-4 py-3">
              <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
                Expense breakout
              </h2>
              <button
                type="button"
                className="h-btn px-3 rounded-button bg-btn-primary text-btn-primary-text tracking-aplos text-sm font-vl-medium hover:bg-btn-primary-hover"
              >
                View reports
              </button>
            </div>
            <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expensePie} dataKey="value" innerRadius={50} outerRadius={72} paddingAngle={2}>
                      {expensePie.map((_, i) => (
                        <Cell key={expensePie[i].name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-primary-900 font-vl-semibold tracking-aplos" style={{ fontSize: '20px' }}>
                  $1,090,124,649
                </p>
                <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '12px' }}>
                  Total expenses (mock)
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right rail */}
      <aside className="w-full shrink-0 lg:w-[280px] space-y-4">
        <div className="rounded-xl border border-warning-border-default bg-warning-bg-default p-4">
          <h3 className="text-warning-text-strong font-vl-semibold tracking-aplos" style={{ fontSize: '15px' }}>
            You&apos;re on a Free Trial Account
          </h3>
          <p className="text-warning-text-default tracking-aplos mt-2" style={{ fontSize: '13px', lineHeight: '20px' }}>
            Enjoy full access to Aplos during your trial. Subscribe anytime to keep your data and continue without interruption.
          </p>
          <button
            type="button"
            className="mt-4 w-full h-btn rounded-button bg-warning-bg-strong text-warning-text-strong font-vl-semibold tracking-aplos hover:opacity-90 transition-opacity"
            style={{ fontSize: '14px' }}
          >
            Subscribe Now
          </button>
          <p className="text-warning-text-default tracking-aplos mt-2 text-center" style={{ fontSize: '12px' }}>
            603 days left
          </p>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-bg-weak p-4">
          <h3 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
            Accounting copilot
          </h3>
          <p className="text-neutral-text-weak tracking-aplos mt-2" style={{ fontSize: '12px', lineHeight: 1.45 }}>
            Evidence-first answers with cited reports and screens. Open <span className="text-neutral-text font-vl-medium">Copilot</span> from the header — proactive insight cards are off in this prototype.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
          <div className="px-3 py-2 bg-neutral-bg border-b border-neutral-border">
            <h3 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
              Accounts Payable
            </h3>
            <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '12px', lineHeight: 1.45 }}>
              Next outflows — confirm cash and approvals before they leave the bank.
            </p>
          </div>
          <ul className="p-3 space-y-3 text-neutral-text tracking-aplos" style={{ fontSize: '13px', lineHeight: '20px' }}>
            <li>
              <span className="font-vl-semibold text-neutral-text">$2,222.00</span>
              <span className="text-neutral-text-weak"> · due Dec 2, 2025</span>
              <br />
              <span className="text-neutral-text-weak" style={{ fontSize: '12px' }}>
                Office Depot — approved, ready for Bills to Pay
              </span>
            </li>
            <li>
              <span className="font-vl-semibold text-neutral-text">$100.00</span>
              <span className="text-neutral-text-weak"> · due Jan 21, 2026</span>
              <br />
              <span className="text-neutral-text-weak" style={{ fontSize: '12px' }}>
                ABC Cleaning — scheduled; no approval hold
              </span>
            </li>
          </ul>
          <div className="px-3 pb-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('bills-to-pay')}
              className="text-left text-primary-700 font-vl-medium tracking-aplos hover:underline"
              style={{ fontSize: '13px' }}
            >
              Open Bills to Pay →
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('bills-list')}
              className="text-left text-neutral-text-weak tracking-aplos hover:text-neutral-text hover:underline"
              style={{ fontSize: '12px' }}
            >
              12 more scheduled / outstanding…
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
          <div className="px-3 py-2 bg-neutral-bg border-b border-neutral-border">
            <h3 className="text-neutral-text-weak font-vl-semibold tracking-aplos uppercase" style={{ fontSize: '11px' }}>
              Accounts Receivable
            </h3>
          </div>
          <p className="p-3 text-neutral-text-weak tracking-aplos" style={{ fontSize: '13px' }}>
            No open receivables in this prototype.
          </p>
        </div>
      </aside>
    </div>
  );
}
