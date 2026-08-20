'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-transparent relative">
      <SectionSeam />
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeUp>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="h-px w-6 bg-zinc-500/50" />
            <span>Core Capabilities</span>
            <span className="h-px w-6 bg-zinc-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Technical <span className="font-semibold text-zinc-300">Expertise</span>
          </h2>
        </div>
        </FadeUp>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: catIndex * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-500/40 transition-all space-y-6 flex flex-col justify-between backdrop-blur-sm"
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-100 border-b border-zinc-800 pb-4 mb-6 tracking-tight">
                  {cat.category}
                </h3>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2.5 py-1.5 rounded-md bg-zinc-800/40 text-[10px] uppercase tracking-widest font-sans text-zinc-300 border border-zinc-700/50 hover:border-zinc-500/50 hover:text-zinc-200 transition-colors cursor-default"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
