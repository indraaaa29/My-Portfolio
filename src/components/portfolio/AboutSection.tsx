'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Award, Compass, Cpu, Layers } from 'lucide-react';

export default function AboutSection() {
  const { bio, location } = PORTFOLIO_DATA.personal;

  const pillars = [
    {
      icon: Compass,
      title: "Storytelling & Motion",
      desc: "Every interaction is crafted with purpose, timing, and cinematic flow."
    },
    {
      icon: Cpu,
      title: "60 FPS Engineering",
      desc: "GPU-accelerated rendering pipelines, zero frame drops, and sub-second load times."
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      desc: "Clean modular code built with Next.js, React 19, TypeScript, and modern design systems."
    }
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="h-px w-6 bg-amber-500/50" />
            <span>About The Craftsman</span>
            <span className="h-px w-6 bg-amber-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Engineering Meets <span className="font-semibold text-amber-400">Cinematic Design</span>
          </h2>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md space-y-6">
              <h3 className="text-2xl font-semibold text-zinc-100">
                Driven by curiosity, refined by detail.
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {bio}
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                Whether orchestrating complex canvas scroll triggers, engineering WebGL shaders, or architecting enterprise-grade frontend applications, I bring a holistic focus on usability and technical excellence.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>10+ Global Design & Dev Awards</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Pillars Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/40 transition-all group flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
