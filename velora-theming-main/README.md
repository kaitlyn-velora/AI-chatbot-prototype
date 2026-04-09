# @velora/theming

> **⚠️ Work in Progress**
> This package is under active development and has not yet been officially released. APIs and token names may change before the stable release.

A flexible design token system for multi-brand theming. This package provides a complete theming solution with CSS custom properties and Tailwind integration.

## Features

- 🎨 **Multi-brand support** - Aplos, Keela, and Raisely themes included
- 🌓 **Dark mode** - Built-in light and dark mode support
- 🎯 **CSS custom properties** - Use tokens in any CSS-in-JS solution
- 🌊 **Tailwind preset** - Optional Tailwind integration
- 📦 **Tree-shakable** - Import only what you need
- 🔧 **Extensible** - Add your own brand themes
- 🎭 **Figma integration** - Import tokens directly from Figma

## Installation

```bash
yarn add @velora/theming
```

## Quick Start (with Tailwind)

### 1. Install dependencies

```bash
yarn add @velora/theming
yarn add -D tailwindcss
```

### 2. Configure Tailwind

```js
// tailwind.config.js
import veloraPreset from '@velora/theming/tailwind';

export default {
  presets: [veloraPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
```

### 3. Import theme CSS

```js
// main.js or index.js
import '@velora/theming/css/aplos';
import './index.css';
```

### 4. Add theme class and start using tokens

```html
<html class="aplos">
  <body>
    <div class="bg-neutral-bg text-neutral-text p-vl-16 rounded-vl-8">
      Hello Velora!
    </div>
  </body>
</html>
```

### Dark Mode

Add `data-theme="dark"` to enable dark mode:

```html
<html class="aplos" data-theme="dark">
```

### Available Themes

- `@velora/theming/css/aplos` - Aplos brand theme
- `@velora/theming/css/keela` - Keela brand theme
- `@velora/theming/css/raisely` - Raisely brand theme

## CSS-only Usage (without Tailwind)

If you're not using Tailwind, you can use CSS custom properties directly:

```js
import '@velora/theming/css/aplos';
```

```css
.card {
  background: var(--vl-color-bg-neutral-default);
  color: var(--vl-color-text-neutral-default);
  padding: var(--vl-spacing-16);
  border-radius: var(--vl-border-radius-8);
}
```

## Available Tokens

### Colors

#### Brand Colors

```jsx
<div className="bg-primary-600 text-white">Primary button</div>
<div className="bg-accent-1-500">Accent element</div>
```

Available scales: `primary-{50-999}`, `accent-1-{50-999}`

#### Semantic Colors

Semantic colors have `bg`, `text`, `border`, and `icon` variants:

```jsx
// Neutral
<div className="bg-neutral-bg text-neutral-text border-neutral-border">

// Status colors
<div className="bg-danger-bg-default text-danger-text-default">Error</div>
<div className="bg-success-bg-default text-success-text-default">Success</div>
<div className="bg-warning-bg-default text-warning-text-default">Warning</div>
```

Each semantic color supports states: `default`, `hover`, `active`, `strong`, `weak`, `disabled`

### Spacing

Use standard Tailwind spacing classes for most cases. The preset adds one custom spacing value not in Tailwind defaults:

```jsx
// Standard Tailwind spacing (uses Tailwind's default scale)
<div className="p-4 m-2 gap-6">  // 16px, 8px, 24px

// Custom spacing value
<div className="p-vl-18">  // 18px - not in Tailwind defaults
```

### Border Radius

Use standard Tailwind border radius classes for most cases. The preset adds two custom values not in Tailwind defaults:

```jsx
// Standard Tailwind border radius (uses Tailwind's default scale)
<div className="rounded-lg">     // 8px
<div className="rounded-2xl">    // 16px
<button className="rounded-full"> // Fully rounded (9999px)

// Custom border radius values
<div className="rounded-vl-10">  // 10px - not in Tailwind defaults
<div className="rounded-vl-20">  // 20px - not in Tailwind defaults
```

