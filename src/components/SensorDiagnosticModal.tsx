import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Wifi, 
  Battery, 
  Calendar, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Clock, 
  ArrowUpRight,
  Database,
  Sliders,
  Check,
  Zap
} from 'lucide-react';
import { RiskZone } from '../types';

export interface SensorTelemetryItem {
  id: string;
  sensorCode: string;
  name: string;
  type: 'inclinometer' | 'soil_moisture' | 'rain_gauge' | 'piezometer' | 'tilt_accelerometer';
  model: string;
  status: 'Nominal' | 'Warning' | 'Critical' | 'Unstable';
  currentValue: string;
  metricLabel: string;
  unit: string;
  threshold: string;
  thresholdStatus: 'Exceeded' | 'Normal' | 'Approaching';
  locationName: string;
  district: string;
  state: string;
  depth: string;
  batteryLevel: number; // percentage
  signalStatus: string;
  calibrationDate: string;
  accuracy: string;
  firmware: string;
  alertAcknowledged: boolean;
  timeSeriesData: {
    time: string;
    value: number;
    secondaryValue?: number;
  }[];
  secondaryMetricLabel?: string;
  secondaryUnit?: string;
}

interface SensorDiagnosticModalProps {
  sensor: SensorTelemetryItem | null;
  onClose: () => void;
  onShowToast?: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export const SensorDiagnosticModal: React.FC<SensorDiagnosticModalProps> = ({
  sensor,
  onClose,
  onShowToast
}) => {
  if (!sensor) return null;

  const [activeRange, setActiveRange] = useState<'6h' | '24h' | '7d'>('24h');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState<string | null>(null);
  const [isAlertAcknowledged, setIsAlertAcknowledged] = useState(sensor.alertAcknowledged);
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; value: number; secondary?: number } | null>(null);

  // Dynamic Time Series Telemetry Filtering across 6H, 24H, and 7D
  const getTelemetryDataForRange = (item: SensorTelemetryItem, range: '6h' | '24h' | '7d') => {
    const currentVal = Number(item.currentValue) || 10;
    
    if (range === '6h') {
      // High-resolution 6-hour immediate telemetry (1-hour intervals)
      return [
        { time: '05:00', value: Number((currentVal * 0.72).toFixed(1)), secondaryValue: 1.2 },
        { time: '06:00', value: Number((currentVal * 0.78).toFixed(1)), secondaryValue: 1.6 },
        { time: '07:00', value: Number((currentVal * 0.84).toFixed(1)), secondaryValue: 2.1 },
        { time: '08:00', value: Number((currentVal * 0.90).toFixed(1)), secondaryValue: 2.7 },
        { time: '09:00', value: Number((currentVal * 0.94).toFixed(1)), secondaryValue: 3.4 },
        { time: '10:00', value: Number((currentVal * 0.98).toFixed(1)), secondaryValue: 4.1 },
        { time: '11:00 (Now)', value: Number(currentVal.toFixed(1)), secondaryValue: 4.8 }
      ];
    }
    
    if (range === '7d') {
      // 7-day cumulative trend curve (day by day)
      return [
        { time: 'Day -6', value: Number((currentVal * 0.28).toFixed(1)), secondaryValue: 0.4 },
        { time: 'Day -5', value: Number((currentVal * 0.35).toFixed(1)), secondaryValue: 0.7 },
        { time: 'Day -4', value: Number((currentVal * 0.44).toFixed(1)), secondaryValue: 1.1 },
        { time: 'Day -3', value: Number((currentVal * 0.58).toFixed(1)), secondaryValue: 1.9 },
        { time: 'Day -2', value: Number((currentVal * 0.74).toFixed(1)), secondaryValue: 2.8 },
        { time: 'Yesterday', value: Number((currentVal * 0.88).toFixed(1)), secondaryValue: 3.9 },
        { time: 'Today', value: Number(currentVal.toFixed(1)), secondaryValue: 4.8 }
      ];
    }

    // 24-hour standard daily curve (3-4 hour intervals)
    return [
      { time: '12:00', value: Number((currentVal * 0.38).toFixed(1)), secondaryValue: 0.8 },
      { time: '16:00', value: Number((currentVal * 0.45).toFixed(1)), secondaryValue: 1.2 },
      { time: '20:00', value: Number((currentVal * 0.54).toFixed(1)), secondaryValue: 1.8 },
      { time: '00:00', value: Number((currentVal * 0.66).toFixed(1)), secondaryValue: 2.5 },
      { time: '04:00', value: Number((currentVal * 0.79).toFixed(1)), secondaryValue: 3.2 },
      { time: '08:00', value: Number((currentVal * 0.92).toFixed(1)), secondaryValue: 4.1 },
      { time: '11:00 (Now)', value: Number(currentVal.toFixed(1)), secondaryValue: 4.8 }
    ];
  };

