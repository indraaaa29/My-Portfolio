'use client';

import React from 'react';

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-zinc-950">
      {/* 
        Layer A: Large soft ambient glow (Charcoal/Dark Zinc)
        Moving extremely slowly across the viewport.
      */}
      <div 
        className="absolute inset-[-50%] opacity-40 motion-safe:animate-[ambient-drift_30s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(39, 39, 42, 0.4) 0%, rgba(9, 9, 11, 0) 50%)',
        }}
      />

      {/* 
        Layer B: Slightly warmer secondary glow (Subtle Amber/Champagne)
        Moving on a different axis to create depth.
      */}
      <div 
        className="absolute inset-[-50%] opacity-20 motion-safe:animate-[ambient-drift-reverse_45s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.15) 0%, rgba(9, 9, 11, 0) 40%)',
        }}
      />

      {/* 
        Layer C: Faint edge/vignette treatment
        Static to ground the composition.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)]" />

      {/* 
        Film Grain Texture
        Using an SVG noise filter for extremely subtle CSS grain.
        Opacity kept very low to just add texture without noise.
      */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