Tailwind's default scale covers most needs: `rounded` (4px), `rounded-md` (6px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px), `rounded-full`.

### Typography

```jsx
// Font families
<p className="font-vl-sans">Sans-serif text</p>
<p className="font-vl-mono">Monospace text</p>

// Font sizes - use standard Tailwind sizes for most cases
<h1 className="text-4xl">Large heading (36px)</h1>  // Tailwind default
<p className="text-sm">Small text (14px)</p>        // Tailwind default
<p className="text-vl-base">Base text (15px)</p>    // Custom 15px
<h2 className="text-vl-4">Heading (28px)</h2>       // Custom 28px

// Font weights - use standard Tailwind weights
<span className="font-normal">Regular (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>

// Line heights - use standard Tailwind line heights for most cases
<p className="leading-6">Comfortable reading (24px)</p>  // Tailwind default
<p className="leading-vl-1">Tight (14px)</p>             // Custom 14px
<p className="leading-vl-7">Extra loose (44px)</p>       // Custom 44px
```

## Programmatic Access

Import token values directly in JavaScript:

```js
import borderRadius from '@velora/theming/tokens/primitives/border-radius';
import spacing from '@velora/theming/tokens/primitives/spacing';
import aplosTokens from '@velora/theming/tokens/brand/aplos';

console.log(borderRadius.Base); // 16
console.log(spacing[16]); // 16
console.log(aplosTokens.Primary[800]); // '#006c9b'
```

This is useful for:
- Style-in-JS solutions (Emotion, Styled Components)
- Dynamic theming
- Design tools integration
- Documentation generation

## Figma Integration

This package includes agent scaffolding for importing design tokens from Figma.

### Token Source

Design tokens originate from Figma variable collections:

**[ARK Components Figma File](https://www.figma.com/design/F8rMavAwnFag21a04KUV9C/Nov-2025-%E2%80%94-ARK-Components?node-id=199-8262&p=f&m=dev)**

The workflow:
1. Export Figma variable collections as JSON
2. Generate JavaScript token files from the exports (via Cursor agent)
3. Run `npm run build` to generate CSS

See the [agents/import-figma-tokens.md](agents/import-figma-tokens.md) file for detailed instructions on:
- Exporting variables from Figma
- Transforming Figma JSON to token files
- Automating token updates

## Token Architecture

The token system uses a layered architecture:

```
Primitives (Raw values from Figma)
    ↓
Brand Tokens (Maps primitives to brand identity)
    ↓
Theme Tokens (Semantic tokens with references)
    ↓
CSS Custom Properties (Generated output)
```

### Reference System

Theme tokens use a reference system that gets resolved at build time:

```js
// Theme token file
{
  Primary: {
    Text: {
      Default: '{Primary.800}', // Reference
    }
  }
}

// Gets resolved to actual value from brand tokens
// Output CSS:
// --vl-color-text-primary-default: #006c9b;
```

This allows theme tokens to be brand-agnostic while brand tokens define the actual colors.

## Package Structure

```
@velora/theming/
├── dist/
│   ├── css/              # Generated CSS files
│   │   ├── aplos.css
│   │   ├── keela.css
│   │   └── raisely.css
│   ├── tokens/           # Token source files
│   └── tailwind/         # Tailwind preset
├── agents/               # Figma import tooling
└── src/                  # Source files
```

## Development

### Building the package

```bash
yarn install
yarn build
```

This will:
1. Generate CSS files from tokens (`yarn build:css`)
2. Generate Tailwind theme files (`yarn build:tailwind`)
3. Copy files to dist (`yarn build:dist`)

### Scripts

- `yarn build` - Build everything
- `yarn build:css` - Build CSS files only
- `yarn build:tailwind` - Build Tailwind theme
- `yarn build:dist` - Copy files to dist

## License

MIT

## Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

## Related Packages

- [@velora/ui](https://github.com/ARK-shared-platform/velora-ui) - Component library built with these tokens
