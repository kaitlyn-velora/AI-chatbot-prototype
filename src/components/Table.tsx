import { useState, useMemo, useRef } from 'react';
import { ReactNode } from 'react';
import { ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';
import { TableActionMenu, type TableActionMenuItem } from './TableActionMenu';

export type { TableActionMenuItem };

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
  width?: string | number;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  defaultSort?: { column: string; direction: 'asc' | 'desc' };
  className?: string;
  getActionMenuItems?: (row: T) => TableActionMenuItem[];
}

type SortState = {
  column: string | null;
  direction: 'asc' | 'desc';
};

export function Table<T extends Record<string, any> = any>({
  columns,
  data,
  onSort,
  defaultSort,
  className = '',
  getActionMenuItems,
}: TableProps<T>) {
  const [sortState, setSortState] = useState<SortState>(() => {
    if (defaultSort) {
      return { column: defaultSort.column, direction: defaultSort.direction };
    }
    return { column: null, direction: 'asc' };
  });

  const [openActionMenu, setOpenActionMenu] = useState<{
    rowIndex: number;
    position: { top: number; left: number };
  } | null>(null);

  const actionButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    const newDirection =
      sortState.column === columnKey && sortState.direction === 'asc' ? 'desc' : 'asc';

    setSortState({ column: columnKey, direction: newDirection });

    if (onSort) {
      onSort(columnKey, newDirection);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortState.column) return data;

    const column = columns.find((col) => col.key === sortState.column);
    if (!column?.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortState.column!];
      const bValue = b[sortState.column!];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle dates
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortState.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Handle date strings (common format: MM/DD/YYYY)
      const dateA = parseDate(aValue);
      const dateB = parseDate(bValue);
      if (dateA && dateB) {
        return sortState.direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Handle strings
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (sortState.direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortState, columns]);

  const handleActionClick = (rowIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const container = button.closest('td');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Calculate position relative to the container
    setOpenActionMenu({
      rowIndex,
      position: {
        top: buttonRect.bottom - containerRect.top + 4, // Position below button
        left: buttonRect.right - containerRect.left + 4, // Position to the right of button
      },
    });
  };

  return (
    <div className={`overflow-x-auto ${className}`} style={{ borderRadius: '4px', overflow: 'hidden' }}>
      <table className="w-full border-collapse border-2 border-neutral-border">
        <thead>
          <tr className="bg-neutral-bg-weak">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left border-b border-neutral-border ${
                  column.sortable ? 'cursor-pointer select-none' : ''
                }`}
                style={{
                  width: column.width,
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '1.45',
                  color: 'var(--vl-color-text-neutral-default)',
                  borderBottomWidth: '1px',
                }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span className="tracking-aplos">{column.label}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={`w-4 h-4 ${
                          sortState.column === column.key && sortState.direction === 'asc'
                            ? 'text-neutral-text'
                            : 'text-neutral-text-weak opacity-30'
                        }`}
                        strokeWidth={2}
                        style={{ width: '16px', height: '16px', marginBottom: '-4px' }}
                      />
                      <ChevronDown
                        className={`w-4 h-4 ${
                          sortState.column === column.key && sortState.direction === 'desc'
                            ? 'text-neutral-text'
                            : 'text-neutral-text-weak opacity-30'
                        }`}
                        strokeWidth={2}
                        style={{ width: '16px', height: '16px' }}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className="bg-neutral-bg"
                style={{
                  borderBottom: '1px solid var(--vl-color-border-neutral-default)',
                }}
              >
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td
                      key={column.key}
                      className="px-4 py-3"
                      style={{
                        width: column.width,
                        fontSize: '14px',
                        lineHeight: '1.45',
                        color: 'var(--vl-color-text-neutral-default)',
                      }}
                    >
                      {column.render ? (
                        column.render(value, row)
                      ) : column.key === 'action' && getActionMenuItems ? (
                        <div className="relative">
                          <button
                            ref={(el) => {
                              actionButtonRefs.current[rowIndex] = el;
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionClick(rowIndex, e);
                            }}
                            className="text-neutral-text hover:opacity-80 transition-opacity cursor-pointer"
                            aria-label="Actions"
                            type="button"
                          >
                            <MoreVertical
                              className="w-4 h-4"
                              strokeWidth={2}
                              style={{ width: '16px', height: '16px' }}
                            />
                          </button>
                          {openActionMenu?.rowIndex === rowIndex && (
                            <TableActionMenu
                              items={getActionMenuItems(row)}
                              onClose={() => setOpenActionMenu(null)}
                              position={openActionMenu.position}
                            />
                          )}
                        </div>
                      ) : (
                        <span className="tracking-aplos">{value ?? '---'}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Helper function to parse date strings (MM/DD/YYYY format)
function parseDate(value: any): Date | null {
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    // Try to parse MM/DD/YYYY format
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (match) {
      const [, month, day, year] = match;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // Try standard date parsing
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}
