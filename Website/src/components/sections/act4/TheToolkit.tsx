'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';

export default function TheToolkit() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          act="ACT IV — Skills & Expertise"
          title="The Toolkit"
          subtitle="Technologies and tools I work with daily"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="p-6 md:p-8 border border-[#1a1a1a] bg-[#0a0a0a]"
            >
              <h3 className="text-lg font-serif font-bold text-[#f5f5f5] mb-6">
                {category.name}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="text-sm text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#525252] font-mono">{skill.level}/5</span>
                    </div>
                    {/* Skill level bar */}
                    <div className="h-[2px] bg-[#1a1a1a] overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + catIdx * 0.1 }}
                        className="h-full origin-left bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
