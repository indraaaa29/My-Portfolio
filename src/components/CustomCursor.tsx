'use client';

import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'hover' | 'view' | 'cta';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ────────────────────────────────────────────
   SOFT GLASS ORB CURSOR
   ──────────────────────────────────────────── */

/**
 * Premium glass-orb cursor — a subtle translucent orb with a luminous center.
 *   default : small dot + compact glass orb (~26px)
 *   hover   : orb expands (~40px), glow intensifies subtly
 *   view    : same as hover (data-cursor="view" surfaces)
 *   cta     : same as hover (data-cursor="cta" surfaces)
 *
 * Architecture:
 *   dotRef (outer)    — RAF owns transform: translate3d(…) exclusively
 *     └ dotInnerRef   — CSS transitions own transform: scale(…) for click
 *   orbRef (outer)    — RAF owns transform: translate3d(…) exclusively
 *     └ orbInnerRef   — CSS transitions own transform: scale(…) for click/hover
 *
 * Click state uses a ref (not React state) to avoid re-renders that would
 * overwrite RAF-set transforms with JSX initial values.
 */
export default function CustomCursor() {
  /* Touch device guard — render nothing on coarse pointers */
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!isFinePointer) return null;

  return <GlassOrbCursorInner />;
}

function GlassOrbCursorInner() {
  const dotRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbInnerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(true);

  /* Click state as a ref — avoids re-renders that would overwrite RAF transforms */
  const clicking = useRef(false);

  const pos = useRef({ x: -100, y: -100 });
  const orbPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    /* Mouse position */
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    /* Click — use pointer events for reliable capture + cancel handling */
    const onPointerDown = () => {
      clicking.current = true;
      applyClickVisuals(true);
    };
    const onPointerUp = () => {
      clicking.current = false;
      applyClickVisuals(false);
    };
    /* pointercancel fires when the browser aborts the pointer (e.g. touch cancel) */
    const onPointerCancel = () => {
      clicking.current = false;
      applyClickVisuals(false);
    };

    /* Apply click scale directly to DOM — no React re-render needed */
    const applyClickVisuals = (down: boolean) => {
      if (orbInnerRef.current) {
        orbInnerRef.current.style.transform = down ? 'scale(0.85)' : 'scale(1)';
      }
      if (dotInnerRef.current) {
        dotInnerRef.current.style.transform = down ? 'scale(0.6)' : 'scale(1)';
      }
    };

    /* Resolve cursor mode from data-cursor attributes, with fallbacks */
    const resolveMode = (el: HTMLElement | null): CursorMode => {
      if (!el) return 'default';
      const target = el.closest<HTMLElement>('[data-cursor]');
      if (target) {
        const attr = target.getAttribute('data-cursor');
        if (attr === 'view') return 'view';
        if (attr === 'cta') return 'cta';
        return 'hover';
      }
      if (el.closest('a, button, [role="button"]')) return 'hover';
      return 'default';
    };

    const onEnter = (e: MouseEvent) => {
      setMode(resolveMode(e.target as HTMLElement | null));
    };

    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      setMode(related ? resolveMode(related) : 'default');
    };

    /* Viewport exit / entry */
    const onDocLeave = () => {
      setIsVisible(false);
      /* Safety: clear click state when pointer leaves viewport */
      if (clicking.current) {
        clicking.current = false;
        applyClickVisuals(false);
      }
    };
    const onDocEnter = () => setIsVisible(true);

    /* Register events */
    window.addEventListener('mousemove', onMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.documentElement.addEventListener('mouseleave', onDocLeave);
    document.documentElement.addEventListener('mouseenter', onDocEnter);

    /* Smooth orb animation loop — single RAF */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      orbPos.current.x = lerp(orbPos.current.x, pos.current.x, 0.13);
      orbPos.current.y = lerp(orbPos.current.y, pos.current.y, 0.13);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbPos.current.x}px, ${orbPos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* Cleanup */
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      document.documentElement.removeEventListener('mouseenter', onDocEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Derived state (only recalculated on mode/visibility changes) ── */
  /* hover / view / cta all produce the expanded orb — unified interactive state */
  const isInteractive = mode === 'hover' || mode === 'view' || mode === 'cta';

  /* Orb sizing — default ~26px, interactive ~40px */
  const orbSize = isInteractive ? 40 : 26;

  /* ── Orb appearance tokens ── */
  /* Warm cream base: #F5F0E8 → rgba(245,240,232,...) */
  const orbBg = isInteractive
    ? 'radial-gradient(circle at 38% 36%, rgba(245,240,232,0.10) 0%, rgba(245,240,232,0.04) 55%, transparent 100%)'
    : 'radial-gradient(circle at 38% 36%, rgba(245,240,232,0.07) 0%, rgba(245,240,232,0.025) 55%, transparent 100%)';

  const orbBorder = isInteractive
    ? '1px solid rgba(245,240,232,0.13)'
    : '1px solid rgba(245,240,232,0.08)';

  const orbShadow = isInteractive
    ? '0 0 16px 3px rgba(245,240,232,0.06), inset 0 0 8px rgba(245,240,232,0.04)'
    : '0 0 10px 2px rgba(245,240,232,0.035), inset 0 0 5px rgba(245,240,232,0.025)';

  /* Dot opacity — dim slightly on interactive */
  const dotOpacity = isVisible ? (isInteractive ? 0.55 : 0.9) : 0;

  return (
    <>
      {/* ── Central dot wrapper — RAF exclusively owns `transform` ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: '4px',
          height: '4px',
          marginLeft: '-2px',
          marginTop: '-2px',
          opacity: dotOpacity,
          transition: `opacity 300ms ${EASE}`,
        }}
      >
        {/* Inner dot — CSS transitions own `transform: scale(…)` */}
        <div
          ref={dotInnerRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'var(--c-text-primary)',
            boxShadow: '0 0 4px rgba(245,240,232,0.3)',
            transform: clicking.current ? 'scale(0.6)' : 'scale(1)',
            transformOrigin: 'center',
            transition: `transform 200ms ${EASE}`,
          }}
        />
      </div>

      {/* ── Glass orb wrapper — RAF exclusively owns `transform` ── */}
      <div
        ref={orbRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          /* Fixed generous size — the visible orb scales inside */
          width: '48px',
          height: '48px',
          marginLeft: '-24px',
          marginTop: '-24px',
          opacity: isVisible ? 1 : 0,
          transition: `opacity 300ms ${EASE}`,
        }}
      >
        {/* Inner orb disc — CSS transitions own `transform: scale(…)` */}
        <div
          ref={orbInnerRef}
          style={{
            position: 'absolute',
            /* Center the variable-size orb inside the fixed 48px container */
            top: `${(48 - orbSize) / 2}px`,
            left: `${(48 - orbSize) / 2}px`,
            width: `${orbSize}px`,
            height: `${orbSize}px`,
            borderRadius: '50%',
            background: orbBg,
            border: orbBorder,
            boxShadow: orbShadow,
            backdropFilter: 'blur(1.5px)',
            WebkitBackdropFilter: 'blur(1.5px)',
            transform: clicking.current ? 'scale(0.85)' : 'scale(1)',
            transformOrigin: 'center',
            transition: `width 400ms ${EASE}, height 400ms ${EASE}, top 400ms ${EASE}, left 400ms ${EASE}, background 400ms ${EASE}, border 400ms ${EASE}, box-shadow 400ms ${EASE}, transform 180ms ${EASE}`,
          }}
        />
      </div>
    </>
  );
}
