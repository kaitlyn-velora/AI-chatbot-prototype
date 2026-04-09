/**
 * TypeScript types for Figma-based token structure
 */

// Color scale with numeric keys (0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 999)
export type ColorScale = {
  [key: string]: string; // Supports "0", "50", "100", etc. as string keys
};

// Primitives - raw color scales
export type Primitives = {
  [colorName: string]: ColorScale | string; // Can be a scale or single color value
};

// Base Colors - organized color scales
export type BaseColors = {
  [colorName: string]: ColorScale | string;
};

// Brand tokens structure
export type BrandTokens = {
  Primary: ColorScale;
  PrimaryDark: ColorScale;
  Accent1: ColorScale;
  Accent1Dark: ColorScale;
  Accent2?: ColorScale;
  Accent2Dark?: ColorScale;
  Btn?: {
    Text?: {
      Primary?: {
        Light: string;
        Dark: string;
      };
      Secondary?: {
        Light: string;
        Dark: string;
      };
      Danger?: {
        Light: string;
        Dark: string;
      };
    };
    BorderRadius?: {
      Light: number;
      Dark: number;
    };
    Bg?: {
      'Primary'?: {
        Light: string;
        Dark: string;
      };
      'Primary Hover'?: {
        Light: string;
        Dark: string;
      };
      'Secondary'?: {
        Light: string;
        Dark: string;
      };
      'Danger'?: {
        Light: string;
        Dark: string;
      };
    };
    Border?: {
      'Secondary'?: {
        Light: string;
        Dark: string;
      };
      'Danger'?: {
        Light: string;
        Dark: string;
      };
      'Secondary Mono'?: {
        Light: string;
        Dark: string;
      };
    };
  };
  [key: string]: unknown; // Allow additional properties
};

// Core Palette - brand-specific color scales for light/dark
export type CorePalette = {
  Light: ColorScale;
  Dark: ColorScale;
};

// Theme semantic tokens structure
export type ThemeTokens = {
  'Neutral': {
    Overlay?: string;
    Text: {
      'Default': string;
      'Weak': string;
      'Weak Hover'?: string;
      'Disabled': string;
      'Foreground': string;
    };
    Bg: {
      Default: string;
      Weak: string;
      Medium?: string;
      Hover?: string;
      Active?: string;
      Strong: string;
      Disabled: string;
    };
    Border: {
      'Default': string;
      'Hover'?: string;
      'Active'?: string;
      'Strong': string;
      'Strong Hover'?: string;
      'Disabled'?: string;
      'Weak'?: string;
    };
  };
  'Primary': {
    Text: {
      Default: string;
      Hover?: string;
      Strong: string;
    };
    Bg: {
      'Default': string;
      'Hover': string;
      'Active': string;
      'Strong': string;
      'Strong Hover': string;
    };
    Border: {
      'Default': string;
      'Hover': string;
      'Active': string;
      'Strong': string;
      'Strong Hover': string;
    };
  };
  'Danger': {
    Text: {
      Default: string;
      Hover?: string;
      Strong: string;
    };
    Bg: {
      'Default'?: string;
      'Default Hover'?: string;
      'Weak': string;
      'Weak Hover'?: string;
      'Weak Active'?: string;
      'Strong': string;
      'Strong Hover': string;
      'Strong Active': string;
    };
    Border: {
      'Default'?: string;
      'Strong': string;
      'Strong Hover': string;
      'Strong Active': string;
    };
  };
  'Success'?: {
    Text: {
      Default: string;
      Strong?: string;
    };
    Bg: {
      Default?: string;
      Strong?: string;
    };
    Border: {
      Default?: string;
      Strong?: string;
    };
    Icon?: {
      Default?: string;
    };
  };
  'Warning'?: {
    Text: {
      Default: string;
      Strong?: string;
    };
    Bg: {
      Default?: string;
      Strong?: string;
    };
    Border: {
      Default?: string;
      Strong?: string;
    };
  };
  'Accent 1'?: {
    Text: {
      Default: string;
      Strong?: string;
    };
    Bg: {
      Default: string;
      Medium?: string;
      Strong: string;
    };
    Border: {
      'Default': string;
      'Strong': string;
      'Strong Hover'?: string;
    };
    Icon?: {
      'Default'?: string;
      'Icon Hover'?: string;
    };
  };
  'Accent 2'?: {
    Text: {
      Default: string;
      Strong?: string;
    };
    Bg: {
      Default?: string;
      Weak?: string;
      Strong?: string;
    };
    Border: {
      Default?: string;
      Strong?: string;
    };
    Icon?: {
      Default?: string;
    };
  };
  [key: string]: unknown; // Allow additional properties
};

// Font families
export type FontFamilies = {
  sans: string;
  serif: string;
  mono: string;
};

// Focus ring tokens (if present in theme)
export type FocusRingTokens = {
  Primary?: string;
  Danger?: string;
  Success?: string;
};

// Typography tokens (if present in theme)
export type TypographyTokens = {
  FontFamily?: {
    Sans?: string;
    Serif?: string;
    Mono?: string;
  };
  FontSize?: {
    [key: string]: number;
  };
  FontWeight?: {
    [key: string]: string | number;
  };
  LineHeight?: {
    [key: string]: number;
  };
  Heading?: {
    [key: string]: {
      [variant: string]: {
        family?: string;
        size?: number;
        weight?: number;
        lineHeight?: number;
        letterSpacing?: number;
      };
    };
  };
  Paragraph?: {
    [key: string]: {
      [variant: string]: {
        family?: string;
        size?: number;
        weight?: number;
        lineHeight?: number;
        letterSpacing?: number;
      };
    };
  };
  Label?: {
    [key: string]: {
      [variant: string]: {
        family?: string;
        size?: number;
        weight?: number;
        lineHeight?: number;
        letterSpacing?: number;
      };
    };
  };
  Button?: {
    [key: string]: {
      family?: string;
      size?: number;
      weight?: number;
      lineHeight?: number;
      letterSpacing?: number;
    };
  };
};

// Spacing tokens (if present in theme)
export type SpacingTokens = {
  [key: string]: number;
};

// Border radius tokens (if present in theme)
export type BorderRadiusTokens = {
  [key: string]: number | string;
};
