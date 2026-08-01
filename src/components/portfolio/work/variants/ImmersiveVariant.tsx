'use client';

import type { CSSProperties } from 'react';
import type { Project } from '@/data/projects';
import {
  useReveal,
  revealStyle,
  Reveal,
  IndexNumber,
  StackChips,
  CTAButton,
  ProjectVisual,
  StoryBlock,
  EASE,
} from '../primitives';

/**
 * Variant: immersive — large visual, asymmetric typography, deep impact.
 * Project 01 — Cinematic Canvas
 */
export default function ImmersiveVariant({ project }: { project: Project }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const titleWords = project.title.split(' ');
  const titleFirst = titleWords[0];
  const titleRest = titleWords.slice(1).join(' ');

  const reveal = (delayMs: number): CSSProperties => revealStyle(visible, delayMs);

  return (
    <div ref={ref} className="relative w-full" style={{ paddingBlock: 'clamp(4.5rem, 9vw, 11rem)' }}>
      {/* Sweeping rule — reveals from the image side */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'var(--grid-margin)',
          right: 'var(--grid-margin)',
          height: '1px',
          backgroundColor: 'var(--c-border)',
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 1500ms ${EASE}`,
        }}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
        style={{
          paddingInline: 'var(--grid-margin)',
          gap: 'clamp(2.5rem, 6vw, 7rem)',
          alignItems: 'center',
        }}
      >
        {/* Visual — dominant (first on mobile: image → content → CTA) */}
        <div style={reveal(0)}>
          <ProjectVisual
            project={project}
            isEven={false}
            sizes="(max-width: 768px) 100vw, 52vw"
            ratio="16/10"
          />
        </div>

        {/* Content — asymmetric, overlapping baseline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Ghost numeral behind the title block */}
          <div style={{ ...reveal(120), marginBottom: '-clamp(2rem, 4vw, 3.5rem)' }}>
            <IndexNumber size="clamp(4.5rem, 9vw, 9rem)">{project.index}</IndexNumber>
          </div>

          {/* Title — split lines, one solid one ghost */}
          <div style={reveal(180)}>
            <h3
              className="font-display uppercase block"
              style={{
                fontSize: 'clamp(2.9rem, 5.4vw, 7rem)',
                lineHeight: 0.84,
                letterSpacing: '-0.01em',
                color: 'var(--c-text-primary)',
              }}
            >
              {titleFirst}
            </h3>
            <h3
              className="font-display uppercase block"
              style={{
                fontSize: 'clamp(2.9rem, 5.4vw, 7rem)',
                lineHeight: 0.84,
                letterSpacing: '-0.01em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(245,240,232,0.24)',
                marginTop: '0.02em',
              }}
            >
              {titleRest}
            </h3>
          </div>

          {/* Tagline */}
          <div style={reveal(260)}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--c-text-secondary)',
                maxWidth: '340px',
                letterSpacing: '0.01em',
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* Stack — content sits before the CTA */}
          <div style={reveal(340)}>
            <StackChips stack={project.stack} />
          </div>
        </div>
      </div>

      {/* Story — 4 chapter columns */}
      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <StoryBlock project={project} />
      </div>

      {/* CTA — closes the chapter, last on mobile per Image → Content → CTA */}
      <Reveal
        delay={420}
        style={{ paddingInline: 'var(--grid-margin)', marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}
      >
        <CTAButton project={project} />
      </Reveal>
    </div>
  );
}
