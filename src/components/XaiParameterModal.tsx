import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  TrendingDown, 
  TrendingUp, 
  MapPin, 
  Wrench, 
  Droplets,
  Mountain,
  History,
  Compass
} from 'lucide-react';
import { AI_EXPLAINABILITY_FACTORS } from '../data/mockData';
import { useTranslation } from '../data/translations';

interface XaiParameterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFactorIndex?: number;
  onHighlightFactorOnMap?: (factorName: string) => void;
}

export const XaiParameterModal: React.FC<XaiParameterModalProps> = ({
  isOpen,
  onClose,
  initialFactorIndex = 0,
  onHighlightFactorOnMap
}) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number>(initialFactorIndex);

  React.useEffect(() => {
    if (typeof initialFactorIndex === 'number') {
      setSelectedIndex(initialFactorIndex);
    }
  }, [initialFactorIndex, isOpen]);

  if (!isOpen) return null;

  const parameterDetails = [
    {
      factor: 'Heavy Rainfall',
      percentage: 32,
      shapValue: '+0.320',
      icon: Droplets,
      iconColor: 'text-blue-900 bg-blue-50 border-blue-200',
      observed: '142 mm / 72h',
      normalBaseline: '45 mm / 72h',
      criticalThreshold: '110 mm / 72h',
      unit: 'Cumulative Antecedent Precipitation',
      severity: 'CRITICAL EXCEEDANCE (+29.1% above trigger threshold)',
      physicsMechanism: 'Prolonged rainfall advances the infiltration wetting front into the colluvial mantle, destroying negative pore-water matric suction. As positive pore pressures build, the effective normal stress holding soil grains together is systematically eroded.',
      sensitivity: 'A reduction of 20 mm in 24h rainfall correlates with a 16.4% decrease in overall slope failure probability.',
      engineeringResponse: [
        'Clear blockage and silt accumulation in catch-water drains and roadside culverts.',
        'Deploy mobile high-capacity pump sets to de-water perched saturation zones.',
        'Establish automated rain gauge trip alarms set at 15 mm/15 min burst intensity.'
      ],
      stationsReporting: '24 automatic weather stations across Teesta, Subansiri, and Kameng basins.'
    },
    {
      factor: 'High Soil Moisture',
      percentage: 27,
      shapValue: '+0.270',
      icon: Activity,
      iconColor: 'text-orange-600 bg-orange-50 border-orange-200',
      observed: '88% Volumetric Water Content (VWC)',
      normalBaseline: '42% – 55% VWC',
      criticalThreshold: '82% VWC',
      unit: 'TDR Probe Subsurface Saturation at 1.5m depth',
      severity: 'NEAR LIQUEFACTION LIMIT (Excess pore water pressure)',
      physicsMechanism: 'High volumetric moisture saturation reduces the soil shear resistance to its minimum residual state (Mohr-Coulomb: τ = c\' + (σ - u) tan φ\'). Liquefaction risk is imminent under sustained hydraulic heads.',
      sensitivity: 'A 5% drop in volumetric saturation increases the slope safety factor (FS) by +0.18.',
      engineeringResponse: [
        'Drill sub-horizontal perforated PVC drain pipes into the slope face to bleed water table pressure.',
        'Seal surface tension cracks with compacted bentonite clay to prevent direct runoff infiltration.',
        'Monitor vibrating wire piezometer heads for sudden spikes indicative of hydraulic fracture.'
      ],
      stationsReporting: '18 in-situ TDR soil arrays reporting saturation exceeding 85%.'
    },
    {
      factor: 'Steep Slope Angle',
      percentage: 21,
      shapValue: '+0.210',
      icon: Mountain,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      observed: '44.2° Mean Inclination',
      normalBaseline: 'Colluvium Repose Angle: 32°–35°',
      criticalThreshold: 'Critical Cut Slope: 40.0°',
      unit: 'Digital Elevation Model (Cartosat-1 30m)',
      severity: 'GRAVITATIONAL OVERSTEEPENING (Slope exceeds friction angle)',
      physicsMechanism: 'Tangential shear driving forces (W sin θ) drastically outpace the resisting friction force (W cos θ tan φ). The oversteepened cut-slopes along highway road alignments lack adequate toe buttressing.',
      sensitivity: 'Static topographical parameter; dynamic amplification during wet conditions increases slide risk by 2.4x.',
      engineeringResponse: [
        'Construct reinforced concrete retaining crib walls and gabion toe buttresses.',
        'Install tensioned double-twist wire rockfall barrier mesh with 6m rock anchors.',
        'Benching of upper slope crests to reduce sheer overburden mass.'
      ],
      stationsReporting: 'Regional topography model validated against LiDAR point clouds.'
    },
    {
      factor: 'Historical Landslide Activity',
      percentage: 14,
      shapValue: '+0.140',
      icon: History,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      observed: '6 Major Slides / 15 Years',
      normalBaseline: 'Quiescent Baseline: 0–1 events',
      criticalThreshold: 'Chronic Scarp: ≥3 events',
      unit: 'GSI National Landslide Susceptibility Mapping (NLSM)',
      severity: 'CHRONIC PRE-EXISTING SLIP SURFACE',
      physicsMechanism: 'Prior landslide events have permanently sheared the geological bedding planes, reducing internal friction from peak (φ_peak ≈ 34°) to residual (φ_residual ≈ 22°). Reactivation requires significantly less rainfall.',
      sensitivity: 'Lowers the precipitation threshold required to trigger failure by approximately 35%.',
      engineeringResponse: [
        'Enforce permanent building exclusion zones within 100m of historical crown scarps.',
        'Install continuous surface crack displacement meters across historical reactivation fissures.',
        'Bio-engineering with vetiver grass and deep-rooting bamboo for shallow topsoil binding.'
      ],
      stationsReporting: 'GSI National Database & Border Roads Organisation (BRO) chronicles.'
    },
    {
      factor: 'Terrain Instability & InSAR Creep',
      percentage: 6,
      shapValue: '+0.060',
      icon: Compass,
      iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      observed: '14.2 mm/month Line-of-Sight (LOS)',
      normalBaseline: 'Stable: <2.0 mm/month',
      criticalThreshold: 'Accelerated Creep: >10.0 mm/month',
      unit: 'Sentinel-1 PS-InSAR Displacement Velocity',
      severity: 'ACTIVE SUB-SURFACE STRAIN LOCALIZATION',
      physicsMechanism: 'Interferometric coherence indicates progressive shear deformation along the basal detachment surface. If creep acceleration d²u/dt² turns sharply positive, tertiary creep failure is imminent within hours.',
      sensitivity: 'Serves as the earliest physical indicator of impending mass detachment before visual surface fissures emerge.',
      engineeringResponse: [
        'Deploy robotic total stations and laser distance meters on opposite ravine faces.',
        'Arm acoustic emission tripwire sirens for instant field spotter warnings.',
        'Notify railway maintenance teams on adjacent bridge abutments.'
      ],
      stationsReporting: 'ESA Sentinel-1 Descending Track 048 radar interferograms.'
    }
  ];

  const current = parameterDetails[selectedIndex] || parameterDetails[0];
  const CurrentIcon = current.icon;

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
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Explainable AI (XAI) Parameter Analysis
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  SHAP Interpretability
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Physics-informed machine learning breakdown explaining why specific terrain sectors are rated High/Critical Risk
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

        {/* 5 Interactive Factor Selector Buttons */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white overflow-x-auto flex gap-2">
          {parameterDetails.map((param, index) => {
            const Icon = param.icon;
            const isSelected = selectedIndex === index;
            return (
              <button
                key={param.factor}
                onClick={() => setSelectedIndex(index)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{param.factor}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {param.percentage}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          
          {/* Main Parameter Card */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${current.iconColor}`}>
                  <CurrentIcon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      {current.factor}
                    </h3>
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded">
                      Model Weight: {current.percentage}%
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      SHAP: {current.shapValue}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {current.unit}
                  </span>
                </div>
              </div>

              {onHighlightFactorOnMap && (
                <button
                  onClick={() => onHighlightFactorOnMap(current.factor)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-900 font-bold border border-blue-200 text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <MapPin size={13} />
                  <span>Highlight on Map</span>
                </button>
              )}
            </div>

            {/* Threshold & Observation Triple Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Telemetry</span>
                <span className="text-base font-black text-red-600 block mt-0.5">{current.observed}</span>
                <span className="text-[10px] text-red-600 font-bold">{current.severity}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Critical Warning Threshold</span>
                <span className="text-base font-black text-orange-600 block mt-0.5">{current.criticalThreshold}</span>
                <span className="text-[10px] text-slate-500">Exceedance triggers high alert</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dry Season Normal Baseline</span>
                <span className="text-base font-black text-slate-800 block mt-0.5">{current.normalBaseline}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Stable equilibrium range</span>
              </div>
            </div>

            {/* Visual Contribution Gauge */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                <span>Model Contribution Relative Weight</span>
                <span className="text-blue-900 font-black">{current.percentage}% Impact</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    current.percentage >= 30 ? 'bg-red-600' : current.percentage >= 25 ? 'bg-orange-500' : current.percentage >= 20 ? 'bg-amber-500' : 'bg-blue-900'
                  }`}
                  style={{ width: `${current.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Physics & Geotechnical Failure Mechanism */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sliders size={14} className="text-blue-900" />
              Geotechnical Slope Stability &amp; Hydrological Failure Mechanism
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-xs">
              {current.physicsMechanism}
            </div>
          </div>

          {/* Sensitivity Analysis */}
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-emerald-700" />
              <h4 className="text-xs font-bold text-emerald-950">Sensitivity Analysis &amp; Mitigation Target</h4>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {current.sensitivity}
            </p>
          </div>

          {/* Recommended Field Engineering Protocol */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Wrench size={14} className="text-blue-900" />
              Recommended Field Engineering &amp; Operational Mitigation Protocols
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {current.engineeringResponse.map((action, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 text-[11px] leading-relaxed">
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reporting Stations */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Ground Ingest Source:</strong> {current.stationsReporting}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Explainable Artificial Intelligence module conforms to NDMA &amp; GSI Technical Guidelines
          </span>
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
