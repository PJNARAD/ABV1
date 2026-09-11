import React from 'react';
import { Modal } from './common/Modal';
import { LiveAlert, RiskZone, FieldReport, UserProfile } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  UserCheck, 
  Navigation, 
  Layers, 
  CornerDownRight, 
  ExternalLink,
  Activity,
  ArrowUpRight,
  Route,
  PhoneCall
} from 'lucide-react';
import { SensorTelemetryItem } from './SensorDiagnosticModal';
import { getSensorTelemetryForZone } from '../utils/sensorTelemetryData';
import { useTranslation } from '../data/translations';

interface InspectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile;
  data: {
    type: 'alert' | 'zone' | 'report';
    item: LiveAlert | RiskZone | FieldReport;
  } | null;
  onAssignTeam: (item: any) => void;
  onNavigateDistrict?: (zone: RiskZone) => void;
  onOpenSensorDiagnostic?: (sensor: SensorTelemetryItem) => void;
  onInspectLocationFromAlertOrReport?: (districtOrLocation: string) => void;
}

export const InspectionDetailModal: React.FC<InspectionDetailModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  data,
  onAssignTeam,
  onNavigateDistrict,
  onOpenSensorDiagnostic,
  onInspectLocationFromAlertOrReport
}) => {
  const { t } = useTranslation();
  if (!data || !data.item) return null;

  const isCitizen = currentUser?.role === 'Citizen / General Public' || currentUser?.role === 'Public / Observer';
  const { type, item } = data;

  const isZone = type === 'zone';
  const isAlert = type === 'alert';
  const isReport = type === 'report';

  const zone = isZone ? (item as RiskZone) : null;
  const alert = isAlert ? (item as LiveAlert) : null;
  const report = isReport ? (item as FieldReport) : null;

  const title = isZone ? zone!.name : isAlert ? alert!.title : report!.hazardType;
  const severity = isZone ? zone!.riskLevel : isAlert ? alert!.severity : report!.severity;
  const location = isZone ? `${zone!.district}, ${zone!.state}` : isAlert ? `${alert!.location} (${alert!.district})` : report!.location;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCitizen ? 'Public Safety Advisory & Incident Dossier' : 'Hazard & Sector Inspection Dossier'}
      subtitle={`ID: ${item.id} • Classification: ${type.toUpperCase()}`}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Header Summary */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RiskBadge level={severity} size="sm" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {isCitizen ? 'Official Public Safety Telemetry' : 'Verified Telemetry'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 leading-snug">
                {title}
              </h3>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin size={13} className="text-slate-400" />
                <span>{location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        {isZone && zone && (
          <div className="space-y-3">
            {/* 24H Failure Probability & Risk Status */}
            <div className="p-3 bg-red-50/60 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wide block">
                  24h Landslide Failure Probability
                </span>
                <div className="text-xl font-black text-red-700">{zone.probability}%</div>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-slate-800 block">Status: {zone.trend} Trend</span>
                <span className="text-slate-500 text-[11px]">Elevation: {zone.elevation}m MSL</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div
                onClick={() => {
                  if (!isCitizen && onOpenSensorDiagnostic) {
                    onOpenSensorDiagnostic(getSensorTelemetryForZone(zone, 'rain_gauge'));
                  }
                }}
                className={`bg-slate-50 p-2 rounded-lg border border-slate-200 text-left ${
                  !isCitizen ? 'hover:bg-blue-50/50 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 block font-semibold">{t('rainfall24h')}</span>
                  {!isCitizen && <ArrowUpRight size={10} className="text-slate-400 group-hover:text-blue-900" />}
                </div>
                <span className="text-base font-black text-slate-900 block mt-0.5">{zone.rainfall24h} mm</span>
                {!isCitizen && <span className="text-[9px] text-blue-900 font-bold block mt-0.5">Diagnose →</span>}
              </div>

              <div
                onClick={() => {
                  if (!isCitizen && onOpenSensorDiagnostic) {
                    onOpenSensorDiagnostic(getSensorTelemetryForZone(zone, 'soil_moisture'));
                  }
                }}
                className={`bg-slate-50 p-2 rounded-lg border border-slate-200 text-left ${
                  !isCitizen ? 'hover:bg-blue-50/50 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 block font-semibold">{t('soilMoisture')}</span>
                  {!isCitizen && <ArrowUpRight size={10} className="text-slate-400 group-hover:text-blue-900" />}
                </div>
                <span className="text-base font-black text-red-600 block mt-0.5">{zone.soilMoisture}%</span>
                {!isCitizen && <span className="text-[9px] text-blue-900 font-bold block mt-0.5">Diagnose →</span>}
              </div>

              <div
                onClick={() => {
                  if (!isCitizen && onOpenSensorDiagnostic) {
                    onOpenSensorDiagnostic(getSensorTelemetryForZone(zone, 'inclinometer'));
                  }
                }}
                className={`bg-slate-50 p-2 rounded-lg border border-slate-200 text-left ${
                  !isCitizen ? 'hover:bg-blue-50/50 hover:border-blue-500 cursor-pointer transition-all hover:shadow-xs group' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 block font-semibold">{t('slopeStability')}</span>
                  {!isCitizen && <ArrowUpRight size={10} className="text-slate-400 group-hover:text-blue-900" />}
                </div>
                <span className="text-base font-black text-slate-900 block mt-0.5">{zone.slopeAngle}°</span>
                {!isCitizen && <span className="text-[9px] text-blue-900 font-bold block mt-0.5">Diagnose →</span>}
              </div>
            </div>

            {/* Affected Roads & Corridors */}
            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                <Route size={14} />
                <span>Critical Corridors & Affected Lifelines:</span>
              </div>
              <p className="text-slate-900 font-semibold">{zone.criticalRoadAffected || 'Strategic Highway Corridor'}</p>
              <span className="text-[11px] text-slate-500">Continuous observation for boulder clearance & diversion readiness.</span>
            </div>

            {/* Historical Incidents */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Clock size={14} className="text-slate-500" />
                  <span>Historical Landslide Incidents:</span>
                </div>
                <span className="font-black text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-xs">
                  {zone.historicalEventsCount} Recorded Events
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>Last Significant Event: <strong className="text-slate-700">{zone.lastEventDate || 'Monsoon Surge'}</strong></span>
                <span>Population Exposure: <strong className="text-slate-700">{zone.populationAtRisk?.toLocaleString()}</strong></span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 text-slate-800">
              <span className="font-bold text-blue-900 block mb-0.5">
                {isCitizen ? 'Public Safety Advisory Guidance:' : 'AI Geological Recommendation:'}
              </span>
              <p className="text-xs leading-relaxed">{zone.aiRecommendation}</p>
            </div>
          </div>
        )}

        {isAlert && alert && (
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block text-[11px] mb-1">Triggering Conditions:</span>
              <p className="text-xs text-slate-600">{alert.trigger}</p>
            </div>

            {alert.actionRequired && (
              <div className="p-3 bg-red-50/40 rounded-lg border border-red-200 text-slate-800">
                <span className="font-bold text-red-700 block text-[11px] mb-1">Civil Defense Advisory:</span>
                <p className="text-xs font-semibold text-slate-900">{alert.actionRequired}</p>
              </div>
            )}

            {onInspectLocationFromAlertOrReport && (
              <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-blue-900 uppercase">Sector Location</span>
                  <p className="text-xs font-semibold text-slate-800">{alert.location} ({alert.district})</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInspectLocationFromAlertOrReport(alert.district);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 transition-colors shadow-xs cursor-pointer"
                >
                  <MapPin size={13} />
                  <span>{t('openLocationInspector')}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {isReport && report && (
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span>Reporter: <strong className="text-slate-900">{report.submittedBy}</strong></span>
                <span>GPS: <strong className="font-mono text-slate-900">{report.gpsCoordinates}</strong></span>
              </div>
              <p className="text-xs text-slate-700">{report.description}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          {isZone && onNavigateDistrict && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateDistrict(zone!);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              <MapPin size={13} />
              <span>{t('openLocationInspector')}</span>
            </button>
          )}

          {isCitizen ? (
            <div className="flex items-center gap-2 ml-auto">
              <a
                href="tel:112"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors"
              >
                <PhoneCall size={13} />
                <span>Call 112 Helpline</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                {t('dismiss')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                {t('dismiss')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAssignTeam(item);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 shadow-xs cursor-pointer"
              >
                <UserCheck size={14} />
                <span>{t('assignTeam')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
