import { RichInsightText } from './RichInsightText';

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
    <div className="space-y-3">
      <div className="rounded-xl bg-primary-100 border border-primary-700 px-4 py-2">
        <p className="text-neutral-text tracking-aplos whitespace-pre-line" style={{ fontSize: '13px', lineHeight: '1.45' }}>
          <RichInsightText text={question} />
        </p>
      </div>

      <div className="px-1">
        <p className="text-neutral-text tracking-aplos whitespace-pre-line" style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <RichInsightText text={answer} />
        </p>
        {source && (
          <p className="text-neutral-text-weak tracking-aplos mt-2" style={{ fontSize: '12px', lineHeight: '1.4' }}>
            Evidence: {source}
          </p>
        )}
      </div>

      {followUps && followUps.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {followUps.map((fu, i) => (
            <button
              key={i}
              onClick={fu.onClick}
              className="bg-neutral-bg text-neutral-text border border-neutral-border-strong rounded-button px-3 tracking-aplos transition-colors hover:bg-neutral-bg-hover"
              style={{ fontSize: '12px', lineHeight: '1.4', paddingTop: '4px', paddingBottom: '4px' }}
            >
              {fu.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
