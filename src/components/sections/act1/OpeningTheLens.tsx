'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { content } from '@/data/content';
import LensFlare from '@/components/ui/LensFlare';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export default function OpeningTheLens() {
  const { scrollTo } = useSmoothScroll();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { filter: 'blur(20px)', opacity: 0, y: 50 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="opening"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-24 px-6"
    >
      {/* Dynamic Iris Bloom Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Primary Optical Flare */}
      <LensFlare className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-50" />

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Reticle Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#242424] bg-[#0a0a0a]/80 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#a3a3a3]">
            {content.hero.greeting}
          </span>
        </motion.div>

        {/* Hero Name with Optical Blur-to-Focus */}
        <h1
          ref={headingRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-[#f5f5f5] leading-[0.95] mb-6"
        >
          {content.name}
        </h1>

        {/* Professional Title */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-3xl text-[#a3a3a3] font-light tracking-wide max-w-2xl"
        >
          {content.role}
        </motion.p>

        {/* Camera Aperture Amber Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent my-8 w-48"
        />

        {/* Tagline Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-xl text-[#525252] max-w-2xl font-light leading-relaxed mb-10"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <AnimatedButton
            variant="primary"
            onClick={() => scrollTo('#through-my-lens')}
          >
            {content.hero.cta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
