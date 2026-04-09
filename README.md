# Accounting copilot (Aplos prototype)

Evidence-first, read-only **Copilot** across Dashboard, Register, Accounts Payable, Reporting, Fund Accounting, and Contacts. Uses the Aplos prototype starter with Velora tokens (`DESIGN_SYSTEM.md`). Proactive insight cards are **not** shown in this build (per PRD scope).

## Run locally

```bash
npm install
npm run dev
```

## What’s included

- Mock data only (no APIs or LLM)
- Slide-out **Copilot** panel: contextual starters, follow-ups, simulated answers with **Evidence** lines
- `ComponentShowcase` is available by setting app state to `components` (or add a nav link if you wire one)

## Styling

Follow `DESIGN_SYSTEM.md` and Velora utilities only.
