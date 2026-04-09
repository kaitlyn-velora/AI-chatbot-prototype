import { useState } from 'react';
import { Table, type TableColumn } from '../../components/Table';
import { Card } from '../../components/Card';
import { contacts, formatCurrency } from '../../data/mockData';
import type { Contact } from '../../data/mockData';

export function ContactsPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      width: '120px',
      render: (v: string) => (
        <span className="capitalize text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{v}</span>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', width: '140px' },
    {
      key: 'outstanding',
      label: 'Outstanding',
      sortable: true,
      width: '120px',
      render: (v: number) => (
        <span className={`tracking-aplos font-vl-medium ${v > 0 ? 'text-warning-text-default' : 'text-neutral-text-weak'}`}>
          {v > 0 ? formatCurrency(v) : '—'}
        </span>
      ),
    },
    { key: 'lastActivity', label: 'Last Activity', sortable: true, width: '120px' },
    {
      key: 'status',
      label: 'Status',
      width: '90px',
      render: (v: string) => (
        <span className={`inline-block px-2 py-0.5 rounded-button tracking-aplos ${
          v === 'active' ? 'bg-success-bg-default text-success-text-default' : 'bg-neutral-bg-weak text-neutral-text-weak'
        }`} style={{ fontSize: '12px' }}>
          {v === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '14px' }}>
          {contacts.length} contacts
        </span>
      </div>

      <div className={selectedContact ? 'grid grid-cols-3 gap-6' : ''}>
        <div className={selectedContact ? 'col-span-2' : ''}>
          <Table
            columns={columns}
            data={contacts}
            defaultSort={{ column: 'name', direction: 'asc' }}
          />
        </div>

        {selectedContact && (
          <div className="space-y-4">
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>{selectedContact.name}</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-neutral-text-weak hover:text-neutral-text tracking-aplos transition-colors"
                  style={{ fontSize: '12px' }}
                >
                  Close
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Type</p>
                  <p className="text-neutral-text tracking-aplos capitalize" style={{ fontSize: '14px' }}>{selectedContact.type}</p>
                </div>
                <div>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Email</p>
                  <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Phone</p>
                  <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{selectedContact.phone}</p>
                </div>
                <div className="border-t border-neutral-border pt-3">
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Outstanding</p>
                  <p className={`font-vl-semibold tracking-aplos ${selectedContact.outstanding > 0 ? 'text-warning-text-default' : 'text-neutral-text'}`} style={{ fontSize: '20px' }}>
                    {selectedContact.outstanding > 0 ? formatCurrency(selectedContact.outstanding) : '$0.00'}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Lifetime Total</p>
                  <p className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>{formatCurrency(selectedContact.totalLifetime)}</p>
                </div>
                <div>
                  <p className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>Last Activity</p>
                  <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px' }}>{selectedContact.lastActivity}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
