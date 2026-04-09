import { useState, useEffect, useRef } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';

export interface SimpleDropdownItem {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
}

interface SimpleDropdownProps {
  label: string;
  icon?: LucideIcon;
  items: SimpleDropdownItem[];
  onItemClick?: (item: SimpleDropdownItem) => void;
  /** Menu alignment under the trigger (default right). */
  menuAlign?: 'left' | 'right';
  /** Merged onto the trigger button (e.g. full-width panel control). */
  triggerClassName?: string;
}

export function SimpleDropdown({
  label,
  icon: Icon,
  items,
  onItemClick,
  menuAlign = 'right',
  triggerClassName = '',
}: SimpleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: SimpleDropdownItem) => {
    item.onClick();
    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-w-0 items-center gap-2 text-neutral-text tracking-aplos transition-colors ${
          triggerClassName || 'hover:opacity-80'
        }`}
        style={{
          fontSize: '13px',
          lineHeight: 1.4,
        }}
      >
        {Icon && (
          <Icon
            className="shrink-0 text-neutral-text-weak"
            strokeWidth={2}
            style={{ width: '16px', height: '16px' }}
          />
        )}
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        <ChevronDown
          className={`shrink-0 text-neutral-text-weak transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
          style={{ width: '16px', height: '16px' }}
        />
      </button>

      {isOpen && items.length > 0 && (
        <div
          className={`absolute top-full z-50 mt-1 max-h-[min(280px,50vh)] min-w-full overflow-y-auto rounded-lg border border-neutral-border bg-neutral-bg shadow-md ${
            menuAlign === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {items.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center gap-3 px-4 py-3 tracking-aplos transition-colors text-neutral-text hover:bg-primary-bg-default"
                style={{
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}
              >
                {ItemIcon && (
                  <ItemIcon
                    className="w-4 h-4 text-neutral-text"
                    strokeWidth={2}
                    style={{ width: '16px', height: '16px' }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
