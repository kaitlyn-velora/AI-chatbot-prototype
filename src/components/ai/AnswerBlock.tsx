import { CopilotAnswerText, RichInsightText } from './RichInsightText';

interface FollowUp {
  label: string;
  onClick: () => void;
}

interface AnswerBlockProps {
  question: string;
  answer: string;
  source?: string;
  followUps?: FollowUp[];
}

export function AnswerBlock({ question, answer, source, followUps }: AnswerBlockProps) {
  return (
    <div className="space-y-4">
      <div className="border-l-2 border-primary-700 pl-3">
        <p
          className="text-neutral-text tracking-aplos whitespace-pre-line font-vl-medium"
          style={{ fontSize: '12px', lineHeight: 1.5 }}
        >
          <RichInsightText text={question} />
        </p>
      </div>

      <div className="pl-0 sm:pl-1">
        <div className="text-neutral-text tracking-aplos">
          <CopilotAnswerText text={answer} />
        </div>
        {source && (
          <p
            className="text-neutral-text-weak tracking-aplos mt-3 border-t border-neutral-border pt-3"
            style={{ fontSize: '11px', lineHeight: 1.45 }}
          >
            <span className="font-vl-medium text-neutral-text">Evidence</span>
            <span className="text-neutral-text-weak"> — </span>
            {source}
          </p>
        )}
      </div>

      {followUps && followUps.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-1">
          {followUps.map((fu, i) => (
            <button
              key={i}
              type="button"
              onClick={fu.onClick}
              className="w-full rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2 text-left tracking-aplos text-neutral-text transition-colors hover:border-neutral-border-strong hover:bg-neutral-bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              style={{ fontSize: '12px', lineHeight: 1.45 }}
            >
              {fu.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
