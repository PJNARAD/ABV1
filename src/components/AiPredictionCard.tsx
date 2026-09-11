import React, { useState, useMemo, useEffect } from 'react';
import { 
  Cpu, 
  ArrowUpRight, 
  ChevronRight, 
  X, 
  Filter, 
  Eye, 
  EyeOff, 
  MapPin, 
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useTranslation } from '../data/translations';
import { RiskZone } from '../types';
import { INITIAL_RISK_ZONES } from '../data/mockData';
import { 
  MULTI_STATE_PREDICTION_CURVES, 
  StatePredictionCurve, 
  generateZonePredictionCurve,
  TIMESTAMPS 
} from '../data/predictionCurves';
import { ForecastBreakdownModal, ForecastMetricType } from './ForecastBreakdownModal';

export interface AiPredictionCardProps {
  onViewAiAnalysis?: () => void;
  selectedZone?: RiskZone | null;
  selectedState?: string | null;
  onClearFilter?: () => void;
  onSelectZone?: (zone: RiskZone) => void;
  availableZones?: RiskZone[];
  title?: string;
  showAnalysisLink?: boolean;
}

export const AiPredictionCard: React.FC<AiPredictionCardProps> = ({
  onViewAiAnalysis,
  selectedZone: propSelectedZone,
  selectedState: propSelectedState,
  onClearFilter,
  onSelectZone,
  availableZones = INITIAL_RISK_ZONES,
  title,
  showAnalysisLink = true
}) => {
  const { t } = useTranslation();

  // Internal selection state (synced with props or standalone)
  const [activeZone, setActiveZone] = useState<RiskZone | null>(propSelectedZone || null);
  const [activeStateFilter, setActiveStateFilter] = useState<string | null>(propSelectedState || null);

  // Sync with prop changes
  useEffect(() => {
    setActiveZone(propSelectedZone || null);
  }, [propSelectedZone]);

  useEffect(() => {
    setActiveStateFilter(propSelectedState || null);
  }, [propSelectedState]);

  // Active visible states in Multi-State comparison mode
  const [visibleStateIds, setVisibleStateIds] = useState<Set<string>>(
    new Set(['sikkim', 'arunachal', 'assam', 'meghalaya'])
  );

  // Hover index across the 12 time slots (0 to 11)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeForecastMetric, setActiveForecastMetric] = useState<ForecastMetricType | null>(null);

  // Toggle state visibility in multi-state mode
  const toggleStateVisibility = (stateId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVisibleStateIds((prev) => {
      const next = new Set(prev);
      if (next.has(stateId)) {
        // Prevent toggling off all lines
        if (next.size > 1) {
          next.delete(stateId);
        }
      } else {
        next.add(stateId);
      }
      return next;
    });
  };

  const handleResetToAllStates = () => {
    setActiveZone(null);
    setActiveStateFilter(null);
    setVisibleStateIds(new Set(['sikkim', 'arunachal', 'assam', 'meghalaya']));
    if (onClearFilter) {
      onClearFilter();
    }
  };

  // Determine current active mode
  const isSingleLocationMode = Boolean(activeZone);
  const isStateFilterMode = Boolean(!activeZone && activeStateFilter);

  // Active single curve if single location is selected
  const singleZoneCurve: StatePredictionCurve | null = useMemo(() => {
    if (activeZone) {
      return generateZonePredictionCurve(activeZone);
    }
    return null;
  }, [activeZone]);

  // If filtered by State only (e.g. 'Sikkim')
  const singleStateCurve: StatePredictionCurve | null = useMemo(() => {
    if (isStateFilterMode && activeStateFilter) {
      const found = MULTI_STATE_PREDICTION_CURVES.find(
        (c) => c.name.toLowerCase().includes(activeStateFilter.toLowerCase()) ||
               activeStateFilter.toLowerCase().includes(c.shortName.toLowerCase())
      );
      return found || null;
    }
    return null;
  }, [isStateFilterMode, activeStateFilter]);

  // Focused curve when in single mode (zone has priority, then state)
  const activeFocusCurve = singleZoneCurve || singleStateCurve;

  // Multi-state curves to display
  const displayedMultiStateCurves = useMemo(() => {
    return MULTI_STATE_PREDICTION_CURVES.filter((curve) => visibleStateIds.has(curve.id));
  }, [visibleStateIds]);

  // SVG Chart Geometry
  const width = 800;
  const height = 260;
  const padding = { top: 35, right: 35, bottom: 42, left: 48 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxProb = 100;

  // Threshold Y coordinates
  const yCritical = padding.top + chartH - (85 / maxProb) * chartH;
  const yHigh = padding.top + chartH - (75 / maxProb) * chartH;
  const yModerate = padding.top + chartH - (50 / maxProb) * chartH;

  // Helper to generate smooth SVG cubic bezier path for a series
  const generateSplinePath = (dataPoints: Array<{ time: string; probability: number }>) => {
    const coords = dataPoints.map((d, i) => ({
      x: padding.left + (i / (dataPoints.length - 1)) * chartW,
      y: padding.top + chartH - (d.probability / maxProb) * chartH
    }));

    return coords.reduce((acc, p, idx) => {
      if (idx === 0) return `M ${p.x},${p.y}`;
      const prev = coords[idx - 1];
      const cpX1 = prev.x + (p.x - prev.x) / 2;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (p.x - prev.x) / 2;
      const cpY2 = p.y;
      return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p.x},${p.y}`;
    }, '');
  };

  // Helper to generate area path under the curve
  const generateAreaPath = (dataPoints: Array<{ time: string; probability: number }>) => {
    const spline = generateSplinePath(dataPoints);
    const lastX = padding.left + chartW;
    const firstX = padding.left;
    const bottomY = padding.top + chartH;
    return `${spline} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  // Dynamic summary metrics based on focus or multi-state overview
  const summaryMetrics = useMemo(() => {
    if (activeFocusCurve) {
      return {
        currentProbability: activeFocusCurve.currentProbability,
        peakProbability: activeFocusCurve.peakProbability,
        riskWindow: activeFocusCurve.riskWindow,
        confidence: activeFocusCurve.confidence,
        riskLevel: activeFocusCurve.riskLevel
      };
    }

    // Default multi-state composite
    const maxPeak = Math.max(...displayedMultiStateCurves.map(c => c.peakProbability), 91);
    const avgCurrent = Math.round(
      displayedMultiStateCurves.reduce((acc, c) => acc + c.currentProbability, 0) /
      (displayedMultiStateCurves.length || 1)
    );

    return {
      currentProbability: avgCurrent || 78,
      peakProbability: maxPeak,
      riskWindow: '18:00–23:00',
      confidence: 89,
      riskLevel: maxPeak >= 85 ? 'CRITICAL' : 'HIGH'
    };
  }, [activeFocusCurve, displayedMultiStateCurves]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 transition-all">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
              <Cpu size={16} />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {title || t('aiLandslidePrediction')}
            </h2>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
              <Sparkles size={10} />
              {t('modelV1')}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {isSingleLocationMode 
              ? `Focused single-location hydro-geological probability curve for ${activeZone?.name}.`
              : isStateFilterMode
              ? `Focused state-level prediction curve for ${activeStateFilter}.`
              : 'Multi-state baseline comparison across high-risk Himalayan sectors (Next 24 Hours).'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Location Selector Dropdown */}
          <div className="relative">
            <select
              value={activeZone ? activeZone.id : (activeStateFilter || 'all')}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'all') {
                  handleResetToAllStates();
                } else if (val.startsWith('state:')) {
                  const sName = val.replace('state:', '');
                  setActiveZone(null);
                  setActiveStateFilter(sName);
                } else {
                  const found = availableZones.find((z) => z.id === val);
                  if (found) {
                    setActiveZone(found);
                    setActiveStateFilter(null);
                    if (onSelectZone) onSelectZone(found);
                  }
                }
              }}
              className="text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">⚡ All States Comparison (Default)</option>
              <optgroup label="States">
                <option value="state:Sikkim">Sikkim Baseline</option>
                <option value="state:Arunachal Pradesh">Arunachal Pradesh Baseline</option>
                <option value="state:Assam">Assam Baseline</option>
                <option value="state:Meghalaya">Meghalaya Baseline</option>
              </optgroup>
              <optgroup label="Specific Critical &amp; High Risk Locations">
                {availableZones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.district}, {z.state}) - {z.riskLevel}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {showAnalysisLink && onViewAiAnalysis && (
            <button
              onClick={onViewAiAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              title="Open full AI Analytics dashboard"
            >
              <span>{t('viewAiAnalysis')}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE FILTER CHIP BANNER (Shown when filtered by Location or State) */}
      {(isSingleLocationMode || isStateFilterMode) && (
        <div className="mt-3 px-3.5 py-2.5 bg-blue-50/80 rounded-lg border border-blue-200 flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-bold text-slate-700">Filtering by:</span>
            <span className="font-black text-blue-950 bg-white px-2 py-0.5 rounded border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
              <MapPin size={12} className="text-blue-700" />
              {activeZone ? `${activeZone.name} — ${activeZone.district}, ${activeZone.state}` : activeStateFilter}
            </span>
            {activeZone && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                activeZone.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-300' :
                activeZone.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                {activeZone.riskLevel} ({activeZone.probability}%)
              </span>
            )}
          </div>

          <button
            onClick={handleResetToAllStates}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 font-bold text-xs shadow-2xs transition-all active:scale-95"
            title="Reset chart to All States baseline comparison"
          >
            <RotateCcw size={12} className="text-slate-500" />
            <span>Reset to All States</span>
            <X size={13} className="text-slate-400 ml-0.5" />
          </button>
        </div>
      )}

      {/* Chart Legend & Controls Header */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Toggleable State Legend (In Multi-State Mode) */}
        {!isSingleLocationMode && !isStateFilterMode ? (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              States:
            </span>
            {MULTI_STATE_PREDICTION_CURVES.map((curve) => {
              const isVisible = visibleStateIds.has(curve.id);
              return (
                <button
                  key={curve.id}
                  onClick={(e) => toggleStateVisibility(curve.id, e)}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all border ${
                    isVisible
                      ? `${curve.badgeBg} ${curve.badgeText} ${curve.badgeBorder} shadow-2xs hover:opacity-90`
                      : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60 line-through hover:opacity-80'
                  }`}
                  title={isVisible ? `Click to hide ${curve.name} trend` : `Click to show ${curve.name} trend`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isVisible ? curve.color : '#94a3b8' }}
                  />
                  <span>{curve.shortName}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    ({curve.peakProbability}% Peak)
                  </span>
                  {isVisible ? (
                    <Eye size={11} className="opacity-60 ml-0.5" />
                  ) : (
                    <EyeOff size={11} className="opacity-60 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: activeFocusCurve?.color || '#0f3460' }}
              />
              {activeFocusCurve?.name || 'Focused Location'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (Single-Location Hydro-Geological Trend)
            </span>
          </div>
        )}

        {/* Threshold Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
          <span className="inline-flex items-center gap-1.5" title="Hazard Safety Factor < 1.0">
            <span className="w-3 h-0.5 bg-red-500" /> {t('critical')} (85%)
          </span>
          <span className="inline-flex items-center gap-1.5" title="Hazard Safety Factor 1.0 - 1.2">
            <span className="w-3 h-0.5 bg-orange-500" /> {t('high')} (75%)
          </span>
          <span className="inline-flex items-center gap-1.5" title="Hazard Safety Factor 1.2 - 1.5">
            <span className="w-3 h-0.5 bg-amber-500" /> {t('moderate')} (50%)
          </span>
        </div>
      </div>

      {/* SVG Multi-State Line Chart */}
      <div className="mt-3 w-full overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[640px] select-none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Shaded area gradient for single focus curve */}
            {activeFocusCurve && (
              <linearGradient id="single-focus-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeFocusCurve.color} stopOpacity="0.28" />
                <stop offset="60%" stopColor={activeFocusCurve.color} stopOpacity="0.08" />
                <stop offset="100%" stopColor={activeFocusCurve.color} stopOpacity="0.00" />
              </linearGradient>
            )}

            {/* General soft backdrop gradient */}
            <linearGradient id="chart-bg-subtle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background grid rect */}
          <rect
            x={padding.left}
            y={padding.top}
            width={chartW}
            height={chartH}
            fill="url(#chart-bg-subtle)"
            rx="4"
          />

          {/* Horizontal Grid lines */}
          {[0, 25, 50, 75, 85, 100].map((val) => {
            const y = padding.top + chartH - (val / maxProb) * chartH;
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontWeight="600"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Dashed Threshold Lines */}
          <line
            x1={padding.left}
            y1={yCritical}
            x2={width - padding.right}
            y2={yCritical}
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line
            x1={padding.left}
            y1={yHigh}
            x2={width - padding.right}
            y2={yHigh}
            stroke="#f97316"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line
            x1={padding.left}
            y1={yModerate}
            x2={width - padding.right}
            y2={yModerate}
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* RENDER CASE 1: Single Focused Location / State Curve */}
          {activeFocusCurve && (
            <>
              {/* Area fill under curve */}
              <path
                d={generateAreaPath(activeFocusCurve.points)}
                fill="url(#single-focus-grad)"
              />
              {/* Line path */}
              <path
                d={generateSplinePath(activeFocusCurve.points)}
                fill="none"
                stroke={activeFocusCurve.color}
                strokeWidth="3.25"
                strokeLinecap="round"
              />
              {/* Data points */}
              {activeFocusCurve.points.map((pt, idx) => {
                const cx = padding.left + (idx / (activeFocusCurve.points.length - 1)) * chartW;
                const cy = padding.top + chartH - (pt.probability / maxProb) * chartH;
                const isHovered = hoveredIndex === idx;

                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : pt.probability >= 85 ? 4.5 : 3.5}
                    fill={pt.probability >= 85 ? '#ef4444' : activeFocusCurve.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all"
                  />
                );
              })}
            </>
          )}

          {/* RENDER CASE 2: Multi-State Baseline Curves (Default Mode) */}
          {!activeFocusCurve &&
            displayedMultiStateCurves.map((curve) => {
              const linePath = generateSplinePath(curve.points);
              return (
                <g key={curve.id}>
                  {/* Subtle glow layer behind line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={curve.color}
                    strokeWidth="4"
                    strokeOpacity="0.15"
                    strokeLinecap="round"
                  />
                  {/* Main line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={curve.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Circle nodes */}
                  {curve.points.map((pt, idx) => {
                    const cx = padding.left + (idx / (curve.points.length - 1)) * chartW;
                    const cy = padding.top + chartH - (pt.probability / maxProb) * chartH;
                    const isHovered = hoveredIndex === idx;

                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 5 : 3}
                        fill={curve.color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="transition-all"
                      />
                    );
                  })}
                </g>
              );
            })}

          {/* Vertical Tracking Line across time steps */}
          {hoveredIndex !== null && (
            <line
              x1={padding.left + (hoveredIndex / (TIMESTAMPS.length - 1)) * chartW}
              y1={padding.top}
              x2={padding.left + (hoveredIndex / (TIMESTAMPS.length - 1)) * chartW}
              y2={padding.top + chartH}
              stroke="#475569"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
          )}

          {/* Interactive Invisible Vertical Column Rects for Responsive Hover Tracking */}
          {TIMESTAMPS.map((tLabel, idx) => {
            const colWidth = chartW / (TIMESTAMPS.length - 1);
            const x = padding.left + idx * colWidth - colWidth / 2;
            const cx = padding.left + (idx / (TIMESTAMPS.length - 1)) * chartW;

            return (
              <g key={idx}>
                {/* Invisible hover trigger box */}
                <rect
                  x={Math.max(padding.left, x)}
                  y={padding.top}
                  width={colWidth}
                  height={chartH}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                />
                {/* X-axis Timestamp Labels */}
                <text
                  x={cx}
                  y={height - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={hoveredIndex === idx ? 'bold' : 'normal'}
                  fill={hoveredIndex === idx ? '#0f172a' : '#64748b'}
                >
                  {tLabel}
                </text>
              </g>
            );
          })}

          {/* HOVER TOOLTIP OVERLAY */}
          {hoveredIndex !== null && (
            (() => {
              const hTime = TIMESTAMPS[hoveredIndex];
              const anchorX = padding.left + (hoveredIndex / (TIMESTAMPS.length - 1)) * chartW;
              
              // Determine tooltip dimensions & position
              const isSingle = Boolean(activeFocusCurve);
              const tipW = isSingle ? 150 : 180;
              const tipH = isSingle ? 68 : 26 + displayedMultiStateCurves.length * 18 + 18;

              // Keep tooltip inside canvas boundaries
              let tipX = anchorX - tipW / 2;
              if (tipX < padding.left) tipX = padding.left;
              if (tipX + tipW > width - padding.right) tipX = width - padding.right - tipW;

              let tipY = padding.top + 8;

              return (
                <g transform={`translate(${tipX}, ${tipY})`} className="pointer-events-none transition-all">
                  {/* Backdrop shadow & card */}
                  <rect
                    x="0"
                    y="0"
                    width={tipW}
                    height={tipH}
                    rx="6"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1"
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
                  />

                  {/* Header: Timestamp */}
                  <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    ⏱ {hTime} Forecast
                  </text>

                  {isSingle && activeFocusCurve ? (
                    (() => {
                      const pt = activeFocusCurve.points[hoveredIndex];
                      return (
                        <>
                          <text x="10" y="34" fill="#93c5fd" fontSize="11" fontWeight="bold">
                            Risk Prob: {pt.probability}%
                          </text>
                          <text x="10" y="50" fill="#cbd5e1" fontSize="10">
                            Est. Rain: {pt.rainfall} mm
                          </text>
                          <text x={tipW - 10} y="34" textAnchor="end" fill={activeFocusCurve.color} fontSize="10" fontWeight="bold">
                            {pt.probability >= 85 ? 'CRITICAL' : pt.probability >= 75 ? 'HIGH' : 'MODERATE'}
                          </text>
                        </>
                      );
                    })()
                  ) : (
                    <>
                      {displayedMultiStateCurves.map((curve, cIdx) => {
                        const pt = curve.points[hoveredIndex];
                        const rowY = 32 + cIdx * 18;
                        return (
                          <g key={curve.id}>
                            <circle cx="15" cy={rowY - 3} r="3" fill={curve.color} />
                            <text x="24" y={rowY} fill="#e2e8f0" fontSize="10" fontWeight="600">
                              {curve.shortName}:
                            </text>
                            <text x={tipW - 12} y={rowY} textAnchor="end" fill={curve.color} fontSize="10" fontWeight="bold">
                              {pt.probability}%
                            </text>
                          </g>
                        );
                      })}
                      {/* Estimated average rain */}
                      <text x="10" y={tipH - 8} fill="#94a3b8" fontSize="9">
                        Rain: ~{displayedMultiStateCurves[0]?.points[hoveredIndex]?.rainfall || 180} mm/24h
                      </text>
                    </>
                  )}
                </g>
              );
            })()
          )}
        </svg>
      </div>

      {/* Four Core Metrics Below Chart (Dynamic to Selected Location or Multi-State Overview) */}
      <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setActiveForecastMetric('current')}
          className="bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/30 text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block group-hover:text-blue-900 transition-colors">
              {t('currentProbability')}
            </span>
            <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${
              summaryMetrics.currentProbability >= 85 ? 'text-red-600' :
              summaryMetrics.currentProbability >= 75 ? 'text-orange-600' : 'text-amber-600'
            }`}>
              {summaryMetrics.currentProbability}%
            </span>
            <span className="text-[11px] font-semibold text-orange-700 bg-orange-100/60 px-1 rounded">
              {summaryMetrics.currentProbability >= 85 ? t('critical') : summaryMetrics.currentProbability >= 75 ? t('high') : t('moderate')}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-700 font-medium block mt-1">
            {isSingleLocationMode ? 'View location breakdown →' : 'Click for timeline breakdown →'}
          </span>
        </div>

        <div 
          onClick={() => setActiveForecastMetric('peak')}
          className="bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/30 text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block group-hover:text-blue-900 transition-colors">
              {t('predictedPeak')}
            </span>
            <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-red-600">{summaryMetrics.peakProbability}%</span>
            <span className="text-[11px] font-semibold text-red-700 bg-red-100/60 px-1 rounded">
              {summaryMetrics.peakProbability >= 85 ? t('critical') : t('high')}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-700 font-medium block mt-1">
            {isSingleLocationMode ? 'Peak failure analysis →' : 'Click for peak risk analysis →'}
          </span>
        </div>

        <div 
          onClick={() => setActiveForecastMetric('window')}
          className="bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/30 text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block group-hover:text-blue-900 transition-colors">
              {t('expectedRiskWindow')}
            </span>
            <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">{summaryMetrics.riskWindow}</span>
          </div>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-700 font-medium block mt-1">
            Click for hourly risk curve →
          </span>
        </div>

        <div 
          onClick={() => setActiveForecastMetric('confidence')}
          className="bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group hover:bg-blue-50/30 text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block group-hover:text-blue-900 transition-colors">
              {t('aiConfidence')}
            </span>
            <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-blue-900">{summaryMetrics.confidence}%</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-1 rounded">
              {t('highConfidence')}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-700 font-medium block mt-1">
            Click for validation stats →
          </span>
        </div>
      </div>

      {/* Expanded Forecast Timeline Breakdown Modal */}
      {activeForecastMetric && (
        <ForecastBreakdownModal
          isOpen={Boolean(activeForecastMetric)}
          initialMetric={activeForecastMetric}
          locationName={activeFocusCurve?.name}
          customSeries={activeFocusCurve?.points}
          onClose={() => setActiveForecastMetric(null)}
        />
      )}
    </div>
  );
};
