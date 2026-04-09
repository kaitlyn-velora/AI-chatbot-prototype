import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  variant: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ variant, message, isVisible, onClose }: ToastProps) {
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsDismissing(false);
      const timer = setTimeout(() => {
        setIsDismissing(true);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for animation to complete
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const variantClasses = {
    success: 'bg-success-bg-default border-success-border',
    error: 'bg-danger-bg-default border-danger-border',
  };

  const iconColorClasses = {
    success: 'text-success-icon-strong',
    error: 'text-danger-text-default',
  };

  const Icon = variant === 'success' ? CheckCircle2 : XCircle;

  const handleClose = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed right-6 z-50 rounded-xl border-2 p-4 ${variantClasses[variant]} flex items-start gap-3 min-w-[300px] max-w-md ${isDismissing ? 'animate-slide-out-down' : 'animate-slide-in-right'}`}
      style={{ bottom: '16px' }}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColorClasses[variant]}`} strokeWidth={2} />
      <p className="flex-1 text-neutral-text tracking-aplos text-sm">{message}</p>
      <button
        onClick={handleClose}
        className="text-neutral-text-weak hover:text-neutral-text transition-colors flex-shrink-0"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}
