import { NARRATIVE_DATA, NarrativeEntry } from '../data/narrative';
import { NarrativeContext, NarrativeListener } from './types';

export class NarrativeManager {
  private data: Map<string, NarrativeEntry>;
  private listeners: Set<NarrativeListener> = new Set();
  private activeContext: NarrativeContext | null = null;
  
  constructor() {
    this.data = new Map(NARRATIVE_DATA.map(entry => [entry.sceneId, entry]));
  }
  
  public getNarrativeForScene(sceneId: string): NarrativeEntry | null {
    return this.data.get(sceneId) || null;
  }
  
  public updateProgress(sceneId: string, progress: number) {
    const entry = this.getNarrativeForScene(sceneId);
    
    if (!entry) {
      if (this.activeContext !== null) {
        this.activeContext = null;
        this.notifyListeners();
      }
      return;
    }
    
    this.activeContext = {
      sceneId: entry.sceneId,
      message: entry.message,
      emphasis: entry.emphasis,
      progress
    };
    
    // We notify listeners on every tick so future Typography systems can consume `progress`
    // to drive opacity or position without querying the manager.
    this.notifyListeners();
  }
  
  public getContext(): NarrativeContext | null {
    return this.activeContext;
  }
  
  public onContextChange(listener: NarrativeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  private notifyListeners() {
    this.listeners.forEach(l => l(this.activeContext));
  }
}
