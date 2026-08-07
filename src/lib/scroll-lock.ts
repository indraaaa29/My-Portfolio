'use client';

import type Lenis from 'lenis';

/**
 * Shared scroll-lock utility.
 *
 * Locking page scroll by toggling `overflow: hidden` alone is not enough on
 * this site — the global Lenis smooth-scroll instance keeps driving the window
 * scroll independently. This module pairs the CSS lock with `lenis.stop()` /
 * `lenis.start()` and compensates for the disappearing scrollbar so nothing on
 * the page shifts when the lock engages.
 *
 * Nested locks are supported (a simple ref-count), so multiple overlays can be
 * open at once without prematurely unlocking.
 */

let lenisInstance: Lenis | null = null;
let lockCount = 0;
let prevBodyOverflow = '';
let prevHtmlOverflow = '';
let prevHtmlPaddingRight = '';

export function registerLenis(lenis: Lenis | null): void {
  lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function lockScroll(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    prevBodyOverflow = document.body.style.overflow;
    prevHtmlOverflow = document.documentElement.style.overflow;
    prevHtmlPaddingRight = document.documentElement.style.paddingRight;

    // Compensate for the removed scrollbar to prevent layout shift.
    if (scrollbarWidth > 0) {
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    lenisInstance?.stop();
  }

  lockCount += 1;
}

export function unlockScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.body.style.overflow = prevBodyOverflow;
    document.documentElement.style.overflow = prevHtmlOverflow;
    document.documentElement.style.paddingRight = prevHtmlPaddingRight;
    lenisInstance?.start();
  }
}
