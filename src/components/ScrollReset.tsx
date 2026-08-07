'use client';

import { useEffect } from 'react';
import { getLenis } from '@/lib/scroll-lock';

/**
 * Scroll restoration guard.
 *
 * The portfolio opens with a full-viewport cinematic intro that occupies the
 * first ~8 viewport heights of scroll. On a normal reload, browsers restore
 * the previous scroll position — dropping the user mid-page (e.g. straight
 * onto the Mindset section) with the Hero and the entire intro above them.
 * That reads exactly like a broken/missing Hero on load.
 *
 * This resets every load to the top so the cinematic intro always plays from
 * the start, as designed. The opaque LoadingScreen covers the initial frame,
 * so no jump is ever visible to the user.
 */
export default function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
      
      // In case Next.js or Lenis tries to restore the scroll immediately after hydration
      setTimeout(() => {
         if (window.scrollY > 0) {
             window.scrollTo(0, 0);
         }
      }, 0);
    } else {
      // Because we set manual scrollRestoration, the browser won't scroll to the hash on reload.
      // We must do it manually using Lenis if available.
      const id = hash.substring(1);
      
      const tryScroll = () => {
        const el = document.getElementById(id);
        console.log(`tryScroll for id: ${id}, el found:`, !!el);
        if (el) {
          const lenis = getLenis();
          console.log(`lenis instance available:`, !!lenis);
          if (lenis) {
            lenis.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView();
          }
        }
      };

      tryScroll();
      
      // Give Lenis some extra time to initialize and sync
      setTimeout(tryScroll, 100);
      setTimeout(tryScroll, 500);
    }
  }, []);

  return null;
}
