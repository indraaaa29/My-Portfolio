'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Award, Compass, Cpu, Layers } from 'lucide-react';

export default function AboutSection() {
  const { bio, location } = PORTFOLIO_DATA.personal;

  const pillars = [
    {
      icon: Cpu,
      title: "System Thinking",
      desc: "I don't just write scripts. I architect platforms that scale securely and handle real-time demands."
    },
    {
      icon: Layers,
      title: "Data-Driven AI",
      desc: "Leveraging machine learning and computer vision to solve complex, real-world problems."
    },
    {
      icon: Compass,
      title: "Secure Architecture",
      desc: "Applying ethical hacking and threat detection principles natively into the DevOps pipeline."
    }
  ];

  return (
    <section id="mindset" className="py-28 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="h-px w-6 bg-zinc-500/50" />
            <span>The Mindset</span>
            <span className="h-px w-6 bg-zinc-500/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
            Building Meaningful <span className="font-semibold text-zinc-300">Software</span>
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
            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md space-y-6">
              <h3 className="text-2xl font-semibold text-zinc-100">
                Driven by curiosity. Grounded in logic.
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {bio}
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                Whether architecting civic engagement platforms, engineering WebGL dashboards for crowd analytics, or securing cloud deployments, I focus on the holistic impact of the technology I build. I believe the best software disappears into the workflow.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-zinc-300" />
                  <span>Google Student Ambassador</span>
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
    </section>
  );
}
