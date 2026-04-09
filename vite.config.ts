import type { IncomingMessage } from "node:http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(Buffer.from(c)));
    req.on("end", () => {
      try {
        const s = Buffer.concat(chunks).toString("utf8");
        resolve(s ? JSON.parse(s) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

type GeminiContent = { role: string; parts: { text: string }[] };

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "gemini-dev-api",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const path = req.url?.split("?")[0] ?? "";

            if (req.method === "GET" && path === "/api/gemini/status") {
              const key = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ enabled: Boolean(key && String(key).trim()) }));
              return;
            }

            if (req.method === "POST" && path === "/api/gemini/chat") {
              const key = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
              if (!key || !String(key).trim()) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    error:
                      "GEMINI_API_KEY is not set. Copy .env.example to .env.local and add your key, then restart npm run dev.",
                  })
                );
                return;
              }

              try {
                const body = (await readJsonBody(req)) as {
                  systemContext?: string;
                  history?: { role?: string; text?: string }[];
                  message?: string;
                };

                const systemContext =
                  typeof body.systemContext === "string" ? body.systemContext : "";
                const message = typeof body.message === "string" ? body.message.trim() : "";
                if (!message) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "message is required" }));
                  return;
                }

                const contents: GeminiContent[] = [];
                const history = Array.isArray(body.history) ? body.history : [];
                for (const turn of history) {
                  const role = turn.role === "model" ? "model" : "user";
                  const text = typeof turn.text === "string" ? turn.text : "";
                  if (!text.trim()) continue;
                  contents.push({ role, parts: [{ text }] });
                }
                contents.push({ role: "user", parts: [{ text: message }] });

                const model =
                  env.GEMINI_MODEL ||
                  process.env.GEMINI_MODEL ||
                  "gemini-2.0-flash";
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
                  const msg =
                    geminiJson.error?.message || `Gemini HTTP ${geminiRes.status}`;
                  res.statusCode = 502;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: msg }));
                  return;
                }

                const parts = geminiJson.candidates?.[0]?.content?.parts ?? [];
                const text = parts.map((p) => p.text ?? "").join("").trim();

                if (!text) {
                  res.statusCode = 502;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Model returned no text" }));
                  return;
                }

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ text }));
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: msg }));
              }
              return;
            }

            next();
          });
        },
      },
    ],
  };
});
