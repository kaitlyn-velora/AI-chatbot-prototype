import { useState, useCallback } from 'react';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { AppLayout } from './components/AppLayout';
import type { PageId } from './pageIds';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { BillsListPage } from './pages/ap/BillsListPage';
import { NewBillPage } from './pages/ap/NewBillPage';
import { BillDetailPage } from './pages/ap/BillDetailPage';
import { BillsToPayPage } from './pages/ap/BillsToPayPage';
import { MyApprovalsPage } from './pages/ap/MyApprovalsPage';
import { ReportingPage } from './pages/reporting/ReportingPage';
import { ReportRunPage } from './pages/reporting/ReportRunPage';
import { FundAccountingPage } from './pages/funds/FundAccountingPage';
import { ContactsPage } from './pages/contacts/ContactsPage';
import { DonationsPage } from './pages/DonationsPage';
import { MarketingPage } from './pages/MarketingPage';
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

function ReportRunPlaceholder() {
  return <span className="hidden" aria-hidden />;
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
  { breadcrumb: string; ai: AIPageConfig; component: () => JSX.Element }
> = {
  dashboard: { breadcrumb: 'Dashboard', ai: dashboardAI, component: DashboardPage },
  register: {
    breadcrumb: 'Transactions',
    ai: registerAI,
    component: () => <RegisterPage />,
  },
  'bills-list': { breadcrumb: 'Accounts Payable', ai: billsListAI, component: BillsListPage },
  'new-bill': { breadcrumb: 'Accounts Payable', ai: newBillAI, component: NewBillPage },
  'bill-detail': { breadcrumb: 'Accounts Payable', ai: billDetailAI, component: BillDetailPage },
  'bills-to-pay': { breadcrumb: 'Accounts Payable', ai: billsToPayAI, component: BillsToPayPage },
  'my-approvals': { breadcrumb: 'Accounts Payable', ai: myApprovalsAI, component: MyApprovalsPage },
  reporting: { breadcrumb: 'Reports', ai: reportingAI, component: ReportingPage },
  'report-run': { breadcrumb: 'Reports', ai: reportingAI, component: ReportRunPlaceholder },
  'fund-accounting': { breadcrumb: 'Account List', ai: fundAccountingAI, component: FundAccountingPage },
  contacts: { breadcrumb: 'People & Groups', ai: contactsAI, component: ContactsPage },
  donations: { breadcrumb: 'Donations', ai: donationsAI, component: DonationsPage },
  marketing: { breadcrumb: 'Marketing', ai: marketingAI, component: MarketingPage },
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
        <ComponentShowcase />
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
      {currentPage === 'report-run' ? (
        <ReportRunPage
          reportId={activeRunReportId ?? 'comparative-income-statement'}
          onBack={() => {
            setActiveRunReportId(null);
            handleNavigate('reporting');
          }}
        />
      ) : currentPage === 'reporting' ? (
        <ReportingPage
          appliedFilter={reportsFilter}
          onFilterConsumed={consumeReportsFilter}
          onRunReport={openReportRun}
        />
      ) : currentPage === 'dashboard' ? (
        <DashboardPage onNavigate={handleNavigate} onOpenReportsFiltered={openReportsFiltered} />
      ) : currentPage === 'register' ? (
        <RegisterPage onNavigate={handleNavigate} />
      ) : (
        <PageComponent />
      )}
    </AppLayout>
  );
}
