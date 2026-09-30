/**
 * Centralized design tokens used across the application.
 * This provides a single source of truth for values that need to be shared
 * between CSS, Tailwind (via inline theme), and WebGL/Canvas rendering.
 */
export const DESIGN_TOKENS = {
  colors: {
    gold: '#C5A059',
    background: '#0A0A0A',
    textPrimary: '#F5F0E8',
  },
} as const;
