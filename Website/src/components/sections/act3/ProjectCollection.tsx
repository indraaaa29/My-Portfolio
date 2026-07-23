'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectCollection() {
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          title="Project Collection"
          subtitle="A selection of products and systems I've built"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#242424] transition-all duration-500 overflow-hidden"
            >
              {/* Project image area */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                
                {/* Hover lens flare */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br from-[#f59e0b]/10 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#525252] font-mono bg-[#050505]/80 px-2 py-1 border border-[#1a1a1a]">
                    {project.category}
                  </span>
                </div>

                {/* Project title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-serif font-bold text-[#f5f5f5]">{project.title}</h3>
                  <p className="text-xs text-[#525252] mt-1">{project.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-[#a3a3a3] font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[10px] border border-[#1a1a1a] text-[#525252]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 text-[10px] text-[#525252]">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Impact */}
                <p className="mt-4 text-xs text-[#f59e0b] font-medium">
                  {project.impact}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#f59e0b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
