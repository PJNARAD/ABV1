import React from 'react';
import { RoadCondition } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { Route, Clock, CornerDownRight, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface RoadConnectivitySectionProps {
  roads?: RoadCondition[];
  onViewDetailedRoads?: () => void;
}

export const RoadConnectivitySection: React.FC<RoadConnectivitySectionProps> = ({
  roads = [],
  onViewDetailedRoads
}) => {
  const { t } = useTranslation();
  const safeRoads = roads || [];
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('roadLifelineStatus')}
            </h2>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              BRO &amp; NHIDCL Feeds
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Active transit conditions, active road blocks, landslides closures, and vetted alternative detour corridors.
          </p>
        </div>

        {onViewDetailedRoads && (
          <button
            onClick={onViewDetailedRoads}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:underline"
          >
            <span>{t('allCorridors')} ({safeRoads.length})</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {safeRoads.map((road) => {
          let cardBorder = 'border-slate-200 hover:border-slate-300';
          if (road.status === 'BLOCKED') cardBorder = 'border-red-200 bg-red-50/15 hover:border-red-300';
          else if (road.status === 'HIGH RISK') cardBorder = 'border-orange-200 bg-orange-50/15 hover:border-orange-300';
          else if (road.status === 'PARTIALLY BLOCKED') cardBorder = 'border-amber-200 bg-amber-50/15 hover:border-amber-300';
          else if (road.status === 'OPEN') cardBorder = 'border-emerald-200 bg-emerald-50/15 hover:border-emerald-300';

          return (
            <div
              key={road.id}
              className={`p-4 rounded-xl border ${cardBorder} bg-white flex flex-col justify-between transition-all`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {road.state}
                  </span>
                  <RiskBadge level={road.status} size="sm" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {road.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {road.corridor}
                </p>

                {road.blockageCause && (
                  <div className="mt-2 text-[11px] font-medium text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="font-bold text-red-600 block">{t('condition')}:</span>
                    {road.blockageCause}
                  </div>
                )}

                <div className="mt-2.5 p-2 bg-slate-50/80 rounded border border-slate-200 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                    <CornerDownRight size={11} className="text-blue-900" /> {t('alternativeRoute')}:
                  </span>
                  <span className="text-slate-800 font-semibold text-[11px] leading-tight block mt-0.5">
                    {road.alternativeRoute}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {road.lastUpdated}
                </span>
                <span className="text-slate-500 font-medium">
                  {road.district}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
