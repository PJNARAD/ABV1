import React, { useState } from 'react';
import { Modal } from './common/Modal';
import { UserCheck, Shield, Clock, Truck, MapPin } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface AssignTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTitle: string;
  targetLocation: string;
  onConfirmAssignment: (teamName: string, notes: string) => void;
}

const TEAMS_LIST = [
  { name: 'SDRF Quick Response Team 03 (Gangtok)', base: 'East District HQ', eta: '35 mins', personnel: 12, vehicle: '4x4 Rescue Unit' },
  { name: 'BRO Heavy Earthmoving Taskforce 14', base: 'Singtam Depot', eta: '45 mins', personnel: 8, vehicle: '2 Excavators + 1 Dozer' },
  { name: 'NDRF 1st Battalion Strike Team', base: 'Pakyong Base', eta: '60 mins', personnel: 24, vehicle: 'Multi-Utility Rescue Squad' },
  { name: 'PWD Hill Slope Stabilization Division', base: 'Ranipool Outpost', eta: '25 mins', personnel: 6, vehicle: 'Geotech Rig Van' },
  { name: 'District Civil Defense Volunteers', base: 'Local Community Hub', eta: '15 mins', personnel: 18, vehicle: 'Light Evac Vans' }
];

export const AssignTeamModal: React.FC<AssignTeamModalProps> = ({
  isOpen,
  onClose,
  targetTitle,
  targetLocation,
  onConfirmAssignment
}) => {
  const { t } = useTranslation();
  const [selectedTeam, setSelectedTeam] = useState(TEAMS_LIST[0].name);
  const [dispatchNotes, setDispatchNotes] = useState('Immediate site cordon, drone reconnaissance, and traffic diversion onto secondary lifeline.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmAssignment(selectedTeam, dispatchNotes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('assignTeam')}
      subtitle={`Dispatching authorized personnel to ${targetTitle} (${targetLocation})`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Incident Sector
          </span>
          <div className="text-sm font-bold text-slate-900 mt-0.5">
            {targetTitle}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin size={12} /> {targetLocation}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1.5">
            Select Ready Deployment Unit *
          </label>
          <div className="space-y-2">
            {TEAMS_LIST.map((t) => (
              <label
                key={t.name}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                  selectedTeam === t.name
                    ? 'border-blue-900 bg-blue-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="responseTeam"
                  checked={selectedTeam === t.name}
                  onChange={() => setSelectedTeam(t.name)}
                  className="mt-0.5 text-blue-900 focus:ring-blue-900"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{t.name}</span>
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-100/60 px-1.5 py-0.5 rounded">
                      ETA: {t.eta}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                    <span>Base: {t.base}</span>
                    <span>•</span>
                    <span>{t.vehicle}</span>
                    <span>•</span>
                    <span>{t.personnel} Personnel</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Dispatch Orders & Mission Notes
          </label>
          <textarea
            rows={2}
            value={dispatchNotes}
            onChange={(e) => setDispatchNotes(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 shadow-xs flex items-center gap-1.5"
          >
            <UserCheck size={14} />
            <span>{t('assignTeam')}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
