'use client';

import { useState, useRef, useSyncExternalStore, useCallback } from 'react';
import { cn } from '@/lib/utils';
import PillNav from './PillNav';
import styles from './Navbar.module.css';
import { SITE_CONFIG } from '@/lib/config';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface NavbarProps {
  className?: string;
}

const NAV_ITEMS = [
  { label: 'About', href: '#mindset' },
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: SITE_CONFIG.resumeUrl },
];

export default function Navbar({ className }: NavbarProps) {
  const isHoverable = useMediaQuery('(hover: hover)');
  
  const subscribeScroll = useCallback((callback: () => void) => {
    window.addEventListener('scroll', callback, { passive: true });
    window.addEventListener('resize', callback, { passive: true });
    return () => {
      window.removeEventListener('scroll', callback);
      window.removeEventListener('resize', callback);
    };
  }, []);

  const getSnapshot = () => window.scrollY > window.innerHeight * 0.5;
  const getServerSnapshot = () => false;

  const isPastHero = useSyncExternalStore(subscribeScroll, getSnapshot, getServerSnapshot);

  const [isHoverReveal, setIsHoverReveal] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHoverReveal(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverReveal(false);
    }, 150);
  };

  const isHidden = isHoverable && isPastHero && !isHoverReveal;

  return (
    <>
      {isHoverable && isPastHero && (
        <div 
          className={styles.hoverTrigger}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-hidden="true"
        />
      )}
      <nav 
        className={cn(styles.nav, isHidden && styles.hidden, className)} 
        role="navigation" 
        aria-label="Main navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
    </>
  );
}
