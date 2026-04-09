import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== "GET") {
    res.status(405).setHeader("Allow", "GET").json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.GEMINI_API_KEY;
  res.status(200).json({ enabled: Boolean(key && String(key).trim()) });
}
