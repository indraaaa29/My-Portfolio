'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';

export default function ExperienceSection() {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-28 px-6 md:px-12 bg-transparent relative">
      <SectionSeam />
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeUp>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="h-px w-6 bg-zinc-500/50" />
            <span>Track Record</span>
            <span className="h-px w-6 bg-zinc-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Professional <span className="font-semibold text-zinc-300">Experience</span>
          </h2>
        </div>
        </FadeUp>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Marker Icon */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-500 flex items-center justify-center text-zinc-300 shadow-md shadow-zinc-500/10">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Date Header for desktop view */}
              <div className="hidden md:block absolute -left-36 top-2 text-right w-28 text-xs font-semibold text-zinc-400 tracking-wider">
                {exp.period}
              </div>

              {/* Card Box */}
              <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-600 transition-colors space-y-4 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-zinc-400 font-medium text-sm tracking-wide mt-1">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium md:hidden mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed list-disc list-inside mt-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-zinc-400">
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-5 border-t border-zinc-800/50 mt-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-3">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-zinc-800/40 text-[10px] uppercase tracking-widest font-sans text-zinc-300 border border-zinc-700/50 cursor-default hover:border-zinc-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
