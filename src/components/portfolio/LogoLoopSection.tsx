'use client';

import React from 'react';
import LogoLoop from '@/components/reactbits/LogoLoop';
import FadeUp from './FadeUp';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiDocker, 
  SiFirebase, 
  SiTensorflow, 
  SiPython, 
  SiGooglecloud 
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React' },
  { node: <SiNextdotjs />, title: 'Next.js' },
  { node: <SiTypescript />, title: 'TypeScript' },
  { node: <SiNodedotjs />, title: 'Node.js' },
  { node: <SiExpress />, title: 'Express' },
  { node: <SiMongodb />, title: 'MongoDB' },
  { node: <SiPostgresql />, title: 'PostgreSQL' },
  { node: <SiDocker />, title: 'Docker' },
  { node: <SiFirebase />, title: 'Firebase' },
  { node: <SiTensorflow />, title: 'TensorFlow' },
  { node: <SiPython />, title: 'Python' },
  { node: <SiGooglecloud />, title: 'Google Cloud' },
].map(item => ({
  ...item,
  node: (
    <div className="text-zinc-600 hover:text-zinc-400 transition-colors duration-500 cursor-default">
      {item.node}
    </div>
  )
}));

export default function LogoLoopSection() {
  return (
    <section className="relative w-full py-32 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Section Header */}
        <FadeUp>
        <div className="text-center mb-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
            Engineering Ecosystem
          </h2>
          <p className="text-zinc-500 font-light text-base md:text-lg max-w-[700px] mx-auto">
            Core technologies and trusted ecosystems that power my software architecture.
          </p>
        </div>
        </FadeUp>

        {/* Logo Loop */}
        <div className="w-full">
          <LogoLoop
            logos={techLogos}
            speed={25}
            direction="left"
            logoHeight={44}
            gap={90}
            pauseOnHover={true}
            scaleOnHover={false}
            fadeOut={true}
            fadeOutColor="#09090b" // Match zinc-950 background
            ariaLabel="Engineering ecosystem technologies"
          />
        </div>

      </div>
    </section>
  );
}
