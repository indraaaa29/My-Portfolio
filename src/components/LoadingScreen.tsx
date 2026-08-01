'use client';

import { useEffect, useState } from 'react';

interface Props {
  isLoaded: boolean;
  progress: number;
}

export default function LoadingScreen({ isLoaded, progress }: Props) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setExiting(true);
      const timeout = setTimeout(() => setVisible(false), 1400);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-start justify-end pointer-events-none"
      style={{
        backgroundColor: 'var(--c-bg)',
        padding: 'clamp(2rem, 5vw, 5rem)',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
    >
      {/* Grain overlay during loading */}
      <div className="grain-overlay" />

      {/* Top-right: percentage — large editorial number */}
      <div
        className="absolute top-0 right-0"
        style={{ padding: 'clamp(2rem, 5vw, 5rem)' }}
      >
        <span
          className="font-display text-[clamp(6rem,18vw,18rem)] leading-none select-none"
          style={{
            color: 'var(--c-border)',
            letterSpacing: '-0.02em',
            lineHeight: 0.85,
          }}
        >
          {progress.toString().padStart(3, '0')}
        </span>
      </div>

      {/* Bottom-left: status line */}
      <div className="flex flex-col gap-8 w-full max-w-sm">
        {/* Progress bar */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '1px', backgroundColor: 'var(--c-border)' }}
        >
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: 'var(--c-text-primary)',
              transition: 'width 120ms linear',
            }}
          />
        </div>

        {/* Status label */}
        <div className="flex items-center justify-between">
          <span
            className="font-sans text-[10px] tracking-[0.5em] uppercase"
            style={{ color: 'var(--c-text-tertiary)' }}
          >
            {progress < 100 ? 'Compositing frames' : 'Ready'}
          </span>
          <span
            className="font-sans text-[10px] tracking-widest tabular-nums"
            style={{ color: 'var(--c-text-tertiary)' }}
          >
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
