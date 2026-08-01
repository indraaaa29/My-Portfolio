'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function ExperienceSection() {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="h-px w-6 bg-amber-500/50" />
            <span>Track Record</span>
            <span className="h-px w-6 bg-amber-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Professional <span className="font-semibold text-amber-400">Experience</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Marker Icon */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-900 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/20">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Date Header for desktop view (left side absolute alignment) */}
              <div className="hidden md:block absolute -left-36 top-2 text-right w-28 text-xs font-semibold text-amber-400 tracking-wider">
                {exp.period}
              </div>

              {/* Card Box */}
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
                      {exp.role}
                    </h3>
                    <div className="text-amber-400 font-medium text-base">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-medium md:hidden">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed list-disc list-inside">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-zinc-300">
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="pt-4 flex flex-wrap gap-2 border-t border-zinc-800/50">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-xs font-mono text-amber-200/90 border border-amber-500/20"
                    >
                      {tech}
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
