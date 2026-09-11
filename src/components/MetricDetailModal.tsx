import React, { useState } from 'react';
import { 
  X, 
  Route, 
  History, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Calendar,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  Activity,
  ChevronRight
} from 'lucide-react';
import { RiskZone } from '../types';

export type MetricModalType = 'roads' | 'history' | 'kpi_high_risk' | 'kpi_critical' | 'kpi_monitored';

export interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: MetricModalType;
  zone?: RiskZone | null;
  onShowToast?: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  onSelectZone?: (zone: RiskZone) => void;
}

export const MetricDetailModal: React.FC<MetricDetailModalProps> = ({
  isOpen,
  onClose,
  type,
  zone,
  onShowToast
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  // Mock comprehensive dataset for Affected Roads
  const affectedRoadsList = [
    {
      id: 'road-01',
      code: 'NH-10',
      name: 'Siliguri – Gangtok Strategic Lifeline Highway',
      chainage: 'km 28.4 to km 32.1 (Singtam Sector)',
      district: zone?.district || 'Gangtok',
      state: zone?.state || 'Sikkim',
      status: 'Blocked',
      statusSeverity: 'danger',
      obstructionType: 'Massive Mudflow & Debris Slide (est. 4,200 m³)',
      clearingAgency: 'Border Roads Organisation (Project Swastik, 758 BRTF)',
      machineryDeployed: '2x CAT 320D Excavators, 1x Wheel Loader, 4x Tippers',
      estimatedClearance: 'Today, 17:30 IST (Subject to rainfall)',
      trafficAdvisory: 'Heavy civilian transport prohibited. Emergency ambulances escorted via single-lane bypass.',
      detourRoute: 'Via Melli – Nayabazar – Jorethang Ridge Link Road (+42 km)'
    },
    {
      id: 'road-02',
      code: 'NH-710',
      name: 'Rangpo – Dikchu Hydro Corridor Bypass',
      chainage: 'km 14.8 (Near Teesta Stage V Barrage)',
      district: zone?.district || 'Pakyong',
      state: zone?.state || 'Sikkim',
      status: 'Restricted (Single Lane)',
      statusSeverity: 'warning',
      obstructionType: 'Slope Creep & Fissure Subsidence along shoulder',
      clearingAgency: 'Sikkim Public Works Department (Roads & Bridges)',
      machineryDeployed: '1x JCB Backhoe Loader, Geotextile sandbag stabilization crew',
      estimatedClearance: 'Controlled convoy operation active',
      trafficAdvisory: 'Speed restriction 15 km/h. Night transit suspended 20:00 to 06:00 IST.',
      detourRoute: 'Singtam – Sirwani Link bypass available for light motor vehicles.'
    },
    {
      id: 'road-03',
      code: 'SH-3',
      name: 'Gangtok – Nathu La Strategic Border Route',
      chainage: 'km 44.0 (15th Mile Checkpost)',
      district: 'East Sikkim',
      state: 'Sikkim',
      status: 'Cautionary Transit',
      statusSeverity: 'info',
      obstructionType: 'Minor scree falls and surface rock rolling',
      clearingAgency: 'General Reserve Engineer Force (GREF)',
      machineryDeployed: 'Patrol clearing units with pneumatic rock breakers',
      estimatedClearance: 'Continual clearing with warning flaggers',
      trafficAdvisory: 'Tourist permits restricted beyond 3rd Mile until weather stabilizes.',
      detourRoute: 'No alternate bypass. Convoys grouped at 90-minute intervals.'
    }
  ];

  // Mock comprehensive dataset for Historical Landslides
  const historicalEventsList = [
    {
      id: 'hist-01',
      date: '18 Aug 2025',
      time: '04:15 IST',
      location: `${zone?.name || 'Singtam'} - Milestone 29 Ridge`,
      district: zone?.district || 'Gangtok',
      volumeDebris: '14,800 m³',
      triggerFactor: 'Extreme precipitation (162 mm in 12h) + GSI High Hazard S-Zone',
      fatalities: 0,
      injuries: 2,
      infrastructureDamage: '45m pavement collapsed, 2 high-tension power pylons tilted',
      durationRoadClosure: '42 hours',
      remedialWorksCompleted: 'Reinforced soil nailed wall, deep perforated horizontal drains installed by BRO'
    },
    {
      id: 'hist-02',
      date: '24 Jun 2024',
      time: '19:40 IST',
      location: `${zone?.district || 'Gangtok'} Valley Slopes - Sector 4`,
      district: zone?.district || 'Gangtok',
      volumeDebris: '6,200 m³',
      triggerFactor: 'Pre-monsoon cloudburst (110 mm / 3h)',
      fatalities: 0,
      injuries: 0,
      infrastructureDamage: 'Culvert blockage causing localized flash flooding along NH-10',
      durationRoadClosure: '18 hours',
      remedialWorksCompleted: 'Box culvert reconstructed with 2x hydraulic capacity, gabion wire check dams'
    },
    {
      id: 'hist-03',
      date: '12 Jul 2023',
      time: '02:30 IST',
      location: 'Dikchu Link Road km 8.2',
      district: zone?.district || 'Gangtok',
      volumeDebris: '22,500 m³ (Major Rockslide)',
      triggerFactor: 'High antecedent moisture saturation followed by M3.4 tectonic tremor',
      fatalities: 0,
      injuries: 1,
      infrastructureDamage: 'Teesta feeder aqueduct damaged, 3 light commercial vehicles buried (evacuated)',
      durationRoadClosure: '5 days',
      remedialWorksCompleted: 'Controlled rock-scaling blasting, double-twist wire mesh rockfall draping installed'
    },
    {
      id: 'hist-04',
      date: '03 Oct 2022',
      time: '11:15 IST',
      location: 'Tsethaang Colluvium Slope',
      district: zone?.district || 'Gangtok',
      volumeDebris: '3,800 m³',
      triggerFactor: 'Prolonged 48-hour continuous drizzle causing pore water saturation',
      fatalities: 0,
      injuries: 0,
      infrastructureDamage: 'Retaining wall breached over 15m stretch',
      durationRoadClosure: '12 hours',
      remedialWorksCompleted: 'Weep-hole cleared concrete retaining wall reinforced with counterforts'
    }
  ];

  // CSV Export functions
  const handleExportRoadsCsv = () => {
    const headers = 'Highway_Code,Road_Name,Chainage,District,State,Status,Obstruction_Type,Clearing_Agency,Estimated_Clearance,Detour_Route\n';
    const rows = affectedRoadsList.map(r => 
      `"${r.code}","${r.name}","${r.chainage}","${r.district}","${r.state}","${r.status}","${r.obstructionType}","${r.clearingAgency}","${r.estimatedClearance}","${r.detourRoute}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NER_Critical_Roads_Report_${zone?.district || 'Regional'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast?.('Critical roads assessment CSV report exported successfully.', 'success');
  };

  const handleExportHistoryCsv = () => {
    const headers = 'Incident_Date,Time,Location,District,Volume_Debris,Trigger_Factor,Injuries,Infrastructure_Damage,Closure_Duration,Remedial_Works\n';
    const rows = historicalEventsList.map(h => 
      `"${h.date}","${h.time}","${h.location}","${h.district}","${h.volumeDebris}","${h.triggerFactor}","${h.injuries}","${h.infrastructureDamage}","${h.durationRoadClosure}","${h.remedialWorksCompleted}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NER_Historical_Landslide_Dossier_${zone?.district || 'Sector'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast?.('Historical landslide records CSV archive downloaded successfully.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              {type === 'roads' ? <Route size={20} /> : <History size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {type === 'roads' ? 'TRANSPORT LIFELINE DOSSIER' : 'GSI INCIDENT ARCHIVE'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  {zone ? `${zone.district}, ${zone.state}` : 'North Eastern Region'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight mt-1">
                {type === 'roads' ? 'Critical Road Corridors & Disruption Breakdown' : 'Historical Landslide Incident Registry'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {type === 'roads' 
                  ? 'Real-time road vulnerability, highway clearance status, and detour alternatives.' 
                  : 'Chronological inventory of verified geotechnical ground movements and past remediation.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={type === 'roads' ? handleExportRoadsCsv : handleExportHistoryCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 shadow-2xs transition-colors"
            >
              <Download size={13} />
              <span>Download CSV Report</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {type === 'roads' ? (
              <>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Active Corridors at Risk</span>
                  <span className="text-xl font-black text-orange-600 block mt-0.5">02 Highways Monitored</span>
                  <span className="text-[11px] text-slate-500">NH-10 & NH-710 corridors</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Debris Volume On Pavement</span>
                  <span className="text-xl font-black text-red-600 block mt-0.5">~4,200 m³ Active</span>
                  <span className="text-[11px] text-slate-500">Clearance rate: 850 m³/hr</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Clearance Taskforce</span>
                  <span className="text-xl font-black text-slate-900 block mt-0.5">Project Swastik (BRO)</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Heavy machinery deployed</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Recorded Events</span>
                  <span className="text-xl font-black text-slate-900 block mt-0.5">{zone?.historicalEventsCount || 11} Incidents</span>
                  <span className="text-[11px] text-slate-500">GSI 10-Year Geospatial Baseline</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Last Major Trigger</span>
                  <span className="text-xl font-black text-red-600 block mt-0.5">{zone?.lastEventDate || '18 Aug 2025'}</span>
                  <span className="text-[11px] text-slate-500">Post 160mm continuous squall</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Casualty Prevention</span>
                  <span className="text-xl font-black text-emerald-600 block mt-0.5">Zero Fatalities (2024-26)</span>
                  <span className="text-[11px] text-slate-500">Due to proactive EWS evacuations</span>
                </div>
              </>
            )}
          </div>

          {/* List Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers size={14} className="text-blue-900" />
                <span>{type === 'roads' ? 'Detailed Route Inventory & Real-Time Advisories' : 'Historical Ground Failure Catalog'}</span>
              </h4>
              <button
                type="button"
                onClick={type === 'roads' ? handleExportRoadsCsv : handleExportHistoryCsv}
                className="sm:hidden text-xs font-bold text-blue-900 inline-flex items-center gap-1"
              >
                <Download size={12} />
                <span>Export CSV</span>
              </button>
            </div>

            {type === 'roads' ? (
              <div className="space-y-3">
                {affectedRoadsList.map(road => (
                  <div key={road.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-black bg-slate-900 text-white font-mono">
                          {road.code}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900">
                          {road.name}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        road.statusSeverity === 'danger' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : road.statusSeverity === 'warning'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {road.status}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 font-medium">
                      <span>Affected Chainage: </span>
                      <strong className="text-slate-800">{road.chainage}</strong>
                    </div>

                    <div className="mt-2 p-2.5 rounded-lg bg-red-50/40 border border-red-100 text-xs">
                      <span className="font-bold text-red-900 block mb-0.5">Obstruction Nature:</span>
                      <p className="text-slate-700">{road.obstructionType}</p>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-semibold block">Clearance Agency & Equipment:</span>
                        <span className="font-medium text-slate-800">{road.clearingAgency}</span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{road.machineryDeployed}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-semibold block">Est. Restoration ETA:</span>
                        <span className="font-bold text-blue-900">{road.estimatedClearance}</span>
                        <span className="text-[11px] text-slate-600 block mt-0.5">{road.trafficAdvisory}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 p-2 rounded bg-blue-50/50 border border-blue-100 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-blue-900 font-medium">
                        <Route size={14} className="shrink-0" />
                        <span><strong>Designated Detour:</strong> {road.detourRoute}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {historicalEventsList.map(event => (
                  <div key={event.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          <Calendar size={12} className="text-slate-500" />
                          <span>{event.date}</span>
                          <span className="text-slate-400">&bull;</span>
                          <span className="font-mono font-normal text-slate-600">{event.time}</span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">
                          {event.location}
                        </h5>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">
                        Vol: {event.volumeDebris}
                      </span>
                    </div>

                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-semibold block">Geotechnical Trigger:</span>
                        <span className="font-medium text-slate-800">{event.triggerFactor}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-semibold block">Impact on Lifeline:</span>
                        <span className="font-medium text-slate-800">Closed for {event.durationRoadClosure}</span>
                        <span className="text-[11px] text-slate-500 block">{event.infrastructureDamage}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-900 block">Mitigation & Structural Remediation Executed:</span>
                          <p className="text-slate-700 mt-0.5">{event.remedialWorksCompleted}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            National Disaster Management Authority &bull; GSI North Eastern Geotechnical Survey
          </span>
          <button
            type="button"
            onClick={type === 'roads' ? handleExportRoadsCsv : handleExportHistoryCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 shadow-xs transition-colors"
          >
            <Download size={13} />
            <span>Export Official Dossier (CSV)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
