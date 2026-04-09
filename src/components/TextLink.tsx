import { ReactNode } from 'react';

interface TextLinkProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function TextLink({
  children,
  onClick,
  href,
  className = '',
}: TextLinkProps) {
  const baseClasses = 'text-neutral-text tracking-aplos underline cursor-pointer transition-colors hover:text-neutral-text-strong';

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        style={{
          fontSize: '14px',
          lineHeight: '1.4',
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={{
        fontSize: '14px',
        lineHeight: '1.4',
      }}
    >
      {children}
    </button>
  );
}
