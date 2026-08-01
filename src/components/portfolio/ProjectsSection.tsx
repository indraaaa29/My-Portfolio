/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectsSection() {
  const categories = ['All', '3D & Motion', 'AI & ML', 'Web Apps', 'Mobile'];
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
              <span className="h-px w-6 bg-amber-500/50" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
              Featured <span className="font-semibold text-amber-400">Creations & Products</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  activeTab === cat
                    ? 'bg-amber-500 text-zinc-950 font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-xs font-semibold text-amber-400">
                    {project.category}
                  </div>

                  {/* Performance metric badge if exists */}
                  {project.metrics && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-xs font-medium text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-zinc-800/60">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs font-medium text-zinc-300 border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
