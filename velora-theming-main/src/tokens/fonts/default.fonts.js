/** @typedef {import('../types').FontTokens} FontTokens */

/** @type {FontTokens} */
export const fonts = {
  sans: "'Work Sans', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",

  size: {
    base: "15px",
    0: "12px",
    1: "14px",
    2: "16px",
    3: "20px",
    4: "28px",
    5: "36px"
  },

  lineHeight: {
    base: "20px",
    1: "14px",
    2: "16px",
    3: "20px",
    4: "24px",
    5: "28px",
    6: "32px",
    7: "44px"
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600
  },

  letterSpacing: {
    tight: "-0.02em"
  }
};