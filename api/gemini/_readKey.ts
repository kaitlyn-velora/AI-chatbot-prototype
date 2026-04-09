/**
 * Private helper (leading `_` — not a Vercel route). Normalizes env copy/paste issues.
 */
export function readGeminiApiKey(): string | undefined {
  const raw = process.env.GEMINI_API_KEY;
  if (raw === undefined || raw === "") return undefined;
  let k = String(raw).trim();
  if (
    (k.startsWith('"') && k.endsWith('"')) ||
    (k.startsWith("'") && k.endsWith("'"))
  ) {
    k = k.slice(1, -1).trim();
  }
  return k.length > 0 ? k : undefined;
}
