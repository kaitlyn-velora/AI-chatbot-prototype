import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

/* global console */

/* ----------------------------------------
 * Constants & Paths
 * -------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDS = ["aplos", "keela", "raisely"];
const CSS_OUTPUT_DIR = path.resolve(__dirname, "../../dist/css");

/* ----------------------------------------
 * Helpers
 * -------------------------------------- */

/**
 * Resolve token references like {Primary.700} against brand color tokens
 * @param {string} value - The value that may contain a reference
 * @param {object} brandTokens - The brand's color tokens (e.g., { Primary: { 700: "#xxx" } })
 * @returns {string} - The resolved value or original if not a reference
 */
function resolveTokenReference(value, brandTokens) {
  if (typeof value !== "string") return value;

  // Match {ColorScale.Shade} pattern, e.g., {Primary.700} or {PrimaryDark.900}
  const refMatch = value.match(/^\{(\w+)\.(\w+)\}$/);
  if (!refMatch) return value;

  const [, scale, shade] = refMatch;
  const colorScale = brandTokens[scale];
  if (colorScale && colorScale[shade]) {
    return colorScale[shade];
  }

  console.warn(`⚠️  Could not resolve token reference: ${value}`);
  return value; // Return original if not found
}

/**
 * Deep clone an object and resolve all token references
 * @param {object} obj - The object to process
 * @param {object} brandTokens - The brand's color tokens
 * @returns {object} - A new object with all references resolved
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
 * Generate CSS variables from brand color scales (Primary, Accent1, etc.)
 */
function generateBrandColorTokens(brandTokens) {
  const vars = [];
  
  // Process each color scale (Primary, PrimaryDark, Accent1, etc.)
  for (const [colorName, colorScale] of Object.entries(brandTokens)) {
    if (colorName === "Btn") continue; // Handle Btn separately
    
    if (typeof colorScale === "object" && colorScale !== null) {
      // Check if it's a color scale (has numeric keys)
      const keys = Object.keys(colorScale);
      const isNumericScale = keys.some(k => !isNaN(k) || k === "0");
      
      if (isNumericScale) {
        // Generate CSS variables for each scale value
        for (const [scale, value] of Object.entries(colorScale)) {
          if (typeof value === "string") {
            const varName = `--vl-color-${colorName.toLowerCase()}-${scale}`;
            vars.push(`  ${varName}: ${value};`);
          }
        }
      }
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate CSS variables from theme semantic tokens
 */
function generateThemeTokens(themeTokens) {
  const vars = [];
  
  function processObject(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === "$extensions" || key === "$type") continue;
      
      const newPath = [...path, key];
      
      if (typeof value === "string") {
        // Generate CSS variable name from path
        // e.g., Neutral.Text.Default -> text-neutral-text-default
        // e.g., Primary.Bg.Strong -> bg-primary-bg-strong
        const varName = generateVarName(newPath);
        vars.push(`  ${varName}: ${value};`);
      } else if (typeof value === "number") {
        const varName = generateVarName(newPath);
        // Check if this is a border-radius token and append px unit
        const isBorderRadius = newPath.some(p => p.toLowerCase().includes("borderradius"));
        const cssValue = isBorderRadius ? `${value}px` : value;
        vars.push(`  ${varName}: ${cssValue};`);
      } else if (value && typeof value === "object") {
        processObject(value, newPath);
      }
    }
  }
  
  function generateVarName(path) {
    // Convert path like ["Neutral", "Text", "Default"] to "--vl-color-text-neutral-default"
    // or ["Primary", "Bg", "Strong"] to "--vl-color-bg-primary-strong"
    const normalized = path.map(p => p.toLowerCase().replace(/\s+/g, "-"));
    
    // Determine prefix based on first part (semantic category)
    let typePrefix = "";
    if (normalized[0] === "neutral" || normalized[0] === "primary" || 
        normalized[0] === "danger" || normalized[0] === "success" || 
        normalized[0] === "warning" || normalized[0].startsWith("accent")) {
      // Check second part to determine type (text, bg, border, icon)
      if (normalized[1] === "text") {
        typePrefix = "text";
      } else if (normalized[1] === "bg") {
        typePrefix = "bg";
      } else if (normalized[1] === "border") {
        typePrefix = "border";
      } else if (normalized[1] === "icon") {
        typePrefix = "icon";
      } else if (normalized[0] === "neutral" && normalized[1] === "overlay") {
        return "--vl-color-bg-neutral-overlay";
      }
      
      if (typePrefix) {
        // Skip the type (index 1) to avoid duplication like "text-neutral-text-default"
        // Result: --vl-color-{type}-{category}-{rest} e.g., --vl-color-text-neutral-default
        const category = normalized[0];
        const rest = normalized.slice(2).join("-");
        return `--vl-color-${typePrefix}-${category}-${rest}`;
      }
    }
    
    // Fallback: join all parts
    return `--vl-color-${normalized.join("-")}`;
  }
  
  processObject(themeTokens);
  return vars.join("\n");
}

/**
 * Generate CSS variables from button tokens
 */
function generateButtonTokens(btnTokens) {
  const vars = [];
  
  if (!btnTokens) return "";
  
  function processBtnObject(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...path, key];
      
      if (typeof value === "string") {
        // Generate variable name like --vl-btn-text-primary-light
        const normalized = newPath.map(p => p.toLowerCase().replace(/\s+/g, "-"));
        const varName = `--vl-btn-${normalized.join("-")}`;
        vars.push(`  ${varName}: ${value};`);
      } else if (typeof value === "number") {
        const normalized = newPath.map(p => p.toLowerCase().replace(/\s+/g, "-"));
        const varName = `--vl-btn-${normalized.join("-")}`;
        // Check if this is a border-radius token and append px unit
        const isBorderRadius = newPath.some(p => p.toLowerCase().includes("borderradius"));
        const cssValue = isBorderRadius ? `${value}px` : value;
        vars.push(`  ${varName}: ${cssValue};`);
      } else if (value && typeof value === "object") {
        processBtnObject(value, newPath);
      }
    }
  }
  
  processBtnObject(btnTokens);
  return vars.join("\n");
}

