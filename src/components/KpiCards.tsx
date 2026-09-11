import React from 'react';
import { AlertTriangle, AlertCircle, Route, Bell, MapPin, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface KpiCardsProps {
  onCardClick?: (cardType: string) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ onCardClick }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* CARD 1: High-Risk Zones */}
      <div
        onClick={() => onCardClick?.('high-risk')}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        role="button"
        tabIndex={0}
        aria-label="High-Risk Zones: 24"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-900 transition-colors">
              {t('highRiskZones')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <AlertTriangle size={17} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-orange-600 tracking-tight">
              24
            </span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
              <TrendingUp size={11} /> {t('increasing')}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {t('highRiskSubtitle')}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
          <span>{t('viewRiskMap')}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* CARD 2: Critical Zones */}
      <div
        onClick={() => onCardClick?.('critical')}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        role="button"
        tabIndex={0}
        aria-label="Critical Zones: 07"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-900 transition-colors">
              {t('criticalZones')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-200 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <AlertCircle size={17} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-red-600 tracking-tight">
              07
            </span>
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          </div>
          <p className="mt-1 text-xs text-red-600 font-semibold">
            {t('criticalSubtitle')}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
          <span>{t('filterCriticalSites')}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* CARD 3: Roads Affected */}
      <div
        onClick={() => onCardClick?.('roads')}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        role="button"
        tabIndex={0}
        aria-label="Roads Affected: 18"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-900 transition-colors">
              {t('roadsAffected')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <Route size={17} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-orange-600 tracking-tight">
              18
            </span>
            <span className="text-xs font-bold text-slate-500">{t('highways')}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {t('roadsSubtitle')}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
          <span>{t('viewRouteBreakdown')}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* CARD 4: Active Alerts */}
      <div
        onClick={() => onCardClick?.('alerts')}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        role="button"
        tabIndex={0}
        aria-label="Active Alerts: 12"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-900 transition-colors">
              {t('activeAlerts')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-200 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <Bell size={17} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-red-600 tracking-tight">
              12
            </span>
            <span className="inline-flex items-center text-[11px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
              {t('active')}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {t('alertsSubtitle')}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
          <span>{t('openAlertConsole')}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* CARD 5: Monitored Locations */}
      <div
        onClick={() => onCardClick?.('monitored')}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        role="button"
        tabIndex={0}
        aria-label="Monitored Locations: 1,284"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-900 transition-colors">
              {t('monitoredLocations')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <MapPin size={17} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-900 tracking-tight">
              1,284
            </span>
            <span className="text-xs font-bold text-emerald-600">{t('active')}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {t('monitoredSubtitle')}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
          <span>{t('viewTelemetryGrid')}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
