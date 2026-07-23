'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  act?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ act, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : ''}`}>
      {act && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs tracking-[0.3em] uppercase text-[#f59e0b] font-mono block mb-4"
        >
          {act}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#f5f5f5] leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-[#a3a3a3] max-w-2xl font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[1px] bg-gradient-to-r from-[#f59e0b] to-transparent mt-6 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        style={{ width: align === 'center' ? '120px' : '80px' }}
      />
    </div>
  );
}
