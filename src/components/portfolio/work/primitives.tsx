'use client';

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/data/projects';

/* ─────────────────────────────────────────────
   DESIGN TOKEN ALIASES — one source of truth
   ───────────────────────────────────────────── */
export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const REVEAL_DURATION = '800ms';

/* ─────────────────────────────────────────────
   Reveal — self-observing wrapper so content animates
   when the reader actually reaches it
   ───────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  distance = 36,
  style,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  style?: CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ ...revealStyle(visible, delay, distance), ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   useReveal — IntersectionObserver reveal hook
   ───────────────────────────────────────────── */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Staggered editorial reveal style — single shared easing across the whole portfolio. */
export function revealStyle(visible: boolean, delayMs = 0, distance = 24): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: visible
      ? `opacity ${REVEAL_DURATION} ${EASE} ${delayMs}ms, transform ${REVEAL_DURATION} ${EASE} ${delayMs}ms`
      : 'none',
  };
}

/* ─────────────────────────────────────────────
   Micro-label — uppercase, wide tracking
   ───────────────────────────────────────────── */
export function Eyebrow({
  children,
  color = 'var(--c-text-tertiary)',
  align = 'start',
}: {
  children: ReactNode;
  color?: string;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <span
      className="font-sans uppercase"
      style={{
        fontSize: '9px',
        letterSpacing: '0.48em',
        color,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        justifyContent: align === 'center' ? 'center' : align === 'end' ? 'flex-end' : 'flex-start',
      }}
    >
      <span style={{ width: '16px', height: '1px', backgroundColor: 'currentColor', opacity: 0.35, display: 'inline-block', flexShrink: 0 }} />
      {children}
      <span style={{ width: '16px', height: '1px', backgroundColor: 'currentColor', opacity: 0.35, display: 'inline-block', flexShrink: 0 }} />
    </span>
  );
}

/* ─────────────────────────────────────────────
   Ghost index numeral — outlined display figure
   ───────────────────────────────────────────── */
