import { scopeSelectionSummary, type AccountingScopeId } from '../data/accountingScopeStarters';

export type GeminiChatTurn = { role: 'user' | 'model'; text: string };

/** True when Gemini is available (Vite dev middleware or Vercel `/api/gemini/status` with GEMINI_API_KEY set). */
export async function fetchGeminiStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/gemini/status');
    if (!res.ok) return false;
    const data = (await res.json()) as { enabled?: boolean };
    return data.enabled === true;
  } catch {
    return false;
  }
}

export function buildGeminiSystemContext(pageTitle: string, scopes: ReadonlySet<AccountingScopeId>): string {
  const scopeLine = scopeSelectionSummary(scopes);

  return [
    'You are an evidence-first accounting copilot for Aplos (nonprofit / church accounting).',
    'The user is in a prototype UI. You are read-only: do not claim you paid bills, posted journals, or changed data.',
    'Be concise, scannable (short paragraphs or bullets), and practical for a bookkeeper or finance manager.',
    'When you give numbers, frame them as illustrative unless the user provided exact figures — say they should verify in Aplos reports and the register.',
    'Prototype sample org (Crossroads Community Church, ~$2.4M budget): operating checking ~$87k, AP outstanding ~$23k, payroll ~$42k per run; overdue AP ~$14k across four vendors; five unreconciled register items; facilities ~12% over budget YTD; youth ~8% over. You may reference these as demo context when helpful.',
    `Current UI page: ${pageTitle}. Selected scope(s): ${scopeLine}.`,
    'If asked to perform writes (pay, approve, post, delete), refuse briefly and suggest what to do in Aplos instead.',
  ].join('\n');
}

export async function sendGeminiMessage(params: {
  systemContext: string;
  history: GeminiChatTurn[];
  message: string;
}): Promise<string> {
  const res = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemContext: params.systemContext,
      history: params.history,
      message: params.message,
    }),
  });

  const raw = await res.text();
  let data: { text?: string; error?: string } = {};
  try {
    data = JSON.parse(raw) as { text?: string; error?: string };
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    throw new Error(data.error || raw || `Request failed (${res.status})`);
  }

  if (!data.text?.trim()) {
    throw new Error('Empty response from model');
  }

  return data.text.trim();
}
