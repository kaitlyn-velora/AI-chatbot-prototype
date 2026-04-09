import { Sparkles, X } from 'lucide-react';

interface AITriggerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AITriggerButton({ isOpen, onClick }: AITriggerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-btn-primary text-btn-primary-text h-btn rounded-button px-4 flex items-center gap-1 tracking-aplos transition-colors hover:bg-btn-primary-hover"
      style={{ fontSize: '15px' }}
    >
      {isOpen ? (
        <X className="w-icon h-icon" strokeWidth={2} />
      ) : (
        <Sparkles className="w-icon h-icon" strokeWidth={2} />
      )}
      {isOpen ? 'Close' : 'Copilot'}
    </button>
  );
}
