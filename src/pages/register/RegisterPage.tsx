import { useState } from 'react';
import { Table, type TableColumn } from '../../components/Table';
import { SimpleDropdown } from '../../components/SimpleDropdown';
import { transactions, accounts, formatCurrency } from '../../data/mockData';
import type { PageId } from '../../pageIds';

const TRANSACTION_AREA_TABS: { id: string; label: string; target: PageId | null }[] = [
  { id: 'registers', label: 'Registers', target: 'register' },
  { id: 'journal-entry', label: 'Journal Entry', target: null },
  { id: 'accounts-payable', label: 'Accounts Payable', target: 'bills-list' },
  { id: 'accounts-receivable', label: 'Accounts Receivable', target: null },
  { id: 'bank-integration', label: 'Bank Integration', target: null },
  { id: 'bank-reconciliation', label: 'Bank Reconciliation', target: null },
  { id: 'check-print', label: 'Check Print', target: null },
  { id: 'recurring-transactions', label: 'Recurring Transactions', target: null },
];

export interface RegisterPageProps {
  onNavigate?: (page: PageId) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [selectedAccount, setSelectedAccount] = useState('1000 - Checking');

  const accountItems = accounts
    .filter(a => a.type === 'asset')
    .map(a => ({
      label: `${a.number} - ${a.name}`,
      onClick: () => setSelectedAccount(`${a.number} - ${a.name}`),
    }));

  const columns: TableColumn[] = [
    { key: 'date', label: 'Date', sortable: true, width: '100px' },
    { key: 'checkNumber', label: 'Check #', width: '80px', render: (v: string) => <span className="tracking-aplos">{v || ''}</span> },
    { key: 'contact', label: 'Contact', sortable: true },
    { key: 'fundName', label: 'Fund', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      width: '120px',
      render: (v: number) => (
        <span className={`tracking-aplos font-vl-medium ${v < 0 ? 'text-neutral-text' : 'text-success-text-default'}`}>
          {formatCurrency(v)}
        </span>
      ),
    },
    {
      key: 'balance',
      label: 'Balance',
      width: '120px',
      render: (v: number) => <span className="tracking-aplos font-vl-medium">{formatCurrency(v)}</span>,
    },
    {
      key: 'reconciled',
      label: 'R',
      width: '40px',
      render: (v: boolean) => (
        <span className={`tracking-aplos ${v ? 'text-success-text-default' : 'text-neutral-text-weak'}`}>
          {v ? '✓' : ''}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4 -mx-6">
      <nav
        className="-mt-4 border-b border-neutral-border bg-neutral-bg px-6 pt-2 pb-0"
        aria-label="Fund accounting transactions"
      >
        <div className="flex flex-wrap gap-1 -mb-px">
          {TRANSACTION_AREA_TABS.map((tab) => {
            const active = tab.id === 'registers';
            const canNavigate = Boolean(tab.target && onNavigate && tab.target !== 'register');
            return (
              <button
                key={tab.id}
                type="button"
                disabled={!active && !canNavigate}
                onClick={() => {
                  if (tab.target && onNavigate && tab.target !== 'register') {
                    onNavigate(tab.target);
                  }
                }}
                className={`px-3 py-2.5 tracking-aplos rounded-t-lg border-b-2 transition-colors ${
                  active
                    ? 'text-primary-700 font-vl-semibold border-primary-700 bg-primary-bg-default/30'
                    : canNavigate
                      ? 'text-neutral-text-weak border-transparent hover:text-neutral-text hover:bg-neutral-bg-weak'
                      : 'text-neutral-text-weak/80 border-transparent cursor-default'
                }`}
                style={{ fontSize: '13px' }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="px-6 space-y-4">
      <div className="flex items-center justify-between">
        <SimpleDropdown label={selectedAccount} items={accountItems} />
        <div className="flex items-center gap-3">
          <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>
            {transactions.length} transactions
          </span>
        </div>
      </div>

      <Table
        columns={columns}
        data={transactions}
        defaultSort={{ column: 'date', direction: 'desc' }}
      />
      </div>
    </div>
  );
}
