'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CanvasRenderer, { CanvasRendererHandle } from '@/components/CanvasRenderer';
import DebugOverlay, { DebugOverlayHandle } from '@/components/DebugOverlay';
import { RendererState } from '@/types/cinematic';
import { CINEMATIC_CONFIG } from '@/config/cinematic';
import { SceneManager } from '@/utils/SceneManager';
import { SCENES } from '@/data/scenes';
import { OverlayManager } from '@/overlays/OverlayManager';
import OverlayRenderer from '@/overlays/OverlayRenderer';
import { NarrativeManager } from '@/narrative/NarrativeManager';
import TypographyRenderer from '@/typography/TypographyRenderer';
import Hero from '@/components/portfolio/Hero';
import Navigation from '@/components/portfolio/Navigation';
import LoadingScreen from '@/components/LoadingScreen';
import SelectedWork from '@/components/portfolio/SelectedWork';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const [rendererState, setRendererState] = useState<RendererState>('Boot');
  const [loadedCount, setLoadedCount] = useState(0);
  
  // AssetManager only preloads up to the cache window initially.
  // We use CACHE_WINDOW as the target for the loading screen so it reaches 100%.
  const targetLoadCount = CINEMATIC_CONFIG.CACHE_WINDOW;
  const loadingProgress = Math.min(100, Math.round((loadedCount / targetLoadCount) * 100));
  const isLoaded = loadedCount >= targetLoadCount || rendererState === 'Ready';
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRendererRef = useRef<CanvasRendererHandle>(null);
  const debugOverlayRef = useRef<DebugOverlayHandle>(null);
  const currentFrameRef = useRef(1);
  const [sceneManager] = useState<SceneManager>(() => new SceneManager(SCENES));
  const [overlayManager] = useState<OverlayManager>(() => new OverlayManager());
  const [narrativeManager] = useState<NarrativeManager>(() => new NarrativeManager());
  const cinematicLayerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__reactRenders = ((window as any).__reactRenders || 0) + 1;
    }
  });

  useEffect(() => {
    // Listen for scene changes to update the debug overlay
    const unsubscribeScene = sceneManager.onSceneChange((prev, curr) => {
      debugOverlayRef.current?.updateScene(curr.id, curr.name);
    });

    const unsubscribeOverlay = overlayManager.onStateChange((state) => {
      debugOverlayRef.current?.updateOverlay(state.context?.sceneId || 'none', state.lifecycle);
    });

    const unsubscribeNarrative = narrativeManager.onContextChange((context) => {
      debugOverlayRef.current?.updateNarrative(context?.message || 'none');
    });
    
    // Initialize the debug overlay with the starting scene
    const initialScene = sceneManager.getCurrentScene(currentFrameRef.current);
    if (initialScene) {
      debugOverlayRef.current?.updateScene(initialScene.id, initialScene.name);
      
      const initialProgress = sceneManager.getSceneProgress(currentFrameRef.current);
      
      overlayManager.updateContext({
        frame: currentFrameRef.current,
        sceneId: initialScene.overlayEnabled ? initialScene.id : 'none',
        sceneName: initialScene.name,
        progress: initialProgress
      });
      
      narrativeManager.updateProgress(initialScene.id, initialProgress);
    }
    
    return () => {
      unsubscribeScene();
      unsubscribeOverlay();
      unsubscribeNarrative();
    };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        const newFrame = Math.max(1, Math.min(CINEMATIC_CONFIG.TOTAL_FRAMES, Math.round(self.progress * (CINEMATIC_CONFIG.TOTAL_FRAMES - 1) + 1)));
        
        if (rendererState === 'Ready' || rendererState === 'Playing') {
           if (rendererState !== 'Playing') setRendererState('Playing');
        }
        
        if (currentFrameRef.current !== newFrame) {
            currentFrameRef.current = newFrame;
            
            // Advance the scene manager state machine
            sceneManager.updateFrame(newFrame);
            
            // Get current scene and progress
            const currentScene = sceneManager.getCurrentScene(newFrame);
            const progress = sceneManager.getSceneProgress(newFrame);
            
            // Update scene progress debug UI
            debugOverlayRef.current?.updateSceneProgress(progress);
            
            // Feed strict OverlayContext to the OverlayManager
            if (currentScene) {
               overlayManager.updateContext({
                 frame: newFrame,
                 sceneId: currentScene.overlayEnabled ? currentScene.id : 'none',
                 sceneName: currentScene.name,
                 progress: progress
               });
               
            // Update narrative system
            narrativeManager.updateProgress(currentScene.id, progress);
            }

            // Calculate Cinematic to Portfolio Transition (Scene 5: 901-995)
            if (cinematicLayerRef.current) {
              if (newFrame >= 901) {
                const fadeProgress = (newFrame - 901) / (995 - 901);
                // Ease out the cinematic layer
                cinematicLayerRef.current.style.opacity = (1 - fadeProgress).toFixed(3);
                
                // Fade in the Navigation
                if (navigationRef.current) {
                  navigationRef.current.style.opacity = fadeProgress.toFixed(3);
                  navigationRef.current.style.pointerEvents = fadeProgress > 0.5 ? 'auto' : 'none';
                }

                // Disable pointer events so the user can click the portfolio CTA
                if (fadeProgress > 0.5) {
                  cinematicLayerRef.current.style.pointerEvents = 'none';
                } else {
                  cinematicLayerRef.current.style.pointerEvents = 'auto';
                }
              } else {
                cinematicLayerRef.current.style.opacity = '1';
                cinematicLayerRef.current.style.pointerEvents = 'auto';
                
                if (navigationRef.current) {
                  navigationRef.current.style.opacity = '0';
                  navigationRef.current.style.pointerEvents = 'none';
                }
              }
            }

            // Imperatively update the canvas and the debug DOM node
            canvasRendererRef.current?.drawFrame(newFrame);
            debugOverlayRef.current?.updateFrame(newFrame);
        }
      },
    });
  }, { scope: containerRef, dependencies: [rendererState] });

  return (
    <main className="relative w-full bg-zinc-950">
      <Navigation ref={navigationRef} />
      
      <div 
        ref={scrollContainerRef}
        className="w-full"
        style={{ height: `${CINEMATIC_CONFIG.SCROLL_DISTANCE_VH}vh` }}
      >
        <div 
          ref={containerRef} 
          className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-zinc-950"
        >
          <div className="absolute inset-0 w-full h-full z-0">
             <Hero />
          </div>

          <div 
            ref={cinematicLayerRef}
            className="absolute inset-0 w-full h-full z-10 bg-black"
            style={{ willChange: 'opacity' }}
          >
            <CanvasRenderer 
              ref={canvasRendererRef} 
              onStateChange={setRendererState}
              onLoadedCountChange={setLoadedCount}
            />
            <OverlayRenderer manager={overlayManager} />
            <TypographyRenderer manager={narrativeManager} />
          </div>
        </div>
      </div>

      <SelectedWork />

      <LoadingScreen 
        isLoaded={isLoaded} 
        progress={loadingProgress}
      />
      
      <DebugOverlay 
        ref={debugOverlayRef}
        loadedFrames={loadedCount}
        rendererState={rendererState} 
      />
    </main>
  );
}
