'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { lenis } = useSmoothScroll();
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      }
    };

    // Listen to Lenis scroll events
    if (lenis) {
      lenis.on('scroll', updateProgress);
    }

    // Fallback for native scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (lenis) {
        lenis.off('scroll', updateProgress);
      }
    };
  }, [lenis]);

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-40 h-[2px] origin-left bg-gradient-to-r from-[#78350f] via-[#f59e0b] to-[#fbbf24]"
      style={{ scaleX }}
    />
  );
}
