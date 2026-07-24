/* ──────────────────────────────────────────────
 * Shared Type Definitions
 * ────────────────────────────────────────────── */

/** Project or showcase item */
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'photography' | 'film' | 'ai-engineering' | 'creative';
  thumbnail: string;
  tags: string[];
  url?: string;
  date?: string;
}

/** Photography portfolio item */
export interface Photograph {
  id: string;
  src: string;
  alt: string;
  title?: string;
  location?: string;
  date?: string;
  camera?: string;
  focalLength?: string;
  aperture?: string;
  iso?: string;
}

/** Experience / timeline entry */
export interface Experience {
  id: string;
  role: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  tags: string[];
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Achievement or award */
export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
  url?: string;
}

/** Particle system configuration */
export interface ParticleConfig {
  count: number;
  color: string;
  size: [number, number];
  speed: [number, number];
  opacity: [number, number];
  glow: boolean;
  glowRadius?: number;
}

/** Intro engine state bridge */
export interface IntroState {
  phase: 'loading' | 'intro' | 'transitioning' | 'complete';
  progress: number;
  onComplete?: () => void;
}
