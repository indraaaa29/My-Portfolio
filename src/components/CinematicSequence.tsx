'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import CanvasRenderer, { CanvasRendererHandle } from './CanvasRenderer';
import CinematicTextOverlay, {
  CinematicTextOverlayHandle,
} from './CinematicTextOverlay';

export default function CinematicSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasRendererHandle>(null);
  const overlayRef = useRef<CinematicTextOverlayHandle>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis and GSAP to the same RAF loop
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0); // Critical for sync

    const totalFrames = 995;
    const scrollObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=8000', // 8000px of scrolling for the sequence
        scrub: true, // EXACT sync, no lag
        pin: true,
      },
    });

    // Master Timeline: Scrubbing the frames + text overlay
    tl.to(scrollObj, {
      frame: totalFrames - 1,
      snap: { frame: 1 },
      ease: 'none',
      onUpdate: () => {
        const frame = scrollObj.frame;
        if (canvasRef.current) {
          canvasRef.current.renderFrame(frame);
        }
        if (overlayRef.current) {
          overlayRef.current.updateFrame(Math.round(frame));
        }
      },
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black">
      <div className="canvas-container absolute top-0 left-0 w-full h-screen z-0">
        <CanvasRenderer ref={canvasRef} />
      </div>
      <div className="text-overlay-container absolute top-0 left-0 w-full h-screen z-10 pointer-events-none">
        <CinematicTextOverlay ref={overlayRef} />
      </div>
    </div>
  );
}
