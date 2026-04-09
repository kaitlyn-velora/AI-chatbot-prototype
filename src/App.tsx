import { useState, useCallback, lazy, Suspense } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';
import { AppLayout } from './components/AppLayout';
import type { PageId } from './pageIds';
import {
  dashboardAI,
  registerAI,
  billsListAI,
  newBillAI,
  billDetailAI,
  billsToPayAI,
  myApprovalsAI,
  reportingAI,
  fundAccountingAI,
  contactsAI,
  donationsAI,
  marketingAI,
} from './data/aiConfigs';
import type { AIPageConfig, ConversationEntry } from './components/ai/AIAssistantPanel';
import type { ReportsListFilter } from './types/reportsNavigation';
import type { InsightHandoffContext } from './types/insightHandoff';
import { reportRunTitle } from './data/reportRunRegistry';

const LazyComponentShowcase = lazy(() =>
  import('./pages/ComponentShowcase').then((m) => ({ default: m.ComponentShowcase }))
);
const LazyDashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const LazyRegisterPage = lazy(() =>
  import('./pages/register/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const LazyBillsListPage = lazy(() =>
  import('./pages/ap/BillsListPage').then((m) => ({ default: m.BillsListPage }))
);
const LazyNewBillPage = lazy(() =>
  import('./pages/ap/NewBillPage').then((m) => ({ default: m.NewBillPage }))
);
const LazyBillDetailPage = lazy(() =>
  import('./pages/ap/BillDetailPage').then((m) => ({ default: m.BillDetailPage }))
);
const LazyBillsToPayPage = lazy(() =>
  import('./pages/ap/BillsToPayPage').then((m) => ({ default: m.BillsToPayPage }))
);
const LazyMyApprovalsPage = lazy(() =>
  import('./pages/ap/MyApprovalsPage').then((m) => ({ default: m.MyApprovalsPage }))
);
const LazyReportingPage = lazy(() =>
  import('./pages/reporting/ReportingPage').then((m) => ({ default: m.ReportingPage }))
);
const LazyReportRunPage = lazy(() =>
  import('./pages/reporting/ReportRunPage').then((m) => ({ default: m.ReportRunPage }))
);
const LazyFundAccountingPage = lazy(() =>
  import('./pages/funds/FundAccountingPage').then((m) => ({ default: m.FundAccountingPage }))
);
const LazyContactsPage = lazy(() =>
  import('./pages/contacts/ContactsPage').then((m) => ({ default: m.ContactsPage }))
);
const LazyDonationsPage = lazy(() =>
  import('./pages/DonationsPage').then((m) => ({ default: m.DonationsPage }))
);
const LazyMarketingPage = lazy(() =>
  import('./pages/MarketingPage').then((m) => ({ default: m.MarketingPage }))
);

/** Lazy routes have different prop shapes; `report-run` is never rendered as `<PageComponent />`. */
type LazyPage = LazyExoticComponent<ComponentType<Record<string, unknown>>>;

function RouteFallback() {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center text-vl-1 text-neutral-600"
      style={{ fontFamily: 'var(--vl-font-sans)' }}
    >
      Loading…
    </div>
  );
}

function workAreaLabel(page: PageId): string {
  switch (page) {
    case 'bills-list':
    case 'new-bill':
    case 'bill-detail':
    case 'bills-to-pay':
    case 'my-approvals':
      return 'Accounts Payable';
    case 'register':
      return 'the register';
    case 'donations':
      return 'Donations';
    case 'reporting':
    case 'report-run':
      return 'Reports';
    case 'fund-accounting':
      return 'Fund accounting';
    case 'contacts':
      return 'People & Groups';
    case 'marketing':
      return 'Marketing';
    case 'dashboard':
      return 'the dashboard';
    default:
      return 'this area';
  }
}

const pageConfig: Record<
  Exclude<PageId, 'components'>,
  { breadcrumb: string; ai: AIPageConfig; component: LazyPage }
