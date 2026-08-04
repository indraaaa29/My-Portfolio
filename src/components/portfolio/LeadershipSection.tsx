'use client';

import { motion } from 'framer-motion';
import { Users, Presentation, Lightbulb } from 'lucide-react';
import LogoLoop from '@/components/reactbits/LogoLoop';

export default function LeadershipSection() {
  const pillars = [
    {
      icon: Users,
      title: "Community Building",
      desc: "Built and managed a vibrant campus community, driving engagement around modern AI technologies."
    },
    {
      icon: Presentation,
      title: "Developer Advocacy",
      desc: "Organized and led Gemini Product Trials, AI workshops, and technical deep-dives for peers."
    },
    {
      icon: Lightbulb,
      title: "AI Ecosystem",
      desc: "Created educational campaigns centered on Google's GenAI tools: Gemini, Nano Banana, Veo, and Lyria."
    }
  ];

  return (
    <section id="leadership" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="h-px w-6 bg-zinc-500/50" />
            <span>Advocacy & Community</span>
            <span className="h-px w-6 bg-zinc-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Google Student <span className="font-semibold text-zinc-300">Ambassador</span>
          </h2>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Highlight Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-sm space-y-6">
              <h3 className="text-2xl font-semibold text-zinc-100 tracking-tight">
                West Bengal Connector (Student Coordinator)
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Selected for consistent community contributions and technical leadership. My goal is to demystify artificial intelligence and empower developers to build with modern AI ecosystems.
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                Beyond writing code, true engineering impact comes from elevating the people around you. By mentoring fellow ambassadors and coordinating campus-wide initiatives, I bridge the gap between cutting-edge AI research and practical, accessible developer tools.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium border-t border-zinc-800/50">
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-zinc-300" />
                  <span>Bronze Milestone Reward (Active Contributions)</span>
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
                  className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-500/40 transition-all group flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-900 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
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

      {/* Authority Logo Loop */}
      <div className="mt-24 mb-[-7rem]">
        <LogoLoop
          logos={[
            { node: <span key="1" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">Google Cloud</span> },
            { node: <span key="2" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">Microsoft</span> },
            { node: <span key="3" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">SAP</span> },
            { node: <span key="4" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">NVIDIA</span> },
            { node: <span key="5" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">VOIS</span> },
          ]}
          speed={40}
        />
      </div>
    </section>
  );
}
