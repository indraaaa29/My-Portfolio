export type TextAlignment = 'left' | 'center' | 'right';
export type VerticalAnchor = 'top' | 'center' | 'bottom';

export interface ScenePosition {
  /** Horizontal anchor */
  alignX: TextAlignment;
  /** Vertical anchor */
  alignY: VerticalAnchor;
  /** Offset from anchor edge */
  offsetX?: string;
  /** Offset from vertical edge */
  offsetY?: string;
}

export interface TypographyConfig {
  /** CSS font-size — use clamp() for responsiveness */
  fontSize: string;
  /** Font weight (300, 400, 500, 600, 700) */
  fontWeight: number;
  /** Line height */
  lineHeight: number;
  /** Text color — warm tones for golden-hour footage */
  color: string;
  /** Multi-layered text shadow for film-grade readability */
  textShadow: string;
}

export type AnimationPreset =
  | 'softFade'
  | 'fadeWithFloat'
  | 'fadeWithScale'
  | 'approachCenter'
  | 'blurResolve'
  | 'driftDown'
  | 'slowestFade';

export interface CinematicScene {
  id: string;
  message: string;
  startFrame: number;
  endFrame: number;
  alignment: TextAlignment;
  position: ScenePosition;
  maxWidth: string;
  fadeInFrames: number;
  fadeOutFrames: number;
  opacity: number;
  typography: TypographyConfig;
  animationPreset: AnimationPreset;
  letterSpacing?: string;
  transformOrigin?: string;
  /** Optional per-line styles for multi-line messages (e.g., Scene 7) */
  lineStyles?: Array<{
    fontSize?: string;
    fontWeight?: number;
    letterSpacing?: string;
  }>;
}

/**
 * CINEMATIC PORTFOLIO — STORYBOARD (LOCKED)
 *
 * FRAME CONTEXT (confirmed via visual inspection):
 * - Golden-hour alpine landscape with photographer silhouette
 * - Frame 250: Photographer in meadow with sunflowers, camera raised
 * - Frame 500: Photographer in same landscape, sunset behind mountains
 * - Frame 750: Similar alpine composition
 * - Frame 995: Closing landscape
 *
 * KEY COMPOSITION NOTES:
 * - Photographer is in center/lower-center foreground
 * - Upper sky has consistent negative space throughout
 * - Warm golden-hour light dominates (yellows, oranges, amber)
 * - Snow-capped mountains in background
 * - Safe text zones: upper sky quadrant, lower-left meadow, dark corners
 *
 * Total frames: 995
 */
