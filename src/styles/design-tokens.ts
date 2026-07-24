/**
 * Design Tokens
 *
 * Centralized design system values for the Cinematic Portfolio.
 * All UI values should derive from these tokens.
 * No magic numbers — every value has a named home.
 *
 * Visual direction: Apple / Linear / Leica — Elegant, Premium, Editorial, Minimal.
 */

/* ────────────────────────────────────────────
 * Color Palette
 * ──────────────────────────────────────────── */

export const colors = {
  /* Primary brand — warm golden hour inspired */
  primary: {
    50: '#fef7e6',
    100: '#fdecc3',
    200: '#fbdf9c',
    300: '#f9d16f',
    400: '#f7c34a',
    500: '#f5b532', // Brand gold
    600: '#d4941e',
    700: '#a37014',
    800: '#724e0c',
    900: '#452d06',
    950: '#221502',
  },

  /* Neutral / editorial grays */
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    150: '#ededed',
    200: '#e0e0e0',
    300: '#c0c0c0',
    400: '#a0a0a0',
    500: '#808080',
    600: '#606060',
    700: '#404040',
    750: '#2e2e2e',
    800: '#1f1f1f',
    850: '#171717',
    900: '#0f0f0f',
    950: '#080808',
  },

  /* Glass UI colors */
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.12)',
      highlight: 'rgba(255, 255, 255, 0.04)',
      shadow: 'rgba(0, 0, 0, 0.06)',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.06)',
      border: 'rgba(255, 255, 255, 0.06)',
      highlight: 'rgba(255, 255, 255, 0.02)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
  },

  /* Accent / semantic */
  accent: {
    gold: '#f5b532',
    warm: '#f09b5a',
    fog: '#c8c2b8',
    sky: '#8faabe',
    leaf: '#7a8a6e',
  },

  /* Surface */
  surface: {
    light: '#ffffff',
    dark: '#080808',
    card: {
      light: '#fafafa',
      dark: '#0f0f0f',
    },
  },
} as const;

/* ────────────────────────────────────────────
 * Typography Scale
 * ──────────────────────────────────────────── */

export const typography = {
  fontFamily: {
    sans: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace",
    display: "'Geist', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.03em' }],
    '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em' }],
    '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.04em' }],
    '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.04em' }],
    '8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.05em' }],
    '9xl': ['8rem', { lineHeight: '8.5rem', letterSpacing: '-0.06em' }],
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

/* ────────────────────────────────────────────
 * Spacing Scale
 * ──────────────────────────────────────────── */

export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

/* ────────────────────────────────────────────
 * Border Radius
 * ──────────────────────────────────────────── */

export const borderRadius = {
  none: '0px',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.25rem',
  '4xl': '1.5rem',
  full: '9999px',
} as const;

/* ────────────────────────────────────────────
 * Glass Blur Values
 * ──────────────────────────────────────────── */

export const glassBlur = {
  subtle: '4px',
  light: '8px',
  medium: '16px',
  heavy: '24px',
  extreme: '40px',
} as const;

/* ────────────────────────────────────────────
 * Shadow Tokens
 * ──────────────────────────────────────────── */

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  glass: {
    light: '0 8px 32px rgba(0, 0, 0, 0.06)',
    dark: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
} as const;

/* ────────────────────────────────────────────
 * Animation Duration Tokens
 * ──────────────────────────────────────────── */

export const durations = {
  instant: '50ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
  intro: '1500ms',
  pageTransition: '600ms',
} as const;

/* ────────────────────────────────────────────
 * Easing Curves
 * ──────────────────────────────────────────── */

export const easings = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  /* Custom cubic-bezier curves */
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipate: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  cinematic: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

/* ────────────────────────────────────────────
 * Z-Index Scale
 * ──────────────────────────────────────────── */

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 100,
  sticky: 200,
  banner: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
} as const;

/* ────────────────────────────────────────────
 * Breakpoints (matches Tailwind defaults)
 * ──────────────────────────────────────────── */

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/* ────────────────────────────────────────────
 * Layout Constants
 * ──────────────────────────────────────────── */

export const layout = {
  maxWidth: '1440px',
  contentWidth: '1200px',
  navHeight: '64px',
  navHeightMobile: '56px',
  sectionPadding: {
    x: '1.5rem',
    y: '5rem',
  },
  sectionPaddingMobile: {
    x: '1rem',
    y: '3rem',
  },
} as const;
