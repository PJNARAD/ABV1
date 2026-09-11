import React, { useState } from 'react';
import { AI_EXPLAINABILITY_FACTORS } from '../data/mockData';
import { HelpCircle, CheckCircle2, Clock, Cpu, ShieldCheck, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '../data/translations';
import { XaiParameterModal } from './XaiParameterModal';

interface AiExplainabilityCardProps {
  onHighlightFactorOnMap?: (factorName: string) => void;
}

export const AiExplainabilityCard: React.FC<AiExplainabilityCardProps> = ({ onHighlightFactorOnMap }) => {
  const { t } = useTranslation();
  const [selectedFactorIndex, setSelectedFactorIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex items-start justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('whyHighRisk')}
            </h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck size={12} /> {t('xaiBadge')}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Feature contribution breakdown explaining the machine learning risk assessment for government officials. Click any factor for deep parameter analysis.
          </p>
        </div>
      </div>

      {/* Contributing Factors Progress Bars */}
      <div className="mt-4 space-y-3">
        {AI_EXPLAINABILITY_FACTORS.map((item, index) => {
          let barColor = 'bg-blue-900';
          if (item.percentage >= 30) barColor = 'bg-red-600';
          else if (item.percentage >= 25) barColor = 'bg-orange-500';
          else if (item.percentage >= 20) barColor = 'bg-amber-500';

          return (
            <div 
              key={index} 
              onClick={() => setSelectedFactorIndex(index)}
              className="space-y-1.5 p-2.5 rounded-xl -mx-2.5 transition-all cursor-pointer hover:bg-blue-50/60 border border-transparent hover:border-blue-200 group relative text-left"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                    {item.factor}
                  </span>
                  <span className="text-[10px] text-blue-900 opacity-0 group-hover:opacity-100 font-bold transition-opacity hidden sm:inline-flex items-center gap-0.5 bg-blue-100/70 px-1.5 py-0.2 rounded">
                    Inspect <ChevronRight size={10} />
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900">
                    {item.percentage}%
                  </span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200 group-hover:border-blue-300 transition-colors">
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <p className="line-clamp-1 group-hover:text-slate-700 transition-colors">
                  {item.note}
                </p>
                <span className="text-[10px] text-blue-800 font-bold opacity-0 group-hover:opacity-100 shrink-0 ml-2">
                  Parameters &amp; SHAP →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50/50 -mx-5 -mb-5 p-4 rounded-b-xl">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">{t('aiConfidence')}</span>
            <span className="font-bold text-slate-900">89%</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">{t('modelName')}</span>
            <span className="font-bold text-blue-900">LandslideRisk-v1</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
          <Clock size={12} />
          <span>Last Updated: 2 minutes ago</span>
        </div>
      </div>

      {/* Detailed Parameter Analysis Dialog */}
      {selectedFactorIndex !== null && (
        <XaiParameterModal
          isOpen={selectedFactorIndex !== null}
          initialFactorIndex={selectedFactorIndex}
          onClose={() => setSelectedFactorIndex(null)}
          onHighlightFactorOnMap={onHighlightFactorOnMap}
        />
      )}
    </div>
  );
};
