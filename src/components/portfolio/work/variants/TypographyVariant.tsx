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
 * Variant: typography — the word is the visual. Minimal imagery,
 * maximum negative space.
 * Project 03 — Arc Design System
 */
export default function TypographyVariant({ project }: { project: Project }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const titleWords = project.title.split(' ');
  const titleFirst = titleWords[0];
  const titleRest = titleWords.slice(1).join(' ');

  const reveal = (delayMs: number): CSSProperties => revealStyle(visible, delayMs);

  return (
    <div ref={ref} className="relative w-full" style={{ paddingBlock: 'clamp(6rem, 11vw, 13rem)' }}>
      {/* Rule */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'var(--grid-margin)',
          right: 'var(--grid-margin)',
          height: '1px',
          backgroundColor: 'var(--c-border)',
          transformOrigin: 'center',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 1500ms ${EASE}`,
        }}
      />

      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        {/* Index — far right, ghosted */}
        <div style={{ ...reveal(0), display: 'flex', justifyContent: 'flex-end', marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <IndexNumber size="clamp(3rem, 6vw, 6rem)">{project.index}</IndexNumber>
        </div>

        {/* The typographic statement — scales with viewport */}
        <div style={{ maxWidth: 'var(--grid-max)' }}>
          <div style={reveal(100)}>
            <h3
              className="font-display uppercase block"
              style={{
                fontSize: 'clamp(4.5rem, 12vw, 15rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.015em',
                color: 'var(--c-text-primary)',
              }}
            >
              {titleFirst}
            </h3>
          </div>
          <div style={reveal(220)}>
            <h3
              className="font-display uppercase block"
              style={{
                fontSize: 'clamp(4.5rem, 12vw, 15rem)',
                lineHeight: 0.8,
                letterSpacing: '0.02em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(245,240,232,0.22)',
              }}
            >
              {titleRest}
            </h3>
          </div>
        </div>

        {/* Meta row — category / year */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: 'clamp(2rem, 4vw, 4rem)',
            ...reveal(300),
          }}
        >
          <Eyebrow>{project.category}</Eyebrow>
          <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--c-text-tertiary)' }}>
            {project.year}
          </span>
        </div>

        {/* Tagline — set against negative space, generous measure */}
        <div style={{ maxWidth: '560px', ...reveal(380) }}>
          <p
            className="font-sans font-light"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--c-text-secondary)',
              letterSpacing: '0.01em',
              marginTop: 'clamp(2.5rem, 5vw, 5rem)',
            }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Small framed image — a quiet accent, not a hero */}
        <div
          style={{
            marginTop: 'clamp(3rem, 6vw, 6rem)',
            maxWidth: '420px',
            ...reveal(460),
          }}
        >
          <ProjectVisual
            project={project}
            isEven={false}
            sizes="(max-width: 768px) 100vw, 28vw"
            ratio="4/3"
          />
        </div>

        {/* Stack — content before the CTA */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)', ...reveal(540) }}>
          <StackChips stack={project.stack} />
        </div>
      </div>

      {/* Story */}
      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <StoryBlock project={project} />
      </div>

      {/* CTA — closes the chapter, last on mobile per Image → Content → CTA */}
      <Reveal
        delay={600}
        style={{ paddingInline: 'var(--grid-margin)', marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}
      >
        <CTAButton project={project} />
      </Reveal>
    </div>
  );
}
