import { RiskZone } from '../types';

export interface HourlyPredictionPoint {
  time: string;
  probability: number;
  rainfall: number;
}

export interface StatePredictionCurve {
  id: string;
  name: string;
  shortName: string;
  color: string;
  hoverColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  currentProbability: number;
  peakProbability: number;
  riskWindow: string;
  confidence: number;
  rainfall24h: number;
  points: HourlyPredictionPoint[];
}

export const TIMESTAMPS = [
  '00:00', '03:00', '06:00', '09:00', '12:00', '15:00',
  '18:00', '21:00', '24:00', '+03:00', '+06:00', '+09:00'
];

export const MULTI_STATE_PREDICTION_CURVES: StatePredictionCurve[] = [
  {
    id: 'sikkim',
    name: 'Sikkim',
    shortName: 'Sikkim',
    color: '#ef4444', // Red
    hoverColor: '#dc2626',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-700',
    badgeBorder: 'border-red-300',
    riskLevel: 'CRITICAL',
    currentProbability: 78,
    peakProbability: 91,
    riskWindow: '18:00–23:00',
    confidence: 89,
    rainfall24h: 228,
    points: [
      { time: '00:00', probability: 48, rainfall: 42 },
      { time: '03:00', probability: 54, rainfall: 58 },
      { time: '06:00', probability: 62, rainfall: 86 },
      { time: '09:00', probability: 71, rainfall: 124 },
      { time: '12:00', probability: 78, rainfall: 186 },
      { time: '15:00', probability: 83, rainfall: 202 },
      { time: '18:00', probability: 89, rainfall: 228 },
      { time: '21:00', probability: 91, rainfall: 240 },
      { time: '24:00', probability: 84, rainfall: 175 },
      { time: '+03:00', probability: 74, rainfall: 110 },
      { time: '+06:00', probability: 65, rainfall: 75 },
      { time: '+09:00', probability: 52, rainfall: 45 }
    ]
  },
  {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    shortName: 'Arunachal',
    color: '#f97316', // Orange
    hoverColor: '#ea580c',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    badgeBorder: 'border-orange-300',
    riskLevel: 'HIGH',
    currentProbability: 73,
    peakProbability: 86,
    riskWindow: '15:00–21:00',
    confidence: 91,
    rainfall24h: 205,
    points: [
      { time: '00:00', probability: 42, rainfall: 38 },
      { time: '03:00', probability: 48, rainfall: 52 },
      { time: '06:00', probability: 56, rainfall: 78 },
      { time: '09:00', probability: 65, rainfall: 110 },
      { time: '12:00', probability: 73, rainfall: 168 },
      { time: '15:00', probability: 81, rainfall: 195 },
      { time: '18:00', probability: 86, rainfall: 215 },
      { time: '21:00', probability: 84, rainfall: 200 },
      { time: '24:00', probability: 78, rainfall: 155 },
      { time: '+03:00', probability: 69, rainfall: 98 },
      { time: '+06:00', probability: 58, rainfall: 62 },
      { time: '+09:00', probability: 46, rainfall: 38 }
    ]
  },
  {
    id: 'assam',
    name: 'Assam (Hill Sectors)',
    shortName: 'Assam',
    color: '#f59e0b', // Amber
    hoverColor: '#d97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-300',
    riskLevel: 'HIGH',
    currentProbability: 69,
    peakProbability: 81,
    riskWindow: '16:00–22:00',
    confidence: 88,
    rainfall24h: 184,
    points: [
      { time: '00:00', probability: 38, rainfall: 30 },
      { time: '03:00', probability: 44, rainfall: 45 },
      { time: '06:00', probability: 51, rainfall: 68 },
      { time: '09:00', probability: 60, rainfall: 95 },
      { time: '12:00', probability: 69, rainfall: 145 },
      { time: '15:00', probability: 76, rainfall: 172 },
      { time: '18:00', probability: 81, rainfall: 190 },
      { time: '21:00', probability: 80, rainfall: 182 },
      { time: '24:00', probability: 75, rainfall: 140 },
      { time: '+03:00', probability: 64, rainfall: 85 },
      { time: '+06:00', probability: 52, rainfall: 55 },
      { time: '+09:00', probability: 41, rainfall: 32 }
    ]
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    shortName: 'Meghalaya',
    color: '#2563eb', // Blue
    hoverColor: '#1d4ed8',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-300',
    riskLevel: 'HIGH',
    currentProbability: 75,
    peakProbability: 79,
    riskWindow: '12:00–18:00',
    confidence: 92,
    rainfall24h: 245,
    points: [
      { time: '00:00', probability: 44, rainfall: 50 },
      { time: '03:00', probability: 50, rainfall: 72 },
      { time: '06:00', probability: 59, rainfall: 105 },
      { time: '09:00', probability: 68, rainfall: 155 },
      { time: '12:00', probability: 75, rainfall: 210 },
      { time: '15:00', probability: 79, rainfall: 235 },
      { time: '18:00', probability: 78, rainfall: 220 },
      { time: '21:00', probability: 74, rainfall: 178 },
      { time: '24:00', probability: 67, rainfall: 125 },
      { time: '+03:00', probability: 59, rainfall: 80 },
      { time: '+06:00', probability: 49, rainfall: 50 },
      { time: '+09:00', probability: 39, rainfall: 30 }
    ]
  }
];

