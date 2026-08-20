'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Project } from '@/data/projects';
import {
  useReveal,
  revealStyle,
  Reveal,
  Eyebrow,
  StackChips,
  CTAButton,
  StoryBlock,
} from '../primitives';

/**
 * Variant: fullscreen — cinematic widescreen presentation,
 * large visual storytelling. The image IS the chapter.
 * Project 04 — Parallax Narrative Engine
 */
export default function FullscreenVariant({ project }: { project: Project }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const reveal = (delayMs: number): CSSProperties => revealStyle(visible, delayMs);

  return (
    <div ref={ref} className="relative w-full" style={{ paddingBlock: 'clamp(4.5rem, 9vw, 11rem)' }}>
      {/* Widescreen frame — bleeds to the grid, cinematic letterbox */}
      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <div
          className="relative w-full overflow-hidden aspect-[16/10] md:aspect-[21/9]"
          style={{
            ...reveal(0),
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          {/* Cinematic scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5,4,3,0.82) 0%, rgba(5,4,3,0.15) 50%, rgba(5,4,3,0) 100%)',
            }}
          />
          {/* Frame line */}
          <div
            style={{
              position: 'absolute',
              inset: 'clamp(1rem, 2vw, 1.5rem)',
              border: '1px solid rgba(245,240,232,0.12)',
              pointerEvents: 'none',
            }}
          />
          {/* Overlay title — set into the lower band */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(2rem, 5vw, 5rem)',
              right: 'clamp(2rem, 5vw, 5rem)',
              bottom: 'clamp(2rem, 4vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <Eyebrow color="rgba(245,240,232,0.55)">{project.category}</Eyebrow>
            <h3
              className="font-display uppercase block"
              style={{
                fontSize: 'clamp(3.5rem, 8.5vw, 11rem)',
                lineHeight: 0.82,
                letterSpacing: '-0.01em',
                color: 'var(--c-text-primary)',
                textShadow: '0 4px 60px rgba(0,0,0,0.5)',
                maxWidth: '16ch',
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginTop: 'clamp(2rem, 4vw, 3.5rem)',
          ...reveal(150),
        }}
      >
        <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'var(--c-text-tertiary)' }}>
          Project {project.index}
        </span>
        <p
          className="font-sans font-light"
          style={{
            fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
            lineHeight: 1.7,
            color: 'var(--c-text-secondary)',
            maxWidth: '380px',
            textAlign: 'right',
          }}
        >
          {project.tagline}
        </p>
        <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--c-text-tertiary)' }}>
          {project.year}
        </span>
      </div>

      {/* Stack */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          marginTop: 'clamp(2.5rem, 4vw, 4rem)',
          ...reveal(250),
        }}
      >
        <StackChips stack={project.stack} />
      </div>

      {/* Story */}
      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <StoryBlock project={project} />
      </div>

      {/* CTA — closes the chapter, last on mobile per Image → Content → CTA */}
      <Reveal
        delay={350}
        style={{ paddingInline: 'var(--grid-margin)', marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}
      >
        <CTAButton project={project} />
      </Reveal>
    </div>
  );
}
