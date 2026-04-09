import type { VercelRequest, VercelResponse } from "@vercel/node";

type GeminiContent = { role: string; parts: { text: string }[] };

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST").json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key || !String(key).trim()) {
    res.status(503).json({
      error:
        "GEMINI_API_KEY is not set. Add it under Project → Settings → Environment Variables on Vercel, then redeploy.",
    });
    return;
  }

  const body = req.body as {
    systemContext?: string;
    history?: { role?: string; text?: string }[];
    message?: string;
  };

  const systemContext = typeof body?.systemContext === "string" ? body.systemContext : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const contents: GeminiContent[] = [];
  const history = Array.isArray(body?.history) ? body.history : [];
  for (const turn of history) {
    const role = turn.role === "model" ? "model" : "user";
    const text = typeof turn.text === "string" ? turn.text : "";
    if (!text.trim()) continue;
    contents.push({ role, parts: [{ text }] });
  }
  contents.push({ role: "user", parts: [{ text: message }] });

  const model = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(String(key).trim())}`;

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 2048,
    },
  };

  if (systemContext.trim()) {
    payload.systemInstruction = {
      role: "system",
      parts: [{ text: systemContext }],
    };
  }

  try {
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const geminiJson = (await geminiRes.json()) as {
      error?: { message?: string };
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    if (!geminiRes.ok) {
      const msg = geminiJson.error?.message || `Gemini HTTP ${geminiRes.status}`;
      res.status(502).json({ error: msg });
      return;
    }

    const parts = geminiJson.candidates?.[0]?.content?.parts ?? [];
    const text = parts.map((p) => p.text ?? "").join("").trim();

    if (!text) {
      res.status(502).json({ error: "Model returned no text" });
      return;
    }

    res.status(200).json({ text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
}
