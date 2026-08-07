'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerLenis } from '@/lib/scroll-lock';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose the instance so overlays (modal, drawer) can stop/start it
    // instead of fighting it with CSS overflow tricks.
    registerLenis(lenis);

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's requestAnimationFrame loop for Lenis
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // Prevent GSAP from aggressively skipping frames during heavy CPU load
    // which ensures scroll scrubbing doesn't lag visually.
    gsap.ticker.lagSmoothing(0);

    return () => {
      registerLenis(null);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
