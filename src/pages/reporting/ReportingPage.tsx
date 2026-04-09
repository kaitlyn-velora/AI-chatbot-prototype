import { useState, useMemo, useEffect } from 'react';
import { Star, MoreVertical, Clock, LineChart, Mail, Search, Eye, ArrowUpDown, ChevronDown } from 'lucide-react';
import { reportFavoritesDisplay, reportRecentDisplay, reportSavedGrid, type ReportCardItem } from '../../data/mockData';
import { reportNameToRunId } from '../../data/reportRunRegistry';
import type { ReportsCategoryTab, ReportsListFilter } from '../../types/reportsNavigation';

function matchesSearch(name: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const terms = q.split(/\s+/).filter(Boolean);
  const n = name.toLowerCase();
  return terms.every((t) => n.includes(t));
}

function matchesCategory(item: ReportCardItem, tab: ReportsCategoryTab): boolean {
  if (tab === 'all') return true;
  const c = item.category ?? 'accounting';
  if (tab === 'donation') return c === 'donation';
  return c !== 'donation';
}

function ReportCard({
  item,
  dense,
  onOpen,
}: {
  item: ReportCardItem;
  dense?: boolean;
  onOpen?: () => void;
}) {
  const openCard = () => onOpen?.();

  return (
    <div
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? openCard : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCard();
              }
            }
          : undefined
      }
      className={`relative flex w-full flex-col gap-1 rounded-xl border border-neutral-border bg-neutral-bg p-3 text-left ${
        dense ? '' : 'min-h-[100px]'
      } ${onOpen ? 'cursor-pointer transition-colors hover:bg-neutral-bg-hover hover:border-primary-border-default' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <Star
          className={`shrink-0 mt-0.5 ${item.favorite ? 'text-warning-icon-strong fill-warning-icon-strong' : 'text-neutral-text-weak'}`}
          strokeWidth={2}
          style={{ width: 16, height: 16 }}
        />
        <button
          type="button"
          className="text-neutral-text-weak p-1 rounded-button hover:bg-neutral-bg-weak"
          aria-label="More"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
      <p className="text-neutral-text font-vl-medium tracking-aplos pr-6" style={{ fontSize: '14px', lineHeight: '20px' }}>
        {item.name}
      </p>
      {item.newExperience && (
        <span
          className="self-start px-2 py-0.5 rounded-button bg-primary-bg-default text-primary-700 font-vl-medium tracking-aplos"
          style={{ fontSize: '11px' }}
        >
          New experience
        </span>
      )}
      <p className="text-neutral-text-weak tracking-aplos mt-auto pt-2" style={{ fontSize: '12px' }}>
        Last accessed: {item.lastAccessed}
      </p>
    </div>
  );
}

export interface ReportingPageProps {
  appliedFilter?: ReportsListFilter | null;
  onFilterConsumed?: () => void;
  onRunReport?: (reportId: string) => void;
}

export function ReportingPage(props: ReportingPageProps = {}) {
  const { appliedFilter, onFilterConsumed, onRunReport } = props;

  const tryOpenReport = (name: string) => {
    if (!onRunReport) return;
    const id = reportNameToRunId(name);
    if (id) onRunReport(id);
  };
  const [tab, setTab] = useState<ReportsCategoryTab>('all');
  const [savedOpen, setSavedOpen] = useState(true);
  const [reportSearch, setReportSearch] = useState('');

  useEffect(() => {
    if (!appliedFilter) return;
    setTab(appliedFilter.tab ?? 'all');
    setReportSearch(appliedFilter.search);
    setSavedOpen(true);
    onFilterConsumed?.();
  }, [appliedFilter, onFilterConsumed]);

  const filteredFavorites = useMemo(
    () =>
      reportFavoritesDisplay.filter(
        (item) => matchesCategory(item, tab) && matchesSearch(item.name, reportSearch)
      ),
    [tab, reportSearch]
  );

  const filteredRecent = useMemo(
    () =>
      reportRecentDisplay.filter(
        (item) => matchesCategory(item, tab) && matchesSearch(item.name, reportSearch)
      ),
    [tab, reportSearch]
  );

  const filteredSaved = useMemo(
    () =>
      reportSavedGrid.filter(
        (item) => matchesCategory(item, tab) && matchesSearch(item.name, reportSearch)
      ),
    [tab, reportSearch]
  );

  const filterActive = reportSearch.trim().length > 0 || tab !== 'all';

  return (
    <div className="space-y-6 -mx-6">
      <div className="px-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '28px', lineHeight: '36px' }}>
            Reports
          </h1>
          <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '15px' }}>
            View and manage your financial reports
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 h-btn px-4 rounded-button border border-neutral-border-strong bg-neutral-bg text-neutral-text tracking-aplos hover:bg-neutral-bg-hover transition-colors"
            style={{ fontSize: '13px' }}
          >
            <LineChart className="w-icon h-icon text-primary-700" strokeWidth={2} />
            Data visualizer
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-btn px-4 rounded-button border border-neutral-border-strong bg-neutral-bg text-neutral-text tracking-aplos hover:bg-neutral-bg-hover transition-colors"
            style={{ fontSize: '13px' }}
          >
            <Mail className="w-icon h-icon text-primary-700" strokeWidth={2} />
            Manage emails
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
      {filterActive && (
        <p className="text-neutral-text-weak tracking-aplos rounded-lg border border-primary-border-default bg-primary-bg-default px-3 py-2" style={{ fontSize: '13px' }}>
          Showing reports
          {tab !== 'all' ? ` in ${tab === 'accounting' ? 'Accounting' : 'Donation'}` : ''}
          {reportSearch.trim() ? ` matching “${reportSearch.trim()}”` : ''}. Clear the search field and set All to reset.
        </p>
      )}

      <div className="rounded-xl bg-primary-bg-default/40 border border-neutral-border p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-primary-700 fill-primary-700" strokeWidth={2} />
              <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>
                Favorites
              </h2>
              <span className="rounded-full bg-neutral-bg border border-neutral-border px-2 py-0.5 text-neutral-text-weak tracking-aplos text-xs font-vl-medium">
                {filteredFavorites.length}
              </span>
            </div>
            {filteredFavorites.length === 0 ? (
              <p className="text-neutral-text-weak tracking-aplos text-sm py-4">No favorites match the current filters.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredFavorites.map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onOpen={
                      onRunReport && reportNameToRunId(item.name) ? () => tryOpenReport(item.name) : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-neutral-text-weak" strokeWidth={2} />
              <h2 className="text-neutral-text font-vl-semibold tracking-aplos" style={{ fontSize: '16px' }}>
                Recent
              </h2>
            </div>
            {filteredRecent.length === 0 ? (
              <p className="text-neutral-text-weak tracking-aplos text-sm py-4">No recent reports match the current filters.</p>
            ) : (
              <div className="rounded-xl border border-neutral-border bg-neutral-bg divide-y divide-neutral-border">
                {filteredRecent.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 ${onRunReport && reportNameToRunId(item.name) ? 'cursor-pointer hover:bg-neutral-bg-hover' : ''}`}
                    role={onRunReport && reportNameToRunId(item.name) ? 'button' : undefined}
                    onClick={onRunReport && reportNameToRunId(item.name) ? () => tryOpenReport(item.name) : undefined}
                    onKeyDown={
                      onRunReport && reportNameToRunId(item.name)
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              tryOpenReport(item.name);
                            }
                          }
                        : undefined
                    }
                    tabIndex={onRunReport && reportNameToRunId(item.name) ? 0 : undefined}
                  >
                    <Star
                      className={`shrink-0 mt-1 ${item.favorite ? 'text-warning-icon-strong fill-warning-icon-strong' : 'text-neutral-text-weak'}`}
                      strokeWidth={2}
                      style={{ width: 16, height: 16 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-text font-vl-medium tracking-aplos" style={{ fontSize: '14px' }}>
                        {item.name}
                      </p>
                      {item.newExperience && (
                        <span
                          className="inline-block mt-1 px-2 py-0.5 rounded-button bg-primary-bg-default text-primary-700 font-vl-medium tracking-aplos"
                          style={{ fontSize: '11px' }}
                        >
                          New experience
                        </span>
                      )}
                      <p className="text-neutral-text-weak tracking-aplos mt-1" style={{ fontSize: '12px' }}>
                        Last accessed: {item.lastAccessed}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-neutral-text-weak p-1 shrink-0"
                      aria-label="More"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'all' as const, label: 'All' },
              { id: 'accounting' as const, label: 'Accounting' },
              { id: 'donation' as const, label: 'Donation' },
            ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`h-btn px-5 rounded-full tracking-aplos font-vl-medium transition-colors ${
                tab === t.id
                  ? 'bg-primary-900 text-white'
                  : 'bg-neutral-bg-weak text-neutral-text border border-neutral-border hover:bg-neutral-bg'
              }`}
              style={{ fontSize: '13px' }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start text-primary-700 font-vl-medium tracking-aplos hover:underline"
          style={{ fontSize: '13px' }}
        >
          <Eye className="w-4 h-4" strokeWidth={2} />
          Show hidden reports
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-text-weak pointer-events-none" strokeWidth={2} />
        <input
          type="search"
          value={reportSearch}
          onChange={(e) => setReportSearch(e.target.value)}
          placeholder="Search reports"
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-bg text-neutral-text tracking-aplos placeholder:text-neutral-text-weak focus:outline-none focus:ring-2 focus:ring-primary-300"
          style={{ fontSize: '14px' }}
        />
      </div>

      <div className="rounded-xl border border-neutral-border overflow-hidden">
        <button
          type="button"
          onClick={() => setSavedOpen(!savedOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-primary-bg-default text-primary-900 tracking-aplos"
        >
          <span className="flex items-center gap-2 font-vl-semibold" style={{ fontSize: '14px' }}>
            <ChevronDown className={`w-4 h-4 transition-transform ${savedOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
            Saved reports
            <span className="rounded-full bg-neutral-bg border border-neutral-border px-2 py-0.5 text-neutral-text-weak text-xs font-vl-medium">
              {filteredSaved.length}
            </span>
          </span>
          <ArrowUpDown className="w-4 h-4 text-primary-700 shrink-0" strokeWidth={2} />
        </button>
        {savedOpen && (
          <div className="p-4 bg-neutral-bg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSaved.length === 0 ? (
              <p className="col-span-full text-neutral-text-weak tracking-aplos text-sm py-2 text-center">
                No saved reports match the current filters.
              </p>
            ) : (
              filteredSaved.map((item) => (
                <ReportCard
                  key={item.id}
                  item={item}
                  dense
                  onOpen={
                    onRunReport && reportNameToRunId(item.name) ? () => tryOpenReport(item.name) : undefined
                  }
                />
              ))
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
