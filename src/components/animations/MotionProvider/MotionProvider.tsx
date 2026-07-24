'use client';

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { durations, easings } from '@/styles/design-tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface MotionContextValue {
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Animation duration constants (in ms, from design tokens) */
  durations: typeof durations;
  /** Easing curve constants (from design tokens) */
  easings: typeof easings;
  /** Duration in seconds, adjusted for reduced motion (returns 0 when reduced) */
  getDuration: (duration: string) => number;
  /** Whether GSAP is available and should be used */
  gsapEnabled: boolean;
  /** Framer Motion configuration — reduced motion aware */
  framerConfig: {
    transition: {
      duration: number;
      ease: string;
    };
  };
}

/* ──────────────────────────────────────────────
 * Context
 * ────────────────────────────────────────────── */

const MotionContext = createContext<MotionContextValue | null>(null);

/* ──────────────────────────────────────────────
 * Duration parsing helper
 * ────────────────────────────────────────────── */

function parseMs(value: string): number {
  const trimmed = value.trim();
  if (trimmed.endsWith('ms')) {
    const num = parseFloat(trimmed);
    return Number.isFinite(num) ? num : 300;
  }
  if (trimmed.endsWith('s')) {
    const num = parseFloat(trimmed) * 1000;
    return Number.isFinite(num) ? num : 300;
  }
  const num = parseFloat(trimmed);
  return Number.isFinite(num) ? num : 300;
}

/* ──────────────────────────────────────────────
 * Provider
 * ────────────────────────────────────────────── */

export interface MotionProviderProps {
  children: ReactNode;
  /** Explicitly disable GSAP (default: true) */
  gsapEnabled?: boolean;
}

export default function MotionProvider({
  children,
  gsapEnabled = true,
}: MotionProviderProps) {
  const reducedMotion = useReducedMotion();

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      durations,
      easings,
      getDuration: (duration: string) =>
        reducedMotion ? 0 : parseMs(duration),
      gsapEnabled: gsapEnabled && !reducedMotion,
      framerConfig: {
        transition: {
          duration: reducedMotion ? 0 : 0.3,
          ease: reducedMotion ? 'ease' : easings.smooth,
        },
      },
    }),
    [reducedMotion, gsapEnabled],
  );

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

/* ──────────────────────────────────────────────
 * Hook
 * ────────────────────────────────────────────── */

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error(
      'useMotion must be used within a <MotionProvider>. ' +
        'Wrap your application with <MotionProvider> to use motion features.',
    );
  }
  return ctx;
}
