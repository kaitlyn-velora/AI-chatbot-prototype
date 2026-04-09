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

type AnswerBlock = { type: 'heading'; level: number; content: string } | { type: 'paragraph'; content: string };

/** ATX heading on a line (optional up to 3 leading spaces per CommonMark). */
const HEADING_LINE = /^\s{0,3}(#{1,6})\s+(.*)$/;

function splitAnswerIntoBlocks(text: string): AnswerBlock[] {
  const lines = text.split('\n');
  const blocks: AnswerBlock[] = [];
  const para: string[] = [];

  const flushParagraph = () => {
    const content = para.join('\n');
    para.length = 0;
    if (content.trim().length > 0) {
      blocks.push({ type: 'paragraph', content });
    }
  };

  for (const line of lines) {
    const m = HEADING_LINE.exec(line);
    if (m) {
      flushParagraph();
      blocks.push({ type: 'heading', level: m[1].length, content: m[2] });
    } else {
      para.push(line);
    }
  }
  flushParagraph();
  return blocks;
}

function MarkdownHeading({ level, content }: { level: number; content: string }) {
  const L = Math.min(6, Math.max(1, level));
  const Tag = `h${L}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const sizeClass =
    L <= 1 ? 'text-vl-3 leading-vl-6' : L === 2 ? 'text-vl-1 leading-vl-4' : 'text-vl-1 leading-vl-base';

  return (
    <Tag
      className={`${sizeClass} font-vl-semibold text-neutral-text tracking-aplos mt-3 mb-0 first:mt-0`}
    >
      <RichInsightText text={content} />
    </Tag>
  );
}

/**
 * Copilot / model answers: `**bold**` plus markdown ATX headings (`#` … `######`) on their own lines.
 */
export function CopilotAnswerText({ text }: { text: string }) {
  const blocks = splitAnswerIntoBlocks(text);
  if (blocks.length === 0) {
    return null;
  }

  const bodyStyle = { fontSize: '13px', lineHeight: 1.65 } as const;

  return (
    <div className="space-y-2 text-neutral-text tracking-aplos">
      {blocks.map((b, i) =>
        b.type === 'heading' ? (
          <MarkdownHeading key={i} level={b.level} content={b.content} />
        ) : (
          <div key={i} className="whitespace-pre-line" style={bodyStyle}>
            <RichInsightText text={b.content} />
          </div>
        )
      )}
    </div>
  );
}
