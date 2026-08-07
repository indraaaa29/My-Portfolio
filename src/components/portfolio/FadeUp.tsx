'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Shared cinematic easing — used by every reveal in the portfolio so the
 * scroll experience feels like one continuous, editorial system.
 */
export const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reveal duration (seconds) for the shared fade-up treatment. */
export const REVEAL_SECONDS = 0.7;

interface FadeUpProps {
  children: ReactNode;
  /** Stagger delay in seconds (default 0). */
  delay?: number;
  className?: string;
}

/**
 * FadeUp — the shared subtle reveal primitive.
 *
 * Reveals once when the element enters the viewport (framer-motion
 * `whileInView`, backed by IntersectionObserver — no scroll listeners).
 * Pure transform + opacity, so it never causes layout shift and stays
 * compositor-friendly.
 *
 * Under `prefers-reduced-motion`, the root MotionConfig zeroes the
 * transform, so the element simply fades in without moving.
 */
export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
