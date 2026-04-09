import { Table, type TableColumn } from '../../components/Table';
import { FilterPanel, type FilterDropdown } from '../../components/FilterPanel';
import { Calendar, User, DollarSign, SlidersHorizontal } from 'lucide-react';
import { bills, formatCurrency, getStatusLabel, getStatusColor, getStatusBgColor } from '../../data/mockData';

export function BillsListPage() {
  const filters: FilterDropdown[] = [
    { label: 'Status', value: 'All', icon: SlidersHorizontal, onClick: () => {} },
    { label: 'Vendor', value: 'All', icon: User, onClick: () => {} },
    { label: 'Date Range', value: 'Last 30 days', icon: Calendar, onClick: () => {} },
    { label: 'Amount', value: 'Any', icon: DollarSign, onClick: () => {} },
  ];

  const columns: TableColumn[] = [
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '140px',
      render: (v: string) => (
        <span className={`inline-block px-2 py-1 rounded-button text-center tracking-aplos ${getStatusColor(v)} ${getStatusBgColor(v)}`} style={{ fontSize: '12px' }}>
          {getStatusLabel(v)}
        </span>
      ),
    },
    { key: 'vendorName', label: 'Vendor', sortable: true },
    { key: 'invoiceNumber', label: 'Invoice #', width: '150px' },
    { key: 'billDate', label: 'Bill Date', sortable: true, width: '110px' },
    { key: 'dueDate', label: 'Due Date', sortable: true, width: '110px' },
    { key: 'fundName', label: 'Fund', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      width: '120px',
      render: (v: number) => <span className="tracking-aplos font-vl-medium">{formatCurrency(v)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <FilterPanel filters={filters} />
      <Table
        columns={columns}
        data={bills}
        defaultSort={{ column: 'dueDate', direction: 'asc' }}
      />
    </div>
  );
}
