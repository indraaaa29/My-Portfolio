'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { TextPressure } from '@/components/animations';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface HeroProps {
  /** Additional class name */
  className?: string;
}

/* ──────────────────────────────────────────────
 * ScrollIndicator
 * ────────────────────────────────────────────── */

function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator} aria-hidden="true">
      <motion.div
        className={styles.scrollMouse}
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <span>Scroll</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────── */

export default function Hero({ className }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={cn(styles.hero, className)}
      aria-label="Hero"
    >
      {/* ─── Background Ambience ─── */}
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* ─── Navigation ─── */}
      <Navbar />

      {/* ─── Hero Content ─── */}
      <div className={styles.inner}>
        {/* Top label */}
        <p className={styles.topLabel}>Hi, I&rsquo;m</p>

        {/* Main heading */}
        <h1 className={styles.name}>Indranil Paul</h1>

        {/* Title row: Creative Developer + AI Engineer */}
        <div className={styles.titleRow}>
          <TextPressure
            text="Creative Developer"
            width={false}
            weight={true}
            italic={false}
            alpha={false}
            flex={false}
            stroke={false}
            scale={false}
            textColor="#fafafa"
            minFontSize={16}
            className={styles.titleText}
          />

          <span className={styles.titleSeparator} aria-hidden="true" />

          <span className={styles.titleText}>AI Engineer</span>
        </div>

        {/* Description */}
        <p className={styles.description}>
          Crafting intelligent web experiences with AI, creative interfaces,
          and thoughtful problem-solving. Every detail serves a purpose.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <a href="#projects" className={styles.ctaPrimary} aria-label="View Projects">
            View Projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 1L13 7L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 7H13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="/resume.pdf"
            className={styles.ctaSecondary}
            aria-label="Download Resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 1V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6L7 10L11 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 11V12.5C1 12.7761 1.22386 13 1.5 13H12.5C12.7761 13 13 12.7761 13 12.5V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <ScrollIndicator />
    </section>
  );
}
