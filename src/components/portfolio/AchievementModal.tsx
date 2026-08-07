'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig, type Target } from 'framer-motion';
import { Achievement } from '@/data/achievements';
import { X, ExternalLink, Download, Maximize2 } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';

interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
  originRect: DOMRect | null;
  /** The DriftWall tile that opened this modal — focus returns to it on close. */
  originEl?: HTMLElement | null;
}

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1]; // easeOutQuart
const DURATION = 0.4;
const MAX_WIDTH = 1100;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

/** All geometry is kept in px — framer-motion cannot interpolate mixed units (px → vw/auto/%). */
type ModalRect = Pick<Target, 'top' | 'left' | 'width' | 'height' | 'opacity' | 'borderRadius'>;

const clampOrigin = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export default function AchievementModal({
  achievement,
  onClose,
  originRect,
  originEl,
}: AchievementModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetRect, setTargetRect] = useState<ModalRect | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const expandBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // Set once the modal starts closing so late measurements (image load, resize)
  // can never re-target the exiting element and stall the exit animation.
  const isExitingRef = useRef(false);

  const handleClose = useCallback(() => {
    isExitingRef.current = true;
    onClose();
  }, [onClose]);

  /* ── Measure the final modal size in px so the expansion is perfectly smooth ──
     The modal is temporarily laid out at its target width with `height: auto`,
     its natural content height is read, clamped to 95vh, then styles are reset
     and framer-motion animates from the origin tile to the measured rect. */
  const measure = useCallback((): ModalRect | null => {
    const el = modalRef.current;
    if (!el) return null;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(vw * 0.9, MAX_WIDTH);

    const prevW = el.style.width;
    const prevH = el.style.height;
    el.style.width = `${w}px`;
    el.style.height = 'auto';
    // Force a synchronous reflow so scrollHeight reflects the natural content.
    void el.offsetHeight;
    const contentHeight = el.scrollHeight;
    const h = Math.min(contentHeight, Math.floor(vh * 0.95));
    el.style.width = prevW;
    el.style.height = prevH;

    return {
      top: Math.round((vh - h) / 2),
      left: Math.round((vw - w) / 2),
      width: Math.round(w),
      height: Math.round(h),
      opacity: 1,
      borderRadius: 24,
    };
  }, []);

  // Measure synchronously on mount. The certificate box reserves its exact
  // space via `aspect-ratio` (from the data file's known natural size), so the
  // entrance animation never waits on the image to load. As a safety net, if
  // the aspect is somehow unknown, wait for the image to resolve first.
  useLayoutEffect(() => {
    const apply = () => {
      if (isExitingRef.current) return;
      const rect = measure();
      if (rect) setTargetRect(rect);
    };
    if (!achievement.thumbnailWidth || !achievement.thumbnailHeight) {
      const img = modalRef.current?.querySelector<HTMLImageElement>('img');
      if (img && !img.complete) {
        img.addEventListener('load', apply, { once: true });
        img.addEventListener('error', apply, { once: true });
        return;
      }
    }
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure on viewport resize — framer-motion animates to the new rect.
  useEffect(() => {
    if (!targetRect) return;
    const onResize = () => {
      if (isExitingRef.current) return;
      const rect = measure();
      if (rect) setTargetRect(rect);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRect === null, measure]);

  /* ── ESC: collapse the fullscreen viewer first, then close the modal ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onClose]);

  /* ── Scroll lock (Lenis-aware) + focus entry/restore ── */
  useEffect(() => {
    lockScroll();
    // Prefer the exact tile that was activated; fall back to whatever had
    // focus (covers keyboard activation, where the tile is the active element).
    triggerRef.current = originEl ?? (document.activeElement as HTMLElement | null);
    const frame = requestAnimationFrame(() => modalRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      unlockScroll();
      const trigger = triggerRef.current;
      if (trigger && document.contains(trigger)) {
        trigger.focus();
      }
    };
  }, [originEl]);

  // Focus management for the fullscreen viewer: enter it when it opens, and
  // hand focus back to the expand control when it collapses (not on mount).
  const wasExpandedRef = useRef(false);
  useEffect(() => {
    if (isExpanded) {
      wasExpandedRef.current = true;
      const frame = requestAnimationFrame(() => expandedRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
    if (wasExpandedRef.current) {
      wasExpandedRef.current = false;
      expandBtnRef.current?.focus();
    }
  }, [isExpanded]);

  /* ── Focus trap: Tab cycles within the dialog, never escapes ── */
  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusables = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === modalRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const initialStyles: ModalRect = (() => {
    if (!originRect) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return { top: vh / 2 - 100, left: vw / 2 - 150, width: 300, height: 200, opacity: 0, borderRadius: 14 };
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Clamp the origin so a partially off-screen tile never makes the modal
    // fly in from outside the viewport.
    return {
      top: clampOrigin(originRect.top, 8, vh - 8),
      left: clampOrigin(originRect.left, 8, vw - 8),
      width: Math.max(originRect.width, 40),
      height: Math.max(originRect.height, 40),
      opacity: 0,
      borderRadius: 14,
    };
  })();

  return (
    <MotionConfig reducedMotion="user">
    <div className="fixed inset-0 z-[100] isolate">
      {/* Heavy Cinematic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION, ease: EASE }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[24px]"
        onClick={handleClose}
        aria-hidden={isExpanded || undefined}
        inert={isExpanded ? true : undefined}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </motion.div>

      {/* Main Modal */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
        aria-describedby="achievement-overview"
        tabIndex={-1}
        initial={initialStyles}
        animate={targetRect ?? initialStyles}
        exit={initialStyles}
        transition={{ duration: DURATION, ease: EASE }}
        onKeyDown={handleDialogKeyDown}
        className="absolute overflow-hidden bg-[#0A0A0C]/90 border border-white/10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] flex flex-col items-center outline-none"
        style={{ originX: 0.5, originY: 0.5 }}
        aria-hidden={isExpanded || undefined}
        inert={isExpanded ? true : undefined}
      >
        {/* Certificate Image - Acts as the Hero */}
        <div className="relative w-full flex items-center justify-center bg-[#050508] shrink-0 border-b border-white/5">
          <div
            className="relative w-full max-h-[50vh] md:max-h-[70vh]"
            style={
              achievement.thumbnailWidth && achievement.thumbnailHeight
                ? { aspectRatio: `${achievement.thumbnailWidth} / ${achievement.thumbnailHeight}` }
                : undefined
            }
          >
            <img
              src={achievement.thumbnail}
              alt={achievement.title}
              className={
                achievement.thumbnailWidth && achievement.thumbnailHeight
                  ? 'w-full h-full object-contain'
                  : 'w-full h-auto max-h-[50vh] md:max-h-[70vh] object-contain'
              }
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0C]/90 pointer-events-none" />

            <button
              ref={expandBtnRef}
              onClick={() => setIsExpanded(true)}
              className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-zinc-300 hover:text-white transition-all border border-white/10 shadow-lg group"
              aria-label="Expand certificate"
            >
              <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Metadata section smoothly fading in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="w-full flex-1 min-h-0 max-w-4xl pt-8 pb-6 px-4 md:px-8 flex flex-col gap-8 overflow-y-auto overscroll-contain"
          data-lenis-prevent="true"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2
                id="achievement-modal-title"
                className="text-3xl md:text-5xl font-light tracking-tight text-zinc-100"
              >
                {achievement.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-sm md:text-base">
                <span className="font-medium text-zinc-300">{achievement.issuer}</span>
                <span className="text-zinc-700">•</span>
                <span>{achievement.issueDate}</span>
                {achievement.credentialId && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <span className="font-mono text-[13px] text-zinc-500">
                      ID: {achievement.credentialId}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-4">
                Overview
              </h3>
              <p
                id="achievement-overview"
                className="text-zinc-400 font-light leading-relaxed text-[15px] md:text-base"
              >
                {achievement.description}
              </p>
            </div>

            <div className="md:col-span-1">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-4">
                Core Skills
              </h3>
              <ul className="flex flex-wrap gap-2">
                {achievement.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1.5 bg-white/[0.04] border border-white/5 rounded-full text-xs text-zinc-300 font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions — sticky so the buttons stay visible while metadata scrolls */}
          <div className="sticky bottom-0 -mx-4 md:-mx-8 px-4 md:px-8 pt-4 pb-6 bg-[#0B0B0E]/95 backdrop-blur-xl border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href={achievement.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-zinc-100 text-zinc-950 rounded-full font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] transition-all"
              >
                View Certificate
                <ExternalLink size={16} />
              </a>
              <a
                href={achievement.pdf}
                download
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-zinc-900/50 text-zinc-300 border border-white/10 rounded-full font-medium hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 transition-all"
              >
                Download PDF
                <Download size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10"
          aria-label="Close details"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Fullscreen Expanded Viewer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={expandedRef}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate fullscreen view"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4 md:p-8 outline-none"
            onClick={() => setIsExpanded(false)}
            onKeyDown={(e) => {
              // The viewer is the only interactive surface while expanded — trap
              // Tab within it (currently just the close button) instead of
              // suppressing Tab entirely, so keyboard users can reach it.
              if (e.key !== 'Tab' || !e.currentTarget) return;
              const focusables = Array.from(
                e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
              ).filter((el) => el.offsetParent !== null || el === document.activeElement);
              if (focusables.length === 0) return;
              const first = focusables[0];
              const last = focusables[focusables.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }}
          >
            <img
              src={achievement.thumbnail}
              alt={achievement.title}
              className="w-full h-full object-contain cursor-zoom-out"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            />
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <span className="hidden sm:flex text-zinc-500 text-sm tracking-wider items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded font-sans text-xs">ESC</kbd>
                to close
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-zinc-300 hover:text-white transition-colors border border-white/15"
                aria-label="Close fullscreen certificate view"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
