'use client';

import { PROJECTS } from '@/data/projects';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import { useReveal, revealStyle } from '@/components/portfolio/work/primitives';
import SectionSeam from './SectionSeam';

/**
 * Selected Work — editorial index of projects.
 * Each project renders through the reusable <Project /> architecture
 * with its own editorial layout variant, sharing one design system.
 */
function SectionHeader() {
  const { ref, visible } = useReveal(0.15);

  const reveal = (delay: number) => revealStyle(visible, delay);

  return (
    <div
      ref={ref}
      style={{
        paddingInline: 'var(--grid-margin)',
        paddingTop: 'clamp(6rem, 12vw, 14rem)',
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '2rem',
      }}
    >
      <div>
        <p
          className="font-sans uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.5em', color: 'var(--c-text-tertiary)', marginBottom: '1.25rem', ...reveal(0) }}
        >
          Selected Work
        </p>
        <h2
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(4rem, 10vw, 11rem)',
            lineHeight: 0.84,
            letterSpacing: '-0.01em',
            color: 'var(--c-text-primary)',
            ...reveal(100),
          }}
        >
          Work
        </h2>
      </div>
      <div style={{ ...reveal(200), textAlign: 'right' }}>
        <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'var(--c-text-tertiary)' }}>
          {PROJECTS.length.toString().padStart(2, '0')} Projects
        </span>
        <p
          className="font-sans font-light"
          style={{
            fontSize: '0.75rem',
            lineHeight: 1.7,
            color: 'var(--c-text-secondary)',
            maxWidth: '260px',
            marginTop: '0.75rem',
          }}
        >
          Six stories, one architectural standard — interact below.
        </p>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative w-full" style={{ backgroundColor: 'transparent' }}>
      <SectionSeam />
      <SectionHeader />

      <div style={{ paddingInline: 'var(--grid-margin)' }}>
        <div style={{ height: '1px', backgroundColor: 'var(--c-border)' }} />
      </div>
      <div className="w-full relative mt-16 mb-8 border-y border-zinc-900">
        <ProjectGallery />
      </div>

      <div style={{ paddingInline: 'var(--grid-margin)', paddingBottom: 'clamp(5rem, 10vw, 12rem)' }}>
        <div style={{ height: '1px', backgroundColor: 'var(--c-border)' }} />
      </div>
    </section>
  );
}
