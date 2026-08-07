'use client';

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { Project } from '@/data/projects';
import { CASE_STUDIES } from '@/data/projectCaseStudies';
import { ArrowUpRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number | null;
  totalCount: number;
}

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

/* ──────────────────────────────────────────────
 * Section label — editorial heading with hairline
 * ────────────────────────────────────────────── */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-1 h-1 rotate-45 bg-amber-500/70 shrink-0" aria-hidden="true" />
      <h3 className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-semibold whitespace-nowrap">
        {children}
      </h3>
      <span className="flex-1 h-px bg-white/[0.06]" aria-hidden="true" />
    </div>
  );
}

/* ──────────────────────────────────────────────
 * Reveal — fade + slight upward motion on open
 * ────────────────────────────────────────────── */

function Reveal({
  isOpen,
  delay,
  children,
  className = '',
}: {
  isOpen: boolean;
  delay: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${isOpen ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
 * Project Drawer — premium engineering showcase
 * ────────────────────────────────────────────── */

export default function ProjectDrawer({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Reset image index when the project changes
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [project]);

  // Remember the trigger element, restore focus after closing
  useEffect(() => {
    if (isOpen && lastFocusedRef.current === null) {
      lastFocusedRef.current = document.activeElement;
    } else if (lastFocusedRef.current) {
      const target = lastFocusedRef.current as HTMLElement;
      const timer = setTimeout(() => {
        if (document.contains(target) && typeof target.focus === 'function') {
          target.focus();
        }
        lastFocusedRef.current = null;
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC closes, arrow keys navigate while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen, project]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap — Tab cycles within the drawer, never escapes
  const handleDrawerKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const focusables = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === drawerRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!project) return null;

  const caseStudy = CASE_STUDIES[project.index];
  const images = project.images?.length ? project.images : [project.image];
  const hasLinks = Boolean(project.links?.live || project.links?.github);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden={!isOpen} inert={!isOpen}>
      {/* Dim + blur overlay — outside click closes */}
      <div
        className={`absolute inset-0 bg-black/45 backdrop-blur-[10px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Ambient radial light */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-amber-500/[0.07] blur-[150px] rounded-full pointer-events-none transition-opacity duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Floating glass drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        aria-describedby="project-overview"
        tabIndex={-1}
        onKeyDown={handleDrawerKeyDown}
        className={`absolute top-3 bottom-3 right-3 md:top-16 md:bottom-8 md:right-8 w-[calc(100%-1.5rem)] md:w-[540px] flex flex-col overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10 bg-[#141417]/70 backdrop-blur-[28px] backdrop-saturate-[160%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)] outline-none transition-all duration-[600ms] ${
          isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
          style={{ backgroundImage: noiseSvg, backgroundSize: '128px' }}
          aria-hidden="true"
        />

        {/* Scrollable content */}
        <div
          className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-9 scrollbar-hide overscroll-contain"
          style={{ scrollbarGutter: 'stable' }}
          data-lenis-prevent="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-2.5 bg-black/25 backdrop-blur-md rounded-full text-zinc-400 hover:text-white hover:bg-black/40 transition-colors border border-white/10"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>

          {/* 1 — Hero image */}
          <Reveal isOpen={isOpen} delay={80}>
            <div className="relative w-full h-[220px] md:h-[280px] rounded-[20px] overflow-hidden bg-zinc-900 border border-white/5">
              <img
                src={images[currentImgIndex]}
                alt={`${project.title} — project preview`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-xs text-zinc-300">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">{project.category}</span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">{project.year}</span>
              </div>
              {images.length > 1 && (
                <div className="absolute bottom-4 right-5 flex gap-2 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImgIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === currentImgIndex ? 'bg-amber-400' : 'bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`View image ${i + 1} of ${images.length}`}
                      aria-pressed={i === currentImgIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* 2 + 3 — Title & tagline */}
          <Reveal isOpen={isOpen} delay={140}>
            <header className="flex flex-col gap-4">
              <span className="inline-flex items-center w-fit px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/10 tracking-wider uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shadow-[0_0_8px_rgba(251,191,36,0.8)]" aria-hidden="true" />
                {project.status || 'Production'}
              </span>
              <h2 id="project-title" className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white leading-[0.92]">
                {project.title}
              </h2>
              <p className="text-zinc-400 text-base md:text-lg font-light tracking-wide">
                {project.tagline}
              </p>
            </header>
          </Reveal>

          {/* 4 — Action buttons */}
          <Reveal isOpen={isOpen} delay={200}>
            {hasLinks ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-3.5 rounded-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,255,255,0.15)] group"
                  >
                    {project.links.github ? 'Live Demo' : 'Launch Project'}
                    <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-zinc-950 transition-colors" />
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-black/40 text-zinc-200 px-5 py-3.5 rounded-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:bg-black/60 border border-white/10 group backdrop-blur-md"
                  >
                    GitHub
                    <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-zinc-200 transition-colors" />
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-3.5 px-4 bg-white/[0.03] rounded-[14px] border border-white/5 text-sm text-zinc-400 font-medium tracking-wide">
                Private project — details available on request.
              </div>
            )}
          </Reveal>

          {/* Case Study Content */}
          {caseStudy ? (
            <>
              {/* Project Overview */}
              <Reveal isOpen={isOpen} delay={260}>
                <section>
                  <SectionLabel>Project Overview</SectionLabel>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[13px] font-medium text-amber-500/90 tracking-wide uppercase">
                      {caseStudy.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
                    <span className="text-[13px] text-zinc-400 tracking-wide">
                      {caseStudy.status}
                    </span>
                  </div>
                  <p id="project-overview" className="text-zinc-300 font-light text-[15px] leading-relaxed">
                    {caseStudy.overview}
                  </p>
                </section>
              </Reveal>

              {/* Problem */}
              <Reveal isOpen={isOpen} delay={320}>
                <section>
                  <SectionLabel>The Problem</SectionLabel>
                  <p className="text-zinc-300 font-light text-[15px] leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </section>
              </Reveal>

              {/* Engineering Challenge */}
              <Reveal isOpen={isOpen} delay={380}>
                <section>
                  <SectionLabel>Engineering Challenge</SectionLabel>
                  <ul className="flex flex-col gap-4">
                    {caseStudy.challenges.map((challenge, i) => (
                      <li key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
                        <h4 className="text-zinc-200 font-medium text-[14px] mb-2">{challenge.title}</h4>
                        <p className="text-zinc-400 font-light text-[14px] leading-relaxed">{challenge.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Solution */}
              <Reveal isOpen={isOpen} delay={440}>
                <section>
                  <SectionLabel>Solution</SectionLabel>
                  <p className="text-zinc-300 font-light text-[15px] leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </section>
              </Reveal>

              {/* Architecture */}
              <Reveal isOpen={isOpen} delay={500}>
                <section>
                  <SectionLabel>Architecture</SectionLabel>
                  <p className="text-zinc-300 font-light text-[15px] leading-relaxed mb-6">
                    {caseStudy.architecture.overview}
                  </p>
                  
                  {/* Architecture Flow */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-8 bg-black/20 p-6 rounded-2xl border border-white/5 overflow-hidden">
                    {caseStudy.architecture.flow.map((node, i) => (
                      <div key={i} className="flex flex-col sm:flex-row items-center gap-2 flex-1">
                        <div className="w-full sm:w-auto flex-1 bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center text-zinc-300 text-[13px] font-medium tracking-wide shadow-inner break-words">
                          {node}
                        </div>
                        {i < caseStudy.architecture.flow.length - 1 && (
                          <div className="text-zinc-600 rotate-90 sm:rotate-0 my-2 sm:my-0">
                            <ArrowRight size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Decisions & Tradeoffs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-[12px] uppercase tracking-widest text-zinc-500 font-semibold mb-4">Decisions</h4>
                      <ul className="flex flex-col gap-4">
                        {caseStudy.architecture.decisions.map((decision, i) => (
                          <li key={i} className="text-zinc-300 font-light text-[14px] leading-relaxed">
                            <strong className="text-zinc-200 font-medium block mb-1">{decision.title}</strong>
                            <span className="text-zinc-400">{decision.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[12px] uppercase tracking-widest text-zinc-500 font-semibold mb-4">Tradeoffs</h4>
                      <ul className="flex flex-col gap-4">
                        {caseStudy.architecture.tradeoffs.map((tradeoff, i) => (
                          <li key={i} className="text-zinc-300 font-light text-[14px] leading-relaxed">
                            <strong className="text-zinc-200 font-medium block mb-1">{tradeoff.title}</strong>
                            <span className="text-zinc-400">{tradeoff.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </Reveal>

              {/* Engineering Highlights */}
              <Reveal isOpen={isOpen} delay={560}>
                <section>
                  <SectionLabel>Engineering Highlights</SectionLabel>
                  <ul className="flex flex-col gap-4">
                    {caseStudy.engineeringHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300 font-light text-[15px] leading-relaxed">
                        <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rotate-45 bg-amber-500/60 rounded-[2px]" aria-hidden="true" />
                        <div>
                          <strong className="text-zinc-200 font-medium mr-2">{highlight.title}:</strong>
                          <span className="text-zinc-400">{highlight.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Tech Stack */}
              <Reveal isOpen={isOpen} delay={620}>
                <section>
                  <SectionLabel>Tech Stack</SectionLabel>
                  <div className="flex flex-col gap-5">
                    {caseStudy.techStack.map((group, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                        <span className="text-[12px] uppercase tracking-widest text-zinc-500 font-semibold sm:w-24 shrink-0">
                          {group.category}
                        </span>
                        <ul className="flex flex-wrap gap-2">
                          {group.items.map((tech) => (
                            <li
                              key={tech}
                              className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-[12px] text-zinc-300 font-medium tracking-wide shadow-sm"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Key Features */}
              <Reveal isOpen={isOpen} delay={680}>
                <section>
                  <SectionLabel>Key Features</SectionLabel>
                  <ul className="flex flex-col gap-4">
                    {caseStudy.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300 font-light text-[15px] leading-relaxed">
                        <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full border border-amber-500/50" aria-hidden="true" />
                        <div>
                          <strong className="text-zinc-200 font-medium mr-2">{feature.title}:</strong>
                          <span className="text-zinc-400">{feature.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Results & Impact */}
              <Reveal isOpen={isOpen} delay={740}>
                <section>
                  <SectionLabel>Results &amp; Impact</SectionLabel>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <p className="text-[15px] font-light text-zinc-300 leading-relaxed mb-6">
                      {caseStudy.results.description}
                    </p>
                    {caseStudy.results.metrics && (
                      <div className="grid grid-cols-2 gap-4">
                        {caseStudy.results.metrics.map((metric, i) => (
                          <div key={i} className="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">{metric.label}</span>
                            <span className="text-xl md:text-2xl font-display text-amber-500/90">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </Reveal>

              {/* Engineering Reflection */}
              <Reveal isOpen={isOpen} delay={800}>
                <section>
                  <SectionLabel>Engineering Reflection</SectionLabel>
                  <div className="flex flex-col gap-4 relative">
                    <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/50 to-transparent" aria-hidden="true" />
                    {caseStudy.engineeringReflection.map((reflection, i) => (
                      <p key={i} className="text-zinc-300 font-light text-[15px] leading-relaxed pl-6">
                        {reflection}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            </>
          ) : (
            <Reveal isOpen={isOpen} delay={260}>
              <section>
                <SectionLabel>Project Overview</SectionLabel>
                <p className="text-zinc-300 font-light text-base leading-relaxed">
                  Engineering case study currently unavailable.
                </p>
              </section>
            </Reveal>
          )}
        </div>

        {/* Sticky footer — project navigation */}
        <div
          className={`relative z-20 shrink-0 border-t border-white/10 p-5 md:p-6 bg-black/40 backdrop-blur-xl transition-all duration-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: isOpen ? '620ms' : '0ms', transitionTimingFunction: EASE }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={onPrev}
              className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors group"
              aria-label="Previous project"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Previous
            </button>
            <span className="text-zinc-500 text-sm font-display tracking-[0.25em]">
              {currentIndex !== null ? String(currentIndex + 1).padStart(2, '0') : '00'}{' '}
              <span className="text-zinc-700">/</span> {String(totalCount).padStart(2, '0')}
            </span>
            <button
              onClick={onNext}
              className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors group"
              aria-label="Next project"
            >
              Next <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
