import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface ToastNotificationProps {
  toasts?: ToastMessage[];
  onDismiss?: (id: string) => void;
  message?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
  message,
  type = 'info',
  onClose
}) => {
  // Auto-dismiss single toast after 4 seconds
  useEffect(() => {
    if (message && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  // Aggregate active toasts whether passed as array or single message
  const activeToasts: ToastMessage[] = [];

  if (Array.isArray(toasts) && toasts.length > 0) {
    activeToasts.push(...toasts);
  } else if (message) {
    activeToasts.push({
      id: 'single-toast',
      type: (type as ToastMessage['type']) || 'info',
      message
    });
  }

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[130] flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {activeToasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-200 bg-white text-emerald-900';
        let iconColor = 'text-emerald-600';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-red-200 bg-white text-red-900';
          iconColor = 'text-red-600';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          borderClass = 'border-amber-200 bg-white text-amber-900';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-blue-200 bg-white text-blue-900';
          iconColor = 'text-blue-600';
        }

        const handleDismiss = () => {
          if (onDismiss) {
            onDismiss(toast.id);
          } else if (onClose) {
            onClose();
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg ${borderClass} animate-in slide-in-from-bottom-2 duration-200`}
            role="alert"
          >
            <Icon size={18} className={`${iconColor} shrink-0 mt-0.5`} />
            <p className="text-sm font-medium text-slate-800 flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
