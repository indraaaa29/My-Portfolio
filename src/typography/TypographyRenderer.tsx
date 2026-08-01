'use client';

import { useEffect, useState, useRef } from 'react';
import { NarrativeManager } from '@/narrative/NarrativeManager';
import { NarrativeContext } from '@/narrative/types';

interface Props {
  manager: NarrativeManager;
}

// Scene-specific typographic compositions extracted from art direction review.
// Each scene defines its own voice, scale, placement, and tone.
const SCENE_CONFIGS: Record<string, {
  layout: string;
  labelPosition: string;
  label?: string;
}> = {
  'scene-01': {
    // Bottom-left anchor — opening whisper
    layout: 'fixed inset-0 flex flex-col justify-end items-start p-8 md:p-16 pb-16 md:pb-20',
    labelPosition: 'mb-3',
    label: '001',
  },
  'scene-02': {
    // Left-column — asymmetric discovery
    layout: 'fixed inset-0 flex flex-col justify-center items-start pl-8 md:pl-16 lg:pl-24',
    labelPosition: 'mb-4',
    label: '002',
  },
  'scene-03': {
    // Right-aligned — journey — tension
    layout: 'fixed inset-0 flex flex-col justify-center items-end pr-8 md:pr-16 lg:pr-24 text-right',
    labelPosition: 'mb-4',
    label: '003',
  },
  'scene-04': {
    // Full-center — climax — maximum mass
    layout: 'fixed inset-0 flex flex-col justify-center items-center text-center px-4',
    labelPosition: 'mb-6',
    label: '004',
  },
  'scene-05': {
    // Top-center — departure
    layout: 'fixed inset-0 flex flex-col justify-start items-center text-center pt-16 md:pt-24 px-8',
    labelPosition: 'mb-3',
    label: '005',
  },
};

