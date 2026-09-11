import React from 'react';
import { RiskZone } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { Eye, TrendingUp, TrendingDown, Minus, Search, ArrowUpDown, Compass } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface HighestRiskLocationsTableProps {
  zones?: RiskZone[];
  onSelectZone: (zone: RiskZone) => void;
  onInspectZone: (zone: RiskZone) => void;
}

export const HighestRiskLocationsTable: React.FC<HighestRiskLocationsTableProps> = ({
  zones = [],
  onSelectZone,
  onInspectZone
}) => {
  const { t } = useTranslation();
  // Sort by probability descending
  const sortedZones = [...(zones || [])].sort((a, b) => b.probability - a.probability);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {t('highestRiskLocations')}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Live ranking of corridors and settlements by algorithmic landslide failure probability.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing top {sortedZones.length} critical sectors
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700" role="table">
          <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
            <tr>
              <th scope="col" className="px-4 py-3 text-center w-12">{t('rank')}</th>
              <th scope="col" className="px-4 py-3">{t('location')}</th>
              <th scope="col" className="px-4 py-3">{t('district')}</th>
              <th scope="col" className="px-4 py-3">{t('riskLevel')}</th>
              <th scope="col" className="px-4 py-3 text-center">{t('probability')}</th>
              <th scope="col" className="px-4 py-3 text-center">{t('rainfall24h')}</th>
              <th scope="col" className="px-4 py-3 text-center">{t('soilMoisture')}</th>
              <th scope="col" className="px-4 py-3 text-center">{t('trend')}</th>
              <th scope="col" className="px-4 py-3 text-right">{t('action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {sortedZones.map((zone, index) => {
              const rank = index + 1;
              const isCritical = zone.riskLevel === 'CRITICAL';

              return (
                <tr
                  key={zone.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    isCritical ? 'bg-red-50/10' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 text-center font-bold text-slate-900">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                      rank <= 3 ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rank}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <button
                      onClick={() => onSelectZone(zone)}
                      className="hover:text-blue-900 text-left font-bold"
                    >
                      {zone.name}
                    </button>
                    {zone.criticalRoadAffected && (
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {zone.criticalRoadAffected}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">
                    <span className="font-semibold text-slate-800">{zone.district}</span>, {zone.state}
                  </td>
                  <td className="px-4 py-3.5">
                    <RiskBadge level={zone.riskLevel} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`font-black text-sm ${isCritical ? 'text-red-600' : 'text-slate-900'}`}>
                      {zone.probability}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center font-semibold text-slate-800">
                    {zone.rainfall24h} mm
                  </td>
                  <td className="px-4 py-3.5 text-center font-semibold text-slate-800">
                    {zone.soilMoisture}%
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {zone.trend === 'Increasing' && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-red-600">
                        <TrendingUp size={12} /> {t('increasing')}
                      </span>
                    )}
                    {zone.trend === 'Stable' && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-500">
                        <Minus size={12} /> {t('stable')}
                      </span>
                    )}
                    {zone.trend === 'Decreasing' && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600">
                        <TrendingDown size={12} /> {t('decreasing')}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => onInspectZone(zone)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                        isCritical
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                          : 'bg-blue-900 hover:bg-blue-950 text-white'
                      }`}
                    >
                      {isCritical ? t('inspect') : t('monitor')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Conversion View */}
      <div className="md:hidden divide-y divide-slate-100 p-4 space-y-3">
        {sortedZones.map((zone, index) => (
          <div key={zone.id} className="pt-3 first:pt-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{zone.name}</span>
              </div>
              <RiskBadge level={zone.riskLevel} size="sm" />
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {zone.district}, {zone.state}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 py-1.5 px-2 bg-slate-50 rounded text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">{t('probability')}</span>
                <span className="font-black text-slate-900">{zone.probability}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{t('rainfallParam')}</span>
                <span className="font-semibold text-slate-900">{zone.rainfall24h} mm</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{t('moistureParam')}</span>
                <span className="font-semibold text-slate-900">{zone.soilMoisture}%</span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{t('trend')}: {zone.trend}</span>
              <button
                onClick={() => onInspectZone(zone)}
                className="px-3 py-1 rounded bg-blue-900 text-white text-xs font-bold"
              >
                {zone.riskLevel === 'CRITICAL' ? t('inspect') : t('monitor')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
