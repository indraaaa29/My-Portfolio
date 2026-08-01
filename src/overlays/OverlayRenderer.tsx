'use client';

import { useEffect, useState } from 'react';
import { OverlayManager } from './OverlayManager';
import { OverlayState } from './types';

interface OverlayRendererProps {
  manager: OverlayManager;
}

export default function OverlayRenderer({ manager }: OverlayRendererProps) {
  const [overlayState, setOverlayState] = useState<OverlayState | null>(null);

  useEffect(() => {
    return manager.onStateChange((state) => {
      setOverlayState({ ...state });
    });
  }, [manager]);

  if (!overlayState || !overlayState.context?.sceneId || overlayState.context.sceneId === 'none' || overlayState.lifecycle === 'Inactive' || overlayState.lifecycle === 'Destroyed') {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
      <div 
        id={`scene-overlay-${overlayState.context.sceneId}`} 
        data-lifecycle={overlayState.lifecycle}
        className="w-full h-full relative"
      >
        {/* Placeholder container for future cinematic typography, particles, UI, etc. */}
      </div>
    </div>
  );
}
