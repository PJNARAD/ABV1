import React from 'react';
import { LiveAlert } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { AlertCircle, Clock, MapPin, ArrowRight, CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface LiveAlertsPanelProps {
  alerts?: LiveAlert[];
  onViewAllAlerts: () => void;
  onSelectAlert: (alert: LiveAlert) => void;
  onResolveAlert?: (alertId: string) => void;
  onInspectLocation?: (districtOrLocation: string, alert?: LiveAlert) => void;
}

export const LiveAlertsPanel: React.FC<LiveAlertsPanelProps> = ({
  alerts = [],
  onViewAllAlerts,
  onSelectAlert,
  onResolveAlert,
  onInspectLocation
}) => {
  const { t } = useTranslation();
  const safeAlerts = alerts || [];
  // Show top 5 active alerts on dashboard for clean visual alignment with GIS Map
  const displayAlerts = safeAlerts.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            {t('liveAlerts')}
          </h2>
          <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-mono">
            {safeAlerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH').length} {t('urgent')}
          </span>
        </div>
        <button
          onClick={onViewAllAlerts}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-950 hover:underline transition-colors"
        >
          <span>{t('viewAllAlerts')}</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="mt-3.5 space-y-3 flex-1 overflow-y-auto pr-0.5">
        {displayAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';

          let borderHighlight = 'border-slate-200 hover:border-slate-300';
          let indicatorBg = 'bg-slate-400';
          if (isCritical) {
            borderHighlight = 'border-red-200 bg-red-50/20 hover:border-red-300';
            indicatorBg = 'bg-red-600';
          } else if (isHigh) {
            borderHighlight = 'border-orange-200 bg-orange-50/20 hover:border-orange-300';
            indicatorBg = 'bg-orange-500';
          } else {
            borderHighlight = 'border-amber-200 bg-amber-50/20 hover:border-amber-300';
            indicatorBg = 'bg-amber-500';
          }

          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded-lg border ${borderHighlight} transition-all bg-white relative group`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${indicatorBg} shrink-0 ${isCritical ? 'animate-ping' : ''}`} />
                  <RiskBadge level={alert.severity} size="sm" />
                  {alert.requiresResponse && (
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                      {t('responseRequired')}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap">
                  <Clock size={11} /> {alert.timeAgo}
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 leading-snug">
                {alert.title}
              </h3>

              <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => onInspectLocation?.(alert.district, alert)}
                  className="flex items-center gap-1 text-slate-700 hover:text-blue-900 font-semibold text-left transition-colors cursor-pointer group"
                >
                  <MapPin size={12} className="text-slate-400 group-hover:text-blue-900 transition-colors" />
                  <span className="underline-offset-2 group-hover:underline">{alert.location}</span>
                </button>
              </div>

              {alert.trigger && (
                <p className="mt-1.5 text-[11px] text-slate-600 line-clamp-2 bg-slate-50 p-1.5 rounded border border-slate-100 font-medium">
                  {alert.trigger}
                </p>
              )}

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <span className="text-[11px] text-slate-400">
                  ID: {alert.id}
                </span>
                <div className="flex items-center gap-1.5">
                  {onInspectLocation && (
                    <button
                      type="button"
                      onClick={() => onInspectLocation(alert.district, alert)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors cursor-pointer"
                      title="Open Location Inspector"
                    >
                      <MapPin size={11} />
                      <span>{t('inspect')}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectAlert(alert)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer"
                  >
                    <span>{t('viewDetails')}</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
