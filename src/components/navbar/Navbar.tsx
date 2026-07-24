'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export interface NavbarProps {
  /** Additional class name */
  className?: string;
}

/* ──────────────────────────────────────────────
 * Navigation Links
 * ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ──────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────── */

export default function Navbar({ className }: NavbarProps) {
  const [, setMobileMenuOpen] = useState(false);

  return (
    <nav className={cn(styles.nav, className)} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        {/* Brand */}
        <Link href="/" className={styles.brand} aria-label="Home">
          Indranil Paul
        </Link>

        {/* Desktop navigation links */}
        <ul className={styles.desktopLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
                aria-label={link.label}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li className={styles.separator} role="separator" aria-hidden="true" />

          <li>
            <a
              href="/resume.pdf"
              className={styles.resumeLink}
              aria-label="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger placeholder */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded="false"
          type="button"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>
    </nav>
  );
}
