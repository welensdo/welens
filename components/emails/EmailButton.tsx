import React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function EmailButton({ href, children, variant = 'primary' }: EmailButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <div style={{ textAlign: 'center', margin: '32px 0' }}>
      <a
        href={href}
        style={{
          backgroundColor: isPrimary ? '#3B82F6' : '#F1F5F9',
          borderRadius: '50px',
          color: isPrimary ? '#FFFFFF' : '#1E293B',
          display: 'inline-block',
          fontSize: '16px',
          fontWeight: '600',
          letterSpacing: '-0.025em',
          lineHeight: '24px',
          padding: '16px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          border: 'none',
          boxShadow: isPrimary ? '0 4px 14px 0 rgba(59, 130, 246, 0.25)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </a>
    </div>
  );
}