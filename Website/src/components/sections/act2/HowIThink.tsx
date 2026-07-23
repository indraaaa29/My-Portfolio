'use client';

import { motion } from 'framer-motion';
import { content } from '@/data/content';
import SectionHeading from '@/components/ui/SectionHeading';

export default function HowIThink() {
  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          title="How I Think"
          subtitle="The principles that guide my engineering decisions"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {content.philosophy.principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#242424] transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f59e0b]/[0.02] to-transparent" />

              {/* Icon */}
              <span className="text-3xl block mb-4">{principle.icon}</span>

              {/* Title */}
              <h3 className="text-xl font-serif font-bold text-[#f5f5f5] mb-3">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">
                {principle.description}
              </p>

              {/* Corner line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#f59e0b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
