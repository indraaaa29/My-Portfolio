'use client';

import { useEffect, useState, useRef } from 'react';
import { NarrativeManager } from '@/narrative/NarrativeManager';
import { NarrativeContext } from '@/narrative/types';
import { adaptTypographyLayout } from '@/adapters/cinematicAdapters';
import { scenes } from '@/data/cinematicScenes';

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

  const storyboardScene = scenes.find(s => s.id === content.sceneId);
  let config = SCENE_CONFIGS[content.sceneId];
  
  if (storyboardScene) {
    config = adaptTypographyLayout(storyboardScene);
  } else if (!config) {
    config = SCENE_CONFIGS['scene-03'];
  }
  
  // Note: unused 'words' variable from legacy renderer removed.

  // ──────────────────────────────────────────────
  // TYPOGRAPHIC SYSTEM
  // ──────────────────────────────────────────────

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
        {/* Scene index */}
        {config.label && (
          <p
            className={`${config.labelPosition} font-sans text-xs md:text-[13px] font-normal tracking-[0.4em] uppercase text-white/50`}
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          >
            {config.label}
          </p>
        )}

        {/* Primary typographic element */}
        {storyboardScene ? (
          <h2
            className="font-display uppercase select-none"
            style={{
              fontSize: storyboardScene.typography.fontSize,
              fontWeight: storyboardScene.typography.fontWeight,
              lineHeight: storyboardScene.typography.lineHeight,
              color: storyboardScene.typography.color,
              textShadow: storyboardScene.typography.textShadow,
              letterSpacing: storyboardScene.letterSpacing || 'normal',
              transformOrigin: storyboardScene.transformOrigin || 'center',
            }}
          >
            {storyboardScene.lineStyles ? (
              storyboardScene.message.split('\n').map((line, i) => (
                <span 
                  key={i} 
                  className="block"
                  style={{
                    fontSize: storyboardScene.lineStyles![i]?.fontSize,
                    fontWeight: storyboardScene.lineStyles![i]?.fontWeight,
                    letterSpacing: storyboardScene.lineStyles![i]?.letterSpacing,
                  }}
                >
                  {line}
                </span>
              ))
            ) : (
              <span className="block">{storyboardScene.message}</span>
            )}
          </h2>
        ) : (
          <h2
            className="font-display text-[12vw] leading-[0.85] uppercase text-white select-none"
            style={{ textShadow: '0 2px 64px rgba(0,0,0,0.8)' }}
          >
            <span className="block">{content.message}</span>
          </h2>
        )}
      </div>
    </div>
  );
}
