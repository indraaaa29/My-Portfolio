'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Root motion configuration.
 *
 * `reducedMotion="user"` makes every framer-motion animation in the app
 * respect `prefers-reduced-motion`: transform animations are disabled
 * (elements no longer move), while opacity reveals still fade in gently.
 * Content is never hidden or blocked.
 */
export default function CinematicMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
