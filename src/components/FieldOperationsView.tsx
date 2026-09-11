import React, { useState } from 'react';
import { FieldReport, RiskLevel, UserProfile } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { 
  FileText, 
  Plus, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle2, 
  UserCheck, 
  Search, 
  Camera, 
  Filter,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';
import { useTranslation } from '../data/translations';

interface FieldOperationsViewProps {
  reports: FieldReport[];
  currentUser?: UserProfile;
  onOpenReportModal: () => void;
  onViewReportDetails: (report: FieldReport) => void;
  onAssignTeam: (report: FieldReport) => void;
  onResolveReport: (reportId: string) => void;
  onBackToDashboard: () => void;
  onInspectLocation?: (districtOrLocation: string, report?: FieldReport) => void;
}

export const FieldOperationsView: React.FC<FieldOperationsViewProps> = ({
  reports,
  currentUser,
  onOpenReportModal,
  onViewReportDetails,
  onAssignTeam,
  onResolveReport,
  onBackToDashboard,
  onInspectLocation
}) => {
  const { t } = useTranslation();
  const isCitizen = currentUser?.role === 'Citizen / General Public' || currentUser?.role === 'Public / Observer';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hazardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
                <FileText size={18} />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {t('recentFieldReports')}
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Field observations submitted by SDRF personnel, BRO road patrols, geologists and local community observers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToDashboard}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              ← {t('navDashboard')}
            </button>
            <button
              onClick={onOpenReportModal}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs ${
                isCitizen ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-900 hover:bg-blue-950'
              }`}
            >
              <Plus size={14} />
              <span>{isCitizen ? 'Submit Community Hazard Report' : t('submitFieldReport')}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by hazard type, location, or officer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold text-[11px]">Filter:</span>
            {(['ALL', 'Under Investigation', 'Action Required', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => {
          const isCritical = report.severity === 'CRITICAL';
          const isResolved = report.status === 'Resolved';

          return (
            <div
              key={report.id}
              className={`bg-white rounded-xl border ${
                isCritical ? 'border-red-200' : 'border-slate-200'
              } p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {report.hazardType}
                    </span>
                    <RiskBadge level={report.severity} size="sm" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isResolved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 mt-2.5">
                  <button
                    type="button"
                    onClick={() => onInspectLocation?.(report.district, report)}
                    className="font-bold text-slate-900 hover:text-blue-900 flex items-center gap-1 cursor-pointer text-left transition-colors group"
                  >
                    <MapPin size={12} className="text-slate-400 group-hover:text-blue-900 shrink-0" />
                    <span className="group-hover:underline">{report.location}</span>
                  </button>
                  <div className="text-[11px] text-slate-500">
                    {report.district}, {report.state}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-3 line-clamp-3">
                  {report.description}
                </p>

                {report.assignedTeam && (
                  <div className="mt-2.5 text-[11px] text-blue-900 font-bold bg-blue-50/70 p-1.5 rounded border border-blue-100">
                    {t('assigned')}: {report.assignedTeam}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {onInspectLocation && (
                    <button
                      type="button"
                      onClick={() => onInspectLocation(report.district, report)}
                      className="px-2.5 py-1.5 rounded text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin size={12} />
                      <span>{t('inspect')}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onViewReportDetails(report)}
                    className="px-2.5 py-1.5 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {t('viewReport')}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {!isCitizen && (
                    <button
                      onClick={() => onAssignTeam(report)}
                      className="px-2.5 py-1.5 rounded text-xs font-semibold text-blue-900 hover:bg-blue-50 border border-blue-200 transition-colors"
                    >
                      {t('assignTeam')}
                    </button>
                  )}

                  {!isCitizen && !isResolved && (
                    <button
                      onClick={() => onResolveReport(report.id)}
                      className="px-2.5 py-1.5 rounded text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    >
                      {t('resolve')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
