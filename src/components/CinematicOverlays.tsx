'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene 1: 0% - 15%
    gsap.fromTo('.scene-1-text', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, scrollTrigger: { trigger: '#scroll-container', start: 'top top', end: '5% top', scrub: true } }
    );
    gsap.to('.scene-1-text', 
      { opacity: 0, y: -50, scrollTrigger: { trigger: '#scroll-container', start: '10% top', end: '15% top', scrub: true } }
    );

    // Scene 2: 15% - 30%
    gsap.fromTo('.scene-2-text',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, scrollTrigger: { trigger: '#scroll-container', start: '15% top', end: '20% top', scrub: true } }
    );
    gsap.to('.scene-2-text',
        { opacity: 0, scale: 1.1, scrollTrigger: { trigger: '#scroll-container', start: '25% top', end: '30% top', scrub: true } }
    );

    // Scene 4: 45% - 60%
    gsap.fromTo('.scene-4-text',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, scrollTrigger: { trigger: '#scroll-container', start: '45% top', end: '50% top', scrub: true } }
    );
    gsap.to('.scene-4-text',
        { opacity: 0, x: 50, scrollTrigger: { trigger: '#scroll-container', start: '55% top', end: '60% top', scrub: true } }
    );

    // Scene 7: 85% - 100%
    gsap.fromTo('.portfolio-reveal',
        { opacity: 0 },
        { opacity: 1, scrollTrigger: { trigger: '#scroll-container', start: '85% top', end: '95% top', scrub: true } }
    );

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 flex items-center justify-center scene-1-text opacity-0">
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase">A Journey In Vision</h1>
      </div>
      <div className="absolute inset-0 flex items-center justify-center scene-2-text opacity-0">
        <h2 className="text-4xl md:text-6xl font-serif italic text-white/80">Every perspective tells a story</h2>
      </div>
      <div className="absolute inset-0 flex items-center justify-center scene-4-text opacity-0">
        <div className="border border-white/30 rounded-full w-64 h-64 flex items-center justify-center backdrop-blur-sm">
            <span className="text-sm tracking-[0.3em] uppercase">Focus</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center portfolio-reveal opacity-0 bg-black/60 backdrop-blur-md">
         <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Welcome to the Portfolio</h2>
            <button className="pointer-events-auto px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-white/90 transition-colors">
                Explore Work
            </button>
         </div>
      </div>
    </div>
  );
}
