import React, { useState } from 'react';
import { RiskZone } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { 
  ArrowLeft, 
  MapPin, 
  CloudRain, 
  Droplets, 
  Mountain, 
  Route, 
  Phone, 
  Radio, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  FileDown,
  Navigation,
  ArrowUpRight,
  Cpu,
  RefreshCw,
  Clock
} from 'lucide-react';
import { SensorDiagnosticModal, SensorTelemetryItem } from './SensorDiagnosticModal';
import { MetricDetailModal, MetricModalType } from './MetricDetailModal';
import { getSensorTelemetryForZone } from '../utils/sensorTelemetryData';
import { useTranslation } from '../data/translations';

interface DistrictDetailViewProps {
  zone: RiskZone;
  onBack: () => void;
  onExportReport: () => void;
  onOpenSensorDiagnostic?: (sensor: SensorTelemetryItem) => void;
  onShowToast?: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export const DistrictDetailView: React.FC<DistrictDetailViewProps> = ({
  zone,
  onBack,
  onExportReport,
  onOpenSensorDiagnostic,
  onShowToast
}) => {
  const { t } = useTranslation();
  const [selectedSensor, setSelectedSensor] = useState<SensorTelemetryItem | null>(null);
  const [activeMetricModal, setActiveMetricModal] = useState<MetricModalType | null>(null);

  const handleOpenSensor = (type: 'inclinometer' | 'soil_moisture' | 'rain_gauge' | 'piezometer') => {
    const sensor = getSensorTelemetryForZone(zone, type);
    if (onOpenSensorDiagnostic) {
      onOpenSensorDiagnostic(sensor);
    } else {
      setSelectedSensor(sensor);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>← {t('navDashboard')}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <FileDown size={14} />
            <span>Export District Dossier (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main District Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {zone.state} Disaster Authority
              </span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                L-RISK CODE: {zone.id}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              {zone.district} — Landslide Risk Profile &amp; Corridor Assessment
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-1 max-w-3xl">
              Sector: <span className="font-bold text-slate-900">{zone.name}</span>. Continuous geotechnical telemetry and precipitation radar surveillance active.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block mb-1">Overall District Risk:</span>
            <RiskBadge level={zone.riskLevel} size="lg" />
            <span className="text-xs font-black text-slate-900 block mt-1">
              Probability: {zone.probability}%
            </span>
          </div>
        </div>

        {/* 5 Core Top Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-200 text-xs">
          <div 
            role="button"
            tabIndex={0}
            onClick={() => handleOpenSensor('rain_gauge')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('rain_gauge'); }}
            className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold block text-[11px] group-hover:text-blue-900">{t('rainfall24h')}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-900" />
            </div>
            <span className="text-xl font-black text-slate-900 mt-1 block">
              {zone.rainfall24h} mm
            </span>
            <span className="text-[10px] text-red-600 font-semibold">+42 mm in last 6h</span>
          </div>

          <div 
            role="button"
            tabIndex={0}
            onClick={() => handleOpenSensor('soil_moisture')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('soil_moisture'); }}
            className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold block text-[11px] group-hover:text-blue-900">{t('soilMoisture')}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-900" />
            </div>
            <span className="text-xl font-black text-red-600 mt-1 block">
              {zone.soilMoisture}%
            </span>
            <span className="text-[10px] text-red-600 font-semibold">{t('criticalSaturation')}</span>
          </div>

          <div 
            role="button"
            tabIndex={0}
            onClick={() => handleOpenSensor('inclinometer')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('inclinometer'); }}
            className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold block text-[11px] group-hover:text-blue-900">{t('slopeStability')}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-900" />
            </div>
            <span className="text-xl font-black text-slate-900 mt-1 block">
              {zone.slopeAngle}°
            </span>
            <span className="text-[10px] text-orange-600 font-medium">Active shear plane</span>
          </div>

          <div 
            role="button"
            tabIndex={0}
            onClick={() => setActiveMetricModal('roads')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveMetricModal('roads'); }}
            className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold block text-[11px] group-hover:text-blue-900">{t('roadsAffected')}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="text-xl font-black text-orange-600 mt-1 block">
              02 Highways
            </span>
            <span className="text-[10px] text-orange-700 font-semibold block truncate" title={zone.criticalRoadAffected || 'NH-10 Corridor'}>
              {zone.criticalRoadAffected || 'NH-10 (Siliguri - Gangtok Lifeline)'}
            </span>
            <span className="text-[9px] text-blue-900 font-bold mt-0.5 block group-hover:underline">
              {t('viewRouteBreakdown')}
            </span>
          </div>

          <div 
            role="button"
            tabIndex={0}
            onClick={() => setActiveMetricModal('history')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveMetricModal('history'); }}
            className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group col-span-2 sm:col-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold block text-[11px] group-hover:text-blue-900">{t('historicalLandslides')}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="text-xl font-black text-slate-900 mt-1 block">
              {zone.historicalEventsCount} Events
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              Last: {zone.lastEventDate || '18 Aug 2025'}
            </span>
            <span className="text-[9px] text-blue-900 font-bold mt-0.5 block group-hover:underline">
              View Event Registry →
            </span>
          </div>
        </div>
      </div>

      {/* Geotechnical Sensor Grid & Evacuation Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sensor Data Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity size={17} className="text-blue-900" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Live Geotechnical Sensor Telemetry
              </h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Online</span>
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {/* Sensor 01 */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => handleOpenSensor('inclinometer')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('inclinometer'); }}
              className="p-4 rounded-xl border border-red-200 bg-red-50/15 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-900 transition-colors">
                    Sensor 01 — MEMS Slope Inclinometer (Incline: {zone.slopeAngle}°)
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    Unstable
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Shear Strain Velocity:</span>
                  <span className="font-black text-red-600">4.8 mm/h (Accelerating)</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Installation Depth: 12.5m bedrock interface. High shear plane deformation detected.
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-red-100/60 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
                <span className="inline-flex items-center gap-1.5">
                  <Activity size={13} />
                  <span>View Live Telemetry / Diagnostics</span>
                </span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Sensor 02 */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => handleOpenSensor('soil_moisture')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('soil_moisture'); }}
              className="p-4 rounded-xl border border-red-200 bg-red-50/15 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-900 transition-colors">
                    Sensor 02 — Time-Domain Reflectometry Soil Moisture
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    Critical
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Volumetric Water Content:</span>
                  <span className="font-black text-red-600">{zone.soilMoisture}% (Liquefaction Limit)</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Hydrostatic pore water pressure: 52 kPa (Safety factor: 0.88).
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-red-100/60 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
                <span className="inline-flex items-center gap-1.5">
                  <Activity size={13} />
                  <span>View Live Telemetry / Diagnostics</span>
                </span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Sensor 03 */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => handleOpenSensor('rain_gauge')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('rain_gauge'); }}
              className="p-4 rounded-xl border border-orange-200 bg-orange-50/15 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-900 transition-colors">
                    Sensor 03 — Tipping Bucket Rain Gauge
                  </span>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                    Heavy
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Peak Precipitation Intensity:</span>
                  <span className="font-black text-orange-600">42 mm/h</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Cumulative 48-hour total: 248 mm. Trigger threshold for major debris flow exceeded.
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-orange-100/60 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
                <span className="inline-flex items-center gap-1.5">
                  <Activity size={13} />
                  <span>View Live Telemetry / Diagnostics</span>
                </span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Sensor 04 */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => handleOpenSensor('piezometer')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSensor('piezometer'); }}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50/15 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-900 transition-colors">
                    Sensor 04 — Vibrating Wire Hydraulic Piezometer
                  </span>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                    Active Surge
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Hydrostatic Pressure:</span>
                  <span className="font-black text-blue-900">58.4 kPa (Aquifer Saturation)</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Installation Depth: 18.0m borehole subterranean. High-frequency acoustic emissions.
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-blue-100/60 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-700">
                <span className="inline-flex items-center gap-1.5">
                  <Activity size={13} />
                  <span>View Live Telemetry / Diagnostics</span>
                </span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Evacuation Routes & Emergency Contacts */}
        <div className="space-y-5">
          {/* Evacuation Routes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Navigation size={17} className="text-blue-900" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Evacuation Corridors &amp; Diversions
                </h2>
              </div>
              <span className="text-[10px] font-bold text-slate-500">Police Traffic Unit</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-red-200 bg-red-50/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Primary Lifeline Route:</span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    RESTRICTED
                  </span>
                </div>
                <div className="mt-1 font-semibold text-slate-800">
                  {zone.criticalRoadAffected || 'NH-10 (Singtam - Rangpo Lifeline)'}
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Heavy debris clearance active at km-point 28. Single-lane emergency convoys only.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Designated Evacuation Bypass:</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    CLEAR / OPERATIONAL
                  </span>
                </div>
                <div className="mt-1 font-semibold text-slate-800">
                  Via Melli–Jorethang Ridge Link Road
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Signposted with emergency solar-powered illumination. PWD road maintenance vehicle stationed.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Incident Contacts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Phone size={17} className="text-blue-900" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Disaster Command Contacts
                </h2>
              </div>
              <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                24/7 Hotline
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  District Magistrate Control Room
                </span>
                <span className="font-bold text-slate-900 mt-1 block">
                  +91 (03592) 202-411
                </span>
                <span className="text-[10px] text-slate-500">Toll Free: 1077</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  NDRF 1st Bn Command Post
                </span>
                <span className="font-bold text-slate-900 mt-1 block">
                  +91 (0361) 284-9001
                </span>
                <span className="text-[10px] text-slate-500">VHF Channel: 146.520 MHz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Detail Modal for Critical Roads & Historical Events */}
      {activeMetricModal && (
        <MetricDetailModal
          isOpen={Boolean(activeMetricModal)}
          onClose={() => setActiveMetricModal(null)}
          type={activeMetricModal}
          zone={zone}
          onShowToast={onShowToast}
        />
      )}

      {/* Internal Modal fallback if not handled at parent */}
      {selectedSensor && (
        <SensorDiagnosticModal
          sensor={selectedSensor}
          onClose={() => setSelectedSensor(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
