export const overrides = {
    text: {
      neutral: {
        default: "var(--vl-color-neutral-950)",
        weak: "var(--vl-color-neutral-800)",
        disabled: "var(--vl-color-neutral-700)",
        foreground: "var(--vl-color-neutral-950)"
      },
      primary: {
        default: "var(--vl-color-neutral-50)",
        hover: "var(--vl-color-neutral-100)",
        strong: "var(--vl-color-neutral-200)"
      }
    },
    bgTokens: {
      neutral: {
        default: "var(--vl-color-neutral-50)",
        active: "var(--vl-color-neutral-200)",
        hover: "var(--vl-color-neutral-100)"
      },
      primary: {
        default: "var(--vl-color-primary-50)",
        active: "var(--vl-color-primary-100)",
        strong: "var(--vl-color-primary-700)"
      },
      success: {
        default: "var(--vl-color-success-200)"
      }
    }
};