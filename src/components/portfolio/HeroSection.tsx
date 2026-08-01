'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowDown, Sparkles, Terminal } from 'lucide-react';

export default function HeroSection() {
  const { name, tagline, stats } = PORTFOLIO_DATA.personal;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 md:px-12 bg-zinc-950 overflow-hidden">
      {/* Golden-hour ambient backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative subtle grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Status Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-inner"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs md:text-sm font-medium text-zinc-300 tracking-wide">
            Available for Select Projects & Roles
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-zinc-100">
            Crafting Digital <br />
            <span className="font-semibold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed pt-2">
            Hi, I&apos;m <span className="text-zinc-100 font-normal">{name}</span>. {tagline}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-zinc-950 font-semibold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-zinc-950" />
            <span>Explore Work</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-base hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
          >
            <Terminal className="w-5 h-5 text-amber-400" />
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm hover:border-amber-500/40 transition-colors group"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-zinc-400 mt-1 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-amber-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
