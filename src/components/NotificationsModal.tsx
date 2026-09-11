import React from 'react';
import { Modal } from './common/Modal';
import { LiveAlert } from '../types';
import { RiskBadge } from './common/RiskBadge';
import { Bell, Clock, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: LiveAlert[];
  onSelectAlert: (alert: LiveAlert) => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  alerts = [],
  onSelectAlert,
  onClearAll
}) => {
  const safeAlerts = alerts || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Disaster Emergency Broadcasts"
      subtitle="Real-time CAP warning stream and hazard events"
      maxWidth="md"
    >
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="font-semibold text-slate-500 text-[11px]">
            {safeAlerts.length} Broadcast messages received
          </span>
          <button
            onClick={onClearAll}
            className="text-[11px] font-bold text-blue-900 hover:underline"
          >
            Acknowledge All
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {safeAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                onSelectAlert(alert);
                onClose();
              }}
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-900 hover:bg-slate-50/70 transition-all cursor-pointer flex items-start justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <RiskBadge level={alert.severity} size="sm" />
                  <span className="font-bold text-slate-900 text-xs">{alert.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {alert.location} • {alert.trigger}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block flex items-center gap-1">
                  <Clock size={10} /> {alert.timeAgo}
                </span>
              </div>
              <ChevronRight size={15} className="text-slate-400 shrink-0 mt-2" />
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs"
          >
            Close Feed
          </button>
        </div>
      </div>
    </Modal>
  );
};
