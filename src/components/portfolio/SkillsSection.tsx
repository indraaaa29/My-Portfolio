'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CodeXml, Brain, Cloud } from 'lucide-react';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';
import styles from './SkillsSection.module.css';

const CATEGORY_META: Record<string, { icon: React.ElementType, subtitle: string[], index: string }> = {
  "Web Engineering": {
    icon: CodeXml,
    subtitle: ["BUILD", "SCALE", "DELIVER"],
    index: "01"
  },
  "AI & Machine Learning": {
    icon: Brain,
    subtitle: ["LEARN", "ANALYZE", "INNOVATE"],
    index: "02"
  },
  "Cloud & Cybersecurity": {
    icon: Cloud,
    subtitle: ["SECURE", "DEPLOY", "PROTECT"],
    index: "03"
  }
};

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className={styles.section}>
      <SectionSeam />
      <div className={styles.inner}>

        {/* Header */}
        <FadeUp>
          <div className={styles.headerWrapper}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>Core Capabilities</span>
              <span className={styles.eyebrowLine} />
            </div>
            <h2 className={styles.mainHeading}>
              Technical <span className={styles.mainHeadingBold}>Expertise</span>
            </h2>
            <div className={styles.subtitle}>
              TOOLS <span>×</span> TECHNOLOGIES <span>×</span> POSSIBILITIES
            </div>
          </div>
        </FadeUp>

        {/* Skill Category Cards */}
        <div className={styles.grid}>
          {skills.map((cat, catIndex) => {
            const meta = CATEGORY_META[cat.category] || { icon: CodeXml, subtitle: ["SKILLS", "AND", "TOOLS"], index: `0${catIndex + 1}` };
            const Icon = meta.icon;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: catIndex * 0.1 }}
                className={styles.card}
              >
                <div className={styles.cornerAccent} />

                <div className={styles.cardHeader}>
                  <div className={styles.indexWrapper}>
                    <span className={styles.indexNumber}>{meta.index}</span>
                    <div className={styles.indexLine} />
                  </div>
                  <div className={styles.iconWrapper}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className={styles.cardTitle}>
                  {cat.category}
                </h3>
                
                <div className={styles.cardSubtitle}>
                  {meta.subtitle.map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i < meta.subtitle.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className={styles.cardDivider} />

                <div className={styles.skillsList}>
                  {cat.skills.map((s) => (
                    <span key={s.name} className={styles.skillPill}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
