import React from 'react';

/**
 * ArchLoadingIndicator — Architectural Progress State
 * Clean, technical, no generic spinners.
 *
 * Example:
 * PREPARING SPACE
 * [ ━━━━━━━━━━━━━ ] 100%
 * MESH · TEXTURE · LIGHT
 */
export default function ArchLoadingIndicator({
  title = 'INITIALIZING ARCHITECTURAL ENVIRONMENT',
  subtitle = 'GEOMETRY · TEXTURE · LIGHTING',
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        padding: 'var(--space-xl)',
        fontFamily: 'var(--font-mono)',
        userSelect: 'none',
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)',
          border: '1px solid var(--color-border)',
          padding: 'var(--space-md) var(--space-lg)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.6875rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>{title}</span>
          <span style={{ color: 'var(--color-accent)' }}>●</span>
        </div>

        {/* Architectural Progress Line */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--color-border)',
            position: 'relative',
            overflow: 'hidden',
            margin: '6px 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '45%',
              backgroundColor: 'var(--color-accent)',
              animation: 'arch-load-sweep 1.6s infinite ease-in-out',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontSize: '0.625rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
          }}
        >
          <span>{subtitle}</span>
          <span>1:1 METRIC REALITY</span>
        </div>
      </div>

      <style>{`
        @keyframes arch-load-sweep {
          0% { left: -45%; width: 30%; }
          50% { left: 35%; width: 50%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>
    </div>
  );
}
