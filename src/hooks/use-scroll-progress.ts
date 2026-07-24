'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollProgressOptions {
  /** Threshold as fraction (0–1) below which progress is 0 */
  startThreshold?: number;
  /** Threshold as fraction (0–1) above which progress is 1 */
  endThreshold?: number;
}

/**
 * Tracks scroll progress through the page as a value between 0 and 1.
 * Supports start/end thresholds for triggering animations at specific scroll ranges.
 */
export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { startThreshold = 0, endThreshold = 1 } = options;

  const [progress, setProgress] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.max(0, Math.min(1, window.scrollY / maxScroll));
  });

  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) {
      setProgress(1);
      return;
    }

    const rawProgress = scrollTop / maxScroll;
    const clamped = Math.max(0, Math.min(1, rawProgress));

    // Apply thresholds
    const range = endThreshold - startThreshold;
    const mapped = range > 0 ? (clamped - startThreshold) / range : 0;
    const finalProgress = Math.max(0, Math.min(1, mapped));

    setProgress((prev) => {
      setDirection(finalProgress > prev ? 'down' : 'up');
      return finalProgress;
    });
  }, [startThreshold, endThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, direction };
}
