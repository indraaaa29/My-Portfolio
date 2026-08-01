'use client';

import type { CSSProperties } from 'react';
import type { Project } from '@/data/projects';
import {
  useReveal,
  revealStyle,
  Reveal,
  Eyebrow,
  IndexNumber,
  StackChips,
  CTAButton,
  ProjectVisual,
  StoryBlock,
  EASE,
} from '../primitives';

/**
 * Variant: editorial — Swiss-inspired split, strong grid discipline.
 * Project 02 — Signal Dashboard
 * Mobile: image → content → CTA (visual leads, meta + CTA close the story).
 */
export default function EditorialVariant({ project }: { project: Project }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const reveal = (delayMs: number): CSSProperties => revealStyle(visible, delayMs);

  return (
    <div ref={ref} className="relative w-full" style={{ paddingBlock: 'clamp(4.5rem, 9vw, 11rem)' }}>
      {/* Grid rule — full-bleed hairline */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--c-border)',
          transformOrigin: 'right',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 1500ms ${EASE}`,
        }}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        style={{
          paddingInline: 'var(--grid-margin)',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'start',
        }}
      >
        {/* Visual + title column — visual leads on mobile, title leads on desktop */}
        <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          {/* Visual — first on mobile */}
          <div className="order-1 md:order-2" style={reveal(200)}>
            <ProjectVisual
              project={project}
              isEven
              sizes="(max-width: 768px) 100vw, 42vw"
              ratio="4/3"
            />
          </div>

          {/* Title — clinical statement, leads on desktop */}
          <div className="order-2 md:order-1" style={reveal(100)}>
            <h3
              className="font-sans font-medium block"
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--c-text-primary)',
                maxWidth: '14ch',
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Meta rail — closes the story on mobile, opens it on desktop */}
        <div
          className="order-2 md:order-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            paddingTop: '0.5rem',
          }}
        >
          <div style={reveal(0)}>
            <IndexNumber size="clamp(3.5rem, 6vw, 6.5rem)">{project.index}</IndexNumber>
          </div>

          <div style={{ ...reveal(120), display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Eyebrow>{project.category}</Eyebrow>
            <span
              className="font-sans"
              style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--c-text-tertiary)', marginLeft: '1.7rem' }}
            >
              {project.year}
            </span>
          </div>

          {/* Tagline — framed with rules */}
          <div
            style={{
              borderLeft: '1px solid var(--c-border)',
              paddingLeft: '1.5rem',
              ...reveal(200),
            }}
          >
            <p
              className="font-sans font-light"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--c-text-secondary)',
                maxWidth: '260px',
              }}
            >
              {project.tagline}
            </p>
          </div>

          <div style={reveal(280)}>
            <StackChips stack={project.stack} />
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <StoryBlock project={project} />
      </div>

      {/* CTA — closes the chapter, last on mobile per Image → Content → CTA */}
      <Reveal
        delay={320}
        style={{ paddingInline: 'var(--grid-margin)', marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}
      >
        <CTAButton project={project} />
      </Reveal>
    </div>
  );
}
