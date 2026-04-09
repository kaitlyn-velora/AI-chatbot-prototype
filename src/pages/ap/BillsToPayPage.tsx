import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { bills, formatCurrency } from '../../data/mockData';

const payableBills = bills.filter(b => b.status === 'approved' || b.status === 'overdue');

interface VendorGroup {
  vendorName: string;
  bills: typeof payableBills;
  total: number;
}

function groupByVendor(): VendorGroup[] {
  const groups: Record<string, typeof payableBills> = {};
  for (const bill of payableBills) {
    if (!groups[bill.vendorName]) groups[bill.vendorName] = [];
    groups[bill.vendorName].push(bill);
  }
  return Object.entries(groups).map(([vendorName, vendorBills]) => ({
    vendorName,
    bills: vendorBills,
    total: vendorBills.reduce((s, b) => s + b.amount, 0),
  }));
}

export function BillsToPayPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const vendorGroups = groupByVendor();

  const toggleBill = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === payableBills.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(payableBills.map(b => b.id)));
    }
  };

  const selectedTotal = payableBills
    .filter(b => selected.has(b.id))
    .reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={selected.size === payableBills.length && payableBills.length > 0}
              onChange={toggleAll}
            />
            <span className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>
              {selected.size} of {payableBills.length} bills selected
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>
              Total: {formatCurrency(selectedTotal)}
            </span>
            <Button variant="primary" disabled={selected.size === 0}>
              Pay Selected
            </Button>
          </div>
        </div>
      </Card>

      {/* Vendor groups */}
      {vendorGroups.map(group => (
        <Card key={group.vendorName} padding="md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>
              {group.vendorName}
            </h3>
            <span className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>
              {formatCurrency(group.total)}
            </span>
          </div>
          <div className="space-y-2">
            {group.bills.map(bill => (
              <div key={bill.id} className="flex items-center justify-between py-2 border-b border-neutral-border last:border-b-0">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selected.has(bill.id)}
                    onChange={() => toggleBill(bill.id)}
                  />
                  <div>
                    <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{bill.invoiceNumber}</p>
                    <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Due: {bill.dueDate} · {bill.fundName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>{formatCurrency(bill.amount)}</p>
                  {bill.status === 'overdue' && (
                    <span className="text-danger-text-default tracking-aplos" style={{ fontSize: '12px' }}>Overdue</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
