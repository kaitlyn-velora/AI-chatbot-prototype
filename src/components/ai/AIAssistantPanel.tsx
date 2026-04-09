import { useState, useCallback, useEffect, useMemo, useRef, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Sparkles, Send, X, Plus, Maximize2, Minimize2, ChevronDown, Check } from 'lucide-react';
import type { InsightData } from './InsightCard';
import { StarterButton } from './StarterButton';
import { AnswerBlock } from './AnswerBlock';
import type { ReportsListFilter } from '../../types/reportsNavigation';
import type { AppOpenReportsFn } from '../../types/insightHandoff';
import { matchAccountantDemoQuestion } from '../../data/accountantDemoScenario';
import {
  ACCOUNTING_SCOPES,
  getStartersForScopes,
  scopeSelectionSummary,
  toggleAccountingScope,
  type AccountingScopeId,
} from '../../data/accountingScopeStarters';
import {
  buildGeminiSystemContext,
  fetchGeminiStatus,
  sendGeminiMessage,
  type GeminiChatTurn,
} from '../../services/geminiChat';

export const MAX_SUGGESTED_QUESTIONS = 5;

export type { ReportsListFilter };

export interface AIFollowUpConfig {
  label: string;
  answer: string;
  source?: string;
  openReports?: ReportsListFilter;
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

const iconBtn =
  'rounded-md p-1.5 text-neutral-text-weak transition-colors hover:bg-neutral-bg-weak hover:text-neutral-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';

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
    "Read-only \u2014 I can\u2019t pay, approve, or post anything.\n\n" +
    'I can summarize data, explain balances, and open the right page. Try a suggestion below.'
  );
}

