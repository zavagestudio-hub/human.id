import React from 'react';

export function Logo({ variant = 'light', className = '' }: { variant?: 'light' | 'dark', className?: string }) {
  const iconColor = variant === 'dark' ? 'white' : 'var(--color-brand-primary)';
  const humanColor = variant === 'dark' ? 'white' : 'var(--color-brand-deep)';
  
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg viewBox="0 0 54 70" fill="none" style={{ height: '36px', width: 'auto', color: iconColor }}>
        <circle cx="27" cy="13" r="12" fill="currentColor"/>
        <rect x="6" y="31" width="17" height="38" rx="8.5" fill="currentColor"/>
        <rect x="31" y="31" width="17" height="38" rx="8.5" fill="currentColor"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', lineHeight: 0.9 }}>
          <span style={{ color: humanColor, fontWeight: 900, fontSize: '22px' }}>HUMAN</span>
          <span style={{ color: 'var(--color-brand-accent)', fontWeight: 900, fontSize: '22px' }}>-ID</span>
        </div>
        <div style={{ color: 'var(--color-brand-accent)', fontSize: '8px', fontWeight: 500, letterSpacing: '0.08em', marginTop: '4px' }}>
          TU PERFIL MÉDICO
        </div>
      </div>
    </div>
  )
}
