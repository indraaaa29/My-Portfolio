'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type CSSProperties,
} from 'react';
import { Roboto_Flex } from 'next/font/google';
import styles from './TextPressure.module.css';

/* ──────────────────────────────────────────────
 * Font — Roboto Flex loaded via next/font
 * ────────────────────────────────────────────── */

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-flex',
  axes: ['slnt', 'wdth'],
  preload: true,
});

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface TextPressureProps {
  /** Text to display. Supports \n for multiline. */
  text?: string;
  /** Font family name. Defaults to next/font-loaded Roboto Flex. */
  fontFamily?: string;
  /**
   * Google Fonts URL for custom fonts.
   * When provided, a dynamic @import style tag is injected
   * instead of using the default next/font Roboto Flex.
   */
  fontUrl?: string;
  /** Enable variable width distortion */
  width?: boolean;
  /** Enable variable weight distortion */
  weight?: boolean;
  /** Enable variable italic distortion */
  italic?: boolean;
  /** Enable opacity distortion (fades chars near cursor) */
  alpha?: boolean;
  /** Use flexbox layout for balanced character spacing */
  flex?: boolean;
  /** Enable stroke outline effect */
  stroke?: boolean;
  /** Scale text vertically to fill container height */
  scale?: boolean;
  /** Text color */
  textColor?: string;
  /** Stroke outline color */
  strokeColor?: string;
  /** Additional CSS class name */
  className?: string;
  /** Minimum font size in pixels */
  minFontSize?: number;
  /** Unique id for the injected font style tag (required for custom fontUrl) */
  fontStyleId?: string;
}

interface Point {
  x: number;
  y: number;
}

/* ──────────────────────────────────────────────
 * Utility
 * ────────────────────────────────────────────── */

function dist(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getAttr(
  distance: number,
  maxDist: number,
  minVal: number,
  maxVal: number,
): number {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
}

/* ──────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────── */

export default function TextPressure({
  text = 'Compressa',
  fontFamily,
  fontUrl,
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24,
  fontStyleId,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafIdRef = useRef<number>(0);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = useMemo(() => text.split(''), [text]);
  const isMultiline = useMemo(() => text.includes('\n'), [text]);

  /* ─── Resolve font family — use next/font by default ─── */

  const resolvedFontFamily = useMemo(
    () => fontFamily ?? robotoFlex.style.fontFamily,
    [fontFamily],
  );

  /* ─── Track cursor and touch positions ─── */

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    cursorRef.current.x = clientX;
    cursorRef.current.y = clientY;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [handlePointerMove]);

  /* ─── ResizeObserver for responsive sizing ─── */

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(setSize);
    observer.observe(container);
    setSize();

    return () => {
      observer.disconnect();
    };
  }, [setSize]);

  /* ─── Animation loop ─── */

  useEffect(() => {
    const animate = () => {
      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2 || 1;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter: Point = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width
            ? Math.floor(getAttr(d, maxDist, 5, 200))
            : 100;
          const wght = weight
            ? Math.floor(getAttr(d, maxDist, 100, 900))
            : 400;
          const italVal = italic
            ? getAttr(d, maxDist, 0, 1).toFixed(2)
            : '0';
          const alphaVal = alpha
            ? getAttr(d, maxDist, 0, 1).toFixed(2)
            : '1';

          const newVariation = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== newVariation) {
            span.style.fontVariationSettings = newVariation;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [width, weight, italic, alpha]);

  /* ─── Custom font style tag (for non-next/font fonts) ─── */

  const fontStyleContent = useMemo(() => {
    if (!fontUrl) return null;
    return `@import url('${fontUrl}');`;
  }, [fontUrl]);

  /* ─── Class composition ─── */

  const titleClassName = useMemo(
    () =>
      [
        styles.title,
        flex ? styles.flex : '',
        stroke ? styles.stroke : '',
        isMultiline ? styles.multiline : '',
        !fontUrl ? robotoFlex.variable : '',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [flex, stroke, isMultiline, fontUrl, className],
  );

  /* ─── Inline styles for dynamic values ─── */

  const titleStyle: CSSProperties = useMemo(
    () => ({
      fontFamily: resolvedFontFamily,
      fontSize,
      lineHeight,
      transform: `scale(1, ${scaleY})`,
      transformOrigin: 'center top',
    }),
    [resolvedFontFamily, fontSize, lineHeight, scaleY],
  );

  /* ─── Render ─── */

  return (
    <div ref={containerRef} className={styles.container}>
      {fontStyleContent && (
        <style
          id={fontStyleId}
          dangerouslySetInnerHTML={{ __html: fontStyleContent }}
        />
      )}
      <h1
        ref={titleRef}
        className={titleClassName}
        style={titleStyle}
      >
        {chars.map((char, i) => {
          const charStyle: Record<string, string> = {};

          if (!stroke) {
            charStyle.color = textColor;
          }

          if (stroke) {
            charStyle['--text-stroke-color'] = strokeColor;
          }

          return (
            <span
              key={`${char}-${i}`}
              ref={(el) => {
                spansRef.current[i] = el;
              }}
              data-char={char}
              style={charStyle}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
