'use client';

import { motion } from 'framer-motion';
import { content } from '@/data/content';
import AnimatedButton from '@/components/ui/AnimatedButton';
import LensFlare from '@/components/ui/LensFlare';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export default function Captured() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="captured"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-32 px-6"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Dual Lens Flares */}
      <LensFlare className="top-1/3 right-1/4 w-[450px] h-[450px] opacity-40" />
      <LensFlare className="bottom-1/3 left-1/4 w-[350px] h-[350px] opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Act I Scene Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-xs tracking-[0.3em] uppercase text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-4 py-1.5 rounded-full"
        >
          ACT I — SCENE 04 · CAPTURED
        </motion.div>

        {/* Opening Quote Mark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-8xl font-serif text-[#f59e0b] leading-none select-none"
        >
          &ldquo;
        </motion.span>

        {/* Editorial Quote Narrative */}
        <motion.blockquote
          initial={{ opacity: 0, filter: 'blur(16px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#f5f5f5] leading-tight max-w-4xl tracking-tight"
        >
          {content.tagline}
        </motion.blockquote>

        {/* Closing Quote Mark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-7xl md:text-8xl font-serif text-[#f59e0b] leading-none select-none mt-2"
        >
          &rdquo;
        </motion.span>

        {/* Amber Focal Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent my-10 w-32"
        />

        {/* Transition CTA into Act II */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <AnimatedButton
            variant="secondary"
            onClick={() => scrollTo('#about')}
          >
            Meet the Creator (Act II)
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