/**
 * Generate font CSS variables
 */
function generateFontTokens(fontFamilies, prefix = "--vl-font") {
  const vars = [];
  
  for (const [key, value] of Object.entries(fontFamilies)) {
    if (typeof value === "string") {
      const varName = `${prefix}-${key}`;
      vars.push(`  ${varName}: ${value};`);
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate border radius CSS variables
 */
function generateBorderRadiusTokens(borderRadius, prefix = "--vl-border-radius") {
  const vars = [];
  
  for (const [key, value] of Object.entries(borderRadius)) {
    if (typeof value === "number") {
      const varName = `${prefix}-${key.toLowerCase()}`;
      vars.push(`  ${varName}: ${value}px;`);
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate spacing CSS variables
 */
function generateSpacingTokens(spacing, prefix = "--vl-spacing") {
  const vars = [];
  
  for (const [key, value] of Object.entries(spacing)) {
    if (typeof value === "number") {
      const varName = `${prefix}-${key.toLowerCase()}`;
      vars.push(`  ${varName}: ${value}px;`);
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate font size CSS variables
 */
function generateFontSizeTokens(fontSize, prefix = "--vl-font-size") {
  const vars = [];
  
  for (const [key, value] of Object.entries(fontSize)) {
    if (typeof value === "number") {
      const varName = `${prefix}-${key.toLowerCase()}`;
      vars.push(`  ${varName}: ${value}px;`);
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate line height CSS variables
 */
function generateLineHeightTokens(lineHeight, prefix = "--vl-line-height") {
  const vars = [];
  
  for (const [key, value] of Object.entries(lineHeight)) {
    if (typeof value === "number") {
      const varName = `${prefix}-${key.toLowerCase()}`;
      vars.push(`  ${varName}: ${value}px;`);
    }
  }
  
  return vars.join("\n");
}

/**
 * Generate font weight CSS variables
 */
function generateFontWeightTokens(fontWeight, prefix = "--vl-font-weight") {
  const vars = [];

  for (const [key, value] of Object.entries(fontWeight)) {
    if (typeof value === "number") {
      const varName = `${prefix}-${key.toLowerCase()}`;
      vars.push(`  ${varName}: ${value};`);
    }
  }

  return vars.join("\n");
}


/* ----------------------------------------
 * Theme Builder
 * -------------------------------------- */

// Import primitive tokens (shared across all brands)
const borderRadiusModule = await import(`../tokens/primitives/border-radius.js`);
const borderRadius = borderRadiusModule.default;

const spacingModule = await import(`../tokens/primitives/spacing.js`);
const spacing = spacingModule.default;

const fontSizeModule = await import(`../tokens/primitives/font-size.js`);
const fontSize = fontSizeModule.default;

const lineHeightModule = await import(`../tokens/primitives/line-height.js`);
const lineHeight = lineHeightModule.default;

// Generate primitive token CSS variables
const borderRadiusVars = generateBorderRadiusTokens(borderRadius);
const spacingVars = generateSpacingTokens(spacing);
const fontSizeVars = generateFontSizeTokens(fontSize);
const lineHeightVars = generateLineHeightTokens(lineHeight);

for (const brand of BRANDS) {
  // Import brand tokens
  const brandModule = await import(`../tokens/brand/${brand}.js`);
  const brandTokens = brandModule.default;
  
  // Import theme tokens
  const lightThemeModule = await import(`../tokens/theme/light.js`);
  const lightTheme = lightThemeModule.default;
  
  const darkThemeModule = await import(`../tokens/theme/dark.js`);
  const darkTheme = darkThemeModule.default;
  
  // Import fonts
  const fontsModule = await import(`../tokens/fonts/default.fonts.js`);
  const fonts = fontsModule.fonts;
  
  // Generate brand color tokens (Primary, Accent1, etc.)
  const brandColorVars = generateBrandColorTokens(brandTokens);
  
  // Generate button tokens
  const buttonVars = generateButtonTokens(brandTokens.Btn);
  
  // Resolve token references in theme files against this brand's colors
  const resolvedLightTheme = resolveAllReferences(lightTheme, brandTokens);
  const resolvedDarkTheme = resolveAllReferences(darkTheme, brandTokens);
  
  // Generate theme semantic tokens for light mode
  const lightThemeVars = generateThemeTokens(resolvedLightTheme);
  
  // Generate theme semantic tokens for dark mode
  const darkThemeVars = generateThemeTokens(resolvedDarkTheme);
  
  // Generate font tokens
  const fontVars = generateFontTokens(fonts);
  
  // Generate font weight tokens
  const fontWeightVars = fonts.weight ? generateFontWeightTokens(fonts.weight) : "";
  
  // Combine light mode tokens
  const lightBlock = `/* Primitive tokens */\n${borderRadiusVars}\n\n${spacingVars}\n\n${fontSizeVars}\n\n${lineHeightVars}\n\n/* Brand color tokens */\n${brandColorVars}\n\n/* Button tokens */\n${buttonVars}\n\n/* Theme semantic tokens */\n${lightThemeVars}\n\n/* Font tokens */\n${fontVars}\n${fontWeightVars}`;
  
  // Combine dark mode tokens (override brand colors with dark variants if needed)
  let darkBrandOverrides = "";
  if (brandTokens.PrimaryDark) {
    const darkPrimaryVars = [];
    for (const [scale, value] of Object.entries(brandTokens.PrimaryDark)) {
      if (typeof value === "string") {
        darkPrimaryVars.push(`  --vl-color-primary-${scale}: ${value};`);
      }
    }
    if (darkPrimaryVars.length > 0) {
      darkBrandOverrides = `/* Dark mode brand color overrides */\n${darkPrimaryVars.join("\n")}\n\n`;
    }
  }
  
  if (brandTokens.Accent1Dark) {
    const darkAccent1Vars = [];
    for (const [scale, value] of Object.entries(brandTokens.Accent1Dark)) {
      if (typeof value === "string") {
        darkAccent1Vars.push(`  --vl-color-accent1-${scale}: ${value};`);
      }
    }
    if (darkAccent1Vars.length > 0) {
      darkBrandOverrides += `/* Dark mode accent1 color overrides */\n${darkAccent1Vars.join("\n")}\n\n`;
    }
  }
  
  const darkBlock = `${darkBrandOverrides}/* Dark mode theme semantic tokens */\n${darkThemeVars}`;
  
  // Final output
  const warningComment = `/* 
  * WARNING: This file is automatically generated by the build-themes script.
  * DO NOT modify this file directly.
  * To update these styles, modify the source tokens.
  */\n\n`;
  
  // Build global-scoped tokens
  const fullCSS = `${warningComment}:root.${brand} {\n${lightBlock}\n}\n\n:root.${brand}[data-theme="dark"] {\n${darkBlock}\n}`;
  const outPath = path.resolve(CSS_OUTPUT_DIR, `${brand}.css`);
  
  // Format the CSS using Prettier, with error handling
  let formattedCSS = fullCSS;
  try {
    formattedCSS = await prettier.format(fullCSS, {
      parser: "css",
      singleQuote: true
    });
  } catch (error) {
    console.warn(`⚠️  Prettier formatting failed for ${brand}, using unformatted CSS:`, error.message);
    formattedCSS = fullCSS;
  }
  
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, formattedCSS, "utf8");
  console.log(`✅ Built theme CSS for ${brand}: ${outPath}`);
}
