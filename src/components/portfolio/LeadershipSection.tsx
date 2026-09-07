'use client';

import { motion } from 'framer-motion';
import { Users, Presentation, Lightbulb } from 'lucide-react';
import LogoLoop from '@/components/reactbits/LogoLoop';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';
import styles from './LeadershipSection.module.css';

export default function LeadershipSection() {
  const pillars = [
    {
      icon: Users,
      title: "Community Building",
      desc: "Built and managed a vibrant campus community, driving engagement around modern AI technologies."
    },
    {
      icon: Presentation,
      title: "Developer Advocacy",
      desc: "Organized and led Gemini Product Trials, AI workshops, and technical deep-dives for peers."
    },
    {
      icon: Lightbulb,
      title: "AI Ecosystem",
      desc: "Created educational campaigns centered on Google's GenAI tools: Gemini, Nano Banana, Veo, and Lyria."
    }
  ];

  return (
    <section id="leadership" className="py-28 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <SectionSeam />
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <FadeUp>
          <div className={styles.container}>
            <div className={styles.eyebrowContainer}>
              <div className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Advocacy & Community</span>
              <div className={styles.eyebrowLine} />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight text-center">
              Google Student <span className="font-semibold text-zinc-200">Ambassador</span>
            </h2>
          </div>
        </FadeUp>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Left: Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE }}
            className={styles.mainCard}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardNumber}>
                <span>01</span>
                <div className={styles.cardNumberLine} />
              </div>
              <div className={styles.cardDecorativeLines}>
                <div className={styles.diagonalLine} />
                <div className={styles.diagonalLine} />
                <div className={styles.diagonalLine} />
              </div>
            </div>

            <h3 className={styles.mainTitle}>
              West Bengal Connector (Student Coordinator)
            </h3>
            
            <p className={styles.mainText}>
              Selected for consistent community contributions and technical leadership. My goal is to demystify artificial intelligence and empower developers to build with modern AI ecosystems.
            </p>
            <p className={styles.mainText}>
              Beyond writing code, true engineering impact comes from elevating the people around you. By mentoring fellow ambassadors and coordinating campus-wide initiatives, I bridge the gap between cutting-edge AI research and practical, accessible developer tools.
            </p>

            <div className={styles.mainCardFooter}>
              <div className={styles.goldDot} />
              <span className={styles.footerText}>Gold Milestone Reward (Active Contributions)</span>
            </div>
          </motion.div>

          {/* Right: Pillars Cards */}
          <div className={styles.rightColumn}>
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.1 + (i * 0.1) }}
                  className={styles.featureCard}
                >
                  <div className={styles.featureCardHeader}>
                    <span className={styles.featureNumber}>0{i + 2}</span>
                    <div className={styles.featureNumberLine} />
                  </div>
                  
                  <div className={styles.iconContainer}>
                    <Icon strokeWidth={1.5} size={22} />
                  </div>
                  
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>
                      {pillar.title}
                    </h4>
                    <p className={styles.featureText}>
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Authority Logo Loop */}
      <div className="mt-24 mb-[-7rem]">
        <LogoLoop
          logos={[
            { node: <span key="1" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">Google Cloud</span> },
            { node: <span key="2" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">Microsoft</span> },
            { node: <span key="3" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">SAP</span> },
            { node: <span key="4" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">NVIDIA</span> },
            { node: <span key="5" className="text-2xl font-bold tracking-widest uppercase font-display mx-8 text-zinc-600">VOIS</span> },
          ]}
          speed={40}
        />
      </div>
    </section>
  );
}
