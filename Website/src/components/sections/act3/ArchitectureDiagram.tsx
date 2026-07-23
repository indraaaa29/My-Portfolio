'use client';

import { motion } from 'framer-motion';

export default function ArchitectureDiagram() {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center bg-[#11131b]/50 border border-[#2a2c35] p-8 overflow-hidden group">
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: 'linear-gradient(#f5f5f5 1px, transparent 1px), linear-gradient(90deg, #f5f5f5 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <svg viewBox="0 0 800 600" className="w-full h-full max-w-2xl relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Connection Lines */}
        <motion.path 
          d="M 200 300 L 400 150 L 600 300 L 400 450 Z" 
          stroke="#2a2c35" 
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 400 150 L 400 450" 
          stroke="#2a2c35" 
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Data Flow Pulses */}
        <motion.circle 
          cx="200" cy="300" r="4" fill="#ffb347"
          animate={{
            cx: [200, 400, 600],
            cy: [300, 150, 300],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.circle 
          cx="200" cy="300" r="4" fill="#ffb347"
          animate={{
            cx: [200, 400, 600],
            cy: [300, 450, 300],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Node 1: Client Edge */}
        <motion.g 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <rect x="150" y="275" width="100" height="50" rx="4" fill="#0b0b0f" stroke="#f5f5f5" strokeWidth="1" />
          <text x="200" y="300" fill="#f5f5f5" fontSize="12" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">CRDT Sync</text>
          <text x="200" y="315" fill="#a3a3a3" fontSize="8" fontFamily="monospace" textAnchor="middle">WASM / Rust</text>
        </motion.g>

        {/* Node 2: Gateway */}
        <motion.g 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <rect x="350" y="125" width="100" height="50" rx="4" fill="#0b0b0f" stroke="#a3a3a3" strokeWidth="1" />
          <text x="400" y="150" fill="#f5f5f5" fontSize="12" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">Edge Worker</text>
          <text x="400" y="165" fill="#a3a3a3" fontSize="8" fontFamily="monospace" textAnchor="middle">Conflict Res</text>
        </motion.g>

        {/* Node 3: Message Broker */}
        <motion.g 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <rect x="350" y="425" width="100" height="50" rx="4" fill="#0b0b0f" stroke="#a3a3a3" strokeWidth="1" />
          <text x="400" y="450" fill="#f5f5f5" fontSize="12" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">Event Bus</text>
          <text x="400" y="465" fill="#a3a3a3" fontSize="8" fontFamily="monospace" textAnchor="middle">Redis Pub/Sub</text>
        </motion.g>

        {/* Node 4: Persistence */}
        <motion.g 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <rect x="550" y="275" width="100" height="50" rx="4" fill="#0b0b0f" stroke="#ffb347" strokeWidth="1" />
          <text x="600" y="300" fill="#f5f5f5" fontSize="12" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">Persistence</text>
          <text x="600" y="315" fill="#a3a3a3" fontSize="8" fontFamily="monospace" textAnchor="middle">Postgres (WAL)</text>
        </motion.g>

      </svg>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ffb347] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ffb347] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#ffb347] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ffb347] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
