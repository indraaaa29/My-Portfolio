'use client';

import { useEffect, useRef } from 'react';
import TextPressure from '@/components/reactbits/TextPressure';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Separate wrappers for parallax so reveal transforms don't conflict
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null);
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null);
  // Reveal targets (translateY only — separate from parallax wrappers)
  const revealLine1Ref = useRef<HTMLDivElement>(null);
  const revealLine2Ref = useRef<HTMLDivElement>(null);
  const revealMetaRef = useRef<HTMLDivElement>(null);
  const revealTopRef = useRef<HTMLDivElement>(null);

  // ── ENTRANCE ANIMATION ────────────────────────
  useEffect(() => {
    const entries = [
      { el: revealTopRef.current, delay: 0 },
      { el: revealLine1Ref.current, delay: 120 },
      { el: revealLine2Ref.current, delay: 240 },
      { el: revealMetaRef.current, delay: 380 },
    ];

    entries.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });

    // Single rAF after first paint to trigger transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        entries.forEach(({ el, delay }) => {
          if (!el) return;
          el.style.transition = `opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  // ── MOUSE PARALLAX ────────────────────────────
  // Uses a SEPARATE wrapper div so it never conflicts with the reveal transforms
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.055;
      current.y += (target.y - current.y) * 0.055;

      // Layer 1 moves slightly — name line
      if (parallaxLayer1Ref.current) {
        parallaxLayer1Ref.current.style.transform =
          `translateX(${current.x * -6}px) translateY(${current.y * -5}px)`;
      }
      // Layer 2 moves more — creates depth separation
      if (parallaxLayer2Ref.current) {
        parallaxLayer2Ref.current.style.transform =
          `translateX(${current.x * -12}px) translateY(${current.y * -10}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    container.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundColor: 'var(--c-bg)',
        padding: 'clamp(1.75rem, 4vw, 4.5rem)',
      }}
    >

      {/* ── TOP METADATA ROW ───────────────────── */}
      <div ref={revealTopRef} className="flex items-start justify-between">
        {/* Left: Disciplines */}
        <div className="flex flex-col gap-[3px]">
          {['Full Stack Developer', 'AI Engineer'].map((label) => (
            <span
              key={label}
              className="font-sans uppercase"
              style={{
                fontSize: '9px',
                letterSpacing: '0.42em',
                color: 'var(--c-text-tertiary)',
                lineHeight: 1.4,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Right: Status */}
        <div className="flex flex-col items-end gap-[3px]">
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.42em',
              color: 'var(--c-text-tertiary)',
            }}
          >
            Available for Projects
          </span>
          <div className="flex items-center gap-2">
            {/* Warm availability dot — not saturated green */}
            <div
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: '#A8C4A2',
                opacity: 0.9,
              }}
            />
            <span
              className="font-sans"
              style={{
                fontSize: '9px',
                letterSpacing: '0.3em',
                color: 'var(--c-text-tertiary)',
              }}
            >
              2026
            </span>
          </div>
        </div>
      </div>

      {/* ── CENTER DISPLAY TYPE ─────────────────── */}
      <div className="flex flex-col w-full relative" style={{ marginTop: 'auto', marginBottom: 'auto', paddingBlock: '2vw' }}>

        {/* LINE 1: Interactive Name */}
        <div ref={revealLine1Ref} className="w-full">
          {/* Parallax wrapper */}
          <div ref={parallaxLayer1Ref} style={{ willChange: 'transform', width: '100%', height: 'min(20vw, 240px)' }}>
            <TextPressure
              text="INDRANIL PAUL"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#F5F5F5"
              strokeColor="#F5F5F5"
              minFontSize={96}
            />
          </div>
        </div>

        {/* LINE 2: Descriptor */}
        <div ref={revealLine2Ref} className="w-full flex justify-end">
          <div
            ref={parallaxLayer2Ref}
            className="flex items-end"
            style={{
              willChange: 'transform',
            }}
          >
            <div
              className="hidden lg:flex flex-col gap-2"
              style={{
                maxWidth: '250px',
                paddingTop: '2rem',
                flexShrink: 0,
              }}
            >
              <div
                className="h-[1px] w-full"
                style={{ backgroundColor: 'var(--c-border)' }}
              />
              <p
                className="font-sans font-light"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: 1.65,
                  color: 'var(--c-text-secondary)',
                  letterSpacing: '0.01em',
                }}
              >
                Bridging the gap between intelligent systems, scalable web architecture, and secure infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ─────────────────────────── */}
      <div ref={revealMetaRef} className="flex items-end justify-between">

        {/* Left: CTA */}
        <div className="flex flex-col gap-5">
          {/* Small meta line */}
          <div className="flex items-center gap-3">
            <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--c-border)' }} />
            <span
              className="font-sans uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.42em', color: 'var(--c-text-tertiary)' }}
            >
              Est. 2019
            </span>
          </div>

          {/* CTA Button */}
          <button
            data-cursor="hover"
            className="group flex items-center gap-4"
            style={{ background: 'none', border: 'none', padding: 0 }}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Circle arrow */}
            <div
              className="flex items-center justify-center rounded-full border"
              style={{
                width: '44px',
                height: '44px',
                borderColor: 'var(--c-border)',
                flexShrink: 0,
                transition: 'border-color 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,232,0.4)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(245,240,232,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{
                  transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M2 12L12 2M12 2H5.5M12 2V8.5"
                  stroke="var(--c-text-primary)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* CTA label */}
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '10px',
                letterSpacing: '0.32em',
                color: 'var(--c-text-secondary)',
                transition: 'color 300ms',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-text-secondary)')}
            >
              Selected Work
            </span>
          </button>
        </div>

        {/* Right: Vertical scroll indicator */}
        <div className="flex flex-col items-center gap-3">
          {/* Animated line track */}
          <div
            style={{
              width: '1px',
              height: '56px',
              backgroundColor: 'var(--c-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Descending fill — proper scroll indicator motion */}
            <div
              style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--c-text-tertiary)',
                animation: 'scrollIndicator 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
              }}
            />
          </div>
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '8px',
              letterSpacing: '0.5em',
              color: 'var(--c-text-tertiary)',
              writingMode: 'vertical-rl',
              marginTop: '4px',
            }}
          >
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
