'use client';

import {
  useRef,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/components/animations/MotionProvider';
import styles from './ScrollReveal.module.css';

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface ScrollRevealProps {
  /** Content to animate — typically string text */
  children?: ReactNode;
  /** Optional custom scroll container ref (e.g. for horizontal scroll) */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  /** Enable blur reveal effect */
  enableBlur?: boolean;
  /** Starting opacity of each word (0–1) */
  baseOpacity?: number;
  /** Starting rotation in degrees */
  baseRotation?: number;
  /** Blur strength in pixels when enableBlur is true */
  blurStrength?: number;
  /** Additional class for the outer container */
  containerClassName?: string;
  /** Additional class for the inner text wrapper */
  textClassName?: string;
  /** ScrollTrigger end point for the rotation animation */
  rotationEnd?: string;
  /** ScrollTrigger end point for the word reveal animation */
  wordAnimationEnd?: string;
}

/* ──────────────────────────────────────────────
 * Register ScrollTrigger once at module level
 * ────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────── */

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { reducedMotion, gsapEnabled } = useMotion();

  /* ─── Split text into individual word spans ─── */

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className={styles.word} key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  /* ─── GSAP animations — scoped via gsap.context() ───
   *
   *  gsap.context() ensures every GSAP timeline, tween, and
   *  ScrollTrigger created within the callback is scoped to
   *  the container element. On cleanup, ctx.revert() kills
   *  ONLY these animations — unrelated ScrollTriggers in
   *  other components are never touched.
   * ───────────────────────────────────────────────────── */

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion || !gsapEnabled) return;

    const scroller =
      scrollContainerRef?.current ?? window;

    const ctx = gsap.context(
      () => {
        /* Container rotation */
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: true,
            },
          },
        );

        /* Word opacity reveal */
        const wordElements =
          el.querySelectorAll<HTMLElement>(`.${styles.word}`);

        if (wordElements.length > 0) {
          gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
              ease: 'none',
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom-=20%',
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }

        /* Optional blur reveal */
        if (enableBlur && blurStrength > 0 && wordElements.length > 0) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: 'none',
              filter: 'blur(0px)',
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom-=20%',
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }
      },
      el, // scope — all GSAP animations are tied to this element
    );

    return () => {
      ctx.revert(); // kills only this context's animations
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    reducedMotion,
    gsapEnabled,
  ]);

  /* ─── Reduced motion / GSAP disabled — static rendering ─── */

  if (reducedMotion || !gsapEnabled) {
    return (
      <h2 className={`${styles.container} ${containerClassName}`}>
        <p className={`${styles.text} ${textClassName}`}>{children}</p>
      </h2>
    );
  }

  /* ─── Standard render with split text animation ─── */

  return (
    <h2 ref={containerRef} className={`${styles.container} ${containerClassName}`}>
      <p className={`${styles.text} ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