export const scenes: CinematicScene[] = [
  // ── MOVEMENT I: CURIOSITY ──────────────────────────────────────
  // Frame 1-80: Establishing shot — wide landscape, sky dominant
  // Photographer likely small or entering frame
  // SAFE ZONE: Upper-left sky
  {
    id: 'curiosity-01',
    message: 'Technology changed how I think.',
    startFrame: 1,
    endFrame: 80,
    alignment: 'left',
    position: {
      alignX: 'left',
      alignY: 'top',
      offsetX: '6%',
      offsetY: '14%',
    },
    maxWidth: '22%',
    fadeInFrames: 20,
    fadeOutFrames: 20,
    opacity: 0.85,
    typography: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 600,
      lineHeight: 1.0,
      color: 'rgba(255, 248, 240, 0.88)',
      textShadow:
        '0 0 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)',
    },
    animationPreset: 'softFade',
    letterSpacing: '0.08em',
  },
  // Frame 81-165: Wide shot, photographer visible
  // SAFE ZONE: Upper-right sky, looking beyond
  {
    id: 'curiosity-02',
    message: 'It taught me to see systems.',
    startFrame: 81,
    endFrame: 165,
    alignment: 'right',
    position: {
      alignX: 'right',
      alignY: 'top',
      offsetX: '-7%',
      offsetY: '16%',
    },
    maxWidth: '32%',
    fadeInFrames: 15,
    fadeOutFrames: 15,
    opacity: 0.88,
    typography: {
      fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
      fontWeight: 400,
      lineHeight: 1.05,
      color: 'rgba(255, 245, 230, 0.85)',
      textShadow:
        '0 0 50px rgba(0,0,0,0.35), 0 3px 15px rgba(0,0,0,0.25)',
    },
    animationPreset: 'fadeWithFloat',
    letterSpacing: '0.1em',
  },

  // ── MOVEMENT II: PERSPECTIVE ───────────────────────────────────
  // Frame 166-245: Photographer in meadow with sunflowers
  // Camera raised, facing mountains. Sun setting behind.
  // SAFE ZONE: Upper-left sky above mountains
  {
    id: 'perspective-01',
    message: 'Code is not just syntax.',
    startFrame: 166,
    endFrame: 245,
    alignment: 'left',
    position: {
      alignX: 'left',
      alignY: 'top',
      offsetX: '7%',
      offsetY: '18%',
    },
    maxWidth: '35%',
    fadeInFrames: 18,
    fadeOutFrames: 18,
    opacity: 0.88,
    typography: {
      fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
      fontWeight: 500,
      lineHeight: 1.0,
      color: 'rgba(255, 250, 240, 0.90)',
      textShadow:
        '0 0 70px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
    },
    animationPreset: 'fadeWithFloat',
    letterSpacing: '0.05em',
  },
  // Frame 246-325: Photographer still, sun lower
  // SAFE ZONE: Upper-center sky (photographer is in lower-center foreground)
  {
    id: 'perspective-02',
    message: 'It is architecture.',
    startFrame: 246,
    endFrame: 325,
    alignment: 'center',
    position: {
      alignX: 'center',
      alignY: 'top',
      offsetX: '0',
      offsetY: '22%',
    },
    maxWidth: '30%',
    fadeInFrames: 18,
    fadeOutFrames: 18,
    opacity: 0.85,
    typography: {
      fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
      fontWeight: 500,
      lineHeight: 1.0,
      color: 'rgba(255, 248, 235, 0.88)',
      textShadow:
        '0 0 60px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.35)',
    },
    animationPreset: 'fadeWithScale',
    letterSpacing: '0.14em',
    transformOrigin: 'center bottom',
  },

  // ── MOVEMENT III: CREATION ─────────────────────────────────────
  // Frame 326-405: Photographer actively shooting, composing frame
  // The act of creation. Camera held up.
  // SAFE ZONE: Upper-left sky
  {
    id: 'creation-01',
    message: 'To solve a real problem,',
    startFrame: 326,
    endFrame: 405,
    alignment: 'left',
    position: {
      alignX: 'left',
      alignY: 'top',
      offsetX: '5%',
      offsetY: '14%',
    },
    maxWidth: '35%',
    fadeInFrames: 22,
    fadeOutFrames: 20,
    opacity: 0.88,
    typography: {
      fontSize: 'clamp(3rem, 6vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: 1.05,
      color: 'rgba(250, 245, 235, 0.88)',
      textShadow:
        '0 0 60px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.3)',
    },
    animationPreset: 'blurResolve',
    letterSpacing: '0.03em',
  },
  // Frame 406-485: Photographer lowering camera, looking at result
  // SAFE ZONE: Lower-right, darker area of meadow
  // Position: anchored 10% from bottom edge, text centered on that anchor
  {
    id: 'creation-02',
    message: 'you must understand the whole.',
    startFrame: 406,
    endFrame: 485,
    alignment: 'right',
    position: {
      alignX: 'right',
      alignY: 'bottom',
      offsetX: '-7%',
      offsetY: '10%',
    },
    maxWidth: '30%',
    fadeInFrames: 16,
    fadeOutFrames: 16,
    opacity: 0.90,
    typography: {
      fontSize: 'clamp(3rem, 6vw, 4.375rem)',
      fontWeight: 500,
      lineHeight: 1.0,
      color: 'rgba(255, 250, 240, 0.92)',
      textShadow:
        '0 0 70px rgba(0,0,0,0.5), 0 6px 30px rgba(0,0,0,0.35)',
    },
    animationPreset: 'driftDown',
    letterSpacing: '0.04em',
  },

  // ── MOVEMENT IV: INNOVATION ────────────────────────────────────
  // Frame 486-575: Golden hour deepening. Sun lower.
  // Longer shadows, richer colors.
  // SAFE ZONE: Upper-right sky
  {
    id: 'innovation-01',
    message: 'Strip away the noise.\nWhat remains?',
    startFrame: 486,
    endFrame: 575,
    alignment: 'right',
    position: {
      alignX: 'right',
      alignY: 'top',
      offsetX: '-7%',
      offsetY: '12%',
    },
    maxWidth: '35%',
    fadeInFrames: 25,
    fadeOutFrames: 25,
    opacity: 0.92,
    typography: {
      fontSize: 'clamp(3.5rem, 7vw, 5rem)',
      fontWeight: 300,
      lineHeight: 1.15,
      color: 'rgba(255, 245, 230, 0.95)',
      textShadow:
        '0 0 80px rgba(0,0,0,0.45), 0 6px 30px rgba(0,0,0,0.35)',
    },
    animationPreset: 'blurResolve',
    letterSpacing: '0.03em',
    lineStyles: [
      { fontSize: 'clamp(3.25rem, 6.5vw, 5.125rem)' },
      { fontSize: 'clamp(3.75rem, 7.5vw, 5.75rem)', letterSpacing: '-0.02em' },
    ],
  },
  // Frame 576-655: Photographer in contemplation
  // Camera lowered, looking at landscape
  // SAFE ZONE: Upper-center sky (photographer is in lower foreground)
  {
    id: 'innovation-02',
    message: 'The core engineering.',
    startFrame: 576,
    endFrame: 655,
    alignment: 'center',
    position: {
      alignX: 'center',
      alignY: 'top',
      offsetX: '0',
      offsetY: '24%',
    },
    maxWidth: '30%',
    fadeInFrames: 20,
    fadeOutFrames: 20,
    opacity: 0.92,
    typography: {
      fontSize: 'clamp(3rem, 6vw, 4.25rem)',
      fontWeight: 400,
      lineHeight: 1.0,
      color: 'rgba(255, 250, 240, 0.88)',
      textShadow:
        '0 0 60px rgba(0,0,0,0.4), 0 3px 15px rgba(0,0,0,0.3)',
    },
    animationPreset: 'softFade',
    letterSpacing: '0.06em',
  },

  // ── MOVEMENT V: IDENTITY ───────────────────────────────────────
  // Frame 656-735: Photographer's silhouette prominent
  // Sun behind, creating dramatic backlighting
  // SAFE ZONE: Lower-left corner (dark area, away from sun)
  {
    id: 'identity-01',
    message: 'I don\'t just write software.',
    startFrame: 656,
    endFrame: 735,
    alignment: 'left',
    position: {
      alignX: 'left',
      alignY: 'bottom',
      offsetX: '5%',
      offsetY: '10%',
    },
    maxWidth: '32%',
    fadeInFrames: 18,
    fadeOutFrames: 18,
    opacity: 0.90,
    typography: {
      fontSize: 'clamp(2.75rem, 5.5vw, 4rem)',
      fontWeight: 400,
      lineHeight: 1.0,
      color: 'rgba(235, 230, 220, 0.85)',
      textShadow:
        '0 0 80px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)',
    },
    animationPreset: 'driftDown',
    letterSpacing: '0.05em',
  },
  // Frame 736-815: The climax — intense golden light
  // Sun near horizon, sky on fire with color
  // SAFE ZONE: Center, slightly above the horizon glow
  {
    id: 'identity-02',
    message: 'I build platforms.',
    startFrame: 736,
    endFrame: 815,
    alignment: 'center',
    position: {
      alignX: 'center',
      alignY: 'center',
      offsetX: '0',
      offsetY: '-6%',
    },
    maxWidth: '26%',
    fadeInFrames: 16,
    fadeOutFrames: 16,
    opacity: 0.98,
    typography: {
      fontSize: 'clamp(4rem, 8vw, 6rem)',
      fontWeight: 700,
      lineHeight: 1.0,
      color: 'rgba(255, 240, 220, 0.98)',
      textShadow:
        '0 0 100px rgba(0,0,0,0.3), 0 0 40px rgba(255,180,100,0.15), 0 4px 20px rgba(0,0,0,0.4)',
    },
    animationPreset: 'fadeWithScale',
    letterSpacing: '-0.01em',
    transformOrigin: 'center center',
  },

  // ── MOVEMENT VI: WELCOME ───────────────────────────────────────
  // Frame 816-895: Golden hour fading into twilight
  // Cooler tones, softer light
  // SAFE ZONE: Upper-left sky
  {
    id: 'welcome-01',
    message: 'This is my journey.',
    startFrame: 816,
    endFrame: 895,
    alignment: 'left',
    position: {
      alignX: 'left',
      alignY: 'top',
      offsetX: '7%',
      offsetY: '16%',
    },
    maxWidth: '25%',
    fadeInFrames: 20,
    fadeOutFrames: 20,
    opacity: 0.90,
    typography: {
      fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
      fontWeight: 400,
      lineHeight: 1.0,
      color: 'rgba(255, 250, 245, 0.90)',
      textShadow:
        '0 0 60px rgba(0,0,0,0.4), 0 3px 15px rgba(0,0,0,0.25)',
    },
    animationPreset: 'approachCenter',
    letterSpacing: '0.08em',
  },
  // Frame 896-995: Final scene — dusk/twilight
  // Photographer lowered, scene closing
  // SAFE ZONE: Bottom-center
  {
    id: 'welcome-02',
    message: 'Welcome to the architecture.',
    startFrame: 896,
    endFrame: 995,
    alignment: 'center',
    position: {
      alignX: 'center',
      alignY: 'bottom',
      offsetX: '0',
      offsetY: '14%',
    },
    maxWidth: '28%',
    fadeInFrames: 30,
    fadeOutFrames: 30,
    opacity: 0.82,
    typography: {
      fontSize: 'clamp(3.25rem, 6.5vw, 4.5rem)',
      fontWeight: 500,
      lineHeight: 1.0,
      color: 'rgba(255, 248, 235, 0.80)',
      textShadow:
        '0 0 80px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.35)',
    },
    animationPreset: 'slowestFade',
    letterSpacing: '0.14em',
  },
];

/* ── Helper Functions ────────────────────────────────────── */

/** Cubic ease-in-out for cinematic opacity transitions */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Compute the cinematic opacity of a scene at a given frame.
 * Uses cubic ease-in-out for organic, film-like fades.
 * Returns 0 when the scene is not active.
 */
export function computeSceneOpacity(frame: number, scene: CinematicScene): number {
  const { startFrame, endFrame, fadeInFrames, fadeOutFrames } = scene;
  if (frame < startFrame || frame > endFrame) return 0;
  if (frame < startFrame + fadeInFrames) {
    const rawProgress = (frame - startFrame) / fadeInFrames;
    return easeInOutCubic(rawProgress);
  }
  if (frame > endFrame - fadeOutFrames) {
    const rawProgress = (endFrame - frame) / fadeOutFrames;
    return easeInOutCubic(rawProgress);
  }
  return 1;
}

export function findActiveScene(frame: number): CinematicScene | null {
  for (const scene of scenes) {
    if (frame >= scene.startFrame && frame <= scene.endFrame) {
      return scene;
    }
  }
  return null;
}
