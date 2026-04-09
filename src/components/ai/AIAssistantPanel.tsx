import { useState, useCallback, useEffect, useMemo, useRef, type Dispatch, type SetStateAction } from 'react';
import { Sparkles, Send, Info } from 'lucide-react';
import type { InsightData } from './InsightCard';
import { StarterButton } from './StarterButton';
import { AnswerBlock } from './AnswerBlock';
import { Input } from '../Input';
import type { ReportsListFilter } from '../../types/reportsNavigation';
import type { AppOpenReportsFn } from '../../types/insightHandoff';
import { matchAccountantDemoQuestion } from '../../data/accountantDemoScenario';

/** UI shows at most this many starter chips; extra entries in config are ignored. */
export const MAX_SUGGESTED_QUESTIONS = 4;

export type { ReportsListFilter };

export interface AIFollowUpConfig {
  label: string;
  answer: string;
  source?: string;
  /** Navigates to Reports and applies search + category tab. */
  openReports?: ReportsListFilter;
  /** Deeper steps for scripted demos or multi-turn flows. */
  followUps?: AIFollowUpConfig[];
}

export interface AIStarterConfig {
  label: string;
  answer: string;
  source?: string;
  followUps?: AIFollowUpConfig[];
}

export interface AIPageConfig {
  pageTitle: string;
  insights: InsightData[];
  /** Only the first `MAX_SUGGESTED_QUESTIONS` entries appear in the panel. */
  starters: AIStarterConfig[];
}

interface AIAssistantPanelProps {
  config: AIPageConfig;
  conversation: ConversationEntry[];
  setConversation: Dispatch<SetStateAction<ConversationEntry[]>>;
  onClose: () => void;
  onOpenReportsFiltered?: AppOpenReportsFn;
}

export interface ConversationEntry {
  question: string;
  answer: string;
  source?: string;
  followUps?: AIFollowUpConfig[];
}

const READ_ONLY_TOOLTIP_COPY =
  'Evidence-first accounting copilot: answers should tie back to Aplos screens and reports you can verify. This prototype is read-only—it does not record payments, approvals, or other writes; those stay in core Aplos workflows.';

/** Prototype heuristic: steer “do this in Aplos” questions toward read-only behavior. */
function readOnlyDeflectionIfWriteLike(question: string): string | null {
  const q = question.toLowerCase();
  const writeLike =
    /\bpay\s+(the|a|my|this|that|these|those|it)\b/.test(q) ||
    /\bapprove\b/.test(q) ||
    /\bcreate\s+(a\s+)?(bill|vendor|invoice|journal|entry)\b/.test(q) ||
    /\b(new|add)\s+(a\s+)?(bill|vendor|invoice)\b/.test(q) ||
    /\bdelete\b/.test(q) ||
    /\bvoid\b/.test(q) ||
    /\bpost\s+(a\s+)?(journal|entry)\b/.test(q) ||
    /\brecord\s+(a\s+)?payment\b/.test(q) ||
    /\bsubmit\s+(a\s+)?payment\b/.test(q) ||
    /\btransfer\s+(\$|money|funds)\b/.test(q) ||
    /\breconcile\s+(for\s+me|everything|all|now)\b/.test(q) ||
    /\b(update|change|edit)\s+(my|the)\s+(budget|account|vendor|fund)\b/.test(q) ||
    /\bwrite\s+(a\s+)?check\b/.test(q) ||
    /\bsend\s+(a\s+)?payment\b/.test(q);

  if (!writeLike) return null;

  return (
    'This assistant is read-only: it cannot pay bills, approve transactions, post entries, or change anything in Aplos.\n\n' +
    'I can still summarize what’s in your data, explain balances and reports, and open the right page so you can take action yourself. ' +
    'Try a question like “What’s overdue?” or use the suggestions above.'
  );
}

