'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { content } from '@/data/content';
import LensFlare from '@/components/ui/LensFlare';

export default function TheVoid() {
  const apertureRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (apertureRef.current) {
      gsap.to(apertureRef.current, {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: 'none',
      });
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { filter: 'blur(12px)', opacity: 0, scale: 0.95 },
        { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-[#f59e0b]/30 selection:text-white"
    >
      {/* Cinematic Background Gradients */}
      <div className="absolute inset-0 bg-radial from-[#0a0a0a] via-[#050505] to-[#020202] opacity-80" />
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Atmospheric Lens Flares */}
      <LensFlare className="top-1/4 left-1/3 w-[450px] h-[450px] opacity-40" />
      <LensFlare className="bottom-1/4 right-1/3 w-[350px] h-[350px] opacity-30" />

      {/* Mechanical Aperture Ring & Optics */}
      <div className="relative flex items-center justify-center my-auto">
        <div ref={apertureRef} className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
          {/* Outer Calibration Ring */}
          <div className="absolute inset-0 rounded-full border border-[#242424] opacity-80" />
          
          {/* Ticks and f-stop markings */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 -translate-x-1/2 flex justify-between px-1 pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
            >
              <div className="w-1.5 h-[1px] bg-[#f59e0b]/40" />
              <div className="w-1.5 h-[1px] bg-[#f59e0b]/40" />
            </div>
          ))}

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            className="absolute inset-3 rounded-full border border-dashed border-[#1a1a1a]"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          {/* Aperture Blade System */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-[#f59e0b]/40 to-transparent origin-left"
              style={{
                width: '45%',
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0% 50%',
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Central Focal Point Glow */}
          <motion.div
            className="relative w-12 h-12 rounded-full bg-[#f59e0b]/10 backdrop-blur-sm border border-[#f59e0b]/30 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(245,158,11,0.2)',
                '0 0 40px rgba(245,158,11,0.5)',
                '0 0 20px rgba(245,158,11,0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_15px_#f59e0b]" />
          </motion.div>
        </div>

        {/* Central HUD Focus Label */}
        <div ref={textRef} className="absolute -bottom-16 text-center">
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#a3a3a3] font-mono font-medium">
            {content.void.label}
          </p>
          <p className="mt-2 text-xs text-[#525252] font-mono max-w-xs mx-auto">
            {content.void.text}
          </p>
        </div>
      </div>

      {/* Camera Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#525252]">
          SCROLL TO OPEN
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-[#f59e0b] via-[#f59e0b]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
