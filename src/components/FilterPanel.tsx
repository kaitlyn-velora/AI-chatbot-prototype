import { LucideIcon, ChevronDown } from 'lucide-react';
import { Button } from './Button';

export interface FilterDropdown {
  label: string;
  value: string;
  icon?: LucideIcon;
  onClick: () => void;
}

interface FilterPanelProps {
  filters: FilterDropdown[];
  onCustomize?: () => void;
  customizeIcon?: LucideIcon;
}

export function FilterPanel({
  filters,
  onCustomize,
  customizeIcon: CustomizeIcon,
}: FilterPanelProps) {
  return (
    <div 
      className="bg-primary-bg-default rounded-xl p-3 flex items-center justify-between border border-primary-border-default"
    >
      <div 
        className="grid grid-flow-col auto-cols-max gap-x-1.5 gap-y-1.5 justify-start"
        style={{ gridTemplateRows: 'repeat(2, 1fr)' }}
      >
        {filters.map((filter, index) => {
          const Icon = filter.icon;
          return (
            <button
              key={index}
              onClick={filter.onClick}
              className="bg-neutral-bg border border-neutral-border rounded-lg px-3 py-2 flex items-center gap-2 tracking-aplos transition-colors hover:bg-neutral-bg-weak"
              style={{
                fontSize: '14px',
                height: '36px',
              }}
            >
              {Icon && (
                <Icon
                  className="w-4 h-4 text-neutral-text"
                  strokeWidth={2}
                  style={{ width: '16px', height: '16px' }}
                />
              )}
              <span className="text-neutral-text">{filter.label}</span>
              <span className="text-neutral-text-weak">{filter.value}</span>
              <ChevronDown
                className="w-4 h-4 text-neutral-text-weak"
                strokeWidth={2}
                style={{ width: '16px', height: '16px' }}
              />
            </button>
          );
        })}
      </div>
      {onCustomize && CustomizeIcon && (
        <Button variant="tertiary" onClick={onCustomize} icon={CustomizeIcon}>
          Customize
        </Button>
      )}
    </div>
  );
}
