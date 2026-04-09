import { useEffect, useState } from 'react';
import {
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Heart,
  Users,
  Megaphone,
  Settings,
  FileText,
  FilePlus,
  CreditCard,
  ClipboardCheck,
  MoreHorizontal,
} from 'lucide-react';
import { AplosLogo } from './AplosLogo';
import type { PageId } from '../pageIds';
import { FUND_ACCOUNTING_PAGES } from '../pageIds';

interface BookmarkItem {
  label: string;
  onClick?: () => void;
}

interface NavigationProps {
  bookmarks?: BookmarkItem[];
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

function NavRow({
  active,
  onClick,
  children,
  indent = 0,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  indent?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between text-left text-white tracking-aplos rounded-button transition-colors hover:bg-white/10 ${
        active ? 'bg-white/15' : ''
      }`}
      style={{
        fontSize: '13px',
        fontWeight: 500,
        minHeight: '32px',
        paddingLeft: `${8 + indent * 12}px`,
        paddingRight: '8px',
        borderRadius: '4px',
        lineHeight: 1.4,
      }}
    >
      {children}
    </button>
  );
}

export function Navigation({ bookmarks, currentPage, onNavigate }: NavigationProps) {
  const [fundOpen, setFundOpen] = useState(true);
  const [donationsOpen, setDonationsOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (FUND_ACCOUNTING_PAGES.includes(currentPage)) setFundOpen(true);
    if (currentPage === 'contacts') setPeopleOpen(true);
    if (currentPage === 'donations') setDonationsOpen(true);
    if (currentPage === 'marketing') setMarketingOpen(true);
  }, [currentPage]);

  const fundChildActive =
    currentPage === 'fund-accounting' ||
    currentPage === 'register' ||
    currentPage === 'bills-list' ||
    currentPage === 'new-bill' ||
    currentPage === 'bill-detail' ||
    currentPage === 'bills-to-pay' ||
    currentPage === 'my-approvals';

  const rowIcon = (Icon: LucideIcon) => (
    <Icon className="text-white shrink-0" strokeWidth={2} style={{ width: 16, height: 16 }} />
  );

  return (
    <nav
      className="sticky top-0 flex flex-col items-start bg-[var(--vl-color-bg-primary-strong)] shrink-0 w-[196px] min-w-[196px]"
      style={{ height: '100vh', padding: '12px' }}
    >
      <div className="w-full mb-3" style={{ height: '48px', display: 'grid' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AplosLogo />
          </div>
          <button type="button" className="text-white hover:text-white transition-colors" aria-label="Collapse navigation">
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {bookmarks && bookmarks.length > 0 && (
        <div className="w-full mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/70 tracking-aplos uppercase font-semibold" style={{ fontSize: '10px', lineHeight: 1.2 }}>
              BOOKMARKS
            </h3>
            <div className="flex items-center gap-2">
              <button type="button" className="text-white hover:text-white transition-colors" aria-label="Edit bookmarks">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button type="button" className="text-white hover:text-white transition-colors" aria-label="Add bookmark">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-1">
            {bookmarks.map((bookmark, index) => (
              <button
                key={index}
                type="button"
                onClick={bookmark.onClick}
                className="w-full flex items-center justify-start gap-2 text-white hover:bg-white/10 transition-colors tracking-aplos rounded-button"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  minHeight: '32px',
                  paddingLeft: '8px',
                  paddingRight: '4px',
                  borderRadius: '4px',
                }}
              >
                <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>{bookmark.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {bookmarks && bookmarks.length > 0 && <div className="w-full border-t border-white/20 mb-4" />}

      <div className="flex-1 w-full overflow-y-auto space-y-1">
        <NavRow active={currentPage === 'dashboard'} onClick={() => onNavigate('dashboard')}>
          <span className="flex items-center gap-3">
            {rowIcon(LayoutDashboard)}
            Dashboard
          </span>
        </NavRow>

        <div>
          <NavRow active={fundChildActive} onClick={() => setFundOpen(!fundOpen)}>
            <span className="flex items-center gap-3">
              {rowIcon(FolderOpen)}
              Fund Accounting
            </span>
            <ChevronRight
              className={`w-4 h-4 text-white shrink-0 transition-transform ${fundOpen ? 'rotate-90' : ''}`}
              strokeWidth={2}
            />
          </NavRow>
          {fundOpen && (
            <div className="mt-1 space-y-1 pl-0">
              <NavRow indent={1} active={currentPage === 'fund-accounting'} onClick={() => onNavigate('fund-accounting')}>
                <span className="flex items-center gap-2">
                  Accounts
                  <ChevronRight className="w-3.5 h-3.5 text-white/80" strokeWidth={2} />
                </span>
              </NavRow>
              <NavRow indent={1} active={currentPage === 'register'} onClick={() => onNavigate('register')}>
                <span>Transactions</span>
              </NavRow>
              <div>
                <NavRow indent={1} onClick={() => setMoreOpen(!moreOpen)}>
                  <span>More</span>
                  <ChevronRight
                    className={`w-4 h-4 text-white shrink-0 transition-transform ${moreOpen ? 'rotate-90' : ''}`}
                    strokeWidth={2}
                  />
                </NavRow>
                {moreOpen && (
                  <div className="mt-1 space-y-1">
                    <NavRow indent={2} active={currentPage === 'bills-list'} onClick={() => onNavigate('bills-list')}>
                      <span className="flex items-center gap-2">{rowIcon(FileText)} Bills</span>
                    </NavRow>
                    <NavRow indent={2} active={currentPage === 'new-bill'} onClick={() => onNavigate('new-bill')}>
                      <span className="flex items-center gap-2">{rowIcon(FilePlus)} New Bill</span>
                    </NavRow>
                    <NavRow indent={2} active={currentPage === 'bills-to-pay'} onClick={() => onNavigate('bills-to-pay')}>
                      <span className="flex items-center gap-2">{rowIcon(CreditCard)} Bills to Pay</span>
                    </NavRow>
                    <NavRow indent={2} active={currentPage === 'my-approvals'} onClick={() => onNavigate('my-approvals')}>
                      <span className="flex items-center gap-2">{rowIcon(ClipboardCheck)} My Approvals</span>
                    </NavRow>
                    <NavRow indent={2} active={currentPage === 'bill-detail'} onClick={() => onNavigate('bill-detail')}>
                      <span className="flex items-center gap-2">{rowIcon(MoreHorizontal)} Bill Detail</span>
                    </NavRow>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <NavRow active={currentPage === 'reporting' || currentPage === 'report-run'} onClick={() => onNavigate('reporting')}>
          <span className="flex items-center gap-3">
            {rowIcon(BarChart3)}
            Reports
          </span>
        </NavRow>

        <div>
          <NavRow onClick={() => setDonationsOpen(!donationsOpen)}>
            <span className="flex items-center gap-3">
              {rowIcon(Heart)}
              Donations
            </span>
            <ChevronRight
              className={`w-4 h-4 text-white shrink-0 transition-transform ${donationsOpen ? 'rotate-90' : ''}`}
              strokeWidth={2}
            />
          </NavRow>
          {donationsOpen && (
            <div className="mt-1 space-y-1">
              <NavRow indent={1} active={currentPage === 'donations'} onClick={() => onNavigate('donations')}>
                <span>Overview</span>
              </NavRow>
            </div>
          )}
        </div>

        <div>
          <NavRow onClick={() => setPeopleOpen(!peopleOpen)}>
            <span className="flex items-center gap-3">
              {rowIcon(Users)}
              People &amp; Groups
            </span>
            <ChevronRight
              className={`w-4 h-4 text-white shrink-0 transition-transform ${peopleOpen ? 'rotate-90' : ''}`}
              strokeWidth={2}
            />
          </NavRow>
          {peopleOpen && (
            <div className="mt-1 space-y-1">
              <NavRow indent={1} active={currentPage === 'contacts'} onClick={() => onNavigate('contacts')}>
                <span>Contacts</span>
              </NavRow>
            </div>
          )}
        </div>

        <div>
          <NavRow onClick={() => setMarketingOpen(!marketingOpen)}>
            <span className="flex items-center gap-3">
              {rowIcon(Megaphone)}
              Marketing
            </span>
            <ChevronRight
              className={`w-4 h-4 text-white shrink-0 transition-transform ${marketingOpen ? 'rotate-90' : ''}`}
              strokeWidth={2}
            />
          </NavRow>
          {marketingOpen && (
            <div className="mt-1 space-y-1">
              <NavRow indent={1} active={currentPage === 'marketing'} onClick={() => onNavigate('marketing')}>
                <span>Overview</span>
              </NavRow>
            </div>
          )}
        </div>
      </div>

      <div className="w-full border-t border-white/20 mt-4 mb-4" />

      <div className="w-full">
        <NavRow>
          <span className="flex items-center gap-3">
            {rowIcon(Settings)}
            Settings
          </span>
          <ChevronRight className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
        </NavRow>
      </div>
    </nav>
  );
}
