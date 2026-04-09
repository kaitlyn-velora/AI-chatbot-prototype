interface StarterButtonProps {
  label: string;
  onClick: () => void;
  /**
   * `list` — full-width row, panel list scan (default in assistant panel).
   * `neutral` — compact pill. `primary` — CTA.
   */
  variant?: 'primary' | 'neutral' | 'list';
}

export function StarterButton({ label, onClick, variant = 'primary' }: StarterButtonProps) {
  if (variant === 'list') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2 text-left text-vl-0 leading-vl-2 tracking-aplos text-neutral-text transition-colors hover:border-neutral-border-strong hover:bg-neutral-bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        {label}
      </button>
    );
  }

  const base = 'tracking-aplos transition-colors text-left border max-w-full';
  const styles =
    variant === 'neutral'
      ? 'rounded-full px-3 bg-neutral-bg-weak border-neutral-border text-neutral-text hover:bg-neutral-bg-hover hover:border-neutral-border-strong'
      : 'rounded-button px-4 bg-primary-100 text-neutral-text border-primary-700 hover:bg-primary-200 hover:border-primary-600';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles}`}
      style={{ fontSize: '12px', lineHeight: 1.35, paddingTop: '8px', paddingBottom: '8px' }}
    >
      {label}
    </button>
  );
}
