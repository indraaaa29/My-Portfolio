'use client';

import { RendererState } from '@/types/cinematic';
import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';

interface DebugOverlayProps {
  loadedFrames: number;
  rendererState: RendererState;
}

export interface DebugOverlayHandle {
  updateFrame: (index: number) => void;
  updateScene: (id: string, name: string) => void;
  updateSceneProgress: (progress: number) => void;
  updateOverlay: (id: string, lifecycle: string) => void;
  updateNarrative: (message: string) => void;
}

const DebugOverlay = forwardRef<DebugOverlayHandle, DebugOverlayProps>(
  ({ loadedFrames, rendererState }, ref) => {
    const [fps, setFps] = useState(0);
    const [isDebugEnabled, setIsDebugEnabled] = useState(false);
    const frameSpanRef = useRef<HTMLSpanElement>(null);
    const sceneIdRef = useRef<HTMLSpanElement>(null);
    const sceneNameRef = useRef<HTMLSpanElement>(null);
    const sceneProgressRef = useRef<HTMLSpanElement>(null);
    const overlayIdRef = useRef<HTMLSpanElement>(null);
    const overlayLifecycleRef = useRef<HTMLSpanElement>(null);
    const narrativeRef = useRef<HTMLSpanElement>(null);

    // Gate: only show when ?debug=1 in the URL OR NEXT_PUBLIC_DEBUG=true
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const envDebug = process.env.NEXT_PUBLIC_DEBUG === 'true';
      setIsDebugEnabled(params.get('debug') === '1' || envDebug);
    }, []);

    useImperativeHandle(ref, () => ({
      updateFrame: (index: number) => {
        if (frameSpanRef.current) frameSpanRef.current.innerText = index.toString();
      },
      updateScene: (id: string, name: string) => {
        if (sceneIdRef.current) sceneIdRef.current.innerText = id;
        if (sceneNameRef.current) sceneNameRef.current.innerText = name;
      },
      updateSceneProgress: (progress: number) => {
        if (sceneProgressRef.current) sceneProgressRef.current.innerText = progress.toFixed(3);
      },
      updateOverlay: (id: string, lifecycle: string) => {
        if (overlayIdRef.current) overlayIdRef.current.innerText = id;
        if (overlayLifecycleRef.current) overlayLifecycleRef.current.innerText = lifecycle;
      },
      updateNarrative: (message: string) => {
        if (narrativeRef.current) narrativeRef.current.innerText = message;
      }
    }));

    useEffect(() => {
      if (!isDebugEnabled) return;
      let frameCount = 0;
      let lastTime = performance.now();
      let animationFrameId: number;
      const tick = () => {
        frameCount++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
          setFps(frameCount);
          frameCount = 0;
          lastTime = now;
        }
        animationFrameId = requestAnimationFrame(tick);
      };
      animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    }, [isDebugEnabled]);

    if (!isDebugEnabled) return null;

    return (
      <div className="fixed top-4 left-4 z-50 bg-black/80 text-green-400 font-mono text-xs p-4 rounded border border-green-500/30 backdrop-blur-sm pointer-events-none max-w-sm">
        <div className="font-bold mb-2 text-green-300">DEV DEBUG MODE</div>
        <div>STATE: <span className="text-white">{rendererState}</span></div>
        <div>SCENE: <span ref={sceneIdRef} className="text-white">-</span> (<span ref={sceneNameRef} className="text-white">-</span>)</div>
        <div>PROGRESS: <span ref={sceneProgressRef} className="text-white">0.000</span></div>
        <div>OVERLAY: <span ref={overlayIdRef} className="text-white">none</span></div>
        <div>LIFECYCLE: <span ref={overlayLifecycleRef} className="text-white">Inactive</span></div>
        <div>NARRATIVE: <span ref={narrativeRef} className="text-white truncate block">-</span></div>
        <div>FRAME: <span ref={frameSpanRef} className="text-white">1</span></div>
        <div>LOADED: <span className="text-white">{loadedFrames}</span></div>
        <div>FPS: <span className="text-white">{fps}</span></div>
      </div>
    );
  }
);

DebugOverlay.displayName = 'DebugOverlay';
export default DebugOverlay;
