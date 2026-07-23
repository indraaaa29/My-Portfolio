'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { metrics } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';

function CountUp({ value, suffix, isVisible }: { value: string; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const numValue = parseInt(value);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = numValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, numValue]);

  return <>{count}{suffix}</>;
}

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative p-8 md:p-10 border border-[#1a1a1a] bg-[#0a0a0a] text-center group hover:border-[#242424] transition-all duration-500"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-[#f59e0b]/[0.02] to-transparent" />

      {/* Number */}
      <div className="relative z-10">
        <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#f59e0b]">
          <CountUp value={metric.value} suffix={metric.suffix} isVisible={isVisible} />
        </span>
      </div>

      {/* Label */}
      <p className="relative z-10 mt-3 text-sm text-[#a3a3a3] font-light tracking-wide">
        {metric.label}
      </p>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function ProofOfImpact() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      {/* Lens flare */}
      <div className="lens-flare top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          title="Proof of Impact"
          subtitle="Numbers that reflect the work I've delivered"
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
