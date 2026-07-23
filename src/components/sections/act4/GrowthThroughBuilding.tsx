'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';

const typeStyles = {
  work: { label: 'Work', color: 'text-[#f59e0b]', border: 'border-[#f59e0b]/30' },
  education: { label: 'Education', color: 'text-[#fbbf24]', border: 'border-[#fbbf24]/30' },
  project: { label: 'Project', color: 'text-[#a3a3a3]', border: 'border-[#a3a3a3]/30' },
};

export default function GrowthThroughBuilding() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <SectionHeading
          title="Growth Through Building"
          subtitle="My journey in engineering and product development"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#f59e0b]/40 via-[#242424] to-transparent transform md:-translate-x-px" />

          <div className="space-y-16">
            {timeline.map((event, i) => {
              const style = typeStyles[event.type];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`p-5 border border-[#1a1a1a] bg-[#0a0a0a] inline-block ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}>
                      {/* Year */}
                      <span className="text-xs tracking-[0.2em] uppercase text-[#f59e0b] font-mono block mb-1">
                        {event.year}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-bold text-[#f5f5f5] mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#a3a3a3] font-light leading-relaxed">
                        {event.description}
                      </p>

                      {/* Type badge */}
                      <span className={`inline-block mt-3 text-[10px] tracking-[0.2em] uppercase ${style.color} font-mono border ${style.border} px-2 py-0.5`}>
                        {style.label}
                      </span>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:translate-x-0 md:-translate-x-1/2">
                    <div className={`w-3 h-3 rounded-full border-2 ${style.border} bg-[#050505]`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-[#f59e0b] m-[2px]`} />
                    </div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
