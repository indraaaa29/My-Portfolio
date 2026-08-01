'use client';

import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'hover' | 'view' | 'cta';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Premium cursor — restraint is the luxury.
 *   default : small elegant dot + thin ring
 *   hover   : ring widens, dot dims
 *   view    : thin luxury ring with reading label (image surfaces)
 *   cta     : directional arrow inside a tight ring
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    // Resolve cursor mode from data-cursor attributes, with fallbacks
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

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    // Smooth ring animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isView = mode === 'view';
  const isCta = mode === 'cta';
  const isHover = mode === 'hover';

  const ringSize = isView ? 64 : isCta ? 44 : isHover ? 40 : 28;

  return (
    <>
      {/* Precise dot — follows cursor exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: '5px',
          height: '5px',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          borderRadius: '50%',
          backgroundColor: 'var(--c-text-primary)',
          opacity: isView ? 0 : isCta ? 0.6 : isHover ? 0.5 : 1,
          transition: `opacity 300ms ${EASE}, scale 200ms ${EASE}`,
          transform: 'translate(-100px, -100px)',
          mixBlendMode: 'difference',
          scale: isClicking ? '0.6' : '1',
        }}
      />

      {/* Lagging ring — thin, widens by mode, content nested so it travels with the ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `${-ringSize / 2}px`,
          marginTop: `${-ringSize / 2}px`,
          borderRadius: '50%',
          border: isView
            ? '1px solid rgba(245,240,232,0.85)'
            : '1px solid rgba(245,240,232,0.4)',
          background: isView ? 'rgba(245,240,232,0.06)' : 'transparent',
          transition: `width 400ms ${EASE}, height 400ms ${EASE}, margin 400ms ${EASE}, opacity 250ms, background-color 400ms, border-color 400ms`,
          transform: 'translate(-100px, -100px)',
          opacity: isClicking ? 0.4 : 1,
          mixBlendMode: isView ? 'normal' : 'difference',
          backdropFilter: isView ? 'blur(1.5px)' : 'none',
        }}
      >
        {isView && (
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '8px',
              letterSpacing: '0.34em',
              color: 'var(--c-text-primary)',
              paddingLeft: '0.34em', // optically center tracked text
              opacity: isClicking ? 0.6 : 1,
              transition: `opacity 250ms ${EASE}`,
            }}
          >
            View
          </span>
        )}

        {isCta && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              opacity: isClicking ? 0.6 : 1,
              transition: `opacity 250ms ${EASE}`,
            }}
          >
            <path
              d="M4 12L12 4M12 4H6.5M12 4V9.5"
              stroke="var(--c-text-primary)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  );
}
