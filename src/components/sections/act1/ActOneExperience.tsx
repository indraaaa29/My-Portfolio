'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from '@/components/providers/AudioProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ActOneExperience() {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);
  const [showGlobalFlash, setShowGlobalFlash] = useState(false);
  
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenIntro');
    setHasSeenIntro(seen === 'true');
  }, []);

  const handleSeamlessTransition = () => {
    setShowGlobalFlash(true);
    
    // At the peak of the flash (150ms in), we hide the intro and jump to top
    setTimeout(() => {
      localStorage.setItem('hasSeenIntro', 'true');
      setHasSeenIntro(true);
      window.scrollTo(0, 0);
      
      // Flash fades out over 600ms
      setTimeout(() => {
        setShowGlobalFlash(false);
      }, 600);
    }, 150);
  };

  if (hasSeenIntro === null) return null;
  
  return (
    <>
      <AnimatePresence>
        {showGlobalFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {hasSeenIntro ? (
        <div className="w-full flex justify-end p-4 absolute top-0 right-0 z-50">
          <button 
            onClick={() => {
              localStorage.setItem('hasSeenIntro', 'false');
              window.location.reload();
            }}
            className="text-[10px] uppercase tracking-widest text-[#a3a3a3] hover:text-[#ffb347] transition-colors font-mono"
          >
            Replay Intro
          </button>
        </div>
      ) : (
        <IntroSequence onCapture={handleSeamlessTransition} />
      )}
    </>
  );
}

function IntroSequence({ onCapture }: { onCapture: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { playShutter, startAmbient } = useAudio();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [focusLocked, setFocusLocked] = useState(false);
  const [showCapture, setShowCapture] = useState(false);
  
  // Refs for animated elements
  const voidTextRef = useRef<HTMLDivElement>(null);
  const apertureContainerRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startAmbient();

    if (!containerRef.current || !stickyRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsScrolledToBottom(true);
      setTimeout(() => setFocusLocked(true), 500);
      setTimeout(() => setShowCapture(true), 1000);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            if (self.progress > 0.99 && !isScrolledToBottom) {
              setIsScrolledToBottom(true);
            } else if (self.progress < 0.99 && isScrolledToBottom) {
              setIsScrolledToBottom(false);
              setFocusLocked(false);
              setShowCapture(false);
            }
          }
        },
      });

      tl.to(voidTextRef.current, { opacity: 0, duration: 1 }, 0);
      tl.to(apertureContainerRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 5,
        ease: 'power2.inOut',
      }, 0.5);

      tl.fromTo(landscapeRef.current, 
        { filter: 'blur(40px)', brightness: 0.2, scale: 1.15 },
        { filter: 'blur(0px)', brightness: 1, scale: 1, duration: 5, ease: 'power2.inOut' },
        0.5
      );

      tl.fromTo(overlayRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' },
        2.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, [startAmbient, isScrolledToBottom]);

  useEffect(() => {
    if (isScrolledToBottom) {
      const lockTimer = setTimeout(() => {
        setFocusLocked(true);
        const captureTimer = setTimeout(() => {
          setShowCapture(true);
        }, 600);
        return () => clearTimeout(captureTimer);
      }, 800);
      return () => clearTimeout(lockTimer);
    }
  }, [isScrolledToBottom]);

  const handleCapture = () => {
    if (isCaptured) return;
    setIsCaptured(true);
    
    setTimeout(() => {
      playShutter();
      onCapture();
    }, 120);
  };

  return (
    <>
      <section 
        ref={containerRef} 
        id="act-one"
        className="relative w-full bg-[#0b0b0f] z-40"
        style={{ height: '300vh' }}
      >
        <div 
          ref={stickyRef}
          className="sticky top-0 w-full h-screen overflow-hidden bg-[#0b0b0f] flex items-center justify-center"
        >
          {/* Layer 1: The Landscape (GPU Accelerated) */}
          <div 
            ref={landscapeRef}
            className="absolute inset-0 w-full h-full object-cover will-change-[filter,transform]"
            style={{ 
              background: 'radial-gradient(circle at 50% 55%, #2a1c12 0%, #11131b 40%, #0b0b0f 80%)',
              transform: 'translateZ(0)' // Force GPU
            }}
          >
            {/* Minimalist central light source, softer than before */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ffb347] rounded-full blur-[80px] opacity-40 pointer-events-none" />
            <div className="absolute top-[55%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffb347]/5 to-transparent pointer-events-none" />
            
            {/* Grain Overlay - Ultra subtle */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
            />
          </div>

          {/* Layer 2: The Aperture Mask Container */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              ref={apertureContainerRef}
              className="absolute inset-0 bg-transparent will-change-[clip-path]"
              style={{ 
                clipPath: 'circle(0% at 50% 50%)',
                boxShadow: '0 0 0 9999px #0b0b0f'
              }}
            />
          </div>

          {/* Layer 3: Scene 01 Text */}
          <div 
            ref={voidTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.p 
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#f5f5f5] font-mono select-none"
            >
              Scroll to Enter
            </motion.p>
            <div className="mt-8 w-[1px] h-12 bg-gradient-to-b from-[#f5f5f5]/20 to-transparent relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-full h-1/2 bg-[#f5f5f5]/60"
              />
            </div>
          </div>

          {/* Layer 4: Camera HUD & Focus Lock Sequence */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
          >
            {/* Dynamic Focus Box */}
            <AnimatePresence>
              {isScrolledToBottom && (
                <motion.div 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ 
                    scale: focusLocked ? 1 : 1.05, 
                    opacity: focusLocked ? 0.8 : 0.3,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.16, 1, 0.3, 1] // Apple-style custom spring/easeOut
                  }}
                  className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ opacity: focusLocked ? 1 : 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#ffb347]" 
                  />
                  {/* Viewfinder Corners - Thinner, more elegant */}
                  <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300 ${focusLocked ? 'border-[#ffb347]' : 'border-[#f5f5f5]'}`} />
                  <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${focusLocked ? 'border-[#ffb347]' : 'border-[#f5f5f5]'}`} />
                  <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${focusLocked ? 'border-[#ffb347]' : 'border-[#f5f5f5]'}`} />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300 ${focusLocked ? 'border-[#ffb347]' : 'border-[#f5f5f5]'}`} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Technical Overlay Text */}
            <AnimatePresence>
              {focusLocked && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-center text-[#ffb347] font-mono text-[9px] tracking-widest"
                >
                  <span className="block mb-1 font-medium">FOCUS LOCK</span>
                  <span className="opacity-70">100% SHARP</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Layer 5: The Capture Button */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-20">
            <AnimatePresence>
              {showCapture && !isCaptured && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatedButton variant="primary" onClick={handleCapture}>
                    <span className="text-[11px] tracking-widest">CLICK SHUTTER</span>
                  </AnimatedButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}
