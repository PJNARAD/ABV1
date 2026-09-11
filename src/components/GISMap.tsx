import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RiskZone, RiskLevel } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Compass, 
  ChevronRight, 
  CloudRain, 
  Droplets, 
  History, 
  X, 
  MapPin, 
  ExternalLink,
  Route,
  Satellite,
  Info,
  Activity,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Navigation,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { SensorDiagnosticModal, SensorTelemetryItem } from './SensorDiagnosticModal';
import { getSensorTelemetryForZone } from '../utils/sensorTelemetryData';
import { useTranslation } from '../data/translations';

// Fix Leaflet's default icon URL path issues in Vite/bundled environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// North Eastern Region (NER) coordinates center
const NER_CENTER: [number, number] = [26.2006, 92.9376];
const DEFAULT_ZOOM = 7;

// Strategic Geographic Sectors across North-East India
interface SectorPreset {
  id: string;
  name: string;
  shortLabel: string;
  coordinates: [number, number];
  zoom: number;
  threatSummary: string;
}

const SECTOR_PRESETS: SectorPreset[] = [
  {
    id: 'all',
    name: 'All North-East Overview',
    shortLabel: 'All NER (Regional)',
    coordinates: NER_CENTER,
    zoom: 7,
    threatSummary: 'Full Eastern Himalayan monitoring envelope'
  },
  {
    id: 'sikkim',
    name: 'Sikkim (NH-10 Teesta Corridor)',
    shortLabel: 'Sikkim (NH-10)',
    coordinates: [27.234, 88.512],
    zoom: 10,
    threatSummary: 'Singtam–Rangpo riverbank erosion & rockfall'
  },
  {
    id: 'arunachal',
    name: 'Arunachal (West Kameng / Tawang)',
    shortLabel: 'Arunachal (NH-13)',
    coordinates: [27.012, 92.645],
    zoom: 10,
    threatSummary: 'Bhalukpong–Tenga Ridge debris flow'
  },
  {
    id: 'assam',
    name: 'Assam (Dima Hasao Hill Tract)',
    shortLabel: 'Assam (Dima Hasao)',
    coordinates: [25.123, 92.987],
    zoom: 10,
    threatSummary: 'Jatinga Valley railway cut failure'
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya (Sohra / Cherrapunji)',
    shortLabel: 'Meghalaya (Sohra)',
    coordinates: [25.289, 91.734],
    zoom: 10,
    threatSummary: 'High-precipitation escarpment slips'
  },
  {
    id: 'nagaland',
    name: 'Nagaland (Kohima Bypass NH-29)',
    shortLabel: 'Nagaland (NH-29)',
    coordinates: [25.642, 94.108],
    zoom: 10,
    threatSummary: 'Phesama slip zone & arterial subsidence'
  }
];

export interface GISMapProps {
  zones: RiskZone[];
  selectedZone: RiskZone | null;
  onSelectZone: (zone: RiskZone | null) => void;
  onViewDetailedAnalysis?: (zone: RiskZone) => void;
  onInspectZone?: (zone: RiskZone) => void;
  onOpenSensorDiagnostic?: (sensor: SensorTelemetryItem) => void;
  fullWidth?: boolean;
  isCenterpiece?: boolean;
  onToggleCenterpiece?: () => void;
}

// Strategic Road Lifelines across NER
const STRATEGIC_ROADS = [
  {
    name: 'NH-10 (Siliguri – Gangtok Lifeline)',
    positions: [
      [26.7271, 88.3953],
      [26.9114, 88.4735],
      [27.1767, 88.5284],
      [27.2340, 88.5120],
      [27.3314, 88.6138]
    ] as [number, number][],
    status: 'CRITICAL',
    color: '#dc2626',
    dashArray: '5, 5'
  },
  {
    name: 'NH-13 (Trans-Arunachal Highway)',
    positions: [
      [27.0120, 92.6450],
      [27.2640, 92.4230],
      [27.4500, 92.1500],
      [27.5860, 91.8660]
    ] as [number, number][],
    status: 'HIGH',
    color: '#ea580c',
    dashArray: '6, 6'
  },
  {
    name: 'NH-29 (Dimapur – Kohima Arterial)',
    positions: [
      [25.9042, 93.7276],
      [25.8000, 93.7500],
      [25.6751, 94.1086]
    ] as [number, number][],
    status: 'MODERATE',
    color: '#d97706',
    dashArray: '4, 4'
  },
  {
    name: 'NH-27 / NH-37 (Brahmaputra Valley Corridor)',
    positions: [
      [26.1445, 91.7362],
      [26.6528, 92.7926],
      [26.7509, 94.2037],
      [27.4728, 94.9120]
    ] as [number, number][],
    status: 'NORMAL',
    color: '#2563eb',
    dashArray: undefined
  },
  {
    name: 'NH-54 (Silchar – Kolasib – Aizawl)',
    positions: [
      [24.8333, 92.7789],
      [24.2254, 92.6784],
      [23.7271, 92.7176]
    ] as [number, number][],
    status: 'HIGH',
    color: '#ea580c',
    dashArray: '6, 6'
  }
];

