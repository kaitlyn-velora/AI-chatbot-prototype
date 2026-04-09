# Aplos Design System (Velora)

Canonical design system for Aplos prototypes.

**Source of truth for design tokens:** `@velora/theming` (velora-theming-main). All colors, spacing, border radius, typography, and semantic tokens are defined there. This document describes usage rules and component conventions; do not invent values. If a token or state is not defined in velora-theming or here: STOP and ask.

---

## 0) Global Rules

- Product scope: Aplos only
- Use **@velora/theming** tokens only — never raw hex, px, or Tailwind defaults unless explicitly defined in the package or extended in this project
- Only implement interaction states explicitly defined here
- Buttons have ONE size only (36px height)

---

## 1) Token Source and Mapping

**Token source:** Import `@velora/theming/css/aplos` and apply `class="aplos"` on `<html>`. Tailwind uses the `@velora/theming/tailwind` preset (see `tailwind.config.js`).

**Velora provides:** `--vl-*` CSS variables; Tailwind utilities for `primary`, `accent-1`, `neutral` (bg/text/border), `danger`, `success`, `warning`; spacing `vl-18`; borderRadius `vl-10`/`vl-20`; fontSize `vl-base`/`vl-4`; lineHeight `vl-1`/`vl-7`; fontFamily `vl-sans`/`vl-serif`/`vl-mono`. This project extends with `nav` and `btn` colors for sidebar and buttons.

**Legacy Aplos token → Velora / Tailwind usage:**

| Old (Aplos) | Use (Velora / Tailwind) |
|-------------|-------------------------|
| aplos-surface-0 / white | `neutral-bg` (default) |
| aplos-surface-1 | `neutral-bg-weak` |
| aplos-surface-tint-1 | `primary-bg-default` or neutral variant |
| aplos-border-1 / border-2 | `neutral-border` (default/medium) |
| aplos-text-heading / text-body | `neutral-text` / `neutral-text-strong` |
| aplos-text-muted | `neutral-text-weak` |
| aplos-nav-* | `nav` (e.g. `bg-nav`, `bg-nav-hover`) |
| aplos-button-primary-bg/text | `btn-primary`, `btn-primary-text` |
| aplos-button-secondary-* | `primary-100` bg, `primary-700` border, `neutral-text` |
| aplos-button-tertiary-* | `neutral-bg` bg, `neutral-border-strong` border |
| aplos-error-* / aplos-success-* | `danger-*` / `success-*` |
| rounded-button (4px) | `rounded-button` (extends Velora) |
| rounded-sm/md/lg/pill | `rounded-lg` / `rounded-xl` / `rounded-2xl` / `rounded-full` |
| Spacing | Tailwind default (p-4, gap-2, etc.) + `p-vl-18` if needed |
| Typography | Tailwind text-* + `text-vl-4`, `text-vl-base`, `leading-vl-*` |
| Letter-spacing | `tracking-aplos` (extended in config) or base font |

---

## 2) Layout

- Page background: `neutral-bg` (Velora default)
- Card / modal background: `neutral-bg-weak`
- Default page padding: `p-6` (24px)
- Card padding: `p-4`–`p-6`

---

## 3) Components

### 3.1 Navigation (Sidebar)

- bg: `bg-nav` (Velora Nav.Bg.Default; light theme is primary-tinted; use `data-theme="dark"` on `<html>` for dark nav)
- divider: `border-neutral-border` @ 1px
- hover: `bg-nav-hover`
- NO selected/active state

Icons: outline style, ~2px stroke; color `text-nav-icon-strong` or inherit from nav text.

Nav CTA: bg + border from primary/neutral as needed; radius `rounded-button` or `rounded-full` per Velora.

### 3.2 Buttons (Single Size System)

Global: height `h-btn` (36px), padding-x 16px (`px-4`), radius `rounded-button`, icon 16×16 (`w-icon h-icon`), icon gap `gap-1` (4px).

- **Primary:** `bg-btn-primary` `text-btn-primary-text`; hover `bg-btn-primary-hover`; border none
- **Secondary:** `bg-primary-100` `text-neutral-text` `border border-primary-700`; hover `bg-primary-200` `border-primary-600`
- **Tertiary:** `bg-neutral-bg` `text-neutral-text` `border border-neutral-border-strong`; hover `bg-neutral-bg-hover`

Disabled: apply opacity only.

### 3.3 Inputs

- height: 40px (`h-10`)
- bg: `neutral-bg` (white in light theme)
- border: `neutral-border` @ 1px
- radius: `rounded-lg` (8px)
- text: `neutral-text`
- placeholder: `neutral-text-weak`

### 3.4 Cards / Panels

- bg: `neutral-bg-weak`
- border: `neutral-border`
- radius: `rounded-xl` (12px)

### 3.5 Modals

- bg: `neutral-bg-weak`
- radius: `rounded-2xl` (16px)
- shadow: `shadow-md`
- padding: `p-6`

### 3.6 Toasts

- radius: `rounded-xl`; padding: `p-4`; border: 2px
- Success: `success-bg-default`, `success-border-default`, `success-icon-strong`
- Error: `danger-bg-default`, `danger-border-default`, `danger-text-default`

---

## 4) Interaction States

Defined: Nav item hover only (per above).

Undefined: Button hover (use tokens above); input focus ring. Do not invent.

---

## 5) Accessibility Baseline

- Use semantic text/bg tokens for contrast
- Focus must be visible but not custom-styled unless defined

---

## 6) Implementation Rules

- Tokens come from @velora/theming (CSS vars + Tailwind preset)
- Tailwind config may extend with nav/btn and app-specific utilities only
- Raw Tailwind default colors, spacing, or radii are forbidden unless from the preset or extended here

---

## 7) AI Enforcement

- Always reference tokens by name (Velora or extended)
- Never introduce new values
- Ask for clarification if missing
