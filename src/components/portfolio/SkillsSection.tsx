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

                <div className="space-y-5">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-zinc-300">{s.name}</span>
                        <span className="text-zinc-500 font-mono text-xs">{s.level}%</span>
                      </div>
                      
                      {/* Animated Progress Meter */}
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-zinc-400 rounded-full"
                        />
                      </div>
                    </div>
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
