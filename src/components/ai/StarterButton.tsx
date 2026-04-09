interface StarterButtonProps {
  label: string;
  onClick: () => void;
}

export function StarterButton({ label, onClick }: StarterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-100 text-neutral-text border border-primary-700 rounded-button px-4 tracking-aplos transition-colors hover:bg-primary-200 hover:border-primary-600 text-left"
      style={{ fontSize: '13px', lineHeight: '1.4', paddingTop: '6px', paddingBottom: '6px' }}
    >
      {label}
    </button>
  );
}
