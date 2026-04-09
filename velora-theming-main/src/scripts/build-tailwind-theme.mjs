import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

/* global console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDS = ["aplos", "keela", "raisely"];
const TAILWIND_OUTPUT_DIR = path.resolve(__dirname, "../../dist/tailwind");

/**
 * Resolve token references like {Primary.700} against brand color tokens
 */
function resolveTokenReference(value, brandTokens) {
  if (typeof value !== "string") return value;

  const refMatch = value.match(/^\{(\w+)\.(\w+)\}$/);
  if (!refMatch) return value;

  const [, scale, shade] = refMatch;
  const colorScale = brandTokens[scale];
  if (colorScale && colorScale[shade]) {
    return colorScale[shade];
  }

  console.warn(`⚠️  Could not resolve token reference: ${value}`);
  return value;
}

/**
 * Deep clone an object and resolve all token references
 */
function resolveAllReferences(obj, brandTokens) {
  if (typeof obj === "string") {
    return resolveTokenReference(obj, brandTokens);
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      result[key] = resolveAllReferences(value, brandTokens);
    } else if (typeof value === "string") {
      result[key] = resolveTokenReference(value, brandTokens);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Convert color name path to kebab-case for Tailwind
 */
function toKebabCase(str) {
  return str
    .replace(/\s+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Generate @theme block content
 */
function generateThemeBlock(brandTokens, resolvedTheme) {
  const lines = [];

  // Brand colors - Primary scale
  lines.push("  /* Brand colors - Primary */");
  if (brandTokens.Primary) {
    for (const [shade, color] of Object.entries(brandTokens.Primary)) {
      lines.push(`  --color-primary-${shade.toLowerCase()}: ${color.toLowerCase()};`);
    }
  }
  lines.push("");

  // Brand colors - Accent1 scale  
  if (brandTokens.Accent1) {
    lines.push("  /* Brand colors - Accent 1 */");
    for (const [shade, color] of Object.entries(brandTokens.Accent1)) {
      lines.push(`  --color-accent1-${shade.toLowerCase()}: ${color.toLowerCase()};`);
    }
    lines.push("");
  }

  // Semantic colors - Neutral
  lines.push("  /* Semantic colors - Neutral */");
  if (resolvedTheme.Neutral) {
    if (resolvedTheme.Neutral.Bg) {
      for (const [key, color] of Object.entries(resolvedTheme.Neutral.Bg)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-neutral-bg-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Neutral.Text) {
      for (const [key, color] of Object.entries(resolvedTheme.Neutral.Text)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-neutral-text-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Neutral.Border) {
      for (const [key, color] of Object.entries(resolvedTheme.Neutral.Border)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-neutral-border-${kebab}: ${color.toLowerCase()};`);
      }
    }
  }
  lines.push("");

  // Semantic colors - Primary
  lines.push("  /* Semantic colors - Primary */");
  if (resolvedTheme.Primary) {
    if (resolvedTheme.Primary.Bg) {
      for (const [key, color] of Object.entries(resolvedTheme.Primary.Bg)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-primary-bg-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Primary.Text) {
      for (const [key, color] of Object.entries(resolvedTheme.Primary.Text)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-primary-text-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Primary.Border) {
      for (const [key, color] of Object.entries(resolvedTheme.Primary.Border)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-primary-border-${kebab}: ${color.toLowerCase()};`);
      }
    }
  }
  lines.push("");

  // Semantic colors - Danger
  lines.push("  /* Semantic colors - Danger */");
  if (resolvedTheme.Danger) {
    if (resolvedTheme.Danger.Bg) {
      for (const [key, color] of Object.entries(resolvedTheme.Danger.Bg)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-danger-bg-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Danger.Text) {
      for (const [key, color] of Object.entries(resolvedTheme.Danger.Text)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-danger-text-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Danger.Border) {
      for (const [key, color] of Object.entries(resolvedTheme.Danger.Border)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-danger-border-${kebab}: ${color.toLowerCase()};`);
      }
    }
  }
  lines.push("");

  // Semantic colors - Success
  lines.push("  /* Semantic colors - Success */");
  if (resolvedTheme.Success) {
    if (resolvedTheme.Success.Bg) {
      for (const [key, color] of Object.entries(resolvedTheme.Success.Bg)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-success-bg-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Success.Text) {
      for (const [key, color] of Object.entries(resolvedTheme.Success.Text)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-success-text-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Success.Border) {
      for (const [key, color] of Object.entries(resolvedTheme.Success.Border)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-success-border-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Success.Icon) {
      for (const [key, color] of Object.entries(resolvedTheme.Success.Icon)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-success-icon-${kebab}: ${color.toLowerCase()};`);
      }
    }
  }
  lines.push("");

  // Semantic colors - Warning
  lines.push("  /* Semantic colors - Warning */");
  if (resolvedTheme.Warning) {
    if (resolvedTheme.Warning.Bg) {
      for (const [key, color] of Object.entries(resolvedTheme.Warning.Bg)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-warning-bg-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Warning.Text) {
      for (const [key, color] of Object.entries(resolvedTheme.Warning.Text)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-warning-text-${kebab}: ${color.toLowerCase()};`);
      }
    }
    if (resolvedTheme.Warning.Border) {
      for (const [key, color] of Object.entries(resolvedTheme.Warning.Border)) {
        const kebab = toKebabCase(key);
        lines.push(`  --color-warning-border-${kebab}: ${color.toLowerCase()};`);
      }
    }
  }
  lines.push("");

  // Spacing - only add custom 18px, rest use Tailwind defaults
  lines.push("  /* Spacing - only custom value not in Tailwind defaults */");
  lines.push("  --spacing-18: 18px;");
  lines.push("");

  // Border radius - map to standard Tailwind names
  lines.push("  /* Border radius - override Tailwind defaults with Velora values */");
  lines.push("  --radius-sm: 4px;");
  lines.push("  --radius-DEFAULT: 6px;");
  lines.push("  --radius-md: 8px;");
  lines.push("  --radius-lg: 10px;");
  lines.push("  --radius-xl: 12px;");
  lines.push("  --radius-2xl: 16px;");
  lines.push("  --radius-3xl: 20px;");
  lines.push("  --radius-full: 9999px;");
  lines.push("");

  // Typography - custom font sizes
  lines.push("  /* Typography - custom font sizes */");
  lines.push("  --font-size-xs: 12px;");    // vl-0
  lines.push("  --font-size-sm: 14px;");    // vl-1
  lines.push("  --font-size-base: 15px;");  // vl-base (custom)
  lines.push("  --font-size-lg: 20px;");    // vl-3
  lines.push("  --font-size-2xl: 28px;");   // vl-4
  lines.push("  --font-size-3xl: 36px;");   // vl-5
  lines.push("");

  // Font weights
  lines.push("  /* Font weights */");
  lines.push("  --font-weight-medium: 500;");
  lines.push("  --font-weight-semibold: 600;");

  return lines.join("\n");
}

// Main build process
console.log("Building Tailwind theme files...\n");

for (const brand of BRANDS) {
  // Import brand tokens
  const brandModule = await import(`../tokens/brand/${brand}.js`);
  const brandTokens = brandModule.default;

  // Import theme tokens
  const lightThemeModule = await import(`../tokens/theme/light.js`);
  const lightTheme = lightThemeModule.default;

  // Resolve token references
  const resolvedTheme = resolveAllReferences(lightTheme, brandTokens);

  // Generate @theme block
  const themeBlock = generateThemeBlock(brandTokens, resolvedTheme);

  // Build final CSS
  const warningComment = `/* 
 * WARNING: This file is automatically generated by the build-tailwind-theme script.
 * DO NOT modify this file directly.
 * To update these styles, modify the source tokens and rebuild.
 * 
 * USAGE: Import this file AFTER importing tailwindcss in your main CSS file:
 * 
 * @import "tailwindcss";
 * @import "@velora/theming/tailwind/aplos";
 */\n\n`;

  const css = `${warningComment}@theme {\n${themeBlock}\n}\n`;

  // Format with Prettier
  let formattedCSS = css;
  try {
    formattedCSS = await prettier.format(css, {
      parser: "css",
      singleQuote: false
    });
  } catch (error) {
    console.warn(`⚠️  Prettier formatting failed for ${brand}, using unformatted CSS:`, error.message);
  }

  // Write to file
  const outPath = path.resolve(TAILWIND_OUTPUT_DIR, `${brand}.css`);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, formattedCSS, "utf8");
  console.log(`✅ Built Tailwind theme for ${brand}: ${outPath}`);
}

console.log("\n✅ Tailwind theme files build complete!");
