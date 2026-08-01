import { OverlayLifecycleState, OverlayContext, OverlayState, OverlayLifecycleListener } from './types';

export class OverlayManager {
  private currentContext: OverlayContext | null = null;
  private lifecycle: OverlayLifecycleState = 'Inactive';
  private listeners: Set<OverlayLifecycleListener> = new Set();
  private transitionTimer: NodeJS.Timeout | null = null;

  public updateContext(context: OverlayContext) {
    const previousSceneId = this.currentContext?.sceneId;
    this.currentContext = context;

    if (previousSceneId !== context.sceneId) {
      if (context.sceneId === 'none' || !context.sceneId) {
        this.hideOverlay();
      } else {
        this.showOverlay();
      }
    }
  }

  private showOverlay() {
    if (this.transitionTimer) clearTimeout(this.transitionTimer);
    
    this.setLifecycle('Entering');
    this.transitionTimer = setTimeout(() => {
      this.setLifecycle('Active');
    }, 100);
  }

  private hideOverlay() {
    if (this.transitionTimer) clearTimeout(this.transitionTimer);

    if (this.lifecycle === 'Inactive' || this.lifecycle === 'Destroyed') return;

    this.setLifecycle('Leaving');
    this.transitionTimer = setTimeout(() => {
      this.setLifecycle('Destroyed');
      this.setLifecycle('Inactive');
    }, 100);
  }

  public getContext(): OverlayContext | null {
    return this.currentContext;
  }

  public isOverlayActive(): boolean {
    return this.lifecycle === 'Entering' || this.lifecycle === 'Active';
  }

  private setLifecycle(state: OverlayLifecycleState) {
    this.lifecycle = state;
    this.notifyListeners();
  }

  public onStateChange(listener: OverlayLifecycleListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const state: OverlayState = {
      context: this.currentContext,
      lifecycle: this.lifecycle,
    };
    this.listeners.forEach(l => l(state));
  }
}
