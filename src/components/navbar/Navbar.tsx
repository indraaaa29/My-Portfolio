'use client';

import { cn } from '@/lib/utils';
import PillNav from './PillNav';
import styles from './Navbar.module.css';

export interface NavbarProps {
  className?: string;
}

const NAV_ITEMS = [
  { label: 'About', href: '#mindset' },
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume.pdf' },
];

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn(styles.nav, className)} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <PillNav
          items={NAV_ITEMS}
          className=""
          ease="power3.easeOut"
          baseColor="#f5b532"
          pillColor="rgba(12, 12, 14, 0.85)"
          pillTextColor="rgba(255, 255, 255, 0.85)"
          hoveredPillTextColor="#0a0a0a"
          initialLoadAnimation={true}
        />
      </div>
    </nav>
  );
}
