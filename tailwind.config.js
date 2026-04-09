/** @type {import('tailwindcss').Config} */
/**
 * Aplos Tailwind Config
 *
 * Uses @velora/theming as the source of truth for design tokens.
 * Preset provides: primary, accent-1, neutral, danger, success, warning colors;
 * spacing vl-18; borderRadius vl-10/vl-20; fontSize vl-base/vl-4; lineHeight vl-1/vl-7; fontFamily vl-sans/vl-serif/vl-mono.
 * This config extends with nav/btn utilities and app-specific utilities.
 */

import veloraPreset from "@velora/theming/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [veloraPreset],
  theme: {
    extend: {
      // Nav and Btn tokens (not in Velora preset; use CSS vars from theme)
      colors: {
        nav: {
          DEFAULT: "var(--vl-color-nav-bg-default)",
          hover: "var(--vl-color-nav-bg-hover)",
          strong: "var(--vl-color-nav-bg-strong)",
          "strong-hover": "var(--vl-color-nav-bg-strong-hover)",
          "icon-strong": "var(--vl-color-nav-global-icon-strong)",
        },
        btn: {
          primary: "var(--vl-btn-bg-primary-light)",
          "primary-hover": "var(--vl-btn-bg-primary-hover-light)",
          "primary-text": "var(--vl-btn-text-primary-light)",
        },
      },
      height: {
        btn: "36px",
        icon: "16px",
      },
      width: {
        icon: "16px",
      },
      borderRadius: {
        button: "var(--vl-btn-borderradius-light)",
      },
      boxShadow: {
        sm: "0 1px 2px rgb(0 0 0 / 0.08)",
        md: "0 6px 20px rgb(0 0 0 / 0.12)",
      },
      letterSpacing: {
        aplos: "-0.105px",
      },
      // Velora typography: expose all package font sizes, line heights, weights (preset only has vl-base, vl-4, vl-1, vl-7)
      fontSize: {
        "vl-0": "var(--vl-font-size-0)",   // 12px
        "vl-1": "var(--vl-font-size-1)",   // 14px
        "vl-3": "var(--vl-font-size-3)",   // 20px
        "vl-5": "var(--vl-font-size-5)",   // 36px
      },
      lineHeight: {
        "vl-2": "var(--vl-line-height-2)",   // 16px
        "vl-4": "var(--vl-line-height-4)",   // 24px
        "vl-5": "var(--vl-line-height-5)",   // 28px
        "vl-6": "var(--vl-line-height-6)",   // 32px
        "vl-base": "var(--vl-line-height-base)", // 20px
      },
      fontWeight: {
        "vl-regular": "var(--vl-font-weight-regular)",
        "vl-medium": "var(--vl-font-weight-medium)",
        "vl-semibold": "var(--vl-font-weight-semibold)",
      },
    },
  },
  plugins: [],
};
