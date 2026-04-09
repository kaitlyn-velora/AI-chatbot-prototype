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
}

export function SimpleDropdown({
  label,
  icon: Icon,
  items,
  onItemClick,
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-neutral-text tracking-aplos transition-colors hover:opacity-80"
        style={{
          fontSize: '14px',
          lineHeight: '1.4',
        }}
      >
        {Icon && (
          <Icon
            className="w-4 h-4 text-neutral-text"
            strokeWidth={2}
            style={{ width: '16px', height: '16px' }}
          />
        )}
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-text-weak transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
          style={{ width: '16px', height: '16px' }}
        />
      </button>

      {isOpen && items.length > 0 && (
        <div
className="absolute top-full right-0 mt-1 bg-neutral-bg border border-neutral-border rounded-lg shadow-md min-w-[160px]"
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
