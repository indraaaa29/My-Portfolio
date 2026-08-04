'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Trophy } from 'lucide-react';

export default function AchievementsSection() {
  const { achievements } = PORTFOLIO_DATA;

  return (
    <section className="pt-16 pb-32 px-6 md:px-12 bg-zinc-950 relative overflow-hidden">
      
      {/* Editorial Container */}
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Block */}
        <div className="w-full flex flex-col items-center justify-center mb-24 text-center">
          <div className="inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-8">
            <span className="h-px w-12 bg-zinc-800" />
            <span>Milestones</span>
            <span className="h-px w-12 bg-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Engineering <span className="font-medium text-zinc-400">Certifications</span>
          </h2>
        </div>

        {/* Cohesive Cards Block */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-[2rem] bg-zinc-900/20 border border-zinc-800/40 hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between space-y-10 group"
            >
              <div className="space-y-6">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 text-[10px] uppercase font-semibold tracking-widest text-zinc-500 border border-zinc-800/80 group-hover:border-zinc-700/50 group-hover:text-zinc-400 transition-colors duration-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title & Meta */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors duration-300 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.15em]">
                    {item.organization}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
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
