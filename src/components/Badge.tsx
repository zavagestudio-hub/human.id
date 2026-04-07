import React from 'react';

export type MedicalBadgeType = 'allergy' | 'chronic' | 'ok' | 'meds';

interface BadgeProps {
  type: MedicalBadgeType;
  children: React.ReactNode;
  className?: string;
}

export function MedicalBadge({ type, children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${type} ${className}`}>
      <span className="badge-dot"></span>
      {children}
    </span>
  )
}
