import React, { useState, useEffect } from 'react';
import { AiPredictionCard } from './AiPredictionCard';
import { AiExplainabilityCard } from './AiExplainabilityCard';
import { Cpu, Database, CheckCircle, BarChart3, LineChart, ShieldCheck, ChevronRight, MapPin, TrendingUp } from 'lucide-react';
import { useTranslation } from '../data/translations';
import { RiskZone } from '../types';
import { INITIAL_RISK_ZONES } from '../data/mockData';
import { ModelTelemetryModal, ModelTelemetryTab } from './ModelTelemetryModal';

interface AnalyticsViewProps {
  zones?: RiskZone[];
  selectedZone?: RiskZone | null;
  onSelectZone?: (zone: RiskZone) => void;
  onClearFilter?: () => void;
  onNavigateDistrict?: (zone: RiskZone) => void;
  onSwitchToMapWithState?: (stateName: string, zone?: RiskZone) => void;
  onHighlightFactorOnMap?: (factorName: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  zones,
  selectedZone,
  onSelectZone,
  onClearFilter,
  onNavigateDistrict,
  onSwitchToMapWithState,
  onHighlightFactorOnMap
}) => {
  const { t } = useTranslation();
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<ModelTelemetryTab | null>(null);
  const [activeChartZone, setActiveChartZone] = useState<RiskZone | null>(selectedZone || null);
  const [activeChartState, setActiveChartState] = useState<string | null>(null);

  useEffect(() => {
    if (selectedZone) {
      setActiveChartZone(selectedZone);
    }
  }, [selectedZone]);

  const NER_STATES_LHZ = [
    { state: 'Sikkim', index: 88, risk: 'CRITICAL', pop: '610K', mainThreat: 'NH-10 Teesta Corridor', color: 'text-red-600 bg-red-50 border-red-200', zoneId: 'zone-1' },
    { state: 'Arunachal Pradesh', index: 84, risk: 'HIGH', pop: '1.4M', mainThreat: 'NH-13 Trans-Arunachal', color: 'text-orange-600 bg-orange-50 border-orange-200', zoneId: 'zone-2' },
    { state: 'Assam (Hill Sectors)', searchKey: 'Assam', index: 76, risk: 'HIGH', pop: '3.2M', mainThreat: 'Dima Hasao Railway & Lumding', color: 'text-orange-600 bg-orange-50 border-orange-200', zoneId: 'zone-3' },
    { state: 'Meghalaya', index: 74, risk: 'HIGH', pop: '3.0M', mainThreat: 'Cherrapunji & Shillong Bypass', color: 'text-orange-600 bg-orange-50 border-orange-200', zoneId: 'zone-4' },
    { state: 'Nagaland', index: 72, risk: 'HIGH', pop: '2.0M', mainThreat: 'NH-29 Kohima–Dimapur', color: 'text-orange-600 bg-orange-50 border-orange-200', zoneId: 'zone-5' },
    { state: 'Manipur', index: 68, risk: 'MODERATE', pop: '2.9M', mainThreat: 'NH-37 Imphal–Jiribam Line', color: 'text-amber-600 bg-amber-50 border-amber-200', zoneId: 'zone-6' },
    { state: 'Mizoram', index: 65, risk: 'MODERATE', pop: '1.1M', mainThreat: 'NH-54 Aizawl Slopes', color: 'text-amber-600 bg-amber-50 border-amber-200', zoneId: 'zone-7' },
    { state: 'Tripura', index: 42, risk: 'LOW', pop: '3.7M', mainThreat: 'Jampui Hills Ridges', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', zoneId: 'zone-8' }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
                <Cpu size={18} />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {t('navAnalytics')} — Hydro-Geological Analytics &amp; AI Predictions
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Multi-temporal satellite radar interferometry (InSAR), numerical slope stability modeling, and Deep Neural Network rainfall-threshold analysis.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Model Validation Accuracy: 94.2%
          </span>
        </div>

        {/* Model Specs Banner - Interactive Cards */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div 
            onClick={() => setActiveTelemetryTab('dataset')}
            className="p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/20 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-900 transition-colors">
                Training Dataset
              </span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-blue-950">38,400 Historic Slides</div>
            <span className="text-[10px] text-slate-500">1980–2025 GSI Archives</span>
            <div className="mt-1.5 text-[10px] text-blue-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              View ML Architecture →
            </div>
          </div>

          <div 
            onClick={() => setActiveTelemetryTab('telemetry')}
            className="p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/20 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-900 transition-colors">
                Input Telemetry
              </span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-blue-950">1,284 IoT Stations</div>
            <span className="text-[10px] text-slate-500">Rain, TDR, MEMS Tilts</span>
            <div className="mt-1.5 text-[10px] text-blue-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              View Station Grid →
            </div>
          </div>

          <div 
            onClick={() => setActiveTelemetryTab('satellite')}
            className="p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/20 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-900 transition-colors">
                Satellite Feed
              </span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-blue-950">Sentinel-1 &amp; NISAR</div>
            <span className="text-[10px] text-slate-500">12-day InSAR displacement</span>
            <div className="mt-1.5 text-[10px] text-blue-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              View Radar Orbits →
            </div>
          </div>

          <div 
            onClick={() => setActiveTelemetryTab('inference')}
            className="p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/20 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-900 transition-colors">
                Inference Frequency
              </span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-blue-950">Every 15 Minutes</div>
            <span className="text-[10px] text-slate-500">Dynamic Risk Recalculation</span>
            <div className="mt-1.5 text-[10px] text-blue-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              View Pipeline Cycle →
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div id="ai-prediction-chart-container" className="lg:col-span-2">
          <AiPredictionCard
            availableZones={zones || INITIAL_RISK_ZONES}
            selectedZone={activeChartZone}
            selectedState={activeChartState}
            onClearFilter={() => {
              setActiveChartZone(null);
              setActiveChartState(null);
              if (onClearFilter) onClearFilter();
            }}
            onSelectZone={(zone) => {
              setActiveChartZone(zone);
              if (onSelectZone) onSelectZone(zone);
            }}
            showAnalysisLink={false}
          />
        </div>
        <div>
          <AiExplainabilityCard onHighlightFactorOnMap={onHighlightFactorOnMap} />
        </div>
      </div>

      {/* State-by-State Landslide Hazard Index */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              NER State Vulnerability &amp; Hazard Index (LHZ)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Click any state card to inspect its comprehensive district dossier or view its active hazard zones on the GIS map.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
            8 North Eastern States Active
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          {NER_STATES_LHZ.map((item) => {
            const allZones = zones || INITIAL_RISK_ZONES;
            const targetZone = allZones.find(
              (z) => z.id === item.zoneId || z.state.toLowerCase().includes((item.searchKey || item.state).toLowerCase())
            ) || allZones[0];

            return (
              <div 
                key={item.state} 
                onClick={() => {
                  if (onNavigateDistrict && targetZone) {
                    onNavigateDistrict(targetZone);
                  } else if (onSwitchToMapWithState) {
                    onSwitchToMapWithState(item.state, targetZone);
                  }
                }}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group hover:bg-blue-50/20 text-left relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">
                      {item.state}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.color}`}>
                      {item.risk}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-slate-500 text-[11px]">Vulnerability Index:</span>
                    <span className="font-black text-slate-900 text-base">{item.index} / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full ${item.index >= 85 ? 'bg-red-600' : item.index >= 70 ? 'bg-orange-500' : item.index >= 50 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                      style={{ width: `${item.index}%` }}
                    />
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 font-medium">
                    Focus: {item.mainThreat}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-blue-900 font-bold flex items-center gap-1 group-hover:underline">
                    Dossier <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveChartState(item.searchKey || item.state);
                        setActiveChartZone(targetZone || null);
                        document.getElementById('ai-prediction-chart-container')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-[10px] inline-flex items-center gap-1 border border-blue-200 hover:border-blue-300 transition-colors shadow-2xs"
                      title={`Filter AI Prediction Chart to ${item.state}`}
                    >
                      <TrendingUp size={10} />
                      <span>Chart</span>
                    </button>
                    {onSwitchToMapWithState && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSwitchToMapWithState(item.state, targetZone);
                        }}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 font-bold text-[10px] inline-flex items-center gap-1 border border-slate-200 hover:border-blue-300 transition-colors shadow-2xs"
                        title={`Filter map to ${item.state}`}
                      >
                        <MapPin size={10} />
                        <span>Map</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Telemetry & ML Architecture Modal */}
      {activeTelemetryTab && (
        <ModelTelemetryModal
          isOpen={Boolean(activeTelemetryTab)}
          initialTab={activeTelemetryTab}
          onClose={() => setActiveTelemetryTab(null)}
        />
      )}
    </div>
  );
};
