# Import Figma Tokens Agent

This agent helps you transform Figma variable exports into Velora token files.

## Overview

Figma allows you to export design variables as JSON. This agent transforms that JSON into the token file structure used by Velora theming.

## Usage

1. Export variables from Figma:
   - Open your Figma file
   - Go to Variables panel (Cmd+Option+K)
   - Click the menu (⋯) and select "Export variables"
   - Save the JSON file

2. Place the exported JSON file in the repository

3. Tag this agent with `@import-figma-tokens.md` and provide the path to the JSON file

4. The agent will:
   - Parse the Figma JSON structure
   - Map variables to the correct token categories
   - Generate/update token files in `src/tokens/`
   - Preserve any custom modifications

## Figma JSON Structure

Figma exports variables in this format:

```json
{
  "variableCollections": {
    "collection-id": {
      "id": "collection-id",
      "name": "Primitives/Colors",
      "modes": [
        { "modeId": "mode-1", "name": "Light" },
        { "modeId": "mode-2", "name": "Dark" }
      ]
    }
  },
  "variables": {
    "variable-id": {
      "id": "variable-id",
      "name": "Neutral/50",
      "resolvedType": "COLOR",
      "valuesByMode": {
        "mode-1": { "r": 1, "g": 1, "b": 1, "a": 1 },
        "mode-2": { "r": 0, "g": 0, "b": 0, "a": 1 }
      },
      "variableCollectionId": "collection-id"
    }
  }
}
```

## Token Mapping Strategy

### Collection Name → Token Category

Map Figma collection names to token file paths:

| Figma Collection | Token File |
|-----------------|------------|
| `Primitives/Colors` | `src/tokens/primitives/colors.js` |
| `Primitives/Spacing` | `src/tokens/primitives/spacing.js` |
| `Primitives/BorderRadius` | `src/tokens/primitives/border-radius.js` |
| `Primitives/FontSize` | `src/tokens/primitives/font-size.js` |
| `Primitives/LineHeight` | `src/tokens/primitives/line-height.js` |
| `Brand/Aplos` | `src/tokens/brand/aplos.js` |
| `Brand/Keela` | `src/tokens/brand/keela.js` |
| `Brand/Raisely` | `src/tokens/brand/raisely.js` |
| `Theme/Light` | `src/tokens/theme/light.js` |
| `Theme/Dark` | `src/tokens/theme/dark.js` |
| `Fonts` | `src/tokens/fonts/default.fonts.js` |

### Variable Name → Token Path

Variable names use `/` as separators. Convert to nested objects:

- `Neutral/50` → `{ Neutral: { 50: "#ffffff" } }`
- `Primary/Text/Default` → `{ Primary: { Text: { Default: "#..." } } }`
- `Spacing/Base` → `{ Base: 16 }`

### Color Conversion

Convert Figma RGBA to hex:

```js
function rgbaToHex({ r, g, b, a }) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}
```

### Number Handling

For spacing, border-radius, font-size, line-height:
- Extract numeric value from Figma
- Store as number (not string with units)
- Example: Figma "16px" → Token `16`

### Mode Handling

- Light mode (mode 1) → Use for light theme and brand tokens
- Dark mode (mode 2) → Use for dark theme overrides
- For primitives, use the first mode's values

## Token File Format

### Primitives (colors.js)

```js
export default {
  Neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    // ... etc
  },
  Purple: {
    50: '#faf5ff',
    // ... etc
  },
  // ... other color scales
};
```

### Brand (aplos.js)

```js
export default {
  Primary: {
    50: '#fafdff',
    100: '#edf5fa',
    // ... full scale
  },
  PrimaryDark: {
    50: '#05131b',
    // ... full scale
  },
  Accent1: {
    50: '#fbfdff',
    // ... full scale
  },
  Accent1Dark: {
    50: '#0d1215',
    // ... full scale
  },
  Btn: {
    Text: {
      Primary: {
        Light: '#ffffff',
        Dark: '#000000',
      },
    },
    BorderRadius: {
      Light: 8,
      Dark: 8,
    },
    Bg: {
      Primary: {
        Light: 'var(--vl-color-primary-600)',
        Hover: {
          Light: 'var(--vl-color-primary-700)',
          Dark: 'var(--vl-color-primary-500)',
        },
      },
    },
  },
};
```

### Theme (light.js, dark.js)

```js
export default {
  Neutral: {
    Text: {
      Default: '{Neutral.900}',
      Weak: '{Neutral.500}',
      // ... etc
    },
    Bg: {
      Default: '{Neutral.0}',
      Weak: '{Neutral.50}',
      // ... etc
    },
    Border: {
      Default: '{Neutral.200}',
      // ... etc
    },
  },
  Primary: {
    Text: {
      Default: '{Primary.800}',
      // ... etc
    },
    Bg: {
      Default: '{Primary.100}',
      Strong: '{Primary.600}',
      // ... etc
    },
    // ... etc
  },
  // ... other semantic categories
};
```

Note: Theme tokens use `{ColorScale.Shade}` references that get resolved at build time.

## Implementation Steps

1. **Parse Figma JSON**
   - Read the exported JSON file
   - Extract `variableCollections` and `variables`

2. **Group variables by collection**
   - Map each variable to its collection using `variableCollectionId`
   - Group by collection name

3. **Process each collection**
   - Determine target token file from collection name
   - Read existing token file (if exists) to preserve structure
   - Convert variables to token format
   - Handle mode-specific values (light/dark)

4. **Transform values**
   - Colors: RGBA → Hex
   - Numbers: Extract numeric value
   - References: Convert to `{Scale.Shade}` format for theme tokens

5. **Write token files**
   - Format as JavaScript ES module
   - Use consistent structure with existing files
   - Add helpful comments

## Example Transformation

**Input (Figma JSON):**

```json
{
  "variableCollections": {
    "col-1": {
      "name": "Primitives/Colors",
      "modes": [{ "modeId": "mode-1", "name": "Light" }]
    }
  },
  "variables": {
    "var-1": {
      "name": "Neutral/900",
      "resolvedType": "COLOR",
      "valuesByMode": {
        "mode-1": { "r": 0.1, "g": 0.1, "b": 0.1, "a": 1 }
      },
      "variableCollectionId": "col-1"
    }
  }
}
```

**Output (src/tokens/primitives/colors.js):**

```js
export default {
  Neutral: {
    900: '#1a1a1a',
  },
};
```

## Edge Cases

1. **Existing modifications**: Don't overwrite manual changes outside of Figma-managed tokens
2. **Missing collections**: Skip variables from collections that don't map to known categories
3. **Invalid values**: Log warnings for values that can't be converted
4. **Aliases**: Handle Figma variable aliases (when a variable references another)

## Validation

After generation, verify:
- [ ] All token files have valid JavaScript syntax
- [ ] Color values are valid hex codes
- [ ] Numeric values are numbers (not strings)
- [ ] Theme token references use correct format `{Scale.Shade}`
- [ ] No duplicate keys
- [ ] Consistent structure with existing files

## Build After Import

After updating token files, run the build to generate CSS:

```bash
npm run build
```

This will regenerate the CSS files in `dist/css/` with the updated tokens.
