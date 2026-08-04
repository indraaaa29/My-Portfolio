'use client';

import { forwardRef, useEffect, useRef } from 'react';

const Navigation = forwardRef<HTMLElement>((_, ref) => {
  const navRef = ref as React.RefObject<HTMLElement | null>;
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Progress bar fill based on page scroll
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress.toFixed(1)}%`;
        }
        // Update scroll indicator text
        if (scrollRef.current) {
          const pct = Math.round(progress);
          scrollRef.current.textContent = pct.toString().padStart(3, '0');
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-none"
      style={{ 
        opacity: 0, 
        pointerEvents: 'none', 
        willChange: 'opacity',
        background: 'rgba(8, 8, 10, 0.72)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.28)'
      }}
    >
      {/* Progress line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]">
        <div
          ref={progressRef}
          className="h-full transition-none"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85))',
          }}
        />
      </div>

      <div className="flex items-center justify-between px-8 md:px-12 py-6">
        {/* Wordmark */}
        <a
          href="#"
          data-cursor="hover"
          className="relative group"
          style={{ textDecoration: 'none' }}
        >
          <span
            className="block text-[11px] font-sans font-medium tracking-[0.35em] uppercase"
            style={{ color: '#ffffff', letterSpacing: '0.35em' }}
          >
            Indranil Paul
          </span>
          {/* Underline that animates on hover */}
          <span
            className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
            style={{ background: '#ffffff', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-12">
          {['Mindset', 'Experience', 'Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-cursor="hover"
              className="relative group"
              style={{ textDecoration: 'none' }}
            >
              <span
                className="block text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.72)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)'; }}
              >
                {item}
              </span>
              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                style={{ background: '#ffffff', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </a>
          ))}
        </div>

        {/* Scroll index */}
        <div className="flex items-center gap-3">
          <span
            ref={scrollRef}
            className="font-sans text-[10px] tabular-nums tracking-widest"
            style={{ color: 'rgba(255,255,255,0.72)', fontVariantNumeric: 'tabular-nums' }}
          >
            000
          </span>
          <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.72)' }}>
            /
          </span>
          <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.72)' }}>
            100
          </span>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';
export default Navigation;