// Precipitation Storm Cells (Rainfall Isohyets)
const RAINFALL_STORM_CELLS = [
  { name: 'Sohra Escarpment Heavy Storm Cell', center: [25.289, 91.734] as [number, number], radius: 36000, mm: 245 },
  { name: 'Singtam-Teesta Basin Cloudburst Alert', center: [27.234, 88.512] as [number, number], radius: 30000, mm: 210 },
  { name: 'Bhalukpong Mountain Precipitation Zone', center: [27.012, 92.645] as [number, number], radius: 28000, mm: 198 }
];

// Historical Landslide Sites
const HISTORICAL_SITES = [
  { id: 'hist-1', name: 'Noney Tupul Landslide', year: '2022', position: [24.812, 93.682] as [number, number], fatalities: 61 },
  { id: 'hist-2', name: 'Darjeeling-Mirik Slides', year: '2015', position: [26.887, 88.188] as [number, number], fatalities: 38 },
  { id: 'hist-3', name: 'Kohima Bypass Slip', year: '2018', position: [25.642, 94.108] as [number, number], fatalities: 12 }
];

// Helper Component to smoothly control map camera instance
const MapController: React.FC<{
  selectedZone: RiskZone | null;
  targetSector: SectorPreset | null;
  onMapReady: (map: L.Map) => void;
}> = ({ selectedZone, targetSector, onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  useEffect(() => {
    if (selectedZone) {
      map.flyTo(selectedZone.coordinates, Math.max(map.getZoom(), 10), {
        duration: 1.2
      });
    }
  }, [selectedZone, map]);

  useEffect(() => {
    if (targetSector) {
      map.flyTo(targetSector.coordinates, targetSector.zoom, {
        duration: 1.3
      });
    }
  }, [targetSector, map]);

  return null;
};

// Create high-definition custom Leaflet marker icon with distinctive risk-tier styling
const createRiskMarkerIcon = (zone: RiskZone, isSelected: boolean) => {
  const isCritical = zone.riskLevel === 'CRITICAL';
  const isHigh = zone.riskLevel === 'HIGH';
  const isModerate = zone.riskLevel === 'MODERATE';

  // Distinct color palettes & glyphs for crystal-clear hierarchy
  const tierConfig = {
    CRITICAL: {
      bg: '#dc2626',
      border: '#991b1b',
      pulse: '#ef4444',
      badgeBg: '#fef2f2',
      badgeText: '#991b1b',
      badgeBorder: '#fca5a5',
      glyph: '!'
    },
    HIGH: {
      bg: '#ea580c',
      border: '#c2410c',
      pulse: '#f97316',
      badgeBg: '#fff7ed',
      badgeText: '#9a3412',
      badgeBorder: '#fdba74',
      glyph: '▲'
    },
    MODERATE: {
      bg: '#d97706',
      border: '#b45309',
      pulse: '#f59e0b',
      badgeBg: '#fffbeb',
      badgeText: '#92400e',
      badgeBorder: '#fde68a',
      glyph: '●'
    },
    LOW: {
      bg: '#16a34a',
      border: '#15803d',
      pulse: '#22c55e',
      badgeBg: '#f0fdf4',
      badgeText: '#166534',
      badgeBorder: '#bbf7d0',
      glyph: '✓'
    }
  };

  const cfg = tierConfig[zone.riskLevel] || tierConfig.MODERATE;
  const shortName = zone.name.split(' ')[0];

  return L.divIcon({
    className: 'leaflet-risk-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; transform: translate(-17px, -17px); cursor: pointer; transition: transform 0.15s ease;" title="${zone.name} (${zone.riskLevel} - ${zone.probability}%)">
        ${isCritical ? `
          <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: ${cfg.pulse}; opacity: 0.4; animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; pointer-events: none;"></div>
        ` : isHigh ? `
          <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; border: 2px solid ${cfg.pulse}; opacity: 0.6; animation: radar-ping 2.6s ease-out infinite; pointer-events: none;"></div>
        ` : ''}

        ${isSelected ? `
          <div style="position: absolute; width: 46px; height: 46px; border-radius: 50%; border: 3px dashed #1e40af; animation: spin 7s linear infinite; pointer-events: none;"></div>
          <div style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background-color: rgba(30, 64, 175, 0.18); pointer-events: none;"></div>
        ` : ''}

        <!-- Outer Pin Head -->
        <div style="width: 26px; height: 26px; border-radius: 50%; background-color: ${cfg.bg}; border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: #ffffff;">
          ${cfg.glyph}
        </div>

        <!-- Attached Zone Chip Pill -->
        <div style="position: absolute; left: 30px; top: 50%; transform: translateY(-50%); background-color: ${cfg.badgeBg}; border: 1.5px solid ${isSelected ? '#1e40af' : cfg.badgeBorder}; padding: 2px 7px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); font-size: 11px; font-weight: 800; color: ${cfg.badgeText}; white-space: nowrap; pointer-events: none; display: flex; align-items: center; gap: 4px;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${cfg.bg};"></span>
          <span>${shortName}</span>
          <span style="font-family: monospace; font-weight: 900; background-color: rgba(255,255,255,0.8); padding: 0 3px; border-radius: 3px;">${zone.probability}%</span>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

const createHistoricalMarkerIcon = () => {
  return L.divIcon({
    className: 'leaflet-risk-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; transform: translate(-12px, -12px); cursor: pointer;" title="Historical Landslide Site">
        <div style="width: 20px; height: 20px; border-radius: 4px; background-color: #334155; border: 2px solid #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 10px; font-weight: 900;">
          H
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export const GISMap: React.FC<GISMapProps> = ({
  zones,
  selectedZone,
  onSelectZone,
  onViewDetailedAnalysis,
  onInspectZone,
  onOpenSensorDiagnostic,
  fullWidth = false,
  isCenterpiece = false,
  onToggleCenterpiece
}) => {
  const { t } = useTranslation();
  const mapRef = useRef<L.Map | null>(null);
  const [internalDiagnosticSensor, setInternalDiagnosticSensor] = useState<SensorTelemetryItem | null>(null);
  
  // Interactive Filters & Navigation
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('all');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [baseMapType, setBaseMapType] = useState<'osm' | 'satellite' | 'terrain'>('osm');

  // Sector Target for smooth FlyTo
  const [targetSector, setTargetSector] = useState<SectorPreset | null>(null);

  // Compute Active Zone counts across 4 distinct risk tiers
  const tierCounts = useMemo(() => {
    const counts = {
      CRITICAL: 0,
      HIGH: 0,
      MODERATE: 0,
      LOW: 0,
      TOTAL: zones.length
    };
    zones.forEach((z) => {
      if (z.riskLevel in counts) {
        counts[z.riskLevel as keyof typeof counts]++;
      }
    });
    return counts;
  }, [zones]);

  // Handle Inspect Trigger
  const handleInspect = (zone: RiskZone) => {
    if (onInspectZone) {
      onInspectZone(zone);
    } else if (onViewDetailedAnalysis) {
      onViewDetailedAnalysis(zone);
    }
  };

  const handleOpenDiagnostic = (zone: RiskZone, type: 'inclinometer' | 'soil_moisture' | 'rain_gauge') => {
    const sensor = getSensorTelemetryForZone(zone, type);
    if (onOpenSensorDiagnostic) {
      onOpenSensorDiagnostic(sensor);
    } else {
      setInternalDiagnosticSensor(sensor);
    }
  };

  // Active Map Overlay Layers
  const [layers, setLayers] = useState({
    roads: true,
    rainfall: true,
    soilMoisture: true,
    historicalLandslides: true
  });

  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleResetZoom = () => {
    setSelectedSectorId('all');
    setTargetSector(SECTOR_PRESETS[0]);
    onSelectZone(null);
  };

  const handleSectorJump = (sector: SectorPreset) => {
    setSelectedSectorId(sector.id);
    setTargetSector(sector);
    // If resetting to all, also clear specific selection
    if (sector.id === 'all') {
      onSelectZone(null);
    }
  };

  // Filtered zones based on Risk Severity Filter and Search Query
  const filteredZones = useMemo(() => {
    return zones.filter(zone => {
      // Risk level match
      const matchesFilter = activeFilter === 'ALL' || zone.riskLevel === activeFilter;
      if (!matchesFilter) return false;

      // Search query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        zone.name.toLowerCase().includes(q) ||
        zone.district.toLowerCase().includes(q) ||
        zone.state.toLowerCase().includes(q) ||
        (zone.criticalRoadAffected && zone.criticalRoadAffected.toLowerCase().includes(q))
      );
    });
  }, [zones, activeFilter, searchQuery]);

  // Tile layer configuration based on user selection
  const tileLayerConfig = {
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
    }
  }[baseMapType];

  // Dynamic map height depending on fullWidth or centerpiece mode
  const mapHeightClass = isCenterpiece || fullWidth 
    ? 'h-[640px] sm:h-[700px] lg:h-[760px]' 
    : 'h-[580px] sm:h-[630px] lg:h-[660px]';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative transition-all">
      {/* 1. VISUAL CENTERPIECE TOP COMMAND HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-white z-10 space-y-4">
        {/* Main Title, Live Engine Badge & Layout Controls */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
                <Navigation size={17} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {t('liveLandslideRiskMap')}
                  </h2>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="tracking-wide">INSAT-3DR &amp; InSAR Live Sync</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Multi-sensor telemetry &amp; hydro-geological slope stability surveillance across 8 NER states
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Search on Map */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search corridor or district..."
                className="w-44 sm:w-56 pl-8 pr-7 py-1.5 rounded-lg text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Optional Centerpiece Expansion Toggle */}
            {onToggleCenterpiece && (
              <button
                type="button"
                onClick={onToggleCenterpiece}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
                title={isCenterpiece ? 'Switch to Split Dashboard View' : 'Expand GIS Map to Full Centerpiece'}
              >
                {isCenterpiece ? (
                  <>
                    <Minimize2 size={14} className="text-slate-500" />
                    <span className="hidden sm:inline">Split View</span>
                  </>
                ) : (
                  <>
                    <Maximize2 size={14} className="text-slate-500" />
                    <span className="hidden sm:inline">Centerpiece Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 2. CRYSTAL-CLEAR 4-TIER RISK SEVERITY HIERARCHY BAR */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Risk Hierarchy:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-1 max-w-3xl">
            {/* TIER 1: ALL ZONES */}
            <button
              type="button"
              onClick={() => setActiveFilter('ALL')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeFilter === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{t('filterAll')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                activeFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tierCounts.TOTAL}
              </span>
            </button>

            {/* TIER 2: CRITICAL (Red) */}
            <button
              type="button"
              onClick={() => setActiveFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                activeFilter === 'CRITICAL'
                  ? 'bg-red-600 text-white border-red-700 ring-2 ring-red-500/20 shadow-xs'
                  : 'bg-red-50/70 text-red-800 border-red-200 hover:bg-red-100/70'
              }`}
              title="Failure Probability ≥ 85% • Factor of Safety < 1.0 (Failure Imminent)"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 ring-2 ring-red-300 animate-pulse" />
              <span>{t('filterCritical')}</span>
              <span className="text-[10px] font-medium opacity-90 hidden sm:inline">(≥85%)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeFilter === 'CRITICAL' ? 'bg-red-800 text-white' : 'bg-red-200/80 text-red-900'
              }`}>
                {tierCounts.CRITICAL}
              </span>
            </button>

            {/* TIER 3: HIGH (Orange) */}
            <button
              type="button"
              onClick={() => setActiveFilter('HIGH')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                activeFilter === 'HIGH'
                  ? 'bg-orange-600 text-white border-orange-700 ring-2 ring-orange-500/20 shadow-xs'
                  : 'bg-orange-50/70 text-orange-800 border-orange-200 hover:bg-orange-100/70'
              }`}
              title="Failure Probability 75%–84% • Factor of Safety 1.0–1.2 (Unstable Under Rainfall)"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{t('filterHigh')}</span>
              <span className="text-[10px] font-medium opacity-90 hidden sm:inline">(75–84%)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeFilter === 'HIGH' ? 'bg-orange-800 text-white' : 'bg-orange-200/80 text-orange-900'
              }`}>
                {tierCounts.HIGH}
              </span>
            </button>

            {/* TIER 4: MODERATE (Amber) */}
            <button
              type="button"
              onClick={() => setActiveFilter('MODERATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                activeFilter === 'MODERATE'
                  ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-500/20 shadow-xs'
                  : 'bg-amber-50/70 text-amber-900 border-amber-200 hover:bg-amber-100/70'
              }`}
              title="Failure Probability 50%–74% • Factor of Safety 1.2–1.5 (Active Telemetry Monitoring)"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t('filterModerate')}</span>
              <span className="text-[10px] font-medium opacity-90 hidden sm:inline">(50–74%)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeFilter === 'MODERATE' ? 'bg-amber-800 text-white' : 'bg-amber-200/80 text-amber-900'
              }`}>
                {tierCounts.MODERATE}
              </span>
            </button>

            {/* TIER 5: LOW (Emerald) */}
            <button
              type="button"
              onClick={() => setActiveFilter('LOW')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                activeFilter === 'LOW'
                  ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100/70'
              }`}
              title="Failure Probability < 50% • Factor of Safety > 1.5 (Stable Terrain)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t('filterLow')}</span>
              <span className="text-[10px] font-medium opacity-90 hidden sm:inline">(&lt;50%)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeFilter === 'LOW' ? 'bg-emerald-800 text-white' : 'bg-emerald-200/80 text-emerald-900'
              }`}>
                {tierCounts.LOW}
              </span>
            </button>
          </div>

          {/* Quick Active Filter Indicator pill */}
          {(activeFilter !== 'ALL' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition-colors"
            >
              <RotateCcw size={11} className="text-slate-500" />
              <span>Clear Filter ({filteredZones.length} shown)</span>
            </button>
          )}
        </div>

        {/* 3. TACTILE SECTOR QUICK-JUMP GLIDER */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 pt-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Compass size={13} className="text-slate-500" />
            <span>Sectors:</span>
          </span>

          {SECTOR_PRESETS.map((sec) => {
            const isSelected = selectedSectorId === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSectorJump(sec)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={sec.threatSummary}
              >
                <span>{sec.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN INTERACTIVE MAP VIEWPORT */}
      <div className={`relative bg-slate-100 overflow-hidden select-none ${mapHeightClass}`}>
        <MapContainer
          center={NER_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          zoomControl={false}
          className="w-full h-full z-0"
        >
          {/* Tile Layer */}
          <TileLayer
            key={baseMapType}
            url={tileLayerConfig.url}
            attribution={tileLayerConfig.attribution}
            maxZoom={18}
          />

          {/* Map Controller Hook for smooth pan/zoom/reset */}
          <MapController
            selectedZone={selectedZone}
            targetSector={targetSector}
            onMapReady={(map) => {
              mapRef.current = map;
            }}
          />

          {/* Layer: Strategic Road Lifelines */}
          {layers.roads && STRATEGIC_ROADS.map((road) => (
            <Polyline
              key={road.name}
              positions={road.positions}
              pathOptions={{
                color: road.color,
                weight: 4.5,
                opacity: 0.88,
                dashArray: road.dashArray
              }}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                    <Route size={14} className="text-blue-900" />
                    <span>{road.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1">
                    <span>Operational Status:</span>
                    <strong className={road.status === 'CRITICAL' ? 'text-red-600 font-black' : 'text-orange-600 font-black'}>
                      {road.status}
                    </strong>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Critical lifeline arterial under geohazard surveillance.
                  </p>
                </div>
              </Popup>
            </Polyline>
          ))}

          {/* Layer: Rainfall Storm Cells (Precipitation Isohyets) */}
          {layers.rainfall && RAINFALL_STORM_CELLS.map((cell) => (
            <Circle
              key={cell.name}
              center={cell.center}
              radius={cell.radius}
              pathOptions={{
                color: '#2563eb',
                fillColor: '#3b82f6',
                fillOpacity: 0.18,
                weight: 1.75,
                dashArray: '3, 6'
              }}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <div className="font-bold text-blue-900 flex items-center gap-1 mb-1">
                    <CloudRain size={14} />
                    <span>{cell.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    24h Rainfall: <strong className="text-slate-900 font-bold font-mono">{cell.mm} mm</strong>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded mt-1 inline-block border border-red-200">
                    Precipitation Threshold Exceeded
                  </span>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Layer: Soil Moisture Saturation Zones */}
          {layers.soilMoisture && (
            <>
              <Circle
                center={[27.234, 88.512]}
                radius={24000}
                pathOptions={{
                  color: '#0d9488',
                  fillColor: '#14b8a6',
                  fillOpacity: 0.16,
                  weight: 1.5
                }}
              />
              <Circle
                center={[25.289, 91.734]}
                radius={26000}
                pathOptions={{
                  color: '#0d9488',
                  fillColor: '#14b8a6',
                  fillOpacity: 0.16,
                  weight: 1.5
                }}
              />
            </>
          )}

          {/* Layer: Historical Landslide Sites */}
          {layers.historicalLandslides && HISTORICAL_SITES.map((site) => (
            <Marker
              key={site.id}
              position={site.position}
              icon={createHistoricalMarkerIcon()}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <div className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <History size={13} className="text-slate-500" />
                    <span>{site.name} ({site.year})</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Recorded Fatalities: <strong className="text-slate-900 font-bold">{site.fatalities}</strong>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    GSI Geological Inventory record.
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Core Risk Hotspot Location Pins with High-Impact Hierarchy */}
          {filteredZones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            return (
              <Marker
                key={zone.id}
                position={zone.coordinates}
                icon={createRiskMarkerIcon(zone, isSelected)}
                eventHandlers={{
                  click: () => {
                    onSelectZone(zone);
                  }
                }}
              >
                <Popup>
                  <div className="p-2 text-xs min-w-[230px]">
                    {/* Header: Risk Badge + Failure Prob */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <RiskBadge level={zone.riskLevel} size="sm" />
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] text-slate-500 font-semibold">Prob:</span>
                        <span className={`font-mono font-black text-sm ${
                          zone.probability >= 85 ? 'text-red-600' :
                          zone.probability >= 75 ? 'text-orange-600' : 'text-amber-600'
                        }`}>
                          {zone.probability}%
                        </span>
                      </div>
                    </div>

                    <div className="font-bold text-slate-900 text-sm mb-0.5 leading-tight">{zone.name}</div>
                    <div className="text-[11px] text-slate-500 mb-2 font-medium">{zone.district}, {zone.state}</div>

                    {/* Factor of Safety Indication */}
                    <div className="mb-2 px-2 py-1 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-medium">Factor of Safety (FS):</span>
                      <strong className={`font-mono font-bold ${
                        zone.riskLevel === 'CRITICAL' ? 'text-red-700' :
                        zone.riskLevel === 'HIGH' ? 'text-orange-700' : 'text-amber-700'
                      }`}>
                        {zone.riskLevel === 'CRITICAL' ? '0.88 (< 1.0)' :
                         zone.riskLevel === 'HIGH' ? '1.12 (1.0–1.2)' : '1.34 (1.2–1.5)'}
                      </strong>
                    </div>
                    
                    {/* 3 Micro Telemetry Meters */}
                    <div className="grid grid-cols-3 gap-1 text-[10px] bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center mb-2.5">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('rainfallParam')}</span>
                        <strong className="text-slate-900 font-mono text-xs">{zone.rainfall24h}mm</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('moistureParam')}</span>
                        <strong className="text-slate-900 font-mono text-xs">{zone.soilMoisture}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('slopeParam')}</span>
                        <strong className="text-slate-900 font-mono text-xs">{zone.slopeAngle}°</strong>
                      </div>
                    </div>

                    {/* Quick Command Actions */}
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleInspect(zone);
                        }}
                        className="w-full py-1.5 px-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-[11px] text-center cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MapPin size={12} />
                        <span>{t('openLocationInspector')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenDiagnostic(zone, 'inclinometer');
                        }}
                        className="w-full py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] text-center cursor-pointer transition-colors flex items-center justify-center gap-1"
                      >
                        <Activity size={11} />
                        <span>View Real-Time Sensors</span>
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* 5. FLOATING MAP CONTROLS & HUD (Top-Right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 shadow-md p-1">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
            title={t('zoomIn')}
            aria-label="Zoom in"
          >
            <ZoomIn size={17} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
            title={t('zoomOut')}
            aria-label="Zoom out"
          >
            <ZoomOut size={17} />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
            title={t('resetMap')}
            aria-label="Reset zoom"
          >
            <RotateCcw size={17} />
          </button>

          <div className="h-px bg-slate-200 my-0.5" />

          {/* Layer Toggle Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className={`p-2 rounded-lg transition-colors ${
                showLayerMenu ? 'bg-blue-900 text-white' : 'hover:bg-slate-100 text-slate-700'
              }`}
              title={t('mapLayers')}
              aria-label="Toggle map layers menu"
            >
              <Layers size={17} />
            </button>

            {/* Layer Flyout Menu */}
            {showLayerMenu && (
              <div className="absolute right-full top-0 mr-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl p-4 z-30 text-xs">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
                  <span>{t('gisLayerControls')}</span>
                  <Layers size={14} className="text-blue-900" />
                </div>

                {/* Base Tile Layer Selection */}
                <div className="mb-3.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {t('baseMapTiles')}
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setBaseMapType('osm')}
                      className={`py-1 px-1.5 text-[10px] font-bold rounded-md transition-colors ${
                        baseMapType === 'osm' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t('street')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBaseMapType('satellite')}
                      className={`py-1 px-1.5 text-[10px] font-bold rounded-md transition-colors ${
                        baseMapType === 'satellite' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t('satellite')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBaseMapType('terrain')}
                      className={`py-1 px-1.5 text-[10px] font-bold rounded-md transition-colors ${
                        baseMapType === 'terrain' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t('terrain')}
                    </button>
                  </div>
                </div>

                {/* Telemetry Overlays */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('telemetryOverlays')}
                  </span>

                  <label className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer transition-colors">
                    <span className="flex items-center gap-2 font-medium text-[11px]">
                      <Route size={13} className="text-amber-600" /> {t('roadsAndLifelines')}
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.roads}
                      onChange={() => toggleLayer('roads')}
                      className="rounded text-blue-900 focus:ring-blue-800 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer transition-colors">
                    <span className="flex items-center gap-2 font-medium text-[11px]">
                      <CloudRain size={13} className="text-blue-600" /> {t('rainfallIsohyets')}
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.rainfall}
                      onChange={() => toggleLayer('rainfall')}
                      className="rounded text-blue-900 focus:ring-blue-800 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer transition-colors">
                    <span className="flex items-center gap-2 font-medium text-[11px]">
                      <Droplets size={13} className="text-teal-600" /> {t('soilMoistureZones')}
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.soilMoisture}
                      onChange={() => toggleLayer('soilMoisture')}
                      className="rounded text-blue-900 focus:ring-blue-800 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer transition-colors">
                    <span className="flex items-center gap-2 font-medium text-[11px]">
                      <History size={13} className="text-slate-600" /> {t('historicalLandslides')}
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.historicalLandslides}
                      onChange={() => toggleLayer('historicalLandslides')}
                      className="rounded text-blue-900 focus:ring-blue-800 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6. FLOATING RISK HIERARCHY LEGEND (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 shadow-md p-3.5 text-xs pointer-events-auto max-w-[320px]">
          <div className="font-bold text-slate-900 mb-2.5 flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Risk Hierarchy Legend</span>
            <Compass size={14} className="text-slate-400" />
          </div>

          <div className="space-y-1.5 text-[11px] font-semibold">
            <div className="flex items-center justify-between gap-2 p-1 rounded bg-red-50/50 border border-red-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                <span className="text-red-800 font-bold">CRITICAL (≥85%)</span>
              </div>
              <span className="text-[10px] text-red-700 font-mono font-medium">FS &lt; 1.0 (Unstable)</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-1 rounded bg-orange-50/50 border border-orange-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                <span className="text-orange-800 font-bold">HIGH (75–84%)</span>
              </div>
              <span className="text-[10px] text-orange-700 font-mono font-medium">FS 1.0–1.2</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-1 rounded bg-amber-50/50 border border-amber-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-amber-800 font-bold">MODERATE (50–74%)</span>
              </div>
              <span className="text-[10px] text-amber-700 font-mono font-medium">FS 1.2–1.5</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-1 rounded bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-emerald-800 font-bold">LOW (&lt;50%)</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-mono font-medium">FS &gt; 1.5 (Stable)</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span className="font-mono">NER: 26.20°N, 92.94°E</span>
            <span>GSI / ISRO Geogrid</span>
          </div>
        </div>

        {/* 7. SELECTED ZONE COMMAND DOSSIER (Slide-in on Map Top-Left) */}
        {selectedZone && (
          <div className="absolute top-4 left-4 z-20 w-88 max-w-[calc(100%-2rem)] bg-white rounded-xl border border-slate-200 shadow-2xl p-4 animate-in slide-in-from-left-4 duration-200">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Hotspot Dossier
                </span>
                <button
                  type="button"
                  onClick={() => handleInspect(selectedZone)}
                  className="text-sm font-bold text-slate-900 hover:text-blue-900 leading-tight text-left transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span>{selectedZone.name}</span>
                  <ExternalLink size={12} className="text-slate-400 group-hover:text-blue-900 transition-colors" />
                </button>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedZone.district}, {selectedZone.state}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectZone(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close inspector"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-2.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">{t('riskStatus')}</span>
                <RiskBadge level={selectedZone.riskLevel} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">{t('riskProbability24h')}:</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-sm font-mono font-black ${
                    selectedZone.probability >= 85 ? 'text-red-600' :
                    selectedZone.probability >= 75 ? 'text-orange-600' : 'text-amber-600'
                  }`}>
                    {selectedZone.probability}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    (Peak 24h)
                  </span>
                </div>
              </div>

              {/* Factor of Safety meter */}
              <div className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Factor of Safety (FS):</span>
                <span className={`font-mono font-bold text-xs ${
                  selectedZone.riskLevel === 'CRITICAL' ? 'text-red-700' :
                  selectedZone.riskLevel === 'HIGH' ? 'text-orange-700' : 'text-amber-700'
                }`}>
                  {selectedZone.riskLevel === 'CRITICAL' ? '0.88 (Failure Imminent)' :
                   selectedZone.riskLevel === 'HIGH' ? '1.12 (Marginally Stable)' : '1.34 (Monitored)'}
                </span>
              </div>

              {/* 3 Clickable Telemetry Diagnostics */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 pb-1">
                <button
                  type="button"
                  onClick={() => handleOpenDiagnostic(selectedZone, 'rain_gauge')}
                  className="bg-slate-50 hover:bg-blue-50/70 p-2 rounded-lg border border-slate-200 hover:border-blue-400 text-center transition-all cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-500 group-hover:text-blue-900 block font-semibold">{t('rainfallParam')}</span>
                  <span className="text-xs font-bold text-slate-900 font-mono block">{selectedZone.rainfall24h} mm</span>
                  <span className="text-[9px] text-blue-900 font-bold block mt-0.5">{t('clickToDiagnose')} ↗</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDiagnostic(selectedZone, 'soil_moisture')}
                  className="bg-slate-50 hover:bg-blue-50/70 p-2 rounded-lg border border-slate-200 hover:border-blue-400 text-center transition-all cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-500 group-hover:text-blue-900 block font-semibold">{t('moistureParam')}</span>
                  <span className="text-xs font-bold text-slate-900 font-mono block">{selectedZone.soilMoisture}%</span>
                  <span className="text-[9px] text-blue-900 font-bold block mt-0.5">{t('clickToDiagnose')} ↗</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDiagnostic(selectedZone, 'inclinometer')}
                  className="bg-slate-50 hover:bg-blue-50/70 p-2 rounded-lg border border-slate-200 hover:border-blue-400 text-center transition-all cursor-pointer group"
                >
                  <span className="text-[10px] text-slate-500 group-hover:text-blue-900 block font-semibold">{t('slopeParam')}</span>
                  <span className="text-xs font-bold text-slate-900 font-mono block">{selectedZone.slopeAngle}°</span>
                  <span className="text-[9px] text-blue-900 font-bold block mt-0.5">{t('clickToDiagnose')} ↗</span>
                </button>
              </div>

              {/* Critical Arterial Road Impact */}
              {selectedZone.criticalRoadAffected && (
                <div className="flex items-center justify-between text-xs text-slate-600 bg-amber-50/60 px-2.5 py-1.5 rounded-lg border border-amber-200">
                  <span className="font-medium flex items-center gap-1 text-amber-900">
                    <Route size={12} className="text-amber-700" />
                    <span>Arterial:</span>
                  </span>
                  <span className="font-bold text-amber-950 truncate max-w-[180px]">
                    {selectedZone.criticalRoadAffected}
                  </span>
                </div>
              )}

              {/* AI Recommendation Context */}
              <div className="mt-1 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200 text-[11px] text-slate-700 leading-snug">
                <span className="font-bold text-blue-950 block mb-0.5 flex items-center gap-1">
                  <Sparkles size={11} className="text-blue-700" />
                  {t('whyHighRisk')}:
                </span>
                {selectedZone.aiRecommendation}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleInspect(selectedZone)}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold py-2.5 px-3 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <MapPin size={13} />
                <span>{t('openLocationInspector')}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Internal Modal fallback if not handled by parent */}
      {internalDiagnosticSensor && (
        <SensorDiagnosticModal
          sensor={internalDiagnosticSensor}
          onClose={() => setInternalDiagnosticSensor(null)}
        />
      )}
    </div>
  );
};
