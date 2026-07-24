'use client';

import { useState, useCallback } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  /** Trigger only once, then disconnect */
  once?: boolean;
}

/**
 * Tracks whether a DOM element is visible in the viewport.
 * Returns a callback ref and intersection state.
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
 * return <div ref={ref}>{isIntersecting ? 'Visible' : 'Hidden'}</div>;
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverOptions = {},
): {
  ref: (element: T | null) => void;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
} {
  const { once = false, threshold, root, rootMargin } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const ref = useCallback(
    (element: T | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry_]) => {
          setIsIntersecting(entry_.isIntersecting);
          setEntry(entry_);

          if (once && entry_.isIntersecting) {
            observer.unobserve(element);
          }
        },
        { threshold, root, rootMargin },
      );

      observer.observe(element);

      // Cleanup will happen when the callback is called with null or when component unmounts
      // We store the observer for cleanup
      const currentObserver = observer;

      // Return a cleanup ref callback — when element is removed, disconnect
      // This works because React calls the cleanup ref with null on unmount
      return () => {
        currentObserver.disconnect();
      };
    },
    [once, threshold, root, rootMargin],
  );

  return { ref, isIntersecting, entry };
}
