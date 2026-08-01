'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Trophy } from 'lucide-react';

export default function AchievementsSection() {
  const { achievements } = PORTFOLIO_DATA;

  return (
    <section className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="h-px w-6 bg-amber-500/50" />
            <span>Recognition</span>
            <span className="h-px w-6 bg-amber-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Honors & <span className="font-semibold text-amber-400">Achievements</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                    <Trophy className="w-6 h-6" />
                  </div>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-semibold text-amber-300 border border-zinc-700">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-amber-500/90">
                  {item.organization} • {item.date}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
