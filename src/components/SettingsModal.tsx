import React, { useState } from 'react';
import { Modal } from './common/Modal';
import { SupportedLanguage, NetworkStatus, UserProfile } from '../types';
import { 
  Wifi, 
  WifiOff, 
  CloudOff, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Database, 
  Shield, 
  Smartphone, 
  Check, 
  Download,
  BellRing,
  AlertCircle,
  Lock
} from 'lucide-react';
import { useTranslation } from '../data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  networkStatus: NetworkStatus;
  onToggleNetworkStatus: (status: NetworkStatus) => void;
  pendingOfflineCount: number;
  onForceSync: () => void;
  onExportData: (format: 'geojson' | 'csv') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
  onLanguageChange,
  networkStatus,
  onToggleNetworkStatus,
  pendingOfflineCount,
  onForceSync,
  onExportData
}) => {
  const { t } = useTranslation();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const isCitizen = currentUser?.role === 'Citizen / General Public' || currentUser?.role === 'Public / Observer';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCitizen ? 'Citizen Preferences & Notifications' : t('settings')}
      subtitle={isCitizen ? 'Configure language and emergency public safety siren alerts.' : 'Configure regional preferences, connectivity simulation, and emergency alerts.'}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Network & Offline Section */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Wifi size={14} className="text-blue-900" />
              <span>Network Connectivity Status</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              networkStatus === 'online'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : networkStatus === 'limited'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {networkStatus.toUpperCase()}
            </span>
          </div>

          {isCitizen ? (
            /* Restricted Notification for Citizens */
            <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-amber-900">
              <Lock size={15} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-xs">System Settings Restricted</span>
                <p className="text-[11px] text-amber-800 mt-0.5 font-medium leading-relaxed">
                  Network and system configuration is restricted to authorized EOC officers.
                </p>
              </div>
            </div>
          ) : (
            /* Full Official EOC Network Controls */
            <>
              <p className="text-[11px] text-slate-500 font-medium mb-3">
                Simulate field environments across remote NER valleys to test offline-first caching and opportunistic synchronization.
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onToggleNetworkStatus('online')}
                  className={`p-2 rounded-lg border text-center font-bold text-xs transition-colors flex flex-col items-center gap-1 ${
                    networkStatus === 'online'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Wifi size={14} />
                  <span>Online</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleNetworkStatus('limited')}
                  className={`p-2 rounded-lg border text-center font-bold text-xs transition-colors flex flex-col items-center gap-1 ${
                    networkStatus === 'limited'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CloudOff size={14} />
                  <span>Limited 2G</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleNetworkStatus('offline')}
                  className={`p-2 rounded-lg border text-center font-bold text-xs transition-colors flex flex-col items-center gap-1 ${
                    networkStatus === 'offline'
                      ? 'bg-red-600 text-white border-red-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <WifiOff size={14} />
                  <span>Full Offline</span>
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">
                  Pending offline queue: <span className="font-bold text-slate-900">{pendingOfflineCount} report(s)</span>
                </span>
                <button
                  type="button"
                  onClick={onForceSync}
                  disabled={networkStatus === 'offline'}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-900 hover:bg-blue-950 disabled:opacity-50 text-white text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <RefreshCw size={11} />
                  <span>Force Sync Now</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Language Preference */}
        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Regional UI & Alert Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
          >
            <option value="English">English (National Official)</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Assamese">অসমীয়া (Assamese)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Manipuri">মৈতৈলোন্ (Manipuri)</option>
            <option value="Mizo">Mizo ṭawng (Mizoram)</option>
            <option value="Khasi">Ka Ktien Khasi (Meghalaya)</option>
            <option value="Garo">A·chik (Meghalaya)</option>
            <option value="Tripuri">Kokborok (Tripura)</option>
          </select>
        </div>

        {/* Audio & Alert Preferences */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 cursor-pointer">
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <BellRing size={14} className="text-blue-900" />
              <span>Audible Critical Siren Warnings</span>
            </span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="rounded text-blue-900 focus:ring-blue-800"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 cursor-pointer">
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <Smartphone size={14} className="text-blue-900" />
              <span>SMS Disaster Warning Broadcasts (NDMA CAP)</span>
            </span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="rounded text-blue-900 focus:ring-blue-800"
            />
          </label>
        </div>

        {/* Data Export Options - Only for official roles */}
        {!isCitizen && (
          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-700 block mb-1.5">
              GIS & Incident Data Export (Official)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onExportData('geojson')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-colors text-xs cursor-pointer"
              >
                <Download size={13} />
                <span>Export GeoJSON Layers</span>
              </button>
              <button
                type="button"
                onClick={() => onExportData('csv')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-colors text-xs cursor-pointer"
              >
                <Download size={13} />
                <span>Export CSV Telemetry</span>
              </button>
            </div>
          </div>
        )}

        {/* Close */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
