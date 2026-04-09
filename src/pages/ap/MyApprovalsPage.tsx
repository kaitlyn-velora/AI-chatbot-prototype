import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { CheckCircle, XCircle } from 'lucide-react';
import { bills, formatCurrency } from '../../data/mockData';

const pendingBills = bills.filter(b => b.status === 'pending-approval');

export function MyApprovalsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleBill = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === pendingBills.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pendingBills.map(b => b.id)));
    }
  };

  return (
    <div className="space-y-4">
      {/* Batch actions */}
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={selected.size === pendingBills.length && pendingBills.length > 0}
              onChange={toggleAll}
            />
            <span className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>
              {selected.size} of {pendingBills.length} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="tertiary" icon={XCircle} disabled={selected.size === 0}>
              Reject
            </Button>
            <Button variant="primary" icon={CheckCircle} disabled={selected.size === 0}>
              Approve Selected
            </Button>
          </div>
        </div>
      </Card>

      {/* Approval list */}
      {pendingBills.map(bill => (
        <Card key={bill.id} padding="md">
          <div className="flex items-start gap-4">
            <Checkbox
              checked={selected.has(bill.id)}
              onChange={() => toggleBill(bill.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>{bill.vendorName}</p>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>{bill.invoiceNumber} · Due {bill.dueDate}</p>
                </div>
                <p className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '18px' }}>{formatCurrency(bill.amount)}</p>
              </div>

              {/* Allocations preview */}
              {bill.allocations.length > 0 && (
                <div className="mt-2 space-y-1">
                  {bill.allocations.map((alloc, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>
                        {alloc.accountName} · {alloc.fundName}
                      </span>
                      <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>
                        {formatCurrency(alloc.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Approval chain */}
              <div className="mt-3 flex items-center gap-2">
                {bill.approvalHistory.map((step, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-button bg-warning-bg-default text-warning-text-default tracking-aplos"
                    style={{ fontSize: '11px' }}
                  >
                    Waiting: {step.approver}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
