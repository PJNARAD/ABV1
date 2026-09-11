import React from 'react';
import { Modal } from './common/Modal';
import { User, Shield, Award, Phone, Mail, Building, MapPin } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, currentUser }) => {
  const profile = currentUser || {
    name: 'Er. Rajeshwar Sharma, IAS',
    officialId: 'GOI-NER-SDMA-9942',
    email: 'dm-east@sikkim.gov.in',
    role: 'SDMA Administrator',
    designation: 'Director, State Emergency Operations Centre',
    department: 'Department of Disaster Management, Govt. of Sikkim',
    jurisdiction: 'East District & NH-10 Corridor',
    clearanceLevel: 'National Level 4 (Full Dispatch & Evac)',
    phone: '+91-3592-202201 (Ext. 104)',
    avatarInitials: 'RS'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Officer Profile"
      subtitle="Government Disaster Management Command Credentials"
      maxWidth="sm"
    >
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-black text-base flex items-center justify-center border-2 border-white shadow-sm">
            {profile.avatarInitials}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              {profile.name}
            </h4>
            <p className="text-xs text-slate-600 font-semibold">
              {profile.designation}
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {profile.role}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-slate-700">
            <Building size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">Department:</span>
            <span className="truncate">{profile.department}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">Jurisdiction:</span>
            <span>{profile.jurisdiction}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">Govt. Email:</span>
            <span className="font-mono text-[11px]">{profile.email}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Phone size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">Duty Line:</span>
            <span className="font-mono text-[11px]">{profile.phone}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Shield size={14} className="text-blue-900 shrink-0" />
            <span className="font-semibold text-slate-800">Clearance:</span>
            <span className="font-bold text-blue-900">{profile.clearanceLevel}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

