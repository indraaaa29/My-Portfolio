'use client';

import { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/projects';
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

export default function ProjectDrawer({ project, isOpen, onClose, onNext, onPrev, currentIndex, totalCount }: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  // Reset image index when project changes
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [project]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  // Body scroll lock
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

  if (!project) return null;

  const images = project.images?.length ? project.images : [project.image];

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!isOpen}
    >
      {/* Dim Overlay with subtle blur */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-[6px] pointer-events-auto transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Ambient Radial Light */}
      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Floating Glass Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        aria-describedby="project-description"
        tabIndex={-1}
        className={`absolute top-4 bottom-4 right-4 md:top-16 md:bottom-8 md:right-8 w-[calc(100%-2rem)] md:w-[480px] bg-[#18181b]/55 backdrop-blur-[28px] backdrop-saturate-[160%] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[16px] md:rounded-[28px] overflow-hidden flex flex-col outline-none transform transition-all duration-500 ease-out pointer-events-auto ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[16px] opacity-0'}`}
      >
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10" 
          style={{ backgroundImage: noiseSvg, backgroundSize: '128px' }} 
        />

        {/* Scrollable Content Area */}
        <div 
          className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-8 scrollbar-hide overscroll-contain" 
          style={{ scrollbarGutter: 'stable' }}
          data-lenis-prevent="true"
        >
          
          {/* Close Button Floating */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10 z-20"
            aria-label="Close project details"
          >
            <X size={20} />
          </button>

          {/* Hero Image Carousel */}
          <div className={`relative w-full h-[240px] md:h-[280px] rounded-[20px] overflow-hidden group transition-all duration-700 delay-100 bg-zinc-900 border border-white/5 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <img 
              src={images[currentImgIndex]} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {images.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentImgIndex(i)} 
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImgIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title Block */}
          <header className={`transition-all duration-700 delay-[150ms] flex flex-col gap-3 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/10 tracking-wider uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                {project.status || 'Production'}
              </span>
            </div>
            <div>
              <h2 id="project-title" className="font-display text-5xl md:text-6xl uppercase tracking-tight text-white leading-[0.9]">
                {project.title}
              </h2>
              <p className="text-zinc-400 text-lg mt-3 tracking-wide font-light">
                {project.tagline}
              </p>
            </div>
          </header>

          {/* Impact Card */}
          {project.outcome && (
            <section className={`transition-all duration-700 delay-[200ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col shadow-inner">
                <span className="text-xs uppercase tracking-widest text-amber-500/80 mb-2 font-semibold">Impact</span>
                <span className="text-2xl md:text-3xl font-display tracking-wide text-zinc-100 leading-tight">
                  {project.outcome}
                </span>
              </div>
            </section>
          )}

          {/* Engineering Context */}
          <section className={`transition-all duration-700 delay-[250ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Engineering Context</h3>
            <p id="project-description" className="text-zinc-300 font-light text-base md:text-lg leading-relaxed">
              {project.context || 'Project details coming soon.'}
            </p>
          </section>

          {/* Technology Stack */}
          {project.stack && project.stack.length > 0 && (
            <section className={`transition-all duration-700 delay-[300ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Technology</h3>
              <ul className="flex flex-wrap gap-3">
                {project.stack.map(tech => (
                  <li key={tech} className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[14px] text-sm text-zinc-200 font-medium tracking-wide shadow-sm backdrop-blur-md">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

        {/* Sticky Bottom Footer */}
        <div className={`relative z-20 shrink-0 border-t border-white/10 p-5 md:p-8 bg-black/40 backdrop-blur-xl flex flex-col gap-6 transition-all duration-700 delay-[400ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Action Buttons */}
          {(!project.links?.live && !project.links?.github) ? (
            <div className="flex items-center justify-center py-3.5 px-4 bg-white/[0.03] rounded-[14px] border border-white/5 text-sm text-zinc-400 font-medium tracking-wide">
              Private project — details available on request.
            </div>
          ) : (
            <div className="flex gap-3">
              {project.links?.live && (
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-4 py-3.5 rounded-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,255,255,0.15)] group"
                >
                  {project.links?.github ? 'Live Demo' : 'Launch Project'}
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-zinc-950 transition-colors" />
                </a>
              )}

              {project.links?.github && (
                <a 
                  href={project.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-black/40 text-zinc-200 px-4 py-3.5 rounded-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:bg-black/60 border border-white/10 group backdrop-blur-md"
                >
                  View Source
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-zinc-200 transition-colors" />
                </a>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button onClick={onPrev} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors group">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Previous
            </button>
            <span className="text-zinc-500 text-sm font-display tracking-widest pt-1">
              {currentIndex !== null ? currentIndex + 1 : 0} / {totalCount}
            </span>
            <button onClick={onNext} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors group">
              Next <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </aside>
    </div>
  );
}
