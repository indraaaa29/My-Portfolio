'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheEngineer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !portraitRef.current) return;

    const ctx = gsap.context(() => {
      // Very slow, subtle parallax on the portrait
      gsap.to(portraitRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal animation (only happens once when scrolled into view)
      // Note: Because it sits directly under Act I, it will likely be in view immediately after flash
      gsap.fromTo(
        textRef.current!.children,
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.8,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="act-two" 
      className="relative w-full min-h-screen bg-[#0b0b0f] flex flex-col justify-center overflow-hidden pt-32 pb-32 px-6 md:px-12 lg:px-24 z-10"
    >
      {/* Supporting Cinematic Portrait (Placeholder) */}
      <div 
        ref={portraitRef}
        className="absolute right-0 top-0 w-[80%] md:w-[60%] lg:w-[45%] h-[120%] pointer-events-none select-none opacity-20 mix-blend-luminosity will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f] via-transparent to-transparent z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinematic Engineering Portrait"
          className="w-full h-full object-cover filter contrast-125 brightness-75 grayscale"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center flex-grow">
        
        {/* The Lead Story: Engineering Philosophy */}
        <h2 ref={textRef} className="text-5xl md:text-6xl lg:text-8xl font-serif text-[#f5f5f5] leading-[1.05] tracking-tight max-w-5xl mb-24">
          <span className="block opacity-0">I engineer solutions</span>
          <span className="block opacity-0 text-[#a3a3a3] italic">that create impact</span>
          <span className="block opacity-0">and simplify lives.</span>
        </h2>

        {/* Evidence & Credibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end mt-auto">
          
          {/* Identity (Subordinated to Philosophy) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[#ffb347] text-[10px] tracking-[0.3em] uppercase mb-5">The Architect</p>
            <h1 className="text-xl md:text-2xl font-medium tracking-wide text-[#f5f5f5] mb-3">Indranil Paul</h1>
            <p className="text-[#a3a3a3] text-sm leading-relaxed max-w-sm">
              Product Engineer architecting highly resilient systems and cinematic digital experiences.
            </p>
          </motion.div>

          {/* Evidence / Approach */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 md:col-start-9"
          >
            <div className="border-l border-[#1a1c23] pl-6 py-1">
              <p className="text-[#f5f5f5] text-sm leading-relaxed mb-5">
                Bridging raw backend performance with meticulous frontend execution. I do not simply write code—I design resilient systems that solve complex human problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="text-[10px] font-mono text-[#6b7280] uppercase tracking-wider">System Architecture</span>
                <span className="text-[10px] font-mono text-[#6b7280] uppercase tracking-wider">Applied AI</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bridge to Act III */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: '64px', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-6 md:left-12 lg:left-24 w-[1px] bg-gradient-to-b from-[#ffb347]/50 to-transparent z-20"
      />
    </section>
  );
}
