'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/data/content';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = content.navigation.items.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(el, { offset: 0 });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('#home')}
            className="text-sm font-medium tracking-widest uppercase text-[#a3a3a3] hover:text-[#f59e0b] transition-colors duration-300"
            aria-label="Go to home"
          >
            {content.name.split(' ')[0]}
            <span className="text-[#f59e0b]">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {content.navigation.items.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm tracking-wide transition-all duration-300 relative ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#f5f5f5]'
                    : 'text-[#525252] hover:text-[#a3a3a3]'
                }`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.href.slice(1) ? 'true' : undefined}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#f59e0b]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-[#f5f5f5]"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1.5px] bg-[#f5f5f5]"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-[#f5f5f5]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center gap-8">
              {content.navigation.items.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl font-light tracking-wide text-[#f5f5f5] hover:text-[#f59e0b] transition-colors"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
