import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  children: ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  disabled = false,
  children,
  icon: Icon,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'h-btn rounded-button px-4 flex items-center justify-center gap-1 tracking-aplos transition-colors';

  const variantClasses = {
    primary:
      'bg-btn-primary text-btn-primary-text border-none hover:bg-btn-primary-hover hover:border-btn-primary-hover',
    secondary:
      'bg-primary-100 text-neutral-text border border-primary-700 hover:bg-primary-200 hover:border-primary-600',
    tertiary:
      'bg-neutral-bg text-neutral-text border border-neutral-border-strong hover:bg-neutral-bg-hover',
  };

  const iconColorClasses = {
    primary: 'text-btn-primary-text',
    secondary: 'text-primary-700 group-hover:text-primary-600',
    tertiary: 'text-neutral-border-strong',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        fontSize: '15px',
        borderWidth: variant === 'primary' ? '0px' : '1.5px',
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.borderWidth = '1.5px';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.borderWidth = '0px';
        }
      }}
    >
      {Icon && (
        <Icon
          className={`w-icon h-icon ${variant === 'tertiary' ? '' : iconColorClasses[variant]}`}
          strokeWidth={2}
          style={
            variant === 'tertiary'
              ? { color: 'var(--vl-color-border-neutral-strong)' }
              : undefined
          }
        />
      )}
      {children}
    </button>
  );
}
