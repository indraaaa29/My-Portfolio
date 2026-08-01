'use client';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';

export interface CanvasRendererHandle {
  renderFrame: (index: number) => void;
}

export interface CanvasRendererProps {
  className?: string;
}

const CanvasRenderer = forwardRef<CanvasRendererHandle, CanvasRendererProps>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 995;
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);

  // Keep track of last requested frame to render it once loaded if it missed
  const lastRequestedFrameRef = useRef(0);

  const renderCanvas = useCallback((frameIndex: number) => {
    lastRequestedFrameRef.current = frameIndex;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use DPR for high-res screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const rect = canvas.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    // Only resize internal canvas if dimensions changed
    if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    }

    const safeIndex = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameIndex)));
    const img = imagesRef.current[safeIndex];

    ctx.clearRect(0, 0, rect.width, rect.height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = rect.width / rect.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = rect.width;
        drawHeight = rect.width / imgAspect;
        offsetX = 0;
        offsetY = (rect.height - drawHeight) / 2;
      } else {
        drawHeight = rect.height;
        drawWidth = rect.height * imgAspect;
        offsetX = (rect.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      // Fallback: draw nearest available loaded frame (backward or forward)
      let nearestImg: HTMLImageElement | null = null;
      
      // Search backwards first
      for (let i = safeIndex - 1; i >= 0; i--) {
        const prevImg = imagesRef.current[i];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          nearestImg = prevImg;
          break;
        }
      }
      
      // If not found, search forward
      if (!nearestImg) {
        for (let i = safeIndex + 1; i < totalFrames; i++) {
          const nextImg = imagesRef.current[i];
          if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
            nearestImg = nextImg;
            break;
          }
        }
      }

      if (nearestImg) {
        const imgAspect = nearestImg.naturalWidth / nearestImg.naturalHeight;
        const canvasAspect = rect.width / rect.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = rect.width;
          drawHeight = rect.width / imgAspect;
          offsetX = 0;
          offsetY = (rect.height - drawHeight) / 2;
        } else {
          drawHeight = rect.height;
          drawWidth = rect.height * imgAspect;
          offsetX = (rect.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(nearestImg, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  }, [totalFrames]);

  useEffect(() => {
    let isCancelled = false;

    // Load initial 30 frames immediately for fast interactive start
    const preloadPriority = 30;

    const loadSingleFrame = (i: number) => {
      if (imagesRef.current[i - 1]) return; // already loading/loaded

      const img = new Image();
      const paddedIndex = String(i).padStart(6, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        if (isCancelled) return;
        setIsLoaded(true);
        if (Math.floor(lastRequestedFrameRef.current) === i - 1) {
          renderCanvas(lastRequestedFrameRef.current);
        }
      };

      imagesRef.current[i - 1] = img;
    };

    // Burst 1-30
    for (let i = 1; i <= preloadPriority; i++) {
      loadSingleFrame(i);
    }

    // Lazy background load in batches of 50 to avoid network congestion
    const loadRemainingInChunks = async () => {
      const chunkSize = 50;
      for (let start = preloadPriority + 1; start <= totalFrames; start += chunkSize) {
        if (isCancelled) break;
        const end = Math.min(start + chunkSize - 1, totalFrames);
        for (let i = start; i <= end; i++) {
          loadSingleFrame(i);
        }
        // Yield to main thread
        await new Promise((res) => setTimeout(res, 50));
      }
    };

    const timer = setTimeout(() => {
      loadRemainingInChunks();
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [renderCanvas, totalFrames]);

  useImperativeHandle(ref, () => ({
    renderFrame: (index: number) => {
      renderCanvas(index);
    }
  }), [renderCanvas]);

  useEffect(() => {
    const handleResize = () => {
      renderCanvas(lastRequestedFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    />
  );
});

CanvasRenderer.displayName = 'CanvasRenderer';

export default CanvasRenderer;
