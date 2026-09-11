import React from 'react';
import { RiskLevel, RoadStatus } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel | RoadStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const normalized = level.toUpperCase();

  let bgClass = 'bg-slate-100 text-slate-800 border-slate-300';
  let dotColor = 'bg-slate-500';
  let Icon = Info;

  switch (normalized) {
    case 'CRITICAL':
    case 'BLOCKED':
      bgClass = 'bg-red-50 text-red-700 border-red-200';
      dotColor = 'bg-red-600';
      Icon = AlertCircle;
      break;
    case 'HIGH':
    case 'HIGH RISK':
      bgClass = 'bg-orange-50 text-orange-800 border-orange-200';
      dotColor = 'bg-orange-500';
      Icon = AlertTriangle;
      break;
    case 'MODERATE':
    case 'PARTIALLY BLOCKED':
      bgClass = 'bg-amber-50 text-amber-900 border-amber-300';
      dotColor = 'bg-amber-500';
      Icon = AlertTriangle;
      break;
    case 'LOW':
    case 'OPEN':
      bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dotColor = 'bg-emerald-600';
      Icon = CheckCircle2;
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold tracking-wide',
    md: 'px-2.5 py-1 text-xs font-bold tracking-wider',
    lg: 'px-3 py-1.5 text-sm font-bold tracking-wider'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${bgClass} ${sizeClasses[size]} uppercase whitespace-nowrap`}
      role="status"
      aria-label={`Risk level: ${level}`}
    >
      {showIcon && (
        <span className="flex items-center">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mr-1 shrink-0`} />
          <Icon size={iconSizes[size]} className="shrink-0" aria-hidden="true" />
        </span>
      )}
      <span>{level}</span>
    </span>
  );
};