export function IndexNumber({ children, size = 'clamp(3.5rem, 7vw, 8rem)' }: { children: ReactNode; size?: string }) {
  return (
    <span
      className="font-display block select-none"
      style={{
        fontSize: size,
        lineHeight: 0.8,
        color: 'transparent',
        WebkitTextStroke: '1px var(--c-border)',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Tech stack chips — quiet, hairline, no glow
   ───────────────────────────────────────────── */
export function StackChips({ stack }: { stack: string[] }) {
  if (!stack || stack.length === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <span className="font-sans uppercase" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--c-text-tertiary)' }}>
        ENGINEERING STACK
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {stack.map((tech) => (
          <span
            key={tech}
            data-cursor="hover"
            className="font-sans"
            style={{
              fontSize: '8px',
              letterSpacing: '0.2em',
              color: 'var(--c-text-tertiary)',
              border: '1px solid var(--c-border)',
              padding: '0.28rem 0.65rem',
              whiteSpace: 'nowrap',
              cursor: 'none',
              transition: 'border-color 350ms var(--ease-cinematic), color 350ms var(--ease-cinematic)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,232,0.3)';
              (e.currentTarget as HTMLElement).style.color = 'var(--c-text-secondary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--c-text-tertiary)';
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CTA — magnetic, arrow drifts on hover
   ───────────────────────────────────────────── */
export function CTAButton({ project }: { project: Project }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Subtle magnetic pull — restrained, spring-returned
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = 0;
    let active = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
      target.y = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      if (active) {
        el.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    const start = () => {
      active = true;
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(rafId);
      el.style.transition = `transform 900ms ${EASE}`;
      el.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 900);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', start);
    el.addEventListener('mouseleave', stop);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', start);
      el.removeEventListener('mouseleave', stop);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <button
      ref={ref}
      data-cursor="cta"
      className="group flex items-center gap-3"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'none',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rule that lengthens */}
      <span
        style={{
          width: hovered ? '48px' : '28px',
          height: '1px',
          backgroundColor: hovered ? 'rgba(245,240,232,0.5)' : 'var(--c-border)',
          transition: `width 500ms ${EASE}, background-color 350ms`,
        }}
      />
      <span
        className="font-sans uppercase"
        style={{
          fontSize: '9px',
          letterSpacing: '0.42em',
          color: hovered ? 'var(--c-text-primary)' : 'var(--c-text-tertiary)',
          transition: 'color 350ms',
        }}
      >
        View Project
      </span>
      {/* Directional arrow */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        style={{
          transition: `transform 500ms ${EASE}`,
          transform: hovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
        }}
      >
        <path
          d="M2 10L10 2M10 2H4.5M10 2V7.5"
          stroke={hovered ? project.color : 'var(--c-text-tertiary)'}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--c-text-tertiary)' }}>
        {project.year}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   ProjectVisual — image panel with elegant
   parallax depth, editorial caption reveal
   ───────────────────────────────────────────── */
export function ProjectVisual({
  project,
  isEven,
  sizes,
  ratio = '16/10',
  caption,
}: {
  project: Project;
  isEven: boolean;
  sizes: string;
  ratio?: string;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let rafId: number;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      inner.style.transform = `scale(1.02) translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      inner.style.transition = `transform 1000ms ${EASE}`;
      inner.style.transform = 'scale(1.02) translate(0, 0)';
      setTimeout(() => {
        if (inner) inner.style.transition = '';
      }, 1000);
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', start);
    container.addEventListener('mouseleave', stop);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseenter', start);
      container.removeEventListener('mouseleave', stop);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="view"
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: '100%',
        aspectRatio: ratio,
        cursor: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image surface — relative + resolved height so next/image fill has a valid parent */}
      <div
        ref={innerRef}
        className="relative w-full h-full"
        style={{ transform: 'scale(1.02)', willChange: 'transform' }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes={sizes}
          priority={project.index === '01'}
          loading={project.index === '01' ? undefined : 'lazy'}
        />
      </div>

      {/* Editorial caption — slides up through a mask, quiet scrim */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          background: 'linear-gradient(to top, rgba(5,4,3,0.85) 0%, rgba(5,4,3,0.25) 55%, rgba(5,4,3,0) 100%)',
          opacity: hovered ? 1 : 0,
          transition: `opacity 600ms ${EASE}`,
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            transform: hovered ? 'translateY(0)' : 'translateY(110%)',
            transition: `transform 800ms ${EASE}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '1.5rem',
              transform: hovered ? 'translateY(0)' : 'translateY(-18px)',
              transition: `transform 800ms ${EASE}`,
            }}
          >
            <p
              className="font-sans font-light"
              style={{
                fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.92)',
                maxWidth: '420px',
              }}
            >
              {caption ?? project.execution}
            </p>
            <span
              className="font-sans uppercase shrink-0"
              style={{
                fontSize: '8px',
                letterSpacing: '0.42em',
                color: project.color,
                whiteSpace: 'nowrap',
              }}
            >
              {isEven ? 'Read' : 'View'}
            </span>
          </div>
        </div>
      </div>

      {/* Category — quiet, always visible */}
      <div
        className="absolute"
        style={{
          top: 'clamp(1rem, 2vw, 1.5rem)',
          [isEven ? 'right' : 'left']: 'clamp(1rem, 2vw, 1.5rem)',
        }}
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(245,240,232,0.45)', lineHeight: 1 }}
        >
          {project.category}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   StoryBlock — Context → Thinking → Execution → Outcome
   Rendered as a numbered editorial grid
   ───────────────────────────────────────────── */
export function StoryBlock({ project }: { project: Project }) {
  // Self-observes so the chapters animate when the reader reaches them
  const { ref, visible } = useReveal<HTMLDivElement>();

  const chapters = [
    { label: 'Problem', text: project.context },
    { label: 'Architecture', text: project.thinking },
    { label: 'Implementation', text: project.execution },
    { label: 'Impact', text: project.outcome },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      style={{
        gap: 'clamp(1.5rem, 3vw, 3rem)',
        marginTop: 'clamp(2.5rem, 5vw, 5rem)',
      }}
    >
      {chapters.map((chapter, i) => (
        <div
          key={chapter.label}
          style={{
            borderTop: '1px solid var(--c-border)',
            paddingTop: '1.25rem',
            ...revealStyle(visible, i * 100),
          }}
        >
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: '0.9rem' }}
          >
            <span
              className="font-sans"
              style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'var(--c-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ width: '14px', height: '1px', backgroundColor: 'var(--c-border)' }} />
            <span
              className="font-sans uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.42em', color: 'var(--c-text-secondary)' }}
            >
              {chapter.label}
            </span>
          </div>
          <p
            className="font-sans font-light"
            style={{
              fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
              lineHeight: 1.75,
              color: 'var(--c-text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            {chapter.text}
          </p>
        </div>
      ))}
    </div>
  );
}