export default function TypographyRenderer({ manager }: Props) {
  const [content, setContent] = useState<{sceneId: string, message: string, emphasis: string} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSceneId = useRef<string | null>(null);

  useEffect(() => {
    return manager.onContextChange((context: NarrativeContext | null) => {
      if (!context) {
        if (lastSceneId.current !== null) {
          setContent(null);
          lastSceneId.current = null;
        }
        return;
      }

      if (lastSceneId.current !== context.sceneId) {
        setContent({
          sceneId: context.sceneId,
          message: context.message,
          emphasis: context.emphasis
        });
        lastSceneId.current = context.sceneId;
      }

      // 60 FPS imperative animation — no React reconciliation
      if (containerRef.current) {
        const p = context.progress;
        let opacity = 0;
        let yOffset = 0;
        let blur = 0;
        let scale = 1;

        if (p < 0.15) {
          const t = p / 0.15;
          const eased = 1 - Math.pow(1 - t, 3); // cubic ease out
          opacity = eased;
          yOffset = 18 * (1 - eased);
          blur = 8 * (1 - eased);
          scale = 0.985 + (0.015 * eased);
        } else if (p > 0.85) {
          const t = (1.0 - p) / 0.15;
          const eased = 1 - Math.pow(1 - t, 2); // quad ease in
          opacity = eased;
          yOffset = -10 * (1 - eased);
          blur = 6 * (1 - eased);
          scale = 1;
        } else {
          opacity = 1;
          yOffset = 0;
          blur = 0;
          scale = 1;
        }

        containerRef.current.style.opacity = opacity.toFixed(3);
        containerRef.current.style.transform = `translateY(${yOffset.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        containerRef.current.style.filter = `blur(${blur.toFixed(2)}px)`;
      }
    });
  }, [manager]);

  if (!content || content.sceneId === 'none') return null;

  const config = SCENE_CONFIGS[content.sceneId] ?? SCENE_CONFIGS['scene-03'];
  const words = content.message.split(' ');

  // ──────────────────────────────────────────────
  // TYPOGRAPHIC SYSTEM
  //
  // font-display = Bebas Neue (condensed, cinematic, film-title weight)
  // font-sans    = Inter (light, delicate, precise)
  //
  // EPIC: full-width condensed uppercase — bleeds into the image
  // STRONG: large condensed — scene-filling but contained  
  // MEDIUM: Inter light — creates maximum contrast against display
  // SOFT: Inter micro-label — cinematic index numbering
  // ──────────────────────────────────────────────

  let primaryClasses = '';
  let primaryShadow = '';
  let useDisplayFont = false;
  
  switch (content.emphasis) {
    case 'epic':
      // Full-canvas condensed type — Bebas Neue at brutal scale
      // Warm cream (#F0EBE1) reads as designed, not defaulted
      primaryClasses = [
        'font-display',
        'text-[22vw] md:text-[20vw] lg:text-[18vw]', // viewport-relative sizing
        'leading-[0.8]',
        'tracking-normal',
        'uppercase',
        'text-[#F0EBE1]',
        'select-none',
      ].join(' ');
      primaryShadow = '0 0 120px rgba(0,0,0,0.7), 0 4px 32px rgba(0,0,0,0.9)';
      useDisplayFont = true;
      break;

    case 'strong':
      // Scene-filling but disciplined — half the viewport height
      primaryClasses = [
        'font-display',
        'text-[14vw] md:text-[12vw] lg:text-[10vw]',
        'leading-[0.85]',
        'tracking-normal',
        'uppercase',
        'text-white',
        'select-none',
      ].join(' ');
      primaryShadow = '0 2px 64px rgba(0,0,0,0.8), 0 1px 16px rgba(0,0,0,0.6)';
      useDisplayFont = true;
      break;

    case 'medium':
      // Inter light — maximum contrast against Bebas scenes
      // Slightly generous tracking creates editorial breathing room
      primaryClasses = [
        'font-sans',
        'text-xl md:text-2xl lg:text-3xl',
        'font-light',
        'leading-[1.25]',
        'tracking-[0.04em]',
        'text-white/85',
      ].join(' ');
      primaryShadow = '0 4px 32px rgba(0,0,0,0.7)';
      break;

    case 'soft':
    default:
      // Micro-label — cinematic indexing / opening whisper
      primaryClasses = [
        'font-sans',
        'text-[11px] md:text-xs',
        'font-normal',
        'leading-none',
        'tracking-[0.5em]',
        'uppercase',
        'text-white/55',
      ].join(' ');
      primaryShadow = '0 2px 16px rgba(0,0,0,0.6)';
      break;
  }

  return (
    <div className={`${config.layout} pointer-events-none z-20`}>
      <div
        ref={containerRef}
        style={{
          opacity: 0,
          transform: 'translateY(18px) scale(0.985)',
          willChange: 'opacity, transform, filter',
        }}
      >
        {/* Scene index — micro-label always appears above primary type */}
        {config.label && content.emphasis !== 'soft' && (
          <p
            className={`${config.labelPosition} font-sans text-[10px] font-normal tracking-[0.55em] uppercase text-white/40`}
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
          >
            {config.label}
          </p>
        )}

        {/* Primary typographic element */}
        {useDisplayFont ? (
          // Bebas Neue: each line is a separate block for true architectural stacking
          <h2
            className={primaryClasses}
            style={{ textShadow: primaryShadow }}
          >
            {/* For epic/strong — split into 2-word rows to fill width dramatically */}
            {content.emphasis === 'epic'
              ? words.reduce<string[][]>((acc, word, i) => {
                  const rowIndex = Math.floor(i / 2);
                  if (!acc[rowIndex]) acc[rowIndex] = [];
                  acc[rowIndex].push(word);
                  return acc;
                }, []).map((row, i) => (
                  <span key={i} className="block">{row.join(' ')}</span>
                ))
              : <span className="block">{content.message}</span>
            }
          </h2>
        ) : (
          <p
            className={`max-w-xl md:max-w-2xl ${primaryClasses}`}
            style={{ textShadow: primaryShadow }}
          >
            {content.message}
          </p>
        )}
      </div>
    </div>
  );
}
