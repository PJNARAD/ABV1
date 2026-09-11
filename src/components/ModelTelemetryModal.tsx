import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Database, 
  Radio, 
  Satellite, 
  Activity, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Workflow, 
  HardDrive,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from '../data/translations';

export type ModelTelemetryTab = 'dataset' | 'telemetry' | 'satellite' | 'inference';

interface ModelTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ModelTelemetryTab;
}

export const ModelTelemetryModal: React.FC<ModelTelemetryModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'dataset'
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ModelTelemetryTab>(initialTab);

  // Sync initial tab on open
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <Cpu size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  AI Model &amp; Telemetry Infrastructure
                </h2>
                <span className="text-[10px] font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                  LandslideRisk-v1.4
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Multi-temporal InSAR, geotechnical slope mechanics &amp; IoT deep learning diagnostics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-white flex space-x-2 overflow-x-auto">
          {[
            { id: 'dataset', label: 'Training Dataset & Architecture', icon: Database },
            { id: 'telemetry', label: 'IoT Station Distribution (1,284)', icon: Radio },
            { id: 'satellite', label: 'Satellite Feeds (InSAR & SAR)', icon: Satellite },
            { id: 'inference', label: 'Real-Time Inference Pipeline', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ModelTelemetryTab)}
                className={`py-3 px-3 text-xs font-bold border-b-2 inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-blue-900 text-blue-900 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 text-xs">
          
          {/* TAB 1: TRAINING DATASET & ARCHITECTURE */}
          {activeTab === 'dataset' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Historic Slide Events</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">38,400</span>
                  <span className="text-[11px] text-slate-500">1980–2025 GSI NLSM</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Validation ROC-AUC</span>
                  <span className="text-xl font-black text-blue-900 mt-1 block">0.942</span>
                  <span className="text-[11px] text-emerald-600 font-bold">5-fold spatial cross-val</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Recall Sensitivity</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">91.2%</span>
                  <span className="text-[11px] text-slate-500">Critical slope detection</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">False Alarm Rate</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">&lt; 4.8%</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Suppressed noise</span>
                </div>
              </div>

              {/* Neural Architecture Breakdown */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-blue-900" />
                  Neural Network Architecture &amp; Hybrid Formulation
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The model implements a <strong>Spatio-Temporal Graph Convolutional Network (ST-GCN)</strong> tightly coupled with a 
                  <strong> Bidirectional Long Short-Term Memory (BiLSTM)</strong> recurrent unit. The topographical terrain is discretized into 
                  500m × 500m hexagonal graph nodes, where edges represent hydraulic flow pathways and geological shear discontinuities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Static Topographical Inputs:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                      <li>Cartosat-1 30m Digital Elevation Model (DEM)</li>
                      <li>Slope inclination, aspect, plan &amp; profile curvature</li>
                      <li>Lithological formation &amp; distance to fault shear lines</li>
                      <li>Road cut proximity &amp; deforestation index (NDVI)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Dynamic Temporal Inputs:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                      <li>Antecedent Precipitation Index (API-24h, 72h, 120h)</li>
                      <li>IoT Time-Domain Reflectometry (TDR) volumetric moisture</li>
                      <li>InSAR Line-of-Sight (LOS) surface velocity vectors</li>
                      <li>Microseismic acoustic emission event count &amp; energy</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Training Loss & Class Balancing */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-blue-950 text-xs">Focal Loss &amp; Class Imbalance Mitigation</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Because catastrophic landslide events occupy &lt;0.2% of the spatial-temporal training domain, a modified Focal Loss function 
                    (α = 0.25, γ = 2.0) with synthetic minority over-sampling prevents gradient domination by stable mountain slopes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IOT STATION DISTRIBUTION */}
          {activeTab === 'telemetry' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Radio size={16} className="text-blue-900" />
                    NER Real-Time In-Situ Sensor Distribution (1,284 Stations)
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    Network Uptime: 99.4%
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Continuous sensor stations equipped with solar MPPT chargers, LoRaWAN gateways, and NavIC/ISRO satellite burst transmitters.
                </p>

                {/* State breakdown table */}
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase">
                      <tr>
                        <th className="px-3 py-2">State</th>
                        <th className="px-3 py-2 text-center">Stations</th>
                        <th className="px-3 py-2">Primary Corridors Covered</th>
                        <th className="px-3 py-2 text-center">Sensor Modalities</th>
                        <th className="px-3 py-2 text-right">Telemetry Health</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {[
                        { state: 'Arunachal Pradesh', count: 280, corridor: 'NH-13 Trans-Arunachal, Tawang, Bhalukpong', sensors: 'MEMS Tilt, TDR, Rain', health: '99.1%' },
                        { state: 'Sikkim', count: 210, corridor: 'NH-10 Teesta Valley, Singtam, Mangan', sensors: 'Piezometer, Inclinometer, Rain', health: '99.7%' },
                        { state: 'Assam (Hill Sectors)', count: 195, corridor: 'Dima Hasao Hill Rail & Lumding Bypass', sensors: 'Extensometer, Acoustic, TDR', health: '99.2%' },
                        { state: 'Meghalaya', count: 180, corridor: 'Sohra Escarpment, Shillong-Cherrapunjee SH-5', sensors: 'Pluviometer, Soil Moisture', health: '99.5%' },
                        { state: 'Nagaland', count: 160, corridor: 'NH-29 Kohima–Dimapur Lifeline', sensors: 'MEMS Tilt, TDR, Piezometer', health: '99.3%' },
                        { state: 'Manipur', count: 140, corridor: 'NH-37 Imphal–Jiribam, Tupul Rail Bridge', sensors: 'Acoustic Emission, Tilts', health: '99.0%' },
                        { state: 'Mizoram', count: 119, corridor: 'Aizawl Urban Ridge Crest, NH-54', sensors: 'TDR probes, Crackmeters', health: '99.6%' },
                        { state: 'Tripura', count: 100, corridor: 'Jampui Hills, Longtharai Slopes NH-8', sensors: 'Tipping Rain, Moisture', health: '99.8%' },
                      ].map((row) => (
                        <tr key={row.state} className="hover:bg-slate-50/80">
                          <td className="px-3 py-2 font-bold text-slate-900">{row.state}</td>
                          <td className="px-3 py-2 text-center font-black text-blue-900">{row.count}</td>
                          <td className="px-3 py-2 text-slate-600">{row.corridor}</td>
                          <td className="px-3 py-2 text-center text-slate-500 text-[11px]">{row.sensors}</td>
                          <td className="px-3 py-2 text-right font-bold text-emerald-600">{row.health}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SATELLITE FEEDS & INSAR */}
          {activeTab === 'satellite' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Satellite size={16} className="text-blue-900" />
                      Sentinel-1A/B InSAR Constellation
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">C-Band (5.4 GHz)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    European Space Agency Sentinel-1 radar satellites acquire ascending (Track 121) and descending (Track 048) radar passes 
                    every 12 days over the Himalayas and Patkai ranges.
                  </p>
                  <div className="mt-2 text-[11px] space-y-1 bg-white p-2.5 rounded border border-slate-200">
                    <div className="flex justify-between"><span className="text-slate-500">Spatial Resolution:</span> <span className="font-bold">14m × 14m</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">LOS Velocity Precision:</span> <span className="font-bold text-emerald-700">±1.8 mm/year</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Processing Method:</span> <span className="font-bold">PS-InSAR + SBAS</span></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Satellite size={16} className="text-amber-600" />
                      NASA-ISRO SAR (NISAR)
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">L-Band + S-Band</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Dual-frequency polarimetric radar capable of penetrating heavy monsoon tropical canopies across Arunachal and Meghalaya forests 
                    to image true ground slip surfaces.
                  </p>
                  <div className="mt-2 text-[11px] space-y-1 bg-white p-2.5 rounded border border-slate-200">
                    <div className="flex justify-between"><span className="text-slate-500">Canopy Penetration:</span> <span className="font-bold text-emerald-700">High (&gt;85%)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Orbital Cycle:</span> <span className="font-bold">12-day repeat</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Interferometric Coherence:</span> <span className="font-bold">0.82 mean</span></div>
                  </div>
                </div>
              </div>

              {/* Atmospheric Correction */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Atmospheric Phase Screen (APS) Correction</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Heavy monsoon water vapor tropospheric delays are eliminated in near-real-time using ECMWF ERA5 numerical atmospheric reanalysis 
                  and ground GPS zenith total delay (ZTD) telemetry from NESAC stations.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: REAL-TIME INFERENCE PIPELINE */}
          {activeTab === 'inference' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity size={16} className="text-blue-900" />
                    15-Minute Pipeline Execution Cycle
                  </h3>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                    NVIDIA TensorRT Acceleration
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Continuous end-to-end telemetry loop running automated quality assurance, spatial downscaling, and emergency threshold trigger checks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 mt-3">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-[11px] flex items-center justify-center mx-auto mb-1.5">1</span>
                    <span className="font-bold text-slate-900 block text-xs">Edge Ingest</span>
                    <span className="text-[10px] text-slate-500">MQTT/Kafka broker stream</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-[11px] flex items-center justify-center mx-auto mb-1.5">2</span>
                    <span className="font-bold text-slate-900 block text-xs">Dynamic Index</span>
                    <span className="text-[10px] text-slate-500">API-24h &amp; TDR saturation</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-[11px] flex items-center justify-center mx-auto mb-1.5">3</span>
                    <span className="font-bold text-slate-900 block text-xs">Neural Inference</span>
                    <span className="text-[10px] text-slate-500">ST-GCN graph pass (0.42s)</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-[11px] flex items-center justify-center mx-auto mb-1.5">4</span>
                    <span className="font-bold text-slate-900 block text-xs">Alert Broadcast</span>
                    <span className="text-[10px] text-slate-500">NDMA &amp; BRO webhooks</span>
                  </div>
                </div>
              </div>

              {/* Threshold Triggers */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                  <span className="text-[10px] uppercase font-bold text-red-600 block">Critical Alarm</span>
                  <span className="text-base font-black text-red-700 mt-0.5 block">&gt; 85% Probability</span>
                  <span className="text-[10px] text-red-600">Immediate evacuation order</span>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <span className="text-[10px] uppercase font-bold text-orange-600 block">High Alert</span>
                  <span className="text-base font-black text-orange-700 mt-0.5 block">75% – 85% Prob</span>
                  <span className="text-[10px] text-orange-700">Pre-position equipment</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-600 block">Moderate Watch</span>
                  <span className="text-base font-black text-amber-700 mt-0.5 block">50% – 75% Prob</span>
                  <span className="text-[10px] text-amber-700">Advisory to transit convoys</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Certified by North Eastern Space Applications Centre (NESAC) &amp; Geological Survey of India (GSI)
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
