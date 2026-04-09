/**
 * ComponentShowcase - Design System Reference Page
 * 
 * IMPORTANT: This page is a reference showcase for the Aplos design system components.
 * 
 * Rules:
 * - Do NOT add new features or prototype work to this page
 * - Create new pages for new features/prototypes instead
 * - Only update this page when design system components themselves change
 * - All component updates should be made at the component level (e.g., Button.tsx)
 *   so changes propagate automatically to all usages including this showcase
 * 
 * This page demonstrates all available components and their usage patterns.
 * It should remain in a "vacuum" - a stable reference for the design system.
 */

import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { Navigation } from '../components/Navigation';
import { TypographyShowcase } from '../components/TypographyShowcase';
import { 
  Settings, 
  BarChart3,
  Users,
  MessageCircle,
  Sparkles,
  Plus,
  CheckCircle2,
  XCircle,
  Calendar,
  LayoutGrid,
  HelpCircle,
  User,
  ThumbsUp,
  Bug,
  ArrowLeftRight,
  LogOut,
  Mail,
  Upload,
  FileText,
  DollarSign,
  Building,
  Tag,
  Move,
  Edit,
  Copy,
  X,
  Paperclip,
  Trash2
} from 'lucide-react';
import { TertiaryNavigation, TertiaryNavItem, OrgDropdownItem } from '../components/TertiaryNavigation';
import { CustomizePanel } from '../components/CustomizePanel';
import { FilterPanel, type FilterDropdown } from '../components/FilterPanel';
import { SimpleDropdown, type SimpleDropdownItem } from '../components/SimpleDropdown';
import { TextLink } from '../components/TextLink';
import { InlineTextEdit } from '../components/InlineTextEdit';
import { Checkbox } from '../components/Checkbox';
import { Table, type TableColumn, type TableActionMenuItem } from '../components/Table';
import { VELORA_COLOR_TOKENS } from '../data/veloraColorTokens';
import type { PageId } from '../pageIds';

