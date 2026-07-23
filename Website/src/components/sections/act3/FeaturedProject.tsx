'use client';

import { motion } from 'framer-motion';
import { featuredProject } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function FeaturedProject() {
  const project = featuredProject;

  return (
    <section className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      {/* Large lens flare behind project */}
      <div className="lens-flare top-1/3 right-1/4 w-[500px] h-[500px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          act="ACT III — Built With Purpose"
          title="Featured Project"
          subtitle={project.subtitle}
        />

        {/* Project hero card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]"
        >
          {/* Project visual area */}
          <div className="relative aspect-[21/9] bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a]">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="text-center"
              >
                <span className="text-6xl md:text-8xl font-serif font-bold text-[#f5f5f5]/5">
                  {project.title}
                </span>
              </motion.div>
            </div>

            {/* Project label */}
            <div className="absolute bottom-6 left-6">
              <span className="text-xs tracking-[0.2em] uppercase text-[#f59e0b] font-mono">
                Featured Project
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-serif font-bold text-[#f5f5f5]">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Project details */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left column */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2 block">Problem</span>
                  <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2 block">Thinking</span>
                  <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">{project.thinking}</p>
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2 block">Solution</span>
                  <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-3 block">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs border border-[#1a1a1a] text-[#a3a3a3] bg-[#050505]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2 block">Architecture</span>
                  <p className="text-sm md:text-base text-[#a3a3a3] font-light leading-relaxed">{project.architecture}</p>
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2 block">Impact</span>
                  <p className="text-sm md:text-base text-[#f59e0b] font-medium">{project.impact}</p>
                </div>
                
                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.links.github && (
                    <AnimatedButton variant="secondary" href={project.links.github}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      View Code
                    </AnimatedButton>
                  )}
                  {project.links.live && (
                    <AnimatedButton variant="primary" href={project.links.live}>
                      Live Demo
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-8 md:p-10 border border-[#1a1a1a] bg-[#0a0a0a]"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-[#f59e0b] font-mono mb-4 block">Lessons Learned</span>
          <ul className="space-y-3">
            {project.lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#f59e0b] mt-1">→</span>
                <span className="text-sm md:text-base text-[#a3a3a3] font-light">{lesson}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
