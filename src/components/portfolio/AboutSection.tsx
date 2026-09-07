'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Award, Compass, Cpu, Layers, MapPin, ArrowRight } from 'lucide-react';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';
import styles from './AboutSection.module.css';
import { cn } from '@/lib/utils';

export default function AboutSection() {
  const { bio, location } = PORTFOLIO_DATA.personal;

  const pillars = [
    {
      icon: Cpu,
      title: "System Thinking",
      desc: "I don't just write scripts. I architect platforms that scale securely and handle real-time demands.",
      num: "02"
    },
    {
      icon: Layers,
      title: "Data-Driven AI",
      desc: "Leveraging machine learning and computer vision to solve complex, real-world problems.",
      num: "03"
    },
    {
      icon: Compass,
      title: "Secure Architecture",
      desc: "Applying ethical hacking and threat detection principles natively into the DevOps pipeline.",
      num: "04"
    }
  ];

  return (
    <section id="mindset" className={styles.section}>
      <SectionSeam />
      
      <div className={styles.inner}>
        
        {/* Decorative Side Labels */}
        <div className={styles.sideLabelLeft}>
          <div className={styles.sideLabelLine} />
          <span>LEARN</span>
          <span>BUILD</span>
          <span>SOLVE</span>
          <span>REPEAT</span>
        </div>
        <div className={styles.sideLabelRight}>
          <div className={styles.sideLabelLine} />
          <span>BETTER</span>
          <span>IDEAS</span>
          <span>BRIGHTER</span>
          <span>TOMORROW</span>
        </div>

        {/* Header */}
        <FadeUp>
          <div className={styles.headerWrapper}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>The Mindset</span>
              <span className={styles.eyebrowLine} />
            </div>
            
            <h2 className={styles.mainHeading}>
              Building Meaningful <span className={styles.goldHighlight}>Software</span>
            </h2>

            <div className={styles.subtitle}>
              IDEAS <span>•</span> SYSTEMS <span>•</span> PEOPLE <span>•</span> IMPACT
            </div>
          </div>
        </FadeUp>

        {/* Grid Content */}
        <div className={styles.grid}>
          
          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE }}
          >
            <div className={styles.mainCard}>
              <div className={styles.cornerAccent} />
              
              <div className={styles.cardNumber}>
                <span>01</span>
                <div className={styles.cardNumberLine} />
              </div>

              <h3 className={styles.mainCardHeading}>
                Driven by curiosity. Grounded in logic.
              </h3>
              
              <div className={styles.mainCardBody}>
                <p>{bio}</p>
                <p>
                  Whether architecting civic engagement platforms, engineering WebGL dashboards for crowd analytics, or securing cloud deployments, I focus on the holistic impact of the technology I build. I believe the best software disappears into the workflow.
                </p>
              </div>

              <div className={styles.mainCardFooter}>
                <div className={styles.footerMeta}>
                  <MapPin className={cn("w-4 h-4", styles.footerIcon)} />
                  <span>{location}</span>
                </div>
                
                <div className={styles.footerSeparator} />
                
                <div className={styles.footerMeta}>
                  <Award className={cn("w-4 h-4", styles.footerIcon)} />
                  <span>Google Student Ambassador</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Pillars Cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.08 }}
            className={styles.subCardsWrapper}
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className={styles.subCard}>
                  
                  <div className={styles.subCardIconWrapper}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className={styles.subCardContent}>
                    <h4 className={styles.subCardTitle}>
                      {pillar.title}
                    </h4>
                    <p className={styles.subCardDesc}>
                      {pillar.desc}
                    </p>
                  </div>

                  <div className={styles.subCardNumber}>
                    <div className={styles.subCardNumberLine} />
                    <span>{pillar.num}</span>
                  </div>

                  <div className={styles.subCardArrow}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
