'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Calendar, MapPin } from 'lucide-react';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';
import styles from './ExperienceSection.module.css';
import { cn } from '@/lib/utils';

export default function ExperienceSection() {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className={styles.section}>
      <SectionSeam />
      <div className={styles.inner}>
        
        {/* Decorative Side Labels */}
        <div className={styles.sideLabelLeft}>
          <div className={styles.sideLabelLine} />
          <span>EXPERIENCE</span>
          <span>SHAPES</span>
          <span>A BETTER</span>
          <span>TOMORROW</span>
        </div>
        <div className={styles.sideLabelRight}>
          <div className={styles.sideLabelLine} />
          <span>LEARN</span>
          <span>BUILD</span>
          <span>SOLVE</span>
          <span>IMPROVE</span>
        </div>

        {/* Header */}
        <FadeUp>
          <div className={styles.headerWrapper}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>Track Record</span>
              <span className={styles.eyebrowLine} />
            </div>
            <h2 className={styles.mainHeading}>
              Professional <span className={styles.mainHeadingBold}>Experience</span>
            </h2>
            <div className={styles.subtitle}>
              REAL PROJECTS <span>•</span> REAL IMPACT <span>•</span> CONSTANT GROWTH
            </div>
          </div>
        </FadeUp>

        {/* Timeline Container */}
        <div className={styles.timelineContainer}>
          {experiences.map((exp, index) => {
            const isCurrent = index === 0;

            // Split date if there is an " — " or "-" for multiline desktop
            // E.g., "Apr 2026 — Present" -> ["Apr 2026", "Present"]
            const dateParts = exp.period.split(/\s*(?:—|-)\s*/);
            const datePrimary = dateParts[0];
            const dateSecondary = dateParts.length > 1 ? dateParts[1] : '';

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: index * 0.1 }}
                className={styles.timelineRow}
              >
                {/* 1. Date Column */}
                <div className={styles.dateColumn}>
                  <span>{datePrimary}</span>
                  {dateSecondary && <span className={styles.dateSecondary}>{dateSecondary}</span>}
                </div>

                {/* 2. Track Column */}
                <div className={styles.trackColumn}>
                  <div className={styles.trackLine} />
                  <div className={isCurrent ? styles.trackNodeCurrent : styles.trackNode} />
                </div>

                {/* 3. Card Column */}
                <div className={styles.cardColumn}>
                  <div className={cn(styles.card, isCurrent && styles.cardCurrent)}>
                    <div className={styles.cornerAccentTopRight} />
                    <div className={styles.cornerAccentBottomRight} />

                    <div className={styles.cardHeader}>
                      <div className={styles.roleInfo}>
                        <h3 className={styles.roleTitle}>{exp.role}</h3>
                        <div className={styles.companyName}>{exp.company}</div>
                      </div>

                      <div className={styles.headerMeta}>
                        <div className={styles.metaItem}>
                          <Calendar className={styles.metaIcon} />
                          <span>{exp.period}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <MapPin className={styles.metaIcon} />
                          <span>{exp.location}</span>
                        </div>
                        {isCurrent && <span className={styles.currentBadge}>Current</span>}
                      </div>
                    </div>

                    <ul className={styles.descriptionList}>
                      {exp.description.map((item, i) => (
                        <li key={i} className={styles.descriptionItem}>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className={styles.techStackContainer}>
                        <div className={styles.techStackLabel}>Tech Stack</div>
                        <div className={styles.techStackList}>
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className={styles.techPill}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
