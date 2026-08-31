'use client';

import { PROJECTS } from '@/data/projects';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import SectionSeam from './SectionSeam';
import FadeUp from './FadeUp';

/**
 * Selected Work — editorial index of projects.
 * Each project renders through the reusable <Project /> architecture
 * with its own editorial layout variant, sharing one design system.
 */

function SectionHeader() {
  return (
    <div className="max-w-5xl mx-auto pt-28 pb-6 px-6 md:px-12">
      <FadeUp>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="h-px w-6 bg-zinc-500/50" />
            <span>Selected Work</span>
            <span className="h-px w-6 bg-zinc-500/50" />
          </div>
          <h2 className="font-display uppercase text-3xl md:text-5xl text-zinc-100 tracking-tight">
            Work
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-light max-w-lg mx-auto leading-relaxed mt-4">
            {PROJECTS.length.toString().padStart(2, '0')} stories, one architectural standard — interact below.
          </p>
        </div>
      </FadeUp>
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
      
      <div className="w-full relative mt-4 mb-4">
        <ProjectGallery />
      </div>

      <div style={{ paddingInline: 'var(--grid-margin)', paddingBottom: 'clamp(5rem, 10vw, 12rem)' }}>
        <div style={{ height: '1px', backgroundColor: 'var(--c-border)' }} />
      </div>
    </section>
  );
}
