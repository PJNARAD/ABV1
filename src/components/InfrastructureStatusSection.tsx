import React from 'react';
import { Route, AlertOctagon, Building2, Home, Radio, Map } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface InfrastructureStatusSectionProps {
  onViewInfrastructureMap: () => void;
}

export const InfrastructureStatusSection: React.FC<InfrastructureStatusSectionProps> = ({
  onViewInfrastructureMap
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('infrastructureStatus')}
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
              NER Arterials
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Real-time operational status of strategic highways, bridges, railway tunnels, and isolated valley settlements.
          </p>
        </div>

        <button
          onClick={onViewInfrastructureMap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <Map size={14} />
          <span>{t('viewInfrastructureMap')}</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Major Roads */}
        <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('majorRoads')}
            </span>
            <Route size={16} className="text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            126
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Inter-state corridors
          </p>
        </div>

        {/* Blocked Roads */}
        <div className="bg-red-50/30 p-3.5 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              {t('blockedRoads')}
            </span>
            <AlertOctagon size={16} className="text-red-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-red-600 tracking-tight">
            18
          </div>
          <p className="text-[11px] text-red-600 font-medium mt-0.5">
            5 key corridors severed
          </p>
        </div>

        {/* At-Risk Bridges */}
        <div className="bg-orange-50/30 p-3.5 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
              {t('atRiskBridges')}
            </span>
            <Building2 size={16} className="text-orange-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-orange-600 tracking-tight">
            31
          </div>
          <p className="text-[11px] text-orange-700 font-medium mt-0.5">
            Pier scour monitoring
          </p>
        </div>

        {/* Affected Villages */}
        <div className="bg-amber-50/30 p-3.5 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              {t('affectedVillages')}
            </span>
            <Home size={16} className="text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-700 tracking-tight">
            47
          </div>
          <p className="text-[11px] text-amber-800 font-medium mt-0.5">
            Road cutoff risk
          </p>
        </div>

        {/* Critical Infrastructure */}
        <div className="bg-blue-50/30 p-3.5 rounded-xl border border-blue-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              {t('criticalFacilities')}
            </span>
            <Radio size={16} className="text-blue-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-900 tracking-tight">
            12
          </div>
          <p className="text-[11px] text-blue-800 font-medium mt-0.5">
            Substations & hospitals
          </p>
        </div>
      </div>
    </div>
  );
};