/**
 * Generate a dynamic prediction curve for a specific RiskZone location
 */
export function generateZonePredictionCurve(zone: RiskZone): StatePredictionCurve {
  const baseProb = zone.probability;
  const multiplier = baseProb / 78; // Relative to standard baseline

  const curveRatios = [0.60, 0.68, 0.78, 0.89, 1.00, 1.06, 1.14, 1.16, 1.07, 0.94, 0.82, 0.66];
  const rainfallRatios = [0.22, 0.31, 0.46, 0.66, 1.00, 1.08, 1.22, 1.29, 0.94, 0.59, 0.40, 0.24];

  const points: HourlyPredictionPoint[] = TIMESTAMPS.map((t, i) => {
    const rawProb = Math.round(baseProb * curveRatios[i]);
    const clampedProb = Math.max(15, Math.min(98, rawProb));
    const rain = Math.round(zone.rainfall24h * rainfallRatios[i]);
    return {
      time: t,
      probability: clampedProb,
      rainfall: rain
    };
  });

  const peakProb = Math.max(...points.map((p) => p.probability));
  const currentProb = points[4].probability; // At 12:00 (midday current)

  let color = '#ef4444';
  let hoverColor = '#dc2626';
  let badgeBg = 'bg-red-50';
  let badgeText = 'text-red-700';
  let badgeBorder = 'border-red-300';

  if (zone.riskLevel === 'HIGH') {
    color = '#f97316';
    hoverColor = '#ea580c';
    badgeBg = 'bg-orange-50';
    badgeText = 'text-orange-700';
    badgeBorder = 'border-orange-300';
  } else if (zone.riskLevel === 'MODERATE') {
    color = '#f59e0b';
    hoverColor = '#d97706';
    badgeBg = 'bg-amber-50';
    badgeText = 'text-amber-700';
    badgeBorder = 'border-amber-300';
  } else if (zone.riskLevel === 'LOW') {
    color = '#10b981';
    hoverColor = '#059669';
    badgeBg = 'bg-emerald-50';
    badgeText = 'text-emerald-700';
    badgeBorder = 'border-emerald-300';
  }

  return {
    id: zone.id,
    name: `${zone.name} (${zone.district}, ${zone.state})`,
    shortName: zone.name,
    color,
    hoverColor,
    badgeBg,
    badgeText,
    badgeBorder,
    riskLevel: zone.riskLevel,
    currentProbability: currentProb,
    peakProbability: peakProb,
    riskWindow: peakProb >= 85 ? '18:00–23:00' : peakProb >= 75 ? '15:00–21:00' : '12:00–18:00',
    confidence: Math.round(86 + (zone.historicalEventsCount % 8)),
    rainfall24h: zone.rainfall24h,
    points
  };
}
