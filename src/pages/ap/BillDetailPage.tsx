import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { bills, formatCurrency, getStatusLabel, getStatusColor, getStatusBgColor } from '../../data/mockData';
import { CheckCircle, Clock, FileText } from 'lucide-react';

export function BillDetailPage() {
  const bill = bills[0]; // INV-2026-0412

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-block px-3 py-1 rounded-button tracking-aplos ${getStatusColor(bill.status)} ${getStatusBgColor(bill.status)}`} style={{ fontSize: '13px' }}>
            {getStatusLabel(bill.status)}
          </span>
          <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>
            Invoice: {bill.invoiceNumber}
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="tertiary">Void</Button>
          <Button variant="primary">Pay Bill</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main info */}
        <div className="col-span-2 space-y-6">
          {/* Bill details card */}
          <Card padding="md">
            <h2 className="text-neutral-text font-vl-semibold tracking-aplos mb-4" style={{ fontSize: '16px' }}>Bill Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Vendor</p>
                <p className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>{bill.vendorName}</p>
              </div>
              <div>
                <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Amount</p>
                <p className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '20px' }}>{formatCurrency(bill.amount)}</p>
              </div>
              <div>
                <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Bill Date</p>
                <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{bill.billDate}</p>
              </div>
              <div>
                <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Due Date</p>
                <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{bill.dueDate}</p>
              </div>
            </div>
          </Card>

          {/* Allocations */}
          <Card padding="md">
            <h2 className="text-neutral-text font-vl-semibold tracking-aplos mb-4" style={{ fontSize: '16px' }}>Allocations</h2>
            <div className="border border-neutral-border rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-bg-weak">
                    <th className="px-4 py-3 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Account</th>
                    <th className="px-4 py-3 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Fund</th>
                    <th className="px-4 py-3 text-left text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600 }}>Memo</th>
                    <th className="px-4 py-3 text-right text-neutral-text tracking-aplos" style={{ fontSize: '12px', fontWeight: 600, width: '120px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.allocations.map((alloc, i) => (
                    <tr key={i} className="border-t border-neutral-border">
                      <td className="px-4 py-3 text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{alloc.accountName}</td>
                      <td className="px-4 py-3 text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{alloc.fundName}</td>
                      <td className="px-4 py-3 text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>{alloc.memo}</td>
                      <td className="px-4 py-3 text-right text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>{formatCurrency(alloc.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-neutral-border bg-neutral-bg-weak">
                    <td colSpan={3} className="px-4 py-3 text-right text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>Total</td>
                    <td className="px-4 py-3 text-right text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '14px' }}>{formatCurrency(bill.amount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Approval timeline */}
          <Card padding="md">
            <h3 className="text-neutral-text font-vl-semibold tracking-aplos mb-4" style={{ fontSize: '14px' }}>Approval Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary-bg-default p-1">
                  <FileText className="text-primary-700" strokeWidth={2} style={{ width: '12px', height: '12px' }} />
                </div>
                <div>
                  <p className="text-neutral-text tracking-aplos" style={{ fontSize: '13px' }}>Bill created</p>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>{bill.billDate}</p>
                </div>
              </div>
              {bill.approvalHistory.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1 rounded-full p-1 ${step.action === 'approved' ? 'bg-success-bg-default' : step.action === 'pending' ? 'bg-warning-bg-default' : 'bg-danger-bg-default'}`}>
                    {step.action === 'approved' ? (
                      <CheckCircle className="text-success-text-default" strokeWidth={2} style={{ width: '12px', height: '12px' }} />
                    ) : (
                      <Clock className="text-warning-text-default" strokeWidth={2} style={{ width: '12px', height: '12px' }} />
                    )}
                  </div>
                  <div>
                    <p className="text-neutral-text tracking-aplos" style={{ fontSize: '13px' }}>
                      {step.action === 'approved' ? 'Approved' : 'Pending'} — {step.approver}
                    </p>
                    {step.date && <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>{step.date}</p>}
                    {step.note && <p className="text-neutral-text-weak tracking-aplos italic" style={{ fontSize: '12px' }}>"{step.note}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment history */}
          <Card padding="md">
            <h3 className="text-neutral-text font-vl-semibold tracking-aplos mb-3" style={{ fontSize: '14px' }}>Payment History</h3>
            {bill.paidDate ? (
              <div>
                <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>Paid {formatCurrency(bill.paidAmount ?? 0)}</p>
                <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>on {bill.paidDate}</p>
              </div>
            ) : (
              <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>Not yet paid</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
