'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="h-px w-6 bg-amber-500/50" />
            <span>Core Capabilities</span>
            <span className="h-px w-6 bg-amber-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Technical & Creative <span className="font-semibold text-amber-400">Mastery</span>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/40 transition-all shadow-lg space-y-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-4 mb-6">
                  {cat.category}
                </h3>

                <div className="space-y-5">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-zinc-200">{s.name}</span>
                        <span className="text-amber-400 font-mono text-xs">{s.level}%</span>
                      </div>
                      
                      {/* Animated Progress Meter */}
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
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
