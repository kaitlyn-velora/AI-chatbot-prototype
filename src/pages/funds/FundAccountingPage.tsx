import { useState } from 'react';
import { Building2, ChevronDown, GripVertical, Settings } from 'lucide-react';
import { coaFundRows, coaAccountRows } from '../../data/mockData';

const tabs = ['Account List', 'Tags', 'Starting Balances', 'Budgeting', '1099s', 'Segments'] as const;

function fundClass(variant: (typeof coaFundRows)[0]['variant']): string {
  switch (variant) {
    case 'bold':
      return 'text-neutral-text font-vl-semibold';
    case 'orange':
      return 'text-warning-text-default font-vl-medium';
    case 'green':
      return 'text-success-text-default font-vl-medium';
    case 'purple':
      return 'font-vl-medium text-[var(--vl-color-accent1-900)]';
    default:
      return 'text-neutral-text';
  }
}

export function FundAccountingPage() {
  const [currentAssetsOpen, setCurrentAssetsOpen] = useState(true);

  return (
    <div className="space-y-4 -mx-2">
      {/* Sub-nav */}
      <div className="flex flex-wrap items-center gap-1 border-b border-neutral-border pb-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`px-3 py-2 tracking-aplos rounded-t-lg border-b-2 transition-colors ${
              t === 'Account List'
                ? 'text-primary-700 font-vl-semibold border-primary-700 bg-primary-bg-default/30'
                : 'text-neutral-text-weak border-transparent hover:text-neutral-text hover:bg-neutral-bg-weak'
            }`}
            style={{ fontSize: '13px' }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '24px', lineHeight: '32px' }}>
            Chart of Accounts
          </h1>
          <button type="button" className="text-primary-700 p-1 rounded-button hover:bg-primary-bg-default" aria-label="Settings">
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="text-primary-700 font-vl-medium tracking-aplos hover:underline" style={{ fontSize: '13px' }}>
            What is this?
          </button>
          <button type="button" className="text-primary-700 font-vl-medium tracking-aplos hover:underline" style={{ fontSize: '13px' }}>
            Show me advanced options
          </button>
        </div>
      </div>

      {/* Funds */}
      <section className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
        <div className="px-4 py-2 bg-primary-700 text-white font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
          Funds
        </div>
        <ul className="divide-y divide-neutral-border bg-neutral-bg">
          {coaFundRows.map((row) => (
            <li key={row.id} className={`px-4 py-2.5 tracking-aplos ${fundClass(row.variant)}`} style={{ fontSize: '14px' }}>
              {row.name}
            </li>
          ))}
        </ul>
        <div className="p-3 border-t border-neutral-border bg-neutral-bg">
          <button
            type="button"
            className="h-btn px-4 rounded-button bg-btn-primary text-btn-primary-text tracking-aplos font-vl-medium text-sm hover:bg-btn-primary-hover"
          >
            + Add fund
          </button>
        </div>
      </section>

      {/* Accounts */}
      <section className="rounded-xl border border-neutral-border bg-neutral-bg-weak overflow-hidden">
        <div className="px-4 py-2 bg-neutral-bg-weak border-b border-neutral-border">
          <span className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '13px' }}>
            Accounts
          </span>
        </div>
        <div className="px-4 py-2 bg-primary-700 text-white font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
          Asset
        </div>
        <button
          type="button"
          onClick={() => setCurrentAssetsOpen(!currentAssetsOpen)}
          className="w-full flex items-center gap-2 px-4 py-2.5 bg-neutral-bg-weak border-b border-neutral-border text-left text-neutral-text tracking-aplos hover:bg-neutral-bg"
          style={{ fontSize: '13px' }}
        >
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${currentAssetsOpen ? '' : '-rotate-90'}`} strokeWidth={2} />
          <span className="font-vl-medium">Current Assets</span>
        </button>
        {currentAssetsOpen && (
          <ul className="bg-neutral-bg">
            {coaAccountRows.map((row) => (
              <li
                key={row.id}
                className="flex items-center gap-2 border-b border-neutral-border last:border-0 px-2 py-2 text-neutral-text tracking-aplos"
                style={{ fontSize: '14px', paddingLeft: `${12 + row.indent * 16}px` }}
              >
                <GripVertical className="w-4 h-4 text-neutral-text-weak shrink-0" strokeWidth={2} />
                <span>
                  {row.code} — {row.name}
                </span>
                {row.bank && <Building2 className="w-4 h-4 text-neutral-text-weak ml-auto shrink-0" strokeWidth={2} />}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
