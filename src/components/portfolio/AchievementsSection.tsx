'use client';

import { useState, useEffect, MouseEvent, PointerEvent, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import DriftWall, { DriftWallItem } from '@/components/reactbits/DriftWall';
import { ACHIEVEMENTS } from '@/data/achievements';
import AchievementModal from './AchievementModal';

export default function AchievementsSection() {
  const [columns, setColumns] = useState(5);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [originEl, setOriginEl] = useState<HTMLElement | null>(null);

  // Responsive columns
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setColumns(5);
      else if (w >= 768) setColumns(4);
      else if (w >= 640) setColumns(3);
      else setColumns(2);
    };
    handleResize(); // initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map to DriftWallItem format, embedding the ID in the href
  const items: DriftWallItem[] = ACHIEVEMENTS.map((ach) => ({
    image: ach.thumbnail,
    title: ach.title,
    href: `#ach-${ach.id}`
  }));

  // Record the tile element at pointerdown so the click handler can use it
  // even if a hover re-render has replaced the DOM node between pointerdown
  // and the click event firing.
  const pendingTileRef = useRef<{ href: string; rect: DOMRect; el: HTMLElement } | null>(null);
  
  // Track pointer coordinates to reliably detect clicks on moving targets.
  // Browsers drop native 'click' events if the element moves out from under the cursor between down and up.
  const pointerDownMetaRef = useRef<{ x: number, y: number, time: number } | null>(null);

  const handleWallPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = e.target as HTMLElement;
    const tile = target.closest('[data-tile-id]') as HTMLAnchorElement | null;
    if (tile && tile.tagName === 'A') {
      const href = tile.getAttribute('href');
      if (href && href.startsWith('#ach-')) {
        pendingTileRef.current = {
          href,
          rect: tile.getBoundingClientRect(),
          el: tile,
        };
        pointerDownMetaRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
        return;
      }
    }
    pendingTileRef.current = null;
    pointerDownMetaRef.current = null;
  };

  const handleWallPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const meta = pointerDownMetaRef.current;
    const pending = pendingTileRef.current;
    
    if (meta && pending) {
      const dx = e.clientX - meta.x;
      const dy = e.clientY - meta.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeElapsed = Date.now() - meta.time;
      
      // If movement is very small (< 25px) and fast (< 500ms), it's a deliberate click!
      if (distance < 25 && timeElapsed < 500) {
        e.preventDefault();
        const achId = pending.href.replace('#ach-', '');
        setOriginEl(pending.el);
        setOriginRect(pending.rect);
        setSelectedId(achId);
      }
    }
    // We leave pendingTileRef populated so if the browser DOES fire a native click,
    // handleWallClick can catch it and call e.preventDefault().
    pointerDownMetaRef.current = null;
  };

  const handleWallClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Use the target captured at pointerdown
    const pending = pendingTileRef.current;
    pendingTileRef.current = null;
    if (!pending) return;

    // The modal open action was already handled optimally in pointerUp.
    // We just need to intercept the native click here to prevent navigation.
    e.preventDefault();
  };

  const selectedAchievement = ACHIEVEMENTS.find((a) => a.id === selectedId) || null;

  return (
    <section
      id="achievements"
      aria-labelledby="hall-of-fame-headline"
      className="bg-transparent relative overflow-hidden h-screen min-h-[800px] flex flex-col justify-start"
    >

      {/* Background layer for the DriftWall */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${selectedId
            ? 'opacity-30 blur-sm scale-[0.98] pointer-events-none'
            : 'opacity-100 blur-0 scale-100 pointer-events-auto'
          }`}
        onPointerDownCapture={handleWallPointerDown}
        onPointerUpCapture={handleWallPointerUp}
        onClickCapture={handleWallClick}
      >
        <DriftWall
          items={items}
          columns={columns}
          tileWidth={220}
          tileHeight={150}
          gap={20}
          tilt={14}
          turn={-10}
          perspective={1400}
          depth={140}
          speed={selectedId ? 0 : 20}
          direction="up"
          variance={0.40}
          parallax={0.50}
          lift={70}
          fade={0.55}
          dim={0.50}
          overlayColor="#05050A"
        />
      </div>

      {/* Editorial introduction — restrained, top-anchored above the wall */}
      <div
        className={`relative z-10 w-full px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-12 pointer-events-none transition-opacity duration-500 ${selectedId ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Subtle top scrim keeps the copy legible over the drifting tiles */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-zinc-700" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.32em] text-zinc-500 uppercase">
              Hall of Fame
            </span>
          </div>

          {/* Headline */}
          <h2
            id="hall-of-fame-headline"
            className="text-[1.75rem] md:text-4xl lg:text-5xl font-light text-zinc-100 tracking-tight leading-[1.15] mb-5"
          >
            Recognition earned through continuous learning and building.
          </h2>

          {/* Supporting text */}
          <p className="text-sm md:text-base text-zinc-400 font-light max-w-lg leading-relaxed">
            Every certificate marks a milestone — a problem solved, a skill sharpened, or a challenge taken seriously.
          </p>
        </div>
      </div>

      {/* Cinematic Modal wrapped in AnimatePresence for exit animations */}
      <AnimatePresence mode="wait">
        {selectedAchievement && (
          <AchievementModal
            key="achievement-modal"
            achievement={selectedAchievement}
            originRect={originRect}
            originEl={originEl}
            onClose={() => {
              setSelectedId(null);
              setOriginRect(null);
              setOriginEl(null);
            }}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