function ScopeMultiselect({
  selected,
  onToggle,
}: {
  selected: ReadonlySet<AccountingScopeId>;
  onToggle: (id: AccountingScopeId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const summary = scopeSelectionSummary(selected);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isChecked = (id: AccountingScopeId) => {
    if (id === 'all') {
      return selected.size === 0 || (selected.size === 1 && selected.has('all'));
    }
    return selected.has(id) && !selected.has('all');
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Scope: ${summary}. Open to change.`}
        className="flex w-full items-center gap-1.5 rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2 tracking-aplos text-neutral-text transition-colors hover:border-neutral-border-strong hover:bg-neutral-bg-weak"
        style={{ fontSize: '12px', lineHeight: 1.4 }}
      >
        <Sparkles className="shrink-0 text-primary-700" strokeWidth={2} style={{ width: '14px', height: '14px' }} />
        <span className="min-w-0 flex-1 truncate text-left">{summary}</span>
        <ChevronDown
          className={`shrink-0 text-neutral-text-weak transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
          style={{ width: '14px', height: '14px' }}
        />
      </button>
      {open && (
        <div
          className="absolute bottom-full left-0 z-50 mb-1.5 w-full rounded-lg border border-neutral-border bg-neutral-bg py-1 shadow-md"
          role="listbox"
          aria-label="Accounting scope"
          aria-multiselectable="true"
        >
          {ACCOUNTING_SCOPES.map((s) => {
            const checked = isChecked(s.id);
            return (
              <button
                key={s.id}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => onToggle(s.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left tracking-aplos text-neutral-text transition-colors hover:bg-primary-bg-default"
                style={{ fontSize: '13px', lineHeight: 1.4 }}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    checked ? 'border-primary-700 bg-primary-700 text-neutral-bg' : 'border-neutral-border-strong bg-neutral-bg'
                  }`}
                  aria-hidden
                >
                  {checked && <Check strokeWidth={3} style={{ width: '10px', height: '10px' }} />}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
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
  const [accountingScopes, setAccountingScopes] = useState<Set<AccountingScopeId>>(
    () => new Set<AccountingScopeId>(['all'])
  );
  const [panelWide, setPanelWide] = useState(false);
  const [geminiEnabled, setGeminiEnabled] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const visibleStarters = useMemo(
    () => getStartersForScopes(accountingScopes, MAX_SUGGESTED_QUESTIONS),
    [accountingScopes]
  );

  const handleTextareaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const handleScopeToggle = useCallback((id: AccountingScopeId) => {
    setAccountingScopes((prev) => toggleAccountingScope(prev, id));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      void fetchGeminiStatus().then((on) => {
        if (!cancelled) setGeminiEnabled(on);
      });
    };
    refresh();
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', refresh);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', refresh);
    };
  }, []);

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
      }, 600 + Math.random() * 400);
    },
    [setConversation]
  );

  const submitWithGemini = useCallback(
    async (q: string, scopes: Set<AccountingScopeId>) => {
      setIsTyping(true);
      try {
        const history: GeminiChatTurn[] = [];
        for (const e of conversationRef.current) {
          history.push({ role: 'user', text: e.question });
          history.push({ role: 'model', text: e.answer });
        }
        const systemContext = buildGeminiSystemContext(config.pageTitle, scopes);
        const text = await sendGeminiMessage({
          systemContext,
          history,
          message: q,
        });
        setConversation((prev) => [...prev, { question: q, answer: text, source: 'Gemini' }]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setConversation((prev) => [
          ...prev,
          {
            question: q,
            answer:
              `**Couldn’t get a live answer**\n\n${msg}\n\n**If it says the API key expired:** create a new key at https://aistudio.google.com/apikey , replace \`GEMINI_API_KEY\` in Vercel and in \`.env.local\`, then **redeploy** on Vercel (deployments keep the old key until you redeploy).\n\n**Local:** \`.env.local\` + restart \`npm run dev\`.\n\n**Vercel:** Environment Variables → \`GEMINI_API_KEY\` for **Production** (and Preview if you use preview URLs), save, then **Redeploy**.`,
            source: 'Gemini error',
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [config.pageTitle, setConversation]
  );

  const handleStarterClick = useCallback(
    (starter: AIStarterConfig) => {
      if (geminiEnabled) {
        void submitWithGemini(starter.label, new Set(accountingScopes));
        return;
      }
      simulateAnswer(starter.label, starter.answer, starter.source, starter.followUps);
    },
    [geminiEnabled, accountingScopes, submitWithGemini, simulateAnswer]
  );

  const handleFollowUp = useCallback(
    (fu: AIFollowUpConfig) => {
      if (fu.openReports && onOpenReportsFiltered) {
        onOpenReportsFiltered(fu.openReports);
      }
      if (geminiEnabled) {
        void submitWithGemini(fu.label, new Set(accountingScopes));
        return;
      }
      simulateAnswer(fu.label, fu.answer, fu.source, fu.followUps);
    },
    [geminiEnabled, accountingScopes, submitWithGemini, simulateAnswer, onOpenReportsFiltered]
  );

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    const q = inputValue.trim();
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    const scopesSnapshot = new Set(accountingScopes);
    const deflection = readOnlyDeflectionIfWriteLike(q);
    if (deflection) {
      simulateAnswer(q, deflection, 'Read-only mode');
      return;
    }
    if (geminiEnabled) {
      void submitWithGemini(q, scopesSnapshot);
      return;
    }
    const demoTurn = matchAccountantDemoQuestion(q);
    if (demoTurn) {
      if (demoTurn.openReports && onOpenReportsFiltered) {
        onOpenReportsFiltered(demoTurn.openReports);
      }
      simulateAnswer(q, demoTurn.answer, demoTurn.source, demoTurn.followUps);
      return;
    }
    simulateAnswer(
      q,
      `Here's what I see for "${q}" — verify figures against your live reports and use **Evidence** links to tie out.`,
      'Prototype (verify in Aplos)'
    );
  }, [
    inputValue,
    accountingScopes,
    geminiEnabled,
    simulateAnswer,
    submitWithGemini,
    onOpenReportsFiltered,
  ]);

  const clearConversation = useCallback(() => {
    setConversation([]);
  }, [setConversation]);

  return (
    <div
      className={`flex min-h-0 shrink-0 flex-col self-stretch border-l border-neutral-border bg-neutral-bg transition-[width,min-width] duration-200 ${
        panelWide ? 'w-[min(32rem,calc(100vw-2rem))] min-w-[300px]' : 'w-[360px] min-w-[360px]'
      }`}
      aria-label="Accounting assistant"
    >
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-border px-4 py-2.5">
        <div className="min-w-0 flex items-center gap-2">
          <Sparkles className="shrink-0 text-primary-700" strokeWidth={1.75} style={{ width: '20px', height: '20px' }} />
          <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '15px' }}>
            Assistant
          </h2>
          {geminiEnabled && (
            <span
              className="rounded-full border border-primary-700 bg-primary-bg-default px-2 py-0.5 text-primary-700 font-vl-medium tracking-aplos"
              style={{ fontSize: '10px', lineHeight: 1.3 }}
              title="Live answers via Gemini (dev server only)"
            >
              Live AI
            </span>
          )}
          <span className="text-neutral-text-weak tracking-aplos" style={{ fontSize: '12px' }}>
            · {config.pageTitle}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button type="button" onClick={clearConversation} className={iconBtn} aria-label="New conversation" title="New chat">
            <Plus strokeWidth={2} style={{ width: '17px', height: '17px' }} />
          </button>
          <button
            type="button"
            onClick={() => setPanelWide((w) => !w)}
            className={iconBtn}
            aria-label={panelWide ? 'Narrow' : 'Wider'}
            title={panelWide ? 'Narrow' : 'Wider'}
          >
            {panelWide ? (
              <Minimize2 strokeWidth={2} style={{ width: '17px', height: '17px' }} />
            ) : (
              <Maximize2 strokeWidth={2} style={{ width: '17px', height: '17px' }} />
            )}
          </button>
          <button type="button" onClick={onClose} className={iconBtn} aria-label="Close">
            <X strokeWidth={2} style={{ width: '17px', height: '17px' }} />
          </button>
        </div>
      </header>

      {/* Thread */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="mx-auto max-w-[40rem] space-y-6">
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
            <div className="flex items-center gap-2.5 text-neutral-text-weak" role="status" aria-live="polite">
              <span className="flex gap-1" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-text-weak/70 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-text-weak/70 animate-pulse" style={{ animationDelay: '0.15s' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-text-weak/70 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </span>
              <span className="tracking-aplos" style={{ fontSize: '12px' }}>Working…</span>
            </div>
          )}

          <div ref={scrollEndRef} aria-hidden className="h-px w-full shrink-0" />
        </div>
      </div>

      {/* Compose */}
      <footer className="shrink-0 border-t border-neutral-border bg-neutral-bg px-4 pb-4 pt-3">
        <div className="mx-auto max-w-[40rem] space-y-2.5">
          {!isTyping && visibleStarters.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sample questions">
              {visibleStarters.map((starter, i) => (
                <StarterButton
                  key={`${starter.label}-${i}`}
                  label={starter.label}
                  variant="neutral"
                  onClick={() => handleStarterClick(starter)}
                />
              ))}
            </div>
          )}

          <ScopeMultiselect selected={accountingScopes} onToggle={handleScopeToggle} />

          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={handleTextareaChange}
              placeholder="Ask anything…"
              rows={3}
              className="min-h-[80px] max-h-[160px] w-full min-w-0 flex-1 resize-none rounded-lg border border-neutral-border bg-neutral-bg px-4 py-3 text-vl-1 leading-vl-base text-neutral-text placeholder:text-neutral-text-weak tracking-aplos focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              aria-label="Ask assistant"
              ref={textareaRef}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="mb-1 flex h-btn w-9 shrink-0 items-center justify-center rounded-button bg-btn-primary text-btn-primary-text transition-colors hover:bg-btn-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              aria-label="Send"
            >
              <Send strokeWidth={2} style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
