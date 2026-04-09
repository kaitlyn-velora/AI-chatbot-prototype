import { Fragment, type CSSProperties } from 'react';

/** Renders `**segments**` as bold; preserves newlines (use with `whitespace-pre-line` on a parent block). */
export function RichInsightText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const parts = text.split('**');
  if (parts.length === 1) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }
  return (
    <span className={className} style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-vl-semibold text-inherit">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </span>
  );
}
