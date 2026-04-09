import type { KeyboardEvent } from 'react';
import { AlertTriangle, CheckCircle, Info, LucideIcon } from 'lucide-react';
import type { PageId } from '../../pageIds';
import type { ReportsListFilter } from '../../types/reportsNavigation';
import type { AppNavigateFn, AppOpenReportsFn, InsightHandoffContext } from '../../types/insightHandoff';

export interface InsightData {
  type: 'warning' | 'success' | 'info';
  title: string;
  /** Secondary line (e.g. figures) in smaller type — keeps the headline about meaning. */
  figureLine?: string;
  /**
   * 1 = ship first (exact / binary / simple rules). 2 = after trust (interpretive).
   * Tier 3 signals are not stored on insights — see `INSIGHT_TIER_3_NOT_SHIPPED` in data/insightFeed.ts.
   */
  insightTier?: 1 | 2;
  /** Lower sorts first (defaults: warning before info before success). */
  priority?: number;
  /** Opens Reports with optional list filter / report runner (same as AI follow-ups). */
  openReports?: ReportsListFilter;
  /** Navigates to a main app area. */
  navigateTo?: PageId;
}

const iconMap: Record<string, LucideIcon> = {
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const colorMap: Record<string, string> = {
  warning: 'text-warning-icon-strong',
  success: 'text-success-icon-strong',
  info: 'text-primary-700',
};

interface InsightCardProps {
  insight: InsightData;
  onOpenReportsFiltered?: AppOpenReportsFn;
  onNavigate?: AppNavigateFn;
}

export function InsightCard({ insight, onOpenReportsFiltered, onNavigate }: InsightCardProps) {
  const { type, title, figureLine, insightTier, openReports, navigateTo } = insight;
  const isTier2 = insightTier === 2;
  const Icon = iconMap[type];
  const color = colorMap[type];

  const canReports = !!(openReports && onOpenReportsFiltered);
  const canPage = !!(navigateTo && onNavigate);
  const actionable = canReports || canPage;

  const handoff = (): InsightHandoffContext => ({ title, figureLine });

  const activate = () => {
    if (canReports) onOpenReportsFiltered(openReports, handoff());
    else if (canPage) onNavigate(navigateTo, handoff());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!actionable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  };

  return (
    <div
      role={actionable ? 'button' : undefined}
      tabIndex={actionable ? 0 : undefined}
      onClick={actionable ? activate : undefined}
      onKeyDown={actionable ? onKeyDown : undefined}
      className={`flex items-start gap-3 rounded-xl border bg-neutral-bg-weak p-4 ${
        isTier2 ? 'border-dashed border-neutral-border-strong' : 'border-neutral-border'
      } ${
        actionable
          ? 'cursor-pointer transition-colors hover:bg-neutral-bg hover:border-primary-border-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : ''
      }`}
    >
      <Icon
        className={`${color} shrink-0`}
        strokeWidth={2}
        style={{ width: '16px', height: '16px', marginTop: '2px' }}
        aria-hidden
      />
      <div className="min-w-0">
        <p className="text-neutral-text tracking-aplos" style={{ fontSize: '14px', lineHeight: '1.45' }}>
          {title}
          {actionable && (
            <span className="sr-only"> — press Enter to open</span>
          )}
        </p>
        {figureLine && (
          <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            {figureLine}
          </p>
        )}
      </div>
    </div>
  );
}
