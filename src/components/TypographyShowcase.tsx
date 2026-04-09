/**
 * Typography showcase aligned with @velora/theming.
 * Uses Velora font size, line height, weight, and font-family tokens.
 * Tailwind defaults (text-xs, text-sm, text-base, etc.) remain available for flexibility.
 */
export function TypographyShowcase() {
  return (
    <div className="space-y-10 font-vl-sans">
      {/* Velora type scale – all package sizes */}
      <div>
        <h2 className="text-vl-4 font-bold text-neutral-text tracking-aplos mb-2">
          Velora type scale
        </h2>
        <p className="text-vl-1 text-neutral-text-weak leading-vl-2 tracking-aplos mb-6">
          Font sizes, line heights, and weights from @velora/theming. Token names and values below.
        </p>
        <div className="space-y-5">
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-5 (36px) / --vl-line-height-7 (44px) / bold
            </p>
            <p className="text-vl-5 font-bold text-neutral-text leading-vl-7 tracking-aplos">
              Display – 36px
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-4 (28px) / --vl-line-height-5 (28px) / bold
            </p>
            <h1 className="text-vl-4 font-bold text-neutral-text leading-vl-5 tracking-aplos">
              Heading 1 – 28px
            </h1>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-3 (20px) / --vl-line-height-4 (24px) / font-vl-semibold
            </p>
            <h2 className="text-vl-3 font-vl-semibold text-neutral-text leading-vl-4 tracking-aplos">
              Heading 2 – 20px
            </h2>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-base (15px) / --vl-line-height-base (20px) / font-vl-regular
            </p>
            <p className="text-vl-base font-vl-regular text-neutral-text leading-vl-base tracking-aplos">
              Body base – 15px. Regular weight for standard content and paragraphs.
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-base (15px) / --vl-line-height-base (20px) / font-vl-semibold
            </p>
            <p className="text-vl-base font-vl-semibold text-neutral-text leading-vl-base tracking-aplos">
              Body base strong – 15px semibold.
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-1 (14px) / --vl-line-height-2 (16px) / font-vl-regular
            </p>
            <p className="text-vl-1 font-vl-regular text-neutral-text leading-vl-2 tracking-aplos">
              Small – 14px. Regular weight for secondary information.
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-1 (14px) / --vl-line-height-2 (16px) / font-vl-semibold
            </p>
            <p className="text-vl-1 font-vl-semibold text-neutral-text leading-vl-2 tracking-aplos">
              Small strong – 14px semibold.
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-0 (12px) / --vl-line-height-1 (14px) / font-vl-regular
            </p>
            <p className="text-vl-0 font-vl-regular text-neutral-text-weak leading-vl-1 tracking-aplos">
              Caption – 12px. Labels and metadata.
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak leading-vl-2 tracking-aplos mb-1">
              --vl-font-size-0 (12px) / --vl-line-height-1 (14px) / font-vl-semibold
            </p>
            <p className="text-vl-0 font-vl-semibold text-neutral-text-weak leading-vl-1 tracking-aplos">
              Caption strong – 12px semibold.
            </p>
          </div>
        </div>
      </div>

      {/* Velora font families */}
      <div>
        <h2 className="text-vl-3 font-vl-semibold text-neutral-text tracking-aplos mb-4">
          Font families (Velora)
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-vl-0 text-neutral-text-weak tracking-aplos mb-1">font-vl-sans (--vl-font-sans)</p>
            <p className="text-vl-base font-vl-sans text-neutral-text tracking-aplos">
              Work Sans – primary UI font
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak tracking-aplos mb-1">font-vl-serif (--vl-font-serif)</p>
            <p className="text-vl-base font-vl-serif text-neutral-text tracking-aplos">
              Georgia – serif fallback
            </p>
          </div>
          <div>
            <p className="text-vl-0 text-neutral-text-weak tracking-aplos mb-1">font-vl-mono (--vl-font-mono)</p>
            <p className="text-vl-base font-vl-mono text-neutral-text tracking-aplos">
              Monospace – code and data
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind defaults still available */}
      <div>
        <h2 className="text-vl-3 font-vl-semibold text-neutral-text tracking-aplos mb-4">
          Tailwind defaults (unchanged)
        </h2>
        <p className="text-vl-1 text-neutral-text-weak leading-vl-2 tracking-aplos mb-4">
          Standard Tailwind typography classes (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, etc.)
          and font weights (font-normal, font-medium, font-semibold, font-bold) remain available when you
          need sizes or weights outside the Velora scale.
        </p>
        <div className="flex flex-wrap gap-4 text-neutral-text">
          <span className="text-xs">text-xs</span>
          <span className="text-sm">text-sm</span>
          <span className="text-base">text-base</span>
          <span className="text-lg">text-lg</span>
          <span className="text-xl">text-xl</span>
          <span className="text-2xl">text-2xl</span>
        </div>
      </div>
    </div>
  );
}