> = {
  dashboard: { breadcrumb: 'Dashboard', ai: dashboardAI, component: LazyDashboardPage },
  register: { breadcrumb: 'Transactions', ai: registerAI, component: LazyRegisterPage },
  'bills-list': { breadcrumb: 'Accounts Payable', ai: billsListAI, component: LazyBillsListPage },
  'new-bill': { breadcrumb: 'Accounts Payable', ai: newBillAI, component: LazyNewBillPage },
  'bill-detail': { breadcrumb: 'Accounts Payable', ai: billDetailAI, component: LazyBillDetailPage },
  'bills-to-pay': { breadcrumb: 'Accounts Payable', ai: billsToPayAI, component: LazyBillsToPayPage },
  'my-approvals': { breadcrumb: 'Accounts Payable', ai: myApprovalsAI, component: LazyMyApprovalsPage },
  reporting: { breadcrumb: 'Reports', ai: reportingAI, component: LazyReportingPage },
  'report-run': {
    breadcrumb: 'Reports',
    ai: reportingAI,
    component: LazyReportRunPage as unknown as LazyPage,
  },
  'fund-accounting': { breadcrumb: 'Account List', ai: fundAccountingAI, component: LazyFundAccountingPage },
  contacts: { breadcrumb: 'People & Groups', ai: contactsAI, component: LazyContactsPage },
  donations: { breadcrumb: 'Donations', ai: donationsAI, component: LazyDonationsPage },
  marketing: { breadcrumb: 'Marketing', ai: marketingAI, component: LazyMarketingPage },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [reportsFilter, setReportsFilter] = useState<ReportsListFilter | null>(null);
  const [activeRunReportId, setActiveRunReportId] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiConversation, setAiConversation] = useState<ConversationEntry[]>([]);

  const consumeReportsFilter = useCallback(() => setReportsFilter(null), []);

  const appendInsightHandoff = useCallback((handoff: InsightHandoffContext, lead: string) => {
    const detail = handoff.figureLine
      ? `**${handoff.title}**\n${handoff.figureLine}`
      : `**${handoff.title}**`;
    setAiConversation((prev) => [
      ...prev,
      {
        question: handoff.title,
        answer: `${lead}\n\n${detail}\n\nI’m still read-only — use the page for payments, approvals, and edits in your real Aplos workflow.`,
        source: 'Evidence handoff',
      },
    ]);
    setAiPanelOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (page: PageId, handoff?: InsightHandoffContext) => {
      if (handoff) {
        appendInsightHandoff(
          handoff,
          `Following that signal — I’ve opened **${workAreaLabel(page)}** so you can verify in context.`
        );
      }
      if (page !== 'report-run') {
        setActiveRunReportId(null);
      }
      setCurrentPage(page);
    },
    [appendInsightHandoff]
  );

  const openReportsFiltered = useCallback(
    (filter: ReportsListFilter, handoff?: InsightHandoffContext) => {
      if (handoff) {
        const dest = filter.runReportId
          ? `**${reportRunTitle(filter.runReportId)}**`
          : '**Reports** (filtered)';
        appendInsightHandoff(
          handoff,
          `Following that signal — I’ve opened ${dest}${filter.runReportId ? ' in the report runner' : ' so you can pick a report'}.`
        );
      }
      if (filter.runReportId) {
        setActiveRunReportId(filter.runReportId);
        setCurrentPage('report-run');
        return;
      }
      setActiveRunReportId(null);
      setReportsFilter(filter);
      setCurrentPage('reporting');
    },
    [appendInsightHandoff]
  );

  const openReportRun = useCallback((reportId: string) => {
    setActiveRunReportId(reportId);
    setCurrentPage('report-run');
  }, []);

  if (currentPage === 'components') {
    return (
      <div>
        <button
          type="button"
          onClick={() => handleNavigate('dashboard')}
          className="fixed top-4 right-4 z-50 bg-btn-primary text-btn-primary-text h-btn rounded-button px-4 tracking-aplos"
          style={{ fontSize: '13px' }}
        >
          ← Back to Prototype
        </button>
        <Suspense fallback={<RouteFallback />}>
          <LazyComponentShowcase />
        </Suspense>
      </div>
    );
  }

  const config = pageConfig[currentPage];
  const PageComponent = config.component;

  return (
    <AppLayout
      currentPage={currentPage}
      breadcrumbLabel={config.breadcrumb}
      aiConfig={config.ai}
      aiPanelOpen={aiPanelOpen}
      setAiPanelOpen={setAiPanelOpen}
      aiConversation={aiConversation}
      setAiConversation={setAiConversation}
      onNavigate={handleNavigate}
      onOpenReportsFiltered={openReportsFiltered}
    >
      <Suspense fallback={<RouteFallback />}>
        {currentPage === 'report-run' ? (
          <LazyReportRunPage
            reportId={activeRunReportId ?? 'comparative-income-statement'}
            onBack={() => {
              setActiveRunReportId(null);
              handleNavigate('reporting');
            }}
          />
        ) : currentPage === 'reporting' ? (
          <LazyReportingPage
            appliedFilter={reportsFilter}
            onFilterConsumed={consumeReportsFilter}
            onRunReport={openReportRun}
          />
        ) : currentPage === 'dashboard' ? (
          <LazyDashboardPage onNavigate={handleNavigate} onOpenReportsFiltered={openReportsFiltered} />
        ) : currentPage === 'register' ? (
          <LazyRegisterPage onNavigate={handleNavigate} />
        ) : (
          <PageComponent />
        )}
      </Suspense>
    </AppLayout>
  );
}
