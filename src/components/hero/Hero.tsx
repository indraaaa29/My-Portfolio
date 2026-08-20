'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import TextPressure from '@/components/reactbits/TextPressure';
import HalftoneReveal from '@/components/reactbits/HalftoneReveal';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';
import { CINEMATIC_EASE, REVEAL_SECONDS } from '@/components/portfolio/FadeUp';

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface HeroProps {
  /** Additional class name */
  className?: string;
}

/* ──────────────────────────────────────────────
 * Animation Variants
 * ────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: REVEAL_SECONDS,
      ease: CINEMATIC_EASE,
    },
  },
};

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
 * Portrait — Halftone Reveal + Base Image
 * ────────────────────────────────────────────── */

function Portrait() {
  return (
    <motion.div
      className={styles.portraitContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.3 }}
    >
      <div className={styles.portraitWrapper}>
        {/* Permanent base layer */}
        <Image
          src="/images/hero/portrait.jpg"
          alt="Indranil Paul"
          fill
          priority
          sizes="(max-width:768px) 100vw, 40vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 25%",
          }}
        />
        {/* Temporary halftone layer — constrained to the portrait box via .portraitReveal */}
        <HalftoneReveal
          src="/images/hero/portrait.jpg"
          className={styles.portraitReveal}
        />
      </div>
    </motion.div>
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
        {/* Left Column: Existing Content */}
        <motion.div
          className={styles.textContent}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top label */}
          <motion.p className={styles.topLabel} variants={itemVariants}>
            Hi, I&rsquo;m
          </motion.p>

          {/* Main heading */}
          <motion.div className={styles.nameWrapper} variants={itemVariants}>
            <TextPressure
              text="INDRANIL PAUL"
              className={styles.name}
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#F5F5F5"
              strokeColor="#F5F5F5"
              minFontSize={96}
            />
          </motion.div>

          {/* Title row: Creative Developer + AI Engineer */}
          <motion.div className={styles.titleRow} variants={itemVariants}>
            <span className={styles.titleText}>Creative Developer</span>

            <span className={styles.titleSeparator} aria-hidden="true" />

            <span className={styles.titleText}>AI Engineer</span>
          </motion.div>

          {/* Description */}
          <motion.p className={styles.description} variants={itemVariants}>
            Crafting intelligent web experiences with AI, creative interfaces,
            and thoughtful problem-solving. Every detail serves a purpose.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className={styles.ctaGroup} variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        {/* Right Column: Reserved Portrait Area */}
        <Portrait />
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
