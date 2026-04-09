/**
 * Velora Tailwind Preset
 * 
 * Extends Tailwind's default theme with Velora design tokens using CSS custom properties.
 * This preset allows you to use Velora's design system with Tailwind utility classes.
 * 
 * Usage:
 * ```js
 * import veloraPreset from '@velora/theming/tailwind'
 * 
 * export default {
 *   presets: [veloraPreset],
 *   // ... rest of your config
 * }
 * ```
 */

export default {
  theme: {
    extend: {
      colors: {
        // Primary brand colors (mapped to --vl-color-primary-*)
        primary: {
          50: 'var(--vl-color-primary-50)',
          100: 'var(--vl-color-primary-100)',
          200: 'var(--vl-color-primary-200)',
          300: 'var(--vl-color-primary-300)',
          400: 'var(--vl-color-primary-400)',
          500: 'var(--vl-color-primary-500)',
          600: 'var(--vl-color-primary-600)',
          700: 'var(--vl-color-primary-700)',
          800: 'var(--vl-color-primary-800)',
          900: 'var(--vl-color-primary-900)',
          950: 'var(--vl-color-primary-950)',
          999: 'var(--vl-color-primary-999)',
          DEFAULT: 'var(--vl-color-primary-600)',
        },
        // Accent 1 colors (mapped to --vl-color-accent1-*)
        'accent-1': {
          50: 'var(--vl-color-accent1-50)',
          100: 'var(--vl-color-accent1-100)',
          200: 'var(--vl-color-accent1-200)',
          300: 'var(--vl-color-accent1-300)',
          400: 'var(--vl-color-accent1-400)',
          500: 'var(--vl-color-accent1-500)',
          600: 'var(--vl-color-accent1-600)',
          700: 'var(--vl-color-accent1-700)',
          800: 'var(--vl-color-accent1-800)',
          900: 'var(--vl-color-accent1-900)',
          950: 'var(--vl-color-accent1-950)',
          999: 'var(--vl-color-accent1-999)',
          DEFAULT: 'var(--vl-color-accent1-600)',
        },
        // Semantic colors - Neutral
        neutral: {
          bg: {
            DEFAULT: 'var(--vl-color-bg-neutral-default)',
            weak: 'var(--vl-color-bg-neutral-weak)',
            medium: 'var(--vl-color-bg-neutral-medium)',
            hover: 'var(--vl-color-bg-neutral-hover)',
            active: 'var(--vl-color-bg-neutral-active)',
            strong: 'var(--vl-color-bg-neutral-strong)',
            disabled: 'var(--vl-color-bg-neutral-disabled)',
            overlay: 'var(--vl-color-bg-neutral-overlay)',
            foreground: 'var(--vl-color-bg-neutral-foreground)',
          },
          text: {
            DEFAULT: 'var(--vl-color-text-neutral-default)',
            weak: 'var(--vl-color-text-neutral-weak)',
            medium: 'var(--vl-color-text-neutral-medium)',
            hover: 'var(--vl-color-text-neutral-hover)',
            active: 'var(--vl-color-text-neutral-active)',
            strong: 'var(--vl-color-text-neutral-strong)',
            disabled: 'var(--vl-color-text-neutral-disabled)',
          },
          border: {
            DEFAULT: 'var(--vl-color-border-neutral-default)',
            weak: 'var(--vl-color-border-neutral-weak)',
            medium: 'var(--vl-color-border-neutral-medium)',
            hover: 'var(--vl-color-border-neutral-hover)',
            active: 'var(--vl-color-border-neutral-active)',
            strong: 'var(--vl-color-border-neutral-strong)',
            disabled: 'var(--vl-color-border-neutral-disabled)',
          },
        },
        // Semantic colors - Danger
        danger: {
          bg: {
            DEFAULT: 'var(--vl-color-bg-danger-default)',
            hover: 'var(--vl-color-bg-danger-hover)',
            active: 'var(--vl-color-bg-danger-active)',
            strong: 'var(--vl-color-bg-danger-strong)',
          },
          text: {
            DEFAULT: 'var(--vl-color-text-danger-default)',
            hover: 'var(--vl-color-text-danger-hover)',
            active: 'var(--vl-color-text-danger-active)',
            strong: 'var(--vl-color-text-danger-strong)',
          },
          border: {
            DEFAULT: 'var(--vl-color-border-danger-default)',
            hover: 'var(--vl-color-border-danger-hover)',
            active: 'var(--vl-color-border-danger-active)',
            strong: 'var(--vl-color-border-danger-strong)',
          },
        },
        // Semantic colors - Success
        success: {
          bg: {
            DEFAULT: 'var(--vl-color-bg-success-default)',
            hover: 'var(--vl-color-bg-success-hover)',
            active: 'var(--vl-color-bg-success-active)',
            strong: 'var(--vl-color-bg-success-strong)',
          },
          text: {
            DEFAULT: 'var(--vl-color-text-success-default)',
            hover: 'var(--vl-color-text-success-hover)',
            active: 'var(--vl-color-text-success-active)',
            strong: 'var(--vl-color-text-success-strong)',
          },
          border: {
            DEFAULT: 'var(--vl-color-border-success-default)',
            hover: 'var(--vl-color-border-success-hover)',
            active: 'var(--vl-color-border-success-active)',
            strong: 'var(--vl-color-border-success-strong)',
          },
          icon: {
            DEFAULT: 'var(--vl-color-icon-success-default)',
            hover: 'var(--vl-color-icon-success-hover)',
            active: 'var(--vl-color-icon-success-active)',
            strong: 'var(--vl-color-icon-success-strong)',
          },
        },
        // Semantic colors - Warning
        warning: {
          bg: {
            DEFAULT: 'var(--vl-color-bg-warning-default)',
            hover: 'var(--vl-color-bg-warning-hover)',
            active: 'var(--vl-color-bg-warning-active)',
            strong: 'var(--vl-color-bg-warning-strong)',
          },
          text: {
            DEFAULT: 'var(--vl-color-text-warning-default)',
            hover: 'var(--vl-color-text-warning-hover)',
            active: 'var(--vl-color-text-warning-active)',
            strong: 'var(--vl-color-text-warning-strong)',
          },
          border: {
            DEFAULT: 'var(--vl-color-border-warning-default)',
            hover: 'var(--vl-color-border-warning-hover)',
            active: 'var(--vl-color-border-warning-active)',
            strong: 'var(--vl-color-border-warning-strong)',
          },
        },
      },
      spacing: {
        // Custom spacing value not in Tailwind defaults
        // Use standard Tailwind spacing (p-4, m-2, etc.) for all other values
        'vl-18': 'var(--vl-spacing-18)', // 18px - custom value
      },
      borderRadius: {
        // Custom border radius values not in Tailwind defaults
        // Use standard Tailwind radius (rounded-lg, rounded-xl, etc.) for other values
        'vl-10': 'var(--vl-border-radius-10)', // 10px - custom value
        'vl-20': 'var(--vl-border-radius-20)', // 20px - custom value
      },
      fontSize: {
        // Custom font sizes not in Tailwind defaults
        // Use standard Tailwind sizes (text-xs, text-sm, text-xl, etc.) for other values
        'vl-base': 'var(--vl-font-size-base)', // 15px - custom base size
        'vl-4': 'var(--vl-font-size-4)', // 28px - custom value
      },
      lineHeight: {
        // Custom line heights not in Tailwind defaults
        // Use standard Tailwind line heights (leading-4, leading-5, etc.) for other values
        'vl-1': 'var(--vl-line-height-1)', // 14px - custom value
        'vl-7': 'var(--vl-line-height-7)', // 44px - custom value
      },
      fontFamily: {
        'vl-sans': 'var(--vl-font-sans)',
        'vl-serif': 'var(--vl-font-serif)',
        'vl-mono': 'var(--vl-font-mono)',
      },    },
  },
};
