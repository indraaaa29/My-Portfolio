'use client';

import { ArrowUp } from 'lucide-react';
import SectionSeam from './SectionSeam';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 md:px-12 bg-transparent text-zinc-400">
      <SectionSeam compact />
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <span>Back To Top</span>
          <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-amber-500/50 transition-colors">
            <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>

      </div>
    </footer>
  );
}
