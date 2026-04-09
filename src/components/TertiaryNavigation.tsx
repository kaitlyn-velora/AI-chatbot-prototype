import { useState, useEffect, useRef } from 'react';
import { LucideIcon, ChevronDown, Calendar, LayoutGrid, HelpCircle, User, ThumbsUp, Bug, ArrowLeftRight, LogOut } from 'lucide-react';

export interface TertiaryNavItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export interface OrgDropdownItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isHeader?: boolean;
  isSeparator?: boolean;
  isDanger?: boolean;
}

export interface TertiaryNavigationProps {
  tertiaryItems?: TertiaryNavItem[];
  orgName?: string;
  orgLogoUrl?: string;
  orgDropdownItems?: OrgDropdownItem[];
  onOrgDropdownItemClick?: (item: OrgDropdownItem) => void;
}

export function TertiaryNavigation({
  tertiaryItems = [],
  orgName = 'Oregon Ministry Network',
  orgLogoUrl,
  orgDropdownItems = [],
  onOrgDropdownItemClick,
}: TertiaryNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdownItemClick = (item: OrgDropdownItem) => {
    if (item.isHeader || item.isSeparator) return;
    
    item.onClick();
    if (onOrgDropdownItemClick) {
      onOrgDropdownItemClick(item);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="sticky top-0 z-[9999] w-full bg-neutral-bg border-b border-neutral-border"
      style={{ borderBottomWidth: '1px' }}
    >
      <div className="flex items-center justify-between px-6" style={{ height: '48px' }}>
        {/* Left: Tertiary nav items */}
        <div className="flex items-center gap-6">
          {tertiaryItems.map((item, index) => {
            const LeftIcon = item.leftIcon;
            const RightIcon = item.rightIcon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="relative flex items-center gap-2 tracking-aplos transition-colors"
                style={{
                  height: '32px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  fontSize: '14px',
                }}
              >
                <span
                  className={item.isActive ? 'text-primary-800 font-semibold' : 'text-neutral-text-weak tracking-aplos'}
                  style={{
                    fontWeight: item.isActive ? 600 : 400,
                    lineHeight: item.isActive ? '16px' : '1.4',
                    fontSize: '14px',
                  }}
                >
                  {item.label}
                </span>
                {item.isActive && (
                  <div
                    className="absolute left-0 right-0"
                    style={{
                      bottom: '-8px',
                      height: '3px',
                      backgroundColor: 'var(--vl-btn-bg-primary-light)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Org dropdown trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 tracking-aplos transition-colors hover:opacity-80"
            style={{
              fontSize: '14px',
              lineHeight: '1.4',
            }}
          >
            {orgLogoUrl ? (
              <img
                src={orgLogoUrl}
                alt={`${orgName} logo`}
                className="w-8 h-8 rounded-full"
                style={{ width: '32px', height: '32px' }}
              />
            ) : (
              <div
                className="rounded-full bg-green-500"
                style={{ width: '32px', height: '32px' }}
              />
            )}
            <span className="text-neutral-text">{orgName}</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-text-weak transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={2}
              style={{ width: '16px', height: '16px' }}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && orgDropdownItems.length > 0 && (
            <div
              className="absolute top-full right-0 mt-1 bg-neutral-bg border border-neutral-border rounded-b-xl shadow-md min-w-[200px]"
              style={{
                borderRadius: '0 0 12px 12px',
              }}
            >
              {orgDropdownItems.map((item, index) => {
                const Icon = item.icon;

                if (item.isSeparator) {
                  return (
                    <div
                      key={index}
                      className="border-t border-neutral-border my-1"
                      style={{ borderTopWidth: '1px' }}
                    />
                  );
                }

                if (item.isHeader) {
                  return (
                    <div
                      key={index}
                      className="px-4 py-3 font-semibold text-neutral-text tracking-aplos"
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
                      {item.label}
                    </div>
                  );
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleDropdownItemClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 tracking-aplos transition-colors ${
                      item.isDanger
                        ? 'text-danger-text-default hover:bg-danger-bg-default'
                        : 'text-neutral-text hover:bg-primary-bg-default'
                    }`}
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.4',
                    }}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        item.isDanger ? 'text-danger-text-default' : 'text-neutral-text'
                      }`}
                      strokeWidth={2}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
