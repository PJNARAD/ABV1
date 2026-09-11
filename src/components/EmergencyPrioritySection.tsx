import React from 'react';
import { ResponsePriority } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { Users, AlertCircle, ShieldAlert, ArrowRight, CheckCircle2, UserCheck, MapPin } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface EmergencyPrioritySectionProps {
  priorities: ResponsePriority[];
  onAssignTeam: (priority: ResponsePriority) => void;
  onInspectZone?: (priority: ResponsePriority) => void;
}

export const EmergencyPrioritySection: React.FC<EmergencyPrioritySectionProps> = ({
  priorities,
  onAssignTeam,
  onInspectZone
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('emergencyResponsePriorities')}
            </h2>
            <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              {t('aiPriorityMatrix')}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Multi-criteria prioritization weighted by risk severity, population exposure, road lifeline connectivity and time sensitivity.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorities.slice(0, 4).map((item) => {
          const isCritical = item.riskLevel === 'CRITICAL';
          const isAssigned = item.status === 'Team Assigned';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${
                isCritical ? 'border-red-200 bg-red-50/20' : 'border-orange-200 bg-orange-50/20'
              } flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                      #{item.priorityRank}
                    </span>
                    <RiskBadge level={item.riskLevel} size="sm" />
                  </div>
                  {isAssigned ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={12} /> {item.assignedTeam}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {t('pendingDispatch')}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {onInspectZone ? (
                    <button
                      type="button"
                      onClick={() => onInspectZone(item)}
                      className="hover:text-blue-900 text-left transition-colors font-bold cursor-pointer underline-offset-2 hover:underline"
                    >
                      {item.zoneName}
                    </button>
                  ) : (
                    item.zoneName
                  )}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {item.district}
                </p>

                <div className="mt-2.5 p-2 rounded bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div>
                    <span className="font-bold text-slate-900">{t('reason')}: </span>
                    <span className="text-slate-600">{item.reason}</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-900">{t('recommendedAction')}: </span>
                    <span className="text-slate-700 font-medium">{item.recommendedResponse}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <Users size={12} />
                    <span>{t('exposure')}: {item.populationExposure}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                {onInspectZone && (
                  <button
                    type="button"
                    onClick={() => onInspectZone(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                  >
                    <MapPin size={13} />
                    <span>{t('openLocationInspector')}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onAssignTeam(item)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isAssigned
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-blue-900 hover:bg-blue-950 text-white shadow-xs'
                  } ${!onInspectZone ? 'ml-auto' : ''}`}
                >
                  <UserCheck size={14} />
                  <span>{isAssigned ? t('reassignTeam') : t('assignTeam')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
