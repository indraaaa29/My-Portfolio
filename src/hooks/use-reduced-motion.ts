'use client';

import { useMediaQuery } from './use-media-query';

/**
 * Detects if the user prefers reduced motion.
 * Disable animations when this is true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
