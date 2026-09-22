'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHoverReveal, setIsHoverReveal] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if device supports hover (desktop/pointer)
    setIsHoverable(window.matchMedia('(hover: hover)').matches);

    const handleScroll = () => {
      // Hide when user has scrolled past 50% of the viewport (leaving Hero)
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsPastHero(true);
      } else {
        setIsPastHero(false);
      }
    };
    
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check on mount
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