  const currentRangeData = getTelemetryDataForRange(sensor, activeRange);

  // Generate CSV and trigger immediate download for selected time range
  const handleExportCSV = () => {
    const headers = ['Timestamp_or_Period', 'Sensor_Code', 'Sensor_Type', 'Primary_Metric', 'Primary_Value', 'Unit', 'Secondary_Metric', 'Secondary_Value', 'Battery_Pct', 'Signal_Status', 'Status', 'Time_Range_Resolution'];
    
    const rows = currentRangeData.map(d => [
      `"${d.time}"`,
      `"${sensor.sensorCode}"`,
      `"${sensor.type}"`,
      `"${sensor.metricLabel}"`,
      d.value,
      `"${sensor.unit}"`,
      `"${sensor.secondaryMetricLabel || 'N/A'}"`,
      d.secondaryValue ?? 'N/A',
      `"${sensor.batteryLevel}%"`,
      `"${sensor.signalStatus.split(' ')[0]}"`,
      `"${sensor.status}"`,
      `"${activeRange.toUpperCase()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${sensor.sensorCode}_telemetry_${activeRange}_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast?.(`Raw ${activeRange.toUpperCase()} telemetry log for ${sensor.sensorCode} successfully exported as CSV.`, 'success');
  };

  // Simulate remote zero-offset calibration ping
  const handleTriggerRecalibration = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setCalibrationStep('Transmitting handshake packet to LoRaWAN remote node...');

    setTimeout(() => {
      setCalibrationStep('Receiving 100 zero-offset acoustic samples...');
    }, 900);

    setTimeout(() => {
      setCalibrationStep('Calculated drift delta: +0.0014 units (within ISO tolerance). Writing to NVRAM...');
    }, 1900);

    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationStep('Calibration verified. Sensor node zero-baseline locked.');
      onShowToast?.(`Remote calibration for ${sensor.sensorCode} completed with 0 errors.`, 'success');
    }, 2800);
  };

  const handleAcknowledgeAlert = () => {
    setIsAlertAcknowledged(true);
    onShowToast?.(`Incident threshold alert for ${sensor.sensorCode} acknowledged by on-duty command engineer.`, 'warning');
  };

  // Color mapping based on status
  const getStatusBadge = () => {
    switch (sensor.status) {
      case 'Critical':
      case 'Unstable':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  // SVG Chart rendering calculation based on active filtered range
  const values = currentRangeData.map(d => d.value);
  const minVal = Math.min(...values) * 0.85;
  const maxVal = Math.max(...values) * 1.15 || 1;
  const svgWidth = 560;
  const svgHeight = 160;
  const padding = 35;

  const points = currentRangeData.map((d, index) => {
    const x = padding + (index / (currentRangeData.length - 1 || 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((d.value - minVal) / (maxVal - minVal || 1)) * (svgHeight - padding * 2);
    return { x, y, data: d };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `M ${points[0]?.x},${svgHeight - padding} L ${polylinePoints} L ${points[points.length - 1]?.x},${svgHeight - padding} Z`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <Activity size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {sensor.sensorCode}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge()}`}>
                  {sensor.status}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Stream 1Hz
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight mt-1">
                {sensor.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {sensor.locationName} &bull; {sensor.district}, {sensor.state}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Real-time KPI Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Current {sensor.metricLabel}
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {sensor.currentValue}
                </span>
                <span className="text-xs font-bold text-slate-500">{sensor.unit}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-bold">
                <span className={sensor.thresholdStatus === 'Exceeded' ? 'text-red-600' : 'text-slate-600'}>
                  Threshold: {sensor.threshold}
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] ${sensor.thresholdStatus === 'Exceeded' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                  {sensor.thresholdStatus}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Installation Depth
              </span>
              <div className="mt-1 text-base font-bold text-slate-900">
                {sensor.depth}
              </div>
              <div className="mt-1 text-[10px] text-slate-500">
                Precision: <strong className="text-slate-700">{sensor.accuracy}</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Power &amp; Telemetry
              </span>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Battery size={15} className="text-emerald-600" />
                  <span>{sensor.batteryLevel}%</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Wifi size={15} className="text-blue-600" />
                  <span>Online</span>
                </div>
              </div>
              <div className="mt-1 text-[10px] text-slate-500 truncate" title={sensor.signalStatus}>
                {sensor.signalStatus}
              </div>
            </div>
          </div>

          {/* Time Series Telemetry Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} className="text-blue-900" />
                  <span>Live Telemetry Time-Series Chart</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Showing historical readings for {sensor.metricLabel} ({sensor.unit})
                </p>
              </div>

              {/* Range Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {(['6h', '24h', '7d'] as const).map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setActiveRange(range)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                      activeRange === range ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Chart Graphic */}
            <div className="relative w-full overflow-hidden bg-slate-50/50 rounded-lg p-2 border border-slate-100">
              {hoveredPoint && (
                <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded shadow-md pointer-events-none z-10 flex items-center gap-2">
                  <span>{hoveredPoint.time}</span>
                  <span className="font-bold text-blue-300">{hoveredPoint.value} {sensor.unit}</span>
                  {hoveredPoint.secondary && (
                    <span className="text-slate-400">({hoveredPoint.secondary} {sensor.secondaryUnit})</span>
                  )}
                </div>
              )}

              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-44 overflow-visible"
              >
                <defs>
                  <linearGradient id="telemetryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75].map((factor, i) => {
                  const y = padding + factor * (svgHeight - padding * 2);
                  return (
                    <line
                      key={i}
                      x1={padding}
                      y1={y}
                      x2={svgWidth - padding}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Threshold Reference Line */}
                <line
                  x1={padding}
                  y1={padding + (svgHeight - padding * 2) * 0.35}
                  x2={svgWidth - padding}
                  y2={padding + (svgHeight - padding * 2) * 0.35}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={svgWidth - padding - 4}
                  y={padding + (svgHeight - padding * 2) * 0.35 - 4}
                  fill="#ef4444"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  Trigger Threshold ({sensor.threshold})
                </text>

                {/* Area Gradient */}
                <path d={areaPath} fill="url(#telemetryGradient)" />

                {/* Primary Metric Line */}
                <path
                  d={`M ${polylinePoints}`}
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {points.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint?.time === p.data.time ? "5" : "3.5"}
                    fill={hoveredPoint?.time === p.data.time ? "#1e40af" : "#ffffff"}
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:scale-150"
                    onMouseEnter={() => setHoveredPoint({ time: p.data.time, value: p.data.value, secondary: p.data.secondaryValue })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

                {/* X-Axis Labels */}
                {points.map((p, idx) => (
                  <text
                    key={idx}
                    x={p.x}
                    y={svgHeight - 10}
                    fontSize="8"
                    fill="#64748b"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {p.data.time}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Deep Sensor Specifications Table */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={14} className="text-slate-600" />
              <span>Deep Hardware Specifications &amp; Calibration Logs</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Hardware Model</span>
                <span className="font-bold text-slate-900 truncate block" title={sensor.model}>{sensor.model}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Calibration Authority</span>
                <span className="font-bold text-slate-900">{sensor.calibrationDate}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Node Firmware Revision</span>
                <span className="font-mono font-bold text-slate-900">{sensor.firmware}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Battery Type</span>
                <span className="font-bold text-slate-900">LiFePO4 with Solar MPPT</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Telemetry Protocol</span>
                <span className="font-bold text-slate-900">LoRaWAN 868MHz Class A</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block">Sample Frequency</span>
                <span className="font-bold text-slate-900">1.0 Hz Continuous Burst</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Actions & Alerts Management */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={14} className="text-blue-900" />
              <span>Diagnostic Operations &amp; Engineering Controls</span>
            </h4>

            {calibrationStep && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2.5 text-xs text-blue-900 animate-in fade-in">
                {isCalibrating ? (
                  <RefreshCw size={15} className="animate-spin text-blue-700 shrink-0" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                )}
                <span>{calibrationStep}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Export Raw CSV Logs */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-colors"
              >
                <Download size={14} className="text-slate-600" />
                <span>Export Raw CSV Logs</span>
              </button>

              {/* Trigger Manual Recalibration Ping */}
              <button
                type="button"
                onClick={handleTriggerRecalibration}
                disabled={isCalibrating}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={14} className={isCalibrating ? 'animate-spin' : ''} />
                <span>{isCalibrating ? 'Pinging Node...' : 'Trigger Recalibration Ping'}</span>
              </button>

              {/* Acknowledge Active Threshold Alert */}
              <button
                type="button"
                onClick={handleAcknowledgeAlert}
                disabled={isAlertAcknowledged}
                className={`ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors ${
                  isAlertAcknowledged
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                }`}
              >
                {isAlertAcknowledged ? (
                  <>
                    <Check size={14} />
                    <span>Alert Acknowledged by Engineer</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={14} />
                    <span>Acknowledge Threshold Alert</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Connected Node: {sensor.sensorCode} &bull; WGS84 Georeferenced</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
