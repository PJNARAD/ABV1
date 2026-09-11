import React, { useState } from 'react';
import { LiveAlert, RiskLevel, UserProfile } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { 
  Bell, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  Search, 
  Filter, 
  AlertTriangle,
  ArrowUpDown,
  Send,
  Eye
} from 'lucide-react';
import { useTranslation } from '../data/translations';

interface AlertsManagementViewProps {
  alerts?: LiveAlert[];
  currentUser?: UserProfile;
  onSelectAlert: (alert: LiveAlert) => void;
  onAssignTeam: (alert: LiveAlert) => void;
  onResolveAlert: (alertId: string) => void;
  onBackToDashboard: () => void;
  onInspectLocation?: (districtOrLocation: string, alert?: LiveAlert) => void;
}

export const AlertsManagementView: React.FC<AlertsManagementViewProps> = ({
  alerts = [],
  currentUser,
  onSelectAlert,
  onAssignTeam,
  onResolveAlert,
  onBackToDashboard,
  onInspectLocation
}) => {
  const { t } = useTranslation();
  const isCitizen = currentUser?.role === 'Citizen / General Public' || currentUser?.role === 'Public / Observer';
  const safeAlerts = alerts || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredAlerts = safeAlerts.filter(a => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {t('liveAlerts')}
              </h1>
              <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {safeAlerts.filter(a => a.status === 'Active').length} {t('active')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Automated multi-hazard early warning broadcasts, slope deformation triggers and official civil defense bulletins.
            </p>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            ← {t('navDashboard')}
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, corridor, district, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold text-[11px]">{t('riskLevel')}:</span>
            {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  severityFilter === sev
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold text-[11px]">Status:</span>
            {(['ALL', 'Active', 'Response Deployed', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No alerts match the selected criteria.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isResolved = alert.status === 'Resolved';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-xl border ${
                  isCritical ? 'border-red-300' : 'border-slate-200'
                } p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <RiskBadge level={alert.severity} size="sm" />
                    <span className="text-xs font-bold text-slate-900">
                      {alert.id}
                    </span>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => onInspectLocation?.(alert.district, alert)}
                      className="text-xs font-semibold text-slate-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer group"
                    >
                      <MapPin size={12} className="text-slate-400 group-hover:text-blue-900 transition-colors" />
                      <span className="group-hover:underline">{alert.location} ({alert.district}, {alert.state})</span>
                    </button>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock size={11} /> {alert.timeAgo}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isResolved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : alert.status === 'Response Deployed'
                        ? 'bg-blue-50 text-blue-900 border-blue-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {alert.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {alert.title}
                  </h3>

                  {alert.trigger && (
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      <span className="font-bold text-slate-700">{t('condition')}:</span> {alert.trigger}
                    </p>
                  )}

                  {alert.actionRequired && (
                    <div className="mt-2 text-xs text-blue-900 bg-blue-50/60 p-2 rounded border border-blue-100 font-semibold">
                      {t('responseRequired')}: {alert.actionRequired}
                    </div>
                  )}

                  {alert.assignedTeam && (
                    <div className="mt-1.5 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> {t('assigned')}: {alert.assignedTeam}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {onInspectLocation && (
                    <button
                      type="button"
                      onClick={() => onInspectLocation(alert.district, alert)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin size={13} />
                      <span>{t('openLocationInspector')}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectAlert(alert)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>{isCitizen ? 'Safety Advisory & Details' : t('viewDetails')}</span>
                  </button>

                  {!isCitizen && (
                    <button
                      type="button"
                      onClick={() => onAssignTeam(alert)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <UserCheck size={13} />
                      <span>{t('assignTeam')}</span>
                    </button>
                  )}

                  {!isCitizen && !isResolved && (
                    <button
                      type="button"
                      onClick={() => onResolveAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 size={13} />
                      <span>{t('resolve')}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