export function ComponentShowcase() {
  const [demoNavPage, setDemoNavPage] = useState<PageId>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isCustomizePanelOpen, setIsCustomizePanelOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('February Income Statement');

  const bookmarks = [
    { label: 'Income Statement', onClick: () => console.log('Income Statement') },
    { label: 'General Ledger', onClick: () => console.log('General Ledger') },
    { label: 'Register', onClick: () => console.log('Register') },
    { label: 'Accounts Payable', onClick: () => console.log('Accounts Payable') },
    { label: 'Accounts Receivable', onClick: () => console.log('Accounts Receivable') },
  ];

  const tertiaryNavItems: TertiaryNavItem[] = [
    {
      label: 'Dashboard',
      onClick: () => console.log('Dashboard'),
      isActive: true,
      leftIcon: Calendar,
      rightIcon: LayoutGrid,
    },
  ];

  const orgDropdownItems: OrgDropdownItem[] = [
    {
      label: 'Oregon Ministry Network',
      icon: User,
      onClick: () => {},
      isHeader: true,
    },
    {
      label: 'Support Center',
      icon: HelpCircle,
      onClick: () => console.log('Support Center'),
    },
    {
      label: 'My Profile',
      icon: User,
      onClick: () => console.log('My Profile'),
    },
    {
      label: 'My Aplos',
      icon: LayoutGrid,
      onClick: () => console.log('My Aplos'),
    },
    {
      label: 'My Approvals',
      icon: ThumbsUp,
      onClick: () => console.log('My Approvals'),
    },
    {
      label: 'Debug Console',
      icon: Bug,
      onClick: () => console.log('Debug Console'),
      isDanger: true,
    },
    {
      label: 'separator',
      icon: HelpCircle,
      onClick: () => {},
      isSeparator: true,
    },
    {
      label: 'Legacy Nav',
      icon: ArrowLeftRight,
      onClick: () => console.log('Legacy Nav'),
    },
    {
      label: 'Log Out',
      icon: LogOut,
      onClick: () => console.log('Log Out'),
      isDanger: true,
    },
  ];

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-neutral-text tracking-aplos mb-6">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-bg">
      <Navigation bookmarks={bookmarks} currentPage={demoNavPage} onNavigate={setDemoNavPage} />
      <div className="flex-1 flex flex-col">
        <TertiaryNavigation
          tertiaryItems={tertiaryNavItems}
          orgName="Oregon Ministry Network"
          orgDropdownItems={orgDropdownItems}
        />
        <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-vl-4 font-bold text-neutral-text tracking-aplos mb-2">
            Aplos Design System Components
          </h1>
          <p className="text-base text-neutral-text tracking-aplos">
            Complete component library based on DESIGN_SYSTEM.md
          </p>
        </div>

        <Section title="Typography">
          <TypographyShowcase />
        </Section>

        <Section title="Buttons">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-4">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Button</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={Plus}>Add Item</Button>
                <Button variant="secondary" icon={CheckCircle2}>Confirm</Button>
                <Button variant="tertiary" icon={XCircle}>Cancel</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-4">Disabled States</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" disabled>Primary Disabled</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
                <Button variant="tertiary" disabled>Tertiary Disabled</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Inputs">
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm text-neutral-text tracking-aplos mb-2">
                Default Input
              </label>
              <Input placeholder="Enter text here..." />
            </div>
            <div>
              <label className="block text-sm text-neutral-text tracking-aplos mb-2">
                Input with Value
              </label>
              <Input value="Sample text value" onChange={() => {}} />
            </div>
            <div>
              <label className="block text-sm text-neutral-text tracking-aplos mb-2">
                Disabled Input
              </label>
              <Input placeholder="Disabled input" disabled />
            </div>
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-2">Card Title</h3>
              <p className="text-base text-neutral-text tracking-aplos">
                This is a standard card with default padding. Cards use surface-1 background and border-1.
              </p>
            </Card>
            <Card padding="sm">
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-2">Small Padding</h3>
              <p className="text-base text-neutral-text tracking-aplos">
                Card with small padding (16px).
              </p>
            </Card>
            <Card padding="lg">
              <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-2">Large Padding</h3>
              <p className="text-base text-neutral-text tracking-aplos">
                Card with large padding (24px).
              </p>
            </Card>
          </div>
        </Section>

        <Section title="Modals">
          <div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
            >
              <p className="text-base text-neutral-text tracking-aplos mb-4">
                This is a modal dialog. It uses surface-1 background, rounded-lg radius, and shadow-md.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </div>
        </Section>

        <Section title="Toasts">
          <div className="space-y-4 max-w-md">
            <p className="text-base text-neutral-text tracking-aplos mb-4">
              Toasts appear fixed at the bottom right (16px from bottom), slide in from the right, and auto-dismiss after 800ms.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" onClick={() => setShowSuccessToast(true)}>
                Show Success Toast
              </Button>
              <Button variant="secondary" onClick={() => setShowErrorToast(true)}>
                Show Error Toast
              </Button>
            </div>
          </div>
          {showSuccessToast && (
            <Toast
              variant="success"
              message="Operation completed successfully!"
              isVisible={showSuccessToast}
              onClose={() => setShowSuccessToast(false)}
            />
          )}
          {showErrorToast && (
            <Toast
              variant="error"
              message="An error occurred. Please try again."
              isVisible={showErrorToast}
              onClose={() => setShowErrorToast(false)}
            />
          )}
        </Section>

        <Section title="Color Palette (Velora theming – light theme)">
          <p className="text-sm text-neutral-text-weak tracking-aplos mb-6">
            All color tokens from @velora/theming (aplos theme). Token name and hex value shown for each.
          </p>
          <div className="space-y-10">
            {VELORA_COLOR_TOKENS.map(({ group, tokens }) => (
              <div key={group}>
                <h3 className="text-lg font-semibold text-neutral-text tracking-aplos mb-4">{group}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {tokens.map(({ var: varName, hex }) => (
                    <div key={varName} className="flex flex-col">
                      <div
                        className="w-full rounded-lg border border-neutral-border mb-2 min-h-[72px]"
                        style={{ backgroundColor: `var(${varName})` }}
                      />
                      <p className="text-xs text-neutral-text-weak tracking-aplos font-mono break-all" title={varName}>
                        {varName}
                      </p>
                      <p className="text-xs text-neutral-text-weak tracking-aplos font-mono mt-0.5">{hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Spacing Scale">
          <div className="space-y-4">
            <p className="text-base text-neutral-text tracking-aplos mb-4">
              8px system with 4px sub-steps
            </p>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12].map((space) => (
                <div key={space} className="flex items-center gap-4">
                  <div className="w-20 text-xs text-neutral-text-weak tracking-aplos">
                    space-{space}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-btn-primary"
                      style={{ width: `${space * 4}px`, height: '24px' }}
                    ></div>
                    <span className="text-xs text-neutral-text-weak tracking-aplos">
                      {space * 4}px
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Border Radius">
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" style={{ height: '100px' }}>
              <div>
                <div className="h-20 w-full rounded-button mb-2 border border-neutral-border bg-neutral-bg-weak" style={{ borderRadius: '4px' }}></div>
                <p className="text-xs text-neutral-text-weak tracking-aplos">button: 4px</p>
              </div>
              <div>
                <div className="h-20 w-full rounded-sm mb-2 border border-neutral-border bg-neutral-bg-weak" style={{ borderRadius: '8px', height: '100%' }}></div>
                <p className="text-xs text-neutral-text-weak tracking-aplos">sm: 8px</p>
              </div>
              <div>
                <div className="h-20 w-full rounded-md mb-2 border border-neutral-border bg-neutral-bg-weak" style={{ borderRadius: '12px' }}></div>
                <p className="text-xs text-neutral-text-weak tracking-aplos">md: 12px</p>
              </div>
              <div>
                <div className="h-20 w-full rounded-lg mb-2 border border-neutral-border bg-neutral-bg-weak" style={{ borderRadius: '16px' }}></div>
                <p className="text-xs text-neutral-text-weak tracking-aplos">lg: 16px</p>
              </div>
              <div>
                <div className="h-20 w-full rounded-full mb-2 border border-neutral-border bg-neutral-bg-weak"></div>
                <p className="text-xs text-neutral-text-weak tracking-aplos">pill: 999px</p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Shadows">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4">
              <div className="h-32 w-full bg-neutral-bg-weak rounded-md shadow-sm mb-4" style={{ height: '100%' }}></div>
              <p className="text-xs text-neutral-text-weak tracking-aplos">shadow-sm: 0 1px 2px rgba(0,0,0,0.08)</p>
            </div>
            <div className="p-4">
              <div className="h-32 w-full bg-neutral-bg-weak rounded-md shadow-md mb-4"></div>
              <p className="text-xs text-neutral-text-weak tracking-aplos">shadow-md: 0 6px 20px rgba(0,0,0,0.12)</p>
            </div>
          </div>
        </Section>

        <Section title="Customize Panel">
          <div>
            <Button variant="primary" onClick={() => setIsCustomizePanelOpen(true)}>
              Open Customize Panel
            </Button>
            <CustomizePanel
              isOpen={isCustomizePanelOpen}
              onClose={() => setIsCustomizePanelOpen(false)}
              title="Customize"
              onApply={() => console.log('Applied')}
            >
              <div className="space-y-6">
                <div>
                  <h3
                    className="text-neutral-text mb-3"
                    style={{
                      fontFamily: 'var(--FontFamily-Sans, "Work Sans")',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.15px',
                    }}
                  >
                    Display
                  </h3>
                  <div className="space-y-2">
                    {['Inactive accounts', 'Subtotal by group', 'Sub accounts', 'Show account rows', 'Zero balances'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox defaultChecked />
                        <span
                          className="text-neutral-text"
                          style={{
                            fontFamily: '"Work Sans"',
                            fontSize: '15px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '20px',
                            letterSpacing: '-0.15px',
                          }}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3
                    className="text-neutral-text mb-3"
                    style={{
                      fontFamily: 'var(--FontFamily-Sans, "Work Sans")',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.15px',
                    }}
                  >
                    Formatting
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span
                        className="text-neutral-text"
                        style={{
                          fontFamily: '"Work Sans"',
                          fontSize: '15px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '-0.15px',
                        }}
                      >
                        Hide cents
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span
                        className="text-neutral-text"
                        style={{
                          fontFamily: '"Work Sans"',
                          fontSize: '15px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '-0.15px',
                        }}
                      >
                        Divide by 1,000
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </CustomizePanel>
          </div>
        </Section>

        <Section title="Filter Panel">
          <div className="space-y-4">
            <FilterPanel
              filters={[
                { label: 'This month to date', value: 'Feb 2025', icon: Calendar, onClick: () => console.log('Date filter') },
                { label: 'Compare to', value: 'none', onClick: () => console.log('Compare filter') },
                { label: 'Cash', value: 'All', icon: DollarSign, onClick: () => console.log('Cash filter') },
                { label: 'Filter by accounts', value: 'All', icon: Building, onClick: () => console.log('Accounts filter') },
                { label: 'Filter by funds', value: 'All', onClick: () => console.log('Funds filter') },
                { label: 'Filter by tags', value: 'All', icon: Tag, onClick: () => console.log('Tags filter') },
              ]}
              onCustomize={() => setIsCustomizePanelOpen(true)}
              customizeIcon={FileText}
            />
          </div>
        </Section>

        <Section title="Simple Dropdown">
          <div className="flex items-center gap-4">
            <SimpleDropdown
              label="Share"
              icon={Mail}
              items={[
                { label: 'Email', onClick: () => console.log('Email'), icon: Mail },
                { label: 'Copy Link', onClick: () => console.log('Copy Link') },
              ]}
            />
            <SimpleDropdown
              label="Export"
              icon={Upload}
              items={[
                { label: 'PDF', onClick: () => console.log('PDF') },
                { label: 'Excel', onClick: () => console.log('Excel') },
                { label: 'CSV', onClick: () => console.log('CSV') },
              ]}
            />
          </div>
        </Section>

        <Section title="Text Link">
          <div>
            <TextLink onClick={() => console.log('Back to reports')}>
              Back to reports
            </TextLink>
          </div>
        </Section>

        <Section title="Inline Text Edit">
          <div>
            <InlineTextEdit
              value={reportTitle}
              onChange={setReportTitle}
              onSave={(value) => console.log('Saved:', value)}
            />
          </div>
        </Section>

        <Section title="Table">
          <div>
            <Table
              columns={[
                { key: 'check', label: 'Check #', sortable: false },
                { key: 'date', label: 'Date', sortable: true },
                { key: 'contact', label: 'Contact', sortable: true },
                { key: 'account', label: 'Account', sortable: true },
                { key: 'fund', label: 'Fund', sortable: true },
                { key: 'memo', label: 'Memo', sortable: true },
                { key: 'reconciled', label: 'Reconciled', sortable: false },
                { key: 'payment', label: 'Payment', sortable: true },
                { key: 'deposit', label: 'Deposit', sortable: true },
                { key: 'balance', label: 'Balance', sortable: true },
                { key: 'action', label: 'Action', sortable: false },
              ]}
              data={[
                {
                  check: '---',
                  date: '9/23/2025',
                  contact: 'Aplos Software',
                  account: '2100 - Accounts Payable',
                  fund: 'General Fund',
                  memo: 'Payment for 2 payable...',
                  reconciled: '---',
                  payment: '-$3,500.00',
                  deposit: '---',
                  balance: '$100,019,912...',
                },
                {
                  check: '---',
                  date: '7/14/2025',
                  contact: 'Acme Corp',
                  account: '2100 - Accounts Payable',
                  fund: 'General Fund',
                  memo: 'Bill.Com Test',
                  reconciled: '---',
                  payment: '-$999.00',
                  deposit: '---',
                  balance: '$100,023,41...',
                },
                {
                  check: '---',
                  date: '7/14/2025',
                  contact: 'Acme Corp',
                  account: '401.1 - Test Clip',
                  fund: 'General Fund',
                  memo: 'BILL2',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$999.00',
                  balance: '$100,024,411...',
                },
                {
                  check: '---',
                  date: '7/3/2025',
                  contact: 'we',
                  account: '1010 - Savings',
                  fund: 'General Fund',
                  memo: 'Reg - Comment',
                  reconciled: '---',
                  payment: '-$1,000.00',
                  deposit: '---',
                  balance: '$100,023,41...',
                },
                {
                  check: '---',
                  date: '7/3/2025',
                  contact: '---',
                  account: 'Journal Entry 1',
                  fund: 'General Fund',
                  memo: 'Test - JE Memo',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$1,000.00',
                  balance: '$100,024,41...',
                },
                {
                  check: '---',
                  date: '6/23/2025',
                  contact: 'Aplos Software',
                  account: '1100 - Accounts Receiv...',
                  fund: 'General Fund',
                  memo: 'Memo 2 - RECEIVED',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$1,000.00',
                  balance: '$100,023,41...',
                },
                {
                  check: '---',
                  date: '6/3/2025',
                  contact: 'we',
                  account: '401.1 - Test Clip',
                  fund: 'Arts Grant',
                  memo: '---',
                  reconciled: '---',
                  payment: '-$1,000.00',
                  deposit: '---',
                  balance: '$100,022,41...',
                },
                {
                  check: '---',
                  date: '4/25/2025',
                  contact: 'Widgets Inc',
                  account: '4000 - Contributions I...',
                  fund: 'General Fund',
                  memo: '---',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$1,000.00',
                  balance: '$100,023,41...',
                },
                {
                  check: '---',
                  date: '4/25/2025',
                  contact: 'Widgets Inc',
                  account: '4000 - Contributions I...',
                  fund: 'General Fund',
                  memo: 'TRIPLE TAG',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$1,000.00',
                  balance: '$100,022,41...',
                },
                {
                  check: '6208',
                  date: '4/22/2025',
                  contact: 'Vendor 20',
                  account: '5001 - Rent',
                  fund: 'Education Fund',
                  memo: 'Transaction 71',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$601.06',
                  balance: '$100,021,412...',
                },
                {
                  check: '4209',
                  date: '4/22/2025',
                  contact: 'Vendor 2',
                  account: '4100 - Interest Earned',
                  fund: 'Building Fund',
                  memo: 'Transaction 15',
                  reconciled: '---',
                  payment: '---',
                  deposit: '$946.41',
                  balance: '$100,020,811...',
                },
                {
                  check: '3342',
                  date: '4/22/2025',
                  contact: 'Vendor 5',
                  account: '4100 - Interest Earned',
                  fund: 'Education Fund',
                  memo: 'Transaction 3',
                  reconciled: '---',
                  payment: '-$84.22',
                  deposit: '---',
                  balance: '$100,019,86...',
                },
              ]}
              defaultSort={{ column: 'date', direction: 'desc' }}
              getActionMenuItems={(row) => [
                {
                  label: 'Move',
                  onClick: () => console.log('Move', row),
                  icon: Move,
                },
                {
                  label: 'Edit',
                  onClick: () => console.log('Edit', row),
                  icon: Edit,
                },
                {
                  label: 'Duplicate',
                  onClick: () => console.log('Duplicate', row),
                  disabled: true,
                  icon: Copy,
                },
                {
                  label: 'Void',
                  onClick: () => console.log('Void', row),
                  icon: X,
                },
                {
                  label: 'Add attachment',
                  onClick: () => console.log('Add attachment', row),
                  icon: Paperclip,
                },
                {
                  label: 'Delete',
                  onClick: () => console.log('Delete', row),
                  danger: true,
                  icon: Trash2,
                },
              ]}
            />
          </div>
        </Section>
        </div>
        </div>
      </div>
    </div>
  );
}
