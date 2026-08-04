'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { CINEMATIC_CONFIG } from '@/config/cinematic';
import { AssetManager } from '@/utils/AssetManager';
import { RendererState } from '@/types/cinematic';

interface CanvasRendererProps {
  onStateChange: (state: RendererState) => void;
  onLoadedCountChange: (count: number) => void;
}

export interface CanvasRendererHandle {
  drawFrame: (index: number) => void;
}

const CanvasRenderer = forwardRef<CanvasRendererHandle, CanvasRendererProps>(
  ({ onStateChange, onLoadedCountChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const assetManagerRef = useRef<AssetManager | null>(null);
    const stateRef = useRef<RendererState>('Boot');
    const currentFrameRef = useRef<number>(1);
    const lastDrawnFrameRef = useRef<number>(0);

    const updateState = useCallback((newState: RendererState) => {
      if (stateRef.current !== newState) {
        stateRef.current = newState;
        onStateChange(newState);
      }
    }, [onStateChange]);

    const render = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas || !assetManagerRef.current) return;
      
      // Prevent duplicate draw calls for the exact same frame
      if (lastDrawnFrameRef.current === currentFrameRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const frame = assetManagerRef.current.getFrame(currentFrameRef.current);
      
      if (frame) {
        if (stateRef.current === 'Loading') {
          updateState('Ready');
        }
        
        const dpr = Math.min(window.devicePixelRatio || 1, CINEMATIC_CONFIG.MAX_DEVICE_PIXEL_RATIO);
        const rect = canvas.getBoundingClientRect();
        
        let resized = false;
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            resized = true;
        }
        
        if (resized || !ctx.imageSmoothingEnabled) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }
        
        const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
        const x = (canvas.width / 2) - (frame.width / 2) * scale;
        const y = (canvas.height / 2) - (frame.height / 2) * scale;

        // Note: clearRect is intentionally omitted as the object-cover math 
        // guarantees 100% pixel coverage, saving GPU fill rate.
        ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
        
        lastDrawnFrameRef.current = currentFrameRef.current;
      }
    }, [updateState]);

    useImperativeHandle(ref, () => ({
      drawFrame: (index: number) => {
        currentFrameRef.current = index;
        if (assetManagerRef.current) {
          assetManagerRef.current.updateWindow(index);
        }
        render();
      }
    }), [render]);

    useEffect(() => {
      if (stateRef.current === 'Boot') {
        const checkReady = () => {
          if (assetManagerRef.current && assetManagerRef.current.getLoadedCount() > 5) {
            updateState('Ready');
            render();
          } else {
            requestAnimationFrame(checkReady);
          }
        };
        checkReady();
      }
    }, [render, updateState]);

    useEffect(() => {
      updateState('Boot');
      const isMobile = window.innerWidth < 768;
      assetManagerRef.current = new AssetManager(isMobile, (count) => {
        onLoadedCountChange(count);
        // Attempt to render in case the current frame was just loaded
        if (lastDrawnFrameRef.current !== currentFrameRef.current) {
           render();
        }
      });
      updateState('Loading');
      
      // Load initial frame
      assetManagerRef.current.updateWindow(currentFrameRef.current);
      render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    useEffect(() => {
      const handleResize = () => render();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [render]);

    return (
      <div className="fixed inset-0 z-0 bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
      </div>
    );
  }
);

CanvasRenderer.displayName = 'CanvasRenderer';
export default CanvasRenderer;
