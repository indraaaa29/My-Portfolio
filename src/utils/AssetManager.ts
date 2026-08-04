import { CINEMATIC_CONFIG } from '@/config/cinematic';

export class AssetManager {
  private cache: Map<number, HTMLImageElement> = new Map();
  private cacheWindow: number;
  private loadedCount: number = 0;
  private onProgressCallback?: (loadedCount: number) => void;

  constructor(isMobile: boolean = false, onProgress?: (count: number) => void) {
    this.cacheWindow = isMobile ? CINEMATIC_CONFIG.MOBILE_CACHE_WINDOW : CINEMATIC_CONFIG.CACHE_WINDOW;
    this.onProgressCallback = onProgress;
  }

  private getFrameUrl(index: number): string {
    const paddedIndex = String(index).padStart(6, '0');
    return CINEMATIC_CONFIG.FRAME_PATH.replace('{id}', paddedIndex);
  }

  public updateWindow(currentIndex: number) {
    const min = Math.max(1, currentIndex - this.cacheWindow);
    const max = Math.min(CINEMATIC_CONFIG.TOTAL_FRAMES, currentIndex + this.cacheWindow);

    // Evict frames outside the window
    for (const [key, img] of this.cache.entries()) {
      if (key < min || key > max) {
        const wasLoaded = (img as HTMLImageElement & { _isDecoded?: boolean })._isDecoded;
        
        img.onload = null;
        img.onerror = null;
        
        if (img.src !== '') {
          img.src = ''; // Release memory & abort pending requests
        }
        this.cache.delete(key);
        
        if (wasLoaded) {
          this.loadedCount = Math.max(0, this.loadedCount - 1);
        }
      }
    }

    // Request frames inside the window
    for (let i = min; i <= max; i++) {
      if (!this.cache.has(i)) {
        this.loadFrame(i);
      }
    }

    if (this.onProgressCallback) {
      this.onProgressCallback(this.loadedCount);
    }
  }

  private loadFrame(index: number) {
    const img = new Image();
    
    // Add to cache immediately so we don't request it twice
    this.cache.set(index, img);

    img.onload = async () => {
      if ('decode' in img) {
        try {
          await img.decode();
        } catch {
          // Ignore decode errors and gracefully fall back to default behavior
        }
      }
      
      (img as HTMLImageElement & { _isDecoded?: boolean })._isDecoded = true;
      this.loadedCount++;
      if (this.onProgressCallback) {
        this.onProgressCallback(this.loadedCount);
      }
    };
    
    img.onerror = () => {
      console.warn(`Failed to load frame ${index}`);
    };

    img.src = this.getFrameUrl(index);
  }

  public getFrame(index: number): HTMLImageElement | undefined {
    const img = this.cache.get(index);
    if (img && img.complete && img.naturalWidth > 0 && (img as HTMLImageElement & { _isDecoded?: boolean })._isDecoded) {
      return img;
    }
    return undefined;
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }
}
