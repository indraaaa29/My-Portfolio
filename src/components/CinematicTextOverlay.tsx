'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';
import {
  CinematicScene,
  findActiveScene,
  computeSceneOpacity,
} from '@/data/cinematicScenes';

export interface CinematicTextOverlayHandle {
  /** Called every frame by the GSAP timeline to update the overlay */
  updateFrame: (frame: number) => void;
}

/**
 * CinematicTextOverlay
 *
 * Renders the currently active scene's text as a single absolutely-positioned
 * element. Updates are applied directly to the DOM via refs — no React
 * re-renders occur during scroll, ensuring 60fps performance.
 *
 * Each scene's typography (size, weight, color, shadow, spacing) is applied
 * from its TypographyConfig on scene change, making every frame feel like
 * an intentionally composed movie poster.
 */
export interface CinematicTextOverlayProps {
  className?: string;
}

const CinematicTextOverlay = forwardRef<CinematicTextOverlayHandle, CinematicTextOverlayProps>(
  (_props, ref) => {
    const textRef = useRef<HTMLDivElement>(null);

    // Store current scene data in refs to avoid re-renders
    const currentSceneRef = useRef<CinematicScene | null>(null);
    const lastFrameRef = useRef(-1);

    /**
     * Build the base CSS transform string from the scene's position config.
     * Separate from animation transforms so they compose correctly.
     */
    function getBaseTransform(scene: CinematicScene): string {
      const parts: string[] = [];
      if (scene.position.alignX === 'center') {
        parts.push('translateX(-50%)');
      }
      parts.push('translateY(-50%)');
      return parts.join(' ');
    }

    /**
     * Apply all scene-specific layout and typography to the DOM element.
     * Called only when the active scene changes — not on every frame.
     */
    function applySceneLayout(el: HTMLDivElement, scene: CinematicScene) {
      const {
        message,
        alignment,
        position,
        maxWidth,
        typography,
        letterSpacing,
        transformOrigin,
      } = scene;

      // ── Content (with optional per-line styling for multi-line messages) ──
      const lineStyles = scene.lineStyles;
      if (lineStyles && message.includes('\n')) {
        const lines = message.split('\n');
        el.innerHTML = lines
          .map((line, i) => {
            const style = lineStyles[i];
            if (style) {
              const attrs: string[] = [];
              if (style.fontSize) attrs.push(`font-size:${style.fontSize}`);
              if (style.fontWeight) attrs.push(`font-weight:${style.fontWeight}`);
              if (style.letterSpacing) attrs.push(`letter-spacing:${style.letterSpacing}`);
              return `<span style="${attrs.join(';')}">${line}</span>`;
            }
            return line;
          })
          .join('<br>');
      } else {
        el.innerHTML = message.replace(/\n/g, '<br>');
      }
      el.style.textAlign = alignment;

      // ── Position ──
      el.style.left = 'auto';
      el.style.right = 'auto';
      el.style.top = 'auto';
      el.style.bottom = 'auto';

      if (position.alignX === 'left') {
        el.style.left = position.offsetX ?? '0';
      } else if (position.alignX === 'right') {
        el.style.right = position.offsetX ?? '0';
      } else {
        el.style.left = '50%';
      }

      if (position.alignY === 'top') {
        el.style.top = position.offsetY ?? '0';
      } else if (position.alignY === 'bottom') {
        el.style.bottom = position.offsetY ?? '0';
      } else if (position.offsetY) {
        // Center with vertical offset (e.g., Scene 10 positioned -6% above center)
        if (position.offsetY.startsWith('-') || position.offsetY.startsWith('+')) {
          el.style.top = `calc(50% ${position.offsetY})`;
        } else {
          el.style.top = `calc(50% + ${position.offsetY})`;
        }
      } else {
        el.style.top = '50%';
      }

      // ── Dimensions ──
      el.style.maxWidth = maxWidth;

      // ── Per-scene Typography ──
      el.style.fontSize = typography.fontSize;
      el.style.fontWeight = String(typography.fontWeight);
      el.style.lineHeight = String(typography.lineHeight);
      el.style.color = typography.color;
      el.style.textShadow = typography.textShadow;

      // ── Letter spacing ──
      el.style.letterSpacing = letterSpacing ?? '';

      // ── Transform origin ──
      el.style.transformOrigin = transformOrigin ?? 'center center';

      // ── Reset filter from previous scene (e.g., blurResolve) ──
      el.style.filter = 'none';

    }

    /**
     * Compose the full transform by combining base positioning with
     * animation-preset-specific transforms.
     */
    function composeTransform(
      scene: CinematicScene,
      opacityProgress: number
    ): string {
      const base = getBaseTransform(scene);
      const preset = scene.animationPreset;

      switch (preset) {
        case 'fadeWithFloat': {
          // Upward float: -2px at start → 0 at full opacity
          const progress = Math.min(1, opacityProgress * 2);
          const floatY = (1 - progress) * -2;
          return base.replace(
            /translateY\([^)]+\)/,
            `translateY(calc(-50% + ${floatY}px))`
          );
        }
        case 'fadeWithScale': {
          // Scale: 0.98 → 1.0 during fade-in
          const scaleProgress =
            opacityProgress < 1
              ? 0.98 + 0.02 * opacityProgress
              : 1;
          return `${base} scale(${scaleProgress})`;
        }
        case 'approachCenter': {
          // Horizontal drift toward resting position
          const driftX = (1 - opacityProgress) * 30;
          if (scene.position.alignX === 'center') {
            // Centered text: start further left, drift to true center
            return `translateX(calc(-50% - ${driftX}px)) translateY(-50%)`;
          }
          // Left-aligned text: start further left, drift to natural position
          return `translateY(-50%) translateX(${driftX}px)`;
        }
        case 'driftDown': {
          // Downward float: +2px at start → 0 at full opacity
          const progress = Math.min(1, opacityProgress * 2);
          const floatY = (1 - progress) * 2;
          return base.replace(
            /translateY\([^)]+\)/,
            `translateY(calc(-50% + ${floatY}px))`
          );
        }
        case 'blurResolve':
          // Blur is handled separately via filter in updateFrame
          return base;
        case 'slowestFade':
        case 'softFade':
        default:
          return base;
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        updateFrame: (frame: number) => {
          if (frame === lastFrameRef.current) return;
          lastFrameRef.current = frame;

          const scene = findActiveScene(frame);
          const el = textRef.current;
          if (!el) return;

          // ── No active scene → hide ──
          if (!scene) {
            el.style.display = 'none';
            currentSceneRef.current = null;
            return;
          }

          // ── Scene changed → full layout ──
          if (scene !== currentSceneRef.current) {
            currentSceneRef.current = scene;
            applySceneLayout(el, scene);
            el.style.display = 'block';
          }

          // ── Opacity ──
          const rawOpacity = computeSceneOpacity(frame, scene);
          const finalOpacity = rawOpacity * scene.opacity;
          el.style.opacity = String(finalOpacity);

          // ── Animation transform ──
          const transform = composeTransform(scene, rawOpacity);
          el.style.transform = transform;

          // ── Blur resolve (filters not part of transforms) ──
          if (scene.animationPreset === 'blurResolve') {
            const blurAmount = Math.max(0, 3 * (1 - rawOpacity));
            el.style.filter = `blur(${blurAmount}px)`;
          } else if (el.style.filter !== 'none') {
            el.style.filter = 'none';
          }
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    return (
      <div
        className="cinematic-text-overlay"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          ref={textRef}
          className="cinematic-text"
          style={{ display: 'none' }}
        />
      </div>
    );
  }
);

CinematicTextOverlay.displayName = 'CinematicTextOverlay';

export default CinematicTextOverlay;
