import { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`h-10 w-full rounded-lg border border-neutral-border bg-neutral-bg px-4 text-neutral-text placeholder:text-neutral-text-weak tracking-aplos ${className}`}
      {...props}
    />
  );
}
