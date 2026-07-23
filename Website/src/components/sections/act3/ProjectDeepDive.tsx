'use client';

import { motion } from 'framer-motion';
import { featuredProject } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ProjectDeepDive() {
  const project = featuredProject;

  return (
    <section className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          title="Project Deep Dive"
          subtitle={`A closer look at the architecture and thinking behind ${project.title}`}
        />

        {/* Architecture section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#f5f5f5]">Architecture Overview</h3>
            <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">
              {project.architecture}
            </p>

            {/* Tech stack */}
            <div className="pt-4">
              <span className="text-xs tracking-[0.2em] uppercase text-[#f59e0b] font-mono mb-3 block">Technology Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs border border-[#1a1a1a] text-[#a3a3a3] bg-[#050505] hover:border-[#f59e0b]/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture diagram placeholder */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-[#242424] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <p className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono">Architecture Diagram</p>
                <p className="text-[10px] text-[#363636] mt-2">Coming Soon</p>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-8 h-[1px] bg-[#f59e0b]/20" />
            <div className="absolute top-6 left-6 w-[1px] h-8 bg-[#f59e0b]/20" />
          </div>
        </motion.div>

        {/* Impact metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {['85% Faster Processing', '50K+ Documents', '3 Enterprise Clients'].map((metric, i) => (
            <div key={i} className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] text-center">
              <div className="text-3xl font-serif font-bold text-[#f59e0b] mb-2">
                {metric.split(' ')[0]}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono">
                {metric.slice(metric.indexOf(' ') + 1)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Lessons learned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-serif font-bold text-[#f5f5f5] mb-8">Key Takeaways</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.lessons.map((lesson, i) => (
              <div key={i} className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#242424] transition-colors">
                <span className="text-[#f59e0b] text-sm font-mono mb-3 block">0{i + 1}</span>
                <p className="text-sm text-[#a3a3a3] font-light leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          {project.links.github && (
            <AnimatedButton variant="secondary" href={project.links.github}>
              View Full Case Study
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </AnimatedButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}
