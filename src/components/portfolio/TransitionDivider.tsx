'use client';

import { motion } from 'framer-motion';

export default function TransitionDivider() {
  return (
    <div className="relative z-20 w-full bg-zinc-950 pt-20 pb-10 px-6 overflow-hidden">
      {/* Top subtle fade gradient to bridge pin ending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-amber-500/80"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span>Cinematic Intro Complete • Portfolio Below</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
        </motion.div>
      </div>
    </div>
  );
}
