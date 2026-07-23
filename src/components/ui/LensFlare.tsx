'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface LensFlareProps {
  className?: string;
  color?: string;
  size?: number;
  speed?: number;
}

export default function LensFlare({
  className = '',
  color = 'rgba(217, 119, 6, 0.15)',
  size = 600,
  speed = 1,
}: LensFlareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute pointer-events-none rounded-full ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4 * speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at center, ${color} 0%, ${color.replace('0.15', '0.05')} 40%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  );
}
