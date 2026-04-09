import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface CustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  onCancel?: () => void;
  onApply?: () => void;
  cancelLabel?: string;
  applyLabel?: string;
}

export function CustomizePanel({
  isOpen,
  onClose,
  title = 'Customize',
  children,
  onCancel,
  onApply,
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
}: CustomizePanelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black"
        style={{ opacity: 0.6 }}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div
        className="fixed right-0 z-50"
        style={{
          top: '48px',
          bottom: '0px',
          marginTop: '0px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Outer border wrapper */}
        <div
          style={{
            width: '400px',
            height: '100%',
            borderLeft: '3px solid var(--vl-color-primary-300)',
            borderTop: '3px solid var(--vl-color-primary-300)',
            borderBottom: '3px solid var(--vl-color-primary-300)',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {/* Inner border */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              bottom: '3px',
              right: '0',
              borderLeft: '1.5px solid var(--vl-btn-bg-primary-light)',
              borderTop: '1.5px solid var(--vl-btn-bg-primary-light)',
              borderBottom: '1.5px solid var(--vl-btn-bg-primary-light)',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
              pointerEvents: 'none',
              height: '100%',
            }}
          />
          {/* Panel content */}
          <div
            className="bg-neutral-bg flex flex-col h-full"
            style={{
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b border-primary-border-default"
              style={{ borderBottomWidth: '1.5px' }}
            >
              <h2
                className="text-neutral-text"
                style={{
                  fontFamily: 'var(--FontFamily-Sans, "Work Sans")',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '24px',
                  letterSpacing: '-0.4px',
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-text-weak hover:text-neutral-text transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between gap-3 p-6 border-t border-primary-border-default bg-primary-bg-default"
            >
              <Button variant="tertiary" onClick={handleCancel}>
                {cancelLabel}
              </Button>
              <Button variant="primary" onClick={handleApply}>
                {applyLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
