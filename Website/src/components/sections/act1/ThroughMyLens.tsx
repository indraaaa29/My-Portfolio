'use client';

import { motion } from 'framer-motion';

const lenses = [
  {
    title: 'Artificial Intelligence',
    subtitle: 'Autonomous Systems & RAG Architecture',
    meta: 'FOCAL: 50MM · f/1.4 · ISO 100',
    tag: 'SCENE 01',
    aspect: 'md:col-span-2 md:aspect-[21/9]',
  },
  {
    title: 'Full Stack Engineering',
    subtitle: 'High-Performance Web & Scalable APIs',
    meta: 'FOCAL: 35MM · f/1.8 · ISO 200',
    tag: 'SCENE 02',
    aspect: 'md:col-span-1 md:aspect-[4/3]',
  },
  {
    title: 'Distributed Systems',
    subtitle: 'Event Streams, Kafka & Cloud Infrastructure',
    meta: 'FOCAL: 85MM · f/1.2 · ISO 100',
    tag: 'SCENE 03',
    aspect: 'md:col-span-1 md:aspect-[4/3]',
  },
  {
    title: 'Mobile Architecture',
    subtitle: 'Offline-First Cross-Platform Experiences',
    meta: 'FOCAL: 24MM · f/2.0 · ISO 400',
    tag: 'SCENE 04',
    aspect: 'md:col-span-2 md:aspect-[21/9]',
  },
];

export default function ThroughMyLens() {
  return (
    <section
      id="through-my-lens"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-32 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#f59e0b] block mb-2">
            ACT I — SCENE 03
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#f5f5f5]">
            Through My Lens
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#a3a3a3] font-light max-w-xl">
            Observing complex technical challenges through the lens of first-principles engineering and human-centered design.
          </p>
        </div>

        {/* Lens Viewfinder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {lenses.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, filter: 'blur(16px)', y: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group relative overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm transition-all duration-700 hover:border-[#f59e0b]/40 ${item.aspect}`}
            >
              {/* Background Lens Flare Radial */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, rgba(245, 158, 11, 0.2) 0%, transparent 70%)`,
                }}
              />

              {/* Viewfinder Reticle Ticks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors duration-500" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors duration-500" />

              {/* Camera Metadata Overlay */}
              <div className="absolute top-5 left-8 right-8 flex items-center justify-between font-mono text-[10px] text-[#525252] tracking-widest uppercase group-hover:text-[#a3a3a3] transition-colors duration-500">
                <span>{item.tag}</span>
                <span>{item.meta}</span>
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-end p-8 pt-16 z-10">
                <span className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5f5f5] group-hover:text-white transition-colors duration-300">
                  {item.title}
                </span>
                <p className="mt-2 text-xs md:text-sm font-mono tracking-wider text-[#a3a3a3] group-hover:text-[#f59e0b] transition-colors duration-300">
                  {item.subtitle}
                </p>
              </div>

              {/* Subtle Aperture Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