export function AIAssistantPanel({
  config,
  conversation,
  setConversation,
  onClose,
  onOpenReportsFiltered,
}: AIAssistantPanelProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const visibleStarters = useMemo(
    () => config.starters.slice(0, MAX_SUGGESTED_QUESTIONS),
    [config.starters]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [conversation.length, isTyping]);

  const simulateAnswer = useCallback(
    (question: string, answer: string, source?: string, followUps?: AIFollowUpConfig[]) => {
      setIsTyping(true);
      setTimeout(() => {
        setConversation((prev) => [...prev, { question, answer, source, followUps }]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    },
    [setConversation]
  );

  const handleStarterClick = useCallback(
    (starter: AIStarterConfig) => {
      simulateAnswer(starter.label, starter.answer, starter.source, starter.followUps);
    },
    [simulateAnswer]
  );

  const handleFollowUp = useCallback(
    (fu: AIFollowUpConfig) => {
      if (fu.openReports && onOpenReportsFiltered) {
        onOpenReportsFiltered(fu.openReports);
      }
      simulateAnswer(fu.label, fu.answer, fu.source, fu.followUps);
    },
    [simulateAnswer, onOpenReportsFiltered]
  );

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    const q = inputValue.trim();
    setInputValue('');
    const demoTurn = matchAccountantDemoQuestion(q);
    if (demoTurn) {
      if (demoTurn.openReports && onOpenReportsFiltered) {
        onOpenReportsFiltered(demoTurn.openReports);
      }
      simulateAnswer(q, demoTurn.answer, demoTurn.source, demoTurn.followUps);
      return;
    }
    const deflection = readOnlyDeflectionIfWriteLike(q);
    if (deflection) {
      simulateAnswer(q, deflection, 'Read-only mode');
      return;
    }
    simulateAnswer(
      q,
      `I can answer from your Aplos data in read-only mode—I summarize and explain what’s already there, but I can’t create, pay, approve, or edit anything for you.\n\nFor “${q}”, here’s a high-level read of what I see in your accounts and recent activity. Use **Evidence** lines below answers to tie out in Aplos; use suggested questions and follow-ups to open the right report or screen.`,
      'Prototype summary (verify in Aplos)'
    );
  }, [inputValue, simulateAnswer, onOpenReportsFiltered]);

  return (
    <div
      className="flex min-h-0 w-[320px] min-w-[320px] shrink-0 flex-col self-stretch border-l border-neutral-border bg-neutral-bg-weak animate-slide-in-right pb-[var(--vl-spacing-96)]"
      aria-label="Accounting copilot, evidence-first, read-only"
    >
      <div className="flex shrink-0 items-center gap-2 flex-wrap border-b border-neutral-border px-4 py-3">
        <Sparkles className="text-primary-700 shrink-0" strokeWidth={2} style={{ width: '16px', height: '16px' }} />
        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="text-neutral-text font-vl-semibold tracking-aplos leading-tight" style={{ fontSize: '14px' }}>
            Accounting copilot
          </span>
          <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '11px', lineHeight: 1.35 }}>
            Evidence-first · read-only
          </span>
        </div>
        <div className="group relative inline-flex shrink-0">
          <button
            type="button"
            className="rounded-full p-0.5 text-primary-700 hover:bg-neutral-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            aria-label="How evidence-first read-only mode works"
            aria-describedby="ai-panel-readonly-tooltip"
          >
            <Info strokeWidth={2} style={{ width: '15px', height: '15px' }} aria-hidden />
          </button>
          <div
            id="ai-panel-readonly-tooltip"
            role="tooltip"
            className="pointer-events-none absolute left-0 top-full z-50 mt-1.5 max-w-[260px] rounded-lg border px-3 py-2 text-nav-icon-strong tracking-aplos shadow-md opacity-0 invisible transition-opacity duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
            style={{
              backgroundColor: 'var(--vl-color-tooltip-bg-default)',
              borderColor: 'var(--vl-color-tooltip-border-default)',
              fontSize: '12px',
              lineHeight: 1.45,
            }}
          >
            {READ_ONLY_TOOLTIP_COPY}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {visibleStarters.length > 0 && conversation.length === 0 && !isTyping && (
          <div className="space-y-2">
            <div>
              <p
                className="text-neutral-text font-vl-medium tracking-aplos"
                style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
              >
                Suggested for you
              </p>
              <p className="text-neutral-text-weak tracking-aplos mt-0.5" style={{ fontSize: '11px', lineHeight: 1.35 }}>
                Grounded in this accounting screen; every answer should cite evidence you can open in Aplos
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleStarters.map((starter, i) => (
                <StarterButton key={i} label={starter.label} onClick={() => handleStarterClick(starter)} />
              ))}
            </div>
          </div>
        )}

        {conversation.map((entry, i) => (
          <AnswerBlock
            key={i}
            question={entry.question}
            answer={entry.answer}
            source={entry.source}
            followUps={entry.followUps?.map((fu) => ({
              label: fu.label,
              onClick: () => handleFollowUp(fu),
            }))}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-700 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-primary-700 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-primary-700 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>
              Gathering evidence…
            </span>
          </div>
        )}

        <div ref={scrollEndRef} aria-hidden className="h-px w-full shrink-0" />
      </div>

      <div className="shrink-0 border-t border-neutral-border bg-neutral-bg-weak px-4 py-3">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask with evidence in mind (read-only)…"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-btn-primary text-btn-primary-text rounded-button px-3 shrink-0 transition-colors hover:bg-btn-primary-hover"
          >
            <Send strokeWidth={2} style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
        <p
          role="note"
          className="text-neutral-text-weak tracking-aplos mt-2"
          style={{ fontSize: '10px', lineHeight: 1.45 }}
        >
          Evidence-first: tie material figures to Aplos reports and transactions. Read-only — nothing here posts to your ledger.
        </p>
      </div>
    </div>
  );
}
