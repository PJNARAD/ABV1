import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Droplets, 
  Filter, 
  Download,
  Calendar,
  Activity,
  Layers
} from 'lucide-react';
import { AI_PREDICTION_SERIES } from '../data/mockData';
import { useTranslation } from '../data/translations';

export type ForecastMetricType = 'current' | 'peak' | 'window' | 'confidence';

interface ForecastBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMetric?: ForecastMetricType;
  locationName?: string;
  customSeries?: Array<{ time: string; probability: number; rainfall: number }>;
}

export const ForecastBreakdownModal: React.FC<ForecastBreakdownModalProps> = ({
  isOpen,
  onClose,
  initialMetric = 'current',
  locationName,
  customSeries
}) => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState<ForecastMetricType>(initialMetric);
  const [riskFilter, setRiskFilter] = useState<'all' | 'critical' | 'high'>('all');

  React.useEffect(() => {
    if (initialMetric) {
      setSelectedMetric(initialMetric);
    }
  }, [initialMetric, isOpen]);

  if (!isOpen) return null;

  // Enhanced dataset for timeline table
  const sourceSeries = customSeries && customSeries.length > 0 ? customSeries : AI_PREDICTION_SERIES;
  const timelineData = sourceSeries.map((item) => {
    let riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'MODERATE';
    let safetyFactor = (1.8 - (item.probability / 100) * 0.95).toFixed(2);
    let action = 'Routine telemetry polling';

    if (item.probability >= 85) {
      riskLevel = 'CRITICAL';
      safetyFactor = (0.95 - (item.probability - 85) * 0.02).toFixed(2);
      action = 'Trigger sirens & suspend all highway traffic';
    } else if (item.probability >= 75) {
      riskLevel = 'HIGH';
      action = 'Pre-position emergency quick-response teams';
    } else if (item.probability >= 50) {
      riskLevel = 'MODERATE';
      action = 'Continuous rain gauge & inclinometer surveillance';
    }

    // Estimated soil saturation correlated with rain
    const soilMoistureEst = Math.min(96, Math.round(55 + (item.rainfall / 140) * 40));

    return {
      ...item,
      riskLevel,
      safetyFactor,
      soilMoistureEst,
      action
    };
  });

  const filteredTimeline = timelineData.filter((row) => {
    if (riskFilter === 'critical') return row.riskLevel === 'CRITICAL';
    if (riskFilter === 'high') return row.riskLevel === 'CRITICAL' || row.riskLevel === 'HIGH';
    return true;
  });

  const metricExplanations: Record<ForecastMetricType, {
    title: string;
    badge: string;
    color: string;
    summary: string;
    drivers: string[];
    advisory: string;
  }> = {
    current: {
      title: 'Current Probability: 78% (High Alert)',
      badge: 'Current Observation',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      summary: 'Sustained antecedent precipitation over the last 36 hours has pushed upper colluvial soil saturation to 88%. Ground pore water pressure has risen by +22 kPa, significantly reducing frictional resistance.',
      drivers: [
        'Antecedent 72h Rainfall: 142 mm exceeding warning threshold (110 mm)',
        'TDR Volumetric Soil Saturation: 88% near plastic liquefaction limit',
        'Inclinometer Subsurface Creep: 0.14 mm/h detected along basal shear boundary',
      ],
      advisory: 'Restrict heavy civilian transport along vulnerable mountain road bends. Maintain 24/7 radio link with Border Roads Organisation (BRO) detachments.'
    },
    peak: {
      title: 'Predicted Peak Probability: 91% (Critical Failure Horizon)',
      badge: 'Peak Projected Horizon',
      color: 'text-red-600 bg-red-50 border-red-200',
      summary: 'Numerical slope stability calculations project catastrophic equilibrium loss between 20:00 and 21:00 as an orographic convective cloudburst dumps an estimated 42–48 mm/h rainfall directly over the Teesta-Rangpo basin.',
      drivers: [
        'Radar Doppler storm cell tracking arriving at ~18:30',
        'Projected Factor of Safety drops to 0.88 (below critical limit FS = 1.0)',
        'Hydraulic pore pressure expected to exceed total overburden stress',
      ],
      advisory: 'Execute pre-emptive road shutdowns, sound localized community sirens, and clear all downhill habitations before 17:30.'
    },
    window: {
      title: 'Expected Risk Window: 18:00 – 23:00 (5-Hour Critical Span)',
      badge: 'Operational Time Frame',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      summary: 'The 5-hour operational danger window corresponds to the delay between peak precipitation intensity and maximum subsurface hydrological pore pressure surge (hydrograph crest lag).',
      drivers: [
        'Storm Inflow Onset: 17:30–18:00',
        'Maximum Hydraulic Saturation: 20:00 (91% Probability Peak)',
        'Gradual Drainage Recession: After 23:00 with probability dropping back to 72%',
      ],
      advisory: 'Mandate strict lockdown of NH-10 & NH-29 during this entire 5-hour window. No relief convoys should enter active slide ravines until after 23:00.'
    },
    confidence: {
      title: 'AI Model Confidence: 89% (High Ensemble Agreement)',
      badge: 'Statistical Confidence',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'Based on high concordance across 12 spatio-temporal LSTM nodes, physical Limit Equilibrium Method (LEM) slope models, and 99.4% real-time IoT station uptime across the Northeast region.',
      drivers: [
        'Model Validation ROC-AUC: 0.942 over 38,400 historic Northeast slides',
        'Low Uncertainty Variance: Standard deviation σ = ±3.8%',
        'Sentinel-1 InSAR + GSI NLSM geological layers aligned with ground TDR sensors',
      ],
      advisory: 'Confidence level warrants immediate actionable executive response under NDMA Incident Command System guidelines.'
    }
  };

  const currentInfo = metricExplanations[selectedMetric];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  24-Hour AI Prediction &amp; Timeline Breakdown
                </h2>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
                  {locationName || 'Multi-State Baseline / NH-10 Corridor'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Detailed hourly hazard probabilities, soil moisture progression, and emergency operational window
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 4 Interactive Metric Tabs */}
        <div className="p-6 bg-slate-50/50 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Click any metric to view in-depth geotechnical explanation:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'current', label: t('currentProbability'), value: '78%', badge: t('high'), color: 'text-orange-600', badgeBg: 'bg-orange-100 text-orange-700' },
              { id: 'peak', label: t('predictedPeak'), value: '91%', badge: t('critical'), color: 'text-red-600', badgeBg: 'bg-red-100 text-red-700' },
              { id: 'window', label: t('expectedRiskWindow'), value: '18:00–23:00', badge: 'Peak Span', color: 'text-slate-900', badgeBg: 'bg-purple-100 text-purple-700' },
              { id: 'confidence', label: t('aiConfidence'), value: '89%', badge: t('highConfidence'), color: 'text-blue-900', badgeBg: 'bg-emerald-100 text-emerald-700' },
            ].map((m) => {
              const isSelected = selectedMetric === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetric(m.id as ForecastMetricType)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    {m.label}
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className={`text-xl font-black ${m.color}`}>{m.value}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${m.badgeBg}`}>
                      {m.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="mt-1 text-[10px] text-blue-900 font-bold block">
                      ● Active Analysis
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Deep Metric Explanation Box */}
          <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {currentInfo.title}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${currentInfo.color}`}>
                {currentInfo.badge}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentInfo.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Key Contributing Drivers:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {currentInfo.drivers.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <span className="font-bold text-blue-950 block mb-1">Recommended Response Advisory:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {currentInfo.advisory}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast Table & Filter */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Hour-by-Hour 24h Prediction Matrix (00:00 – 24:00)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Correlating cumulative rainfall, soil volumetric moisture, and Factor of Safety (FS)
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <span className="text-[11px] font-bold text-slate-500 px-1 flex items-center gap-1">
                <Filter size={12} /> Filter:
              </span>
              <button
                onClick={() => setRiskFilter('all')}
                className={`px-2.5 py-1 rounded font-bold text-[11px] transition-colors ${
                  riskFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Hours ({timelineData.length})
              </button>
              <button
                onClick={() => setRiskFilter('high')}
                className={`px-2.5 py-1 rounded font-bold text-[11px] transition-colors ${
                  riskFilter === 'high' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                High &amp; Critical (≥75%)
              </button>
              <button
                onClick={() => setRiskFilter('critical')}
                className={`px-2.5 py-1 rounded font-bold text-[11px] transition-colors ${
                  riskFilter === 'critical' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Critical Only (≥85%)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">Time</th>
                  <th className="px-3 py-2.5">Hazard Probability</th>
                  <th className="px-3 py-2.5 text-center">Status</th>
                  <th className="px-3 py-2.5 text-center">Rainfall</th>
                  <th className="px-3 py-2.5 text-center">Est. Soil Saturation</th>
                  <th className="px-3 py-2.5 text-center">Safety Factor (FS)</th>
                  <th className="px-3 py-2.5">Operational Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTimeline.map((item) => {
                  const isPeakSpan = item.time >= '18:00' && item.time <= '22:00';
                  return (
                    <tr 
                      key={item.time} 
                      className={`hover:bg-slate-50 transition-colors ${
                        isPeakSpan ? 'bg-red-50/40 font-medium' : ''
                      }`}
                    >
                      <td className="px-3 py-2.5 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-400" />
                          <span>{item.time}</span>
                          {isPeakSpan && (
                            <span className="text-[9px] font-bold text-red-700 bg-red-100 px-1 rounded">
                              PEAK
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-2.5 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <span className={`font-black w-8 text-right ${
                            item.probability >= 85 ? 'text-red-600' : item.probability >= 75 ? 'text-orange-600' : 'text-slate-800'
                          }`}>
                            {item.probability}%
                          </span>
                          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.probability >= 85 ? 'bg-red-600' : item.probability >= 75 ? 'bg-orange-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${item.probability}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-2.5 text-center whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          item.riskLevel === 'CRITICAL' 
                            ? 'text-red-700 bg-red-50 border-red-200' 
                            : item.riskLevel === 'HIGH' 
                            ? 'text-orange-700 bg-orange-50 border-orange-200' 
                            : 'text-amber-700 bg-amber-50 border-amber-200'
                        }`}>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="px-3 py-2.5 text-center font-bold text-slate-800 whitespace-nowrap">
                        {item.rainfall} mm
                      </td>

                      <td className="px-3 py-2.5 text-center font-bold text-slate-800 whitespace-nowrap">
                        {item.soilMoistureEst}%
                      </td>

                      <td className="px-3 py-2.5 text-center font-bold whitespace-nowrap">
                        <span className={Number(item.safetyFactor) < 1.0 ? 'text-red-600 font-black' : 'text-slate-800'}>
                          {item.safetyFactor}
                        </span>
                      </td>

                      <td className="px-3 py-2.5 text-slate-600 text-[11px]">
                        {item.action}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Model Refresh Frequency: Every 15 minutes • Next scheduled cycle in 8 minutes
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-xs transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
