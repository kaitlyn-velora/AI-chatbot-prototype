import { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { SimpleDropdown } from '../../components/SimpleDropdown';
import { Plus, Trash2, Upload } from 'lucide-react';
import { vendors, funds, accounts, formatCurrency } from '../../data/mockData';

interface AllocationRow {
  id: number;
  account: string;
  fund: string;
  amount: string;
  memo: string;
}

export function NewBillPage() {
  const [allocations, setAllocations] = useState<AllocationRow[]>([
    { id: 1, account: '', fund: '', amount: '', memo: '' },
  ]);

  const addAllocation = () => {
    setAllocations(prev => [...prev, { id: Date.now(), account: '', fund: '', amount: '', memo: '' }]);
  };

  const removeAllocation = (id: number) => {
    if (allocations.length > 1) {
      setAllocations(prev => prev.filter(a => a.id !== id));
    }
  };

  const expenseAccounts = accounts.filter(a => a.type === 'expense');

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main form */}
      <div className="col-span-2 space-y-6">
        {/* Bill details */}
        <Card padding="md">
          <h2 className="text-neutral-text font-vl-semibold tracking-aplos mb-4" style={{ fontSize: '16px' }}>Bill Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-text tracking-aplos mb-1" style={{ fontSize: '14px' }}>Vendor</label>
              <SimpleDropdown
                label="Select vendor..."
                items={vendors.map(v => ({ label: v.name, onClick: () => {} }))}
              />
            </div>
            <div>
              <label className="block text-neutral-text tracking-aplos mb-1" style={{ fontSize: '14px' }}>Invoice Number</label>
              <Input placeholder="e.g. INV-2026-0500" />
            </div>
            <div>
              <label className="block text-neutral-text tracking-aplos mb-1" style={{ fontSize: '14px' }}>Bill Date</label>
              <Input type="date" defaultValue="2026-04-06" />
            </div>
            <div>
              <label className="block text-neutral-text tracking-aplos mb-1" style={{ fontSize: '14px' }}>Due Date</label>
              <Input type="date" defaultValue="2026-05-06" />
            </div>
            <div className="col-span-2">
              <label className="block text-neutral-text tracking-aplos mb-1" style={{ fontSize: '14px' }}>Memo</label>
              <Input placeholder="Optional memo..." />
            </div>
          </div>
        </Card>

        {/* Allocations */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>Allocations</h2>
            <Button variant="secondary" icon={Plus} onClick={addAllocation}>Add Line</Button>
          </div>

          <div className="border border-neutral-border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-bg-weak">
                  <th className="px-3 py-2 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Account</th>
                  <th className="px-3 py-2 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Fund</th>
                  <th className="px-3 py-2 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600, width: '120px' }}>Amount</th>
                  <th className="px-3 py-2 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Memo</th>
                  <th className="px-3 py-2" style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((row) => (
                  <tr key={row.id} className="border-t border-neutral-border">
                    <td className="px-3 py-2">
                      <SimpleDropdown
                        label={row.account || 'Select account...'}
                        items={expenseAccounts.map(a => ({ label: `${a.number} - ${a.name}`, onClick: () => {} }))}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <SimpleDropdown
                        label={row.fund || 'Select fund...'}
                        items={funds.map(f => ({ label: f.name, onClick: () => {} }))}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input placeholder="$0.00" className="text-right" />
                    </td>
                    <td className="px-3 py-2">
                      <Input placeholder="Line memo..." />
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => removeAllocation(row.id)} className="text-neutral-text-weak hover:text-danger-text-default transition-colors">
                        <Trash2 strokeWidth={2} style={{ width: '14px', height: '14px' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-3">
            <span className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>
              Total: {formatCurrency(0)}
            </span>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="tertiary">Save as Draft</Button>
          <Button variant="primary">Submit for Approval</Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card padding="md">
          <h3 className="text-neutral-text font-vl-semibold tracking-aplos mb-3" style={{ fontSize: '14px' }}>Attachments</h3>
          <div className="border-2 border-dashed border-neutral-border rounded-xl p-6 text-center">
            <Upload className="mx-auto text-neutral-text-weak mb-2" strokeWidth={2} style={{ width: '24px', height: '24px' }} />
            <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>
              Drop files here or click to upload
            </p>
            <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '12px' }}>
              PDF, JPG, PNG up to 10MB
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
