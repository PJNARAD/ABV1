import React from 'react';
import { FieldReport, UserProfile } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { Camera, MapPin, Clock, User, CheckCircle2, UserCheck, Eye, Plus, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface RecentFieldReportsSectionProps {
  reports?: FieldReport[];
  currentUser?: UserProfile;
  onOpenReportModal: () => void;
  onViewReportDetails: (report: FieldReport) => void;
  onAssignTeam: (report: FieldReport) => void;
  onResolveReport: (reportId: string) => void;
  onViewAllReports?: () => void;
}

export const RecentFieldReportsSection: React.FC<RecentFieldReportsSectionProps> = ({
  reports = [],
  currentUser,
  onOpenReportModal,
  onViewReportDetails,
  onAssignTeam,
  onResolveReport,
  onViewAllReports
}) => {
  const { t } = useTranslation();
  const safeReports = reports || [];
  const isCitizen = currentUser?.role === 'Citizen / General Public' || currentUser?.role === 'Public / Observer';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {isCitizen ? 'Community Hazard Sightings & Field Reports' : t('recentFieldReports')}
            </h2>
            <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Crowd &amp; Field Sourced
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Geo-tagged ground truth reports verified by Border Roads Organisation, State Disaster Response Forces and certified spotters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onViewAllReports && (
            <button
              onClick={onViewAllReports}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {t('allReports')} ({safeReports.length})
            </button>
          )}
          <button
            onClick={onOpenReportModal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs transition-colors ${
              isCitizen ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-900 hover:bg-blue-950'
            }`}
          >
            <Plus size={14} />
            <span>{isCitizen ? 'Submit Sighting' : t('submitFieldReport')}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.slice(0, 3).map((report) => {
          const isCritical = report.severity === 'CRITICAL';
          const isResolved = report.status === 'Resolved';

          return (
            <div
              key={report.id}
              className={`rounded-xl border ${
                isCritical ? 'border-red-200' : 'border-slate-200'
              } p-4 bg-white flex flex-col justify-between hover:shadow-xs transition-shadow`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {report.hazardType}
                    </span>
                    <RiskBadge level={report.severity} size="sm" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    isResolved 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {report.status}
                  </span>
                </div>

                {/* Simulated Geo-Tagged Thumbnail */}
                <div className="relative h-32 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-3 flex items-center justify-center text-slate-400 group">
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent z-10" />
                  {/* Visual simulated terrain texture */}
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold text-xs">
                    <div className="text-center p-2 z-20 text-white">
                      <Camera size={20} className="mx-auto mb-1 text-slate-200" />
                      <span className="text-[11px] font-bold block">{report.location}</span>
                      <span className="text-[10px] opacity-80">{report.gpsCoordinates}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-slate-900 font-semibold">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span>{report.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-slate-400" /> {report.submittedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" /> {report.timeAgo}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-100 mt-2 font-medium">
                    {report.description}
                  </p>

                  {report.assignedTeam && (
                    <div className="text-[11px] text-blue-900 font-bold bg-blue-50/80 p-1.5 rounded border border-blue-100">
                      {t('assigned')}: {report.assignedTeam}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => onViewReportDetails(report)}
                  className="px-2.5 py-1.5 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <Eye size={12} />
                  <span>{t('viewReport')}</span>
                </button>

                {!isCitizen && (
                  <button
                    onClick={() => onAssignTeam(report)}
                    className="px-2.5 py-1.5 rounded text-xs font-semibold text-blue-900 hover:bg-blue-50 border border-blue-200 transition-colors inline-flex items-center gap-1"
                  >
                    <UserCheck size={12} />
                    <span>{t('assignTeam')}</span>
                  </button>
                )}

                {!isCitizen && !isResolved && (
                  <button
                    onClick={() => onResolveReport(report.id)}
                    className="px-2.5 py-1.5 rounded text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1"
                  >
                    <CheckCircle2 size={12} />
                    <span>{t('resolve')}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
