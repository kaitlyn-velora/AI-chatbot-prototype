import { ReactNode, useState, type Dispatch, type SetStateAction } from 'react';
import { ChevronDown, MessageCircle, Play } from 'lucide-react';
import { Navigation } from './Navigation';
import { AIAssistantPanel, type AIPageConfig, type ConversationEntry } from './ai/AIAssistantPanel';
import { AITriggerButton } from './ai/AITriggerButton';
import { Checkbox } from './Checkbox';
import type { PageId } from '../pageIds';
import type { AppNavigateFn, AppOpenReportsFn } from '../types/insightHandoff';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: PageId;
  breadcrumbLabel: string;
  aiConfig: AIPageConfig;
  aiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
  aiConversation: ConversationEntry[];
  setAiConversation: Dispatch<SetStateAction<ConversationEntry[]>>;
  onNavigate: AppNavigateFn;
  onOpenReportsFiltered?: AppOpenReportsFn;
}

export type { PageId } from '../pageIds';

export function AppLayout({
  children,
  currentPage,
  breadcrumbLabel,
  aiConfig,
  aiPanelOpen,
  setAiPanelOpen,
  aiConversation,
  setAiConversation,
  onNavigate,
  onOpenReportsFiltered,
}: AppLayoutProps) {
  const [privacyOn, setPrivacyOn] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-bg overflow-hidden">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        bookmarks={[
          { label: 'Budget to Actual', onClick: () => onNavigate('reporting') },
          { label: 'Accounts Payable', onClick: () => onNavigate('bills-list') },
        ]}
      />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <header className="shrink-0 border-b border-neutral-border bg-neutral-bg px-6 pt-3 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-primary-700 font-vl-medium tracking-aplos" style={{ fontSize: '13px', lineHeight: '20px' }}>
                {breadcrumbLabel}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-btn px-3 rounded-button border border-neutral-border-strong bg-neutral-bg text-neutral-text tracking-aplos hover:bg-neutral-bg-hover transition-colors"
                  style={{ fontSize: '13px' }}
                >
                  <Play className="w-icon h-icon text-primary-700" strokeWidth={2} />
                  Aplos Overview
                </button>
                <AITriggerButton isOpen={aiPanelOpen} onClick={() => setAiPanelOpen(!aiPanelOpen)} />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-neutral-text tracking-aplos cursor-pointer select-none" style={{ fontSize: '13px' }}>
                  <Checkbox checked={privacyOn} onChange={(e) => setPrivacyOn(e.target.checked)} />
                  Privacy
                </label>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-neutral-text tracking-aplos hover:opacity-80"
                  style={{ fontSize: '13px' }}
                >
                  <span
                    className="rounded-full bg-primary-bg-default border border-primary-border-default flex items-center justify-center text-primary-700 font-vl-semibold"
                    style={{ width: 28, height: 28, fontSize: '12px' }}
                  >
                    T
                  </span>
                  TEST ABC
                  <ChevronDown className="w-4 h-4 text-neutral-text-weak" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden min-h-0">
          <main className="flex-1 overflow-y-auto bg-neutral-bg min-w-0 px-6 py-4">{children}</main>
          {aiPanelOpen && (
            <AIAssistantPanel
              config={aiConfig}
              conversation={aiConversation}
              setConversation={setAiConversation}
              onClose={() => setAiPanelOpen(false)}
              onOpenReportsFiltered={onOpenReportsFiltered}
            />
          )}
        </div>
      </div>

      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-btn-primary text-btn-primary-text shadow-md hover:bg-btn-primary-hover transition-colors"
        style={{ width: 48, height: 48 }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" strokeWidth={2} />
      </button>
    </div>
  );
}
