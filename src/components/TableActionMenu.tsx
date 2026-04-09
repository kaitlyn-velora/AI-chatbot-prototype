import { useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface TableActionMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: LucideIcon;
}

interface TableActionMenuProps {
  items: TableActionMenuItem[];
  onClose: () => void;
  position: { top: number; left: number };
}

export function TableActionMenu({ items, onClose, position }: TableActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-neutral-bg border border-neutral-border rounded-xl shadow-md min-w-[160px] z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {items.map((item, index) => {
        const ItemIcon = item.icon;
        const isDisabled = item.disabled;
        const isDanger = item.danger;

        return (
          <button
            key={index}
            onClick={() => {
              if (!isDisabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={isDisabled}
            className={`w-full flex items-center gap-3 px-4 py-2 tracking-aplos transition-colors ${
              isDisabled
                ? 'text-neutral-text-weak opacity-50 cursor-not-allowed'
                : isDanger
                ? 'text-danger-text-default hover:bg-primary-bg-default'
                : 'text-neutral-text hover:bg-primary-bg-default'
            }`}
            style={{
              fontSize: '14px',
              lineHeight: '1.4',
            }}
          >
            {ItemIcon && (
              <ItemIcon
                className={`w-4 h-4 ${isDanger ? 'text-danger-text-default' : 'text-neutral-text'}`}
                strokeWidth={2}
                style={{ width: '16px', height: '16px' }}
              />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
