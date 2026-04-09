/** @typedef {import('../types').ColorTokens} ColorTokens */
import { colors as defaultColors } from './default.colors.js';

const primary = {
  50: "#edf5fa",
  100: "#e4f2fa",
  200: "#d6e7f3",
  300: "#c9ddeb",
  400: "#9fc4dc",
  500: "#84adc7",
  600: "#5792b6",
  700: "#006c9b",
  800: "#005d8c",
  900: "#1073a2",
  950: "#021019"
}

/** @type {ColorTokens} */
export const colors = {
  primary: {
    50: primary[50],
    100: primary[100],
    200: primary[200],
    300: primary[300],
    400: primary[400],
    500: primary[500],
    600: primary[600],
    700: primary[700],
    800: primary[800],
    900: primary[900],
    950: primary[950]
  },
  success: defaultColors.success,
  warning: defaultColors.warning,
  danger: defaultColors.danger,
  neutral: defaultColors.neutral,
  text: {
    ...defaultColors.text,
    neutral: {
      ...defaultColors.text.neutral,
      default: primary[950],
    },
    primary: {
       default: primary[700],
       hover: primary[800],
       strong: primary[900],
    }
  },
  borderTokens: {
    ...defaultColors.borderTokens,
    primary: {
      default: primary[300],
      strong: primary[600],
      strongHover: primary[700],
      strongActive: primary[800],
    }
  },
  bgTokens: {
    ...defaultColors.bgTokens,
    primary: {
      default: primary[50],
      active: primary[100],
      strong: primary[700],
    }
  },
  focusRing: {
    ...defaultColors.focusRing,
    primary: primary[200],
  }
}; 