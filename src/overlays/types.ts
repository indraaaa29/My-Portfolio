export type OverlayLifecycleState = 'Inactive' | 'Entering' | 'Active' | 'Leaving' | 'Destroyed';

export interface OverlayContext {
  frame: number;
  sceneId: string;
  sceneName: string;
  progress: number;
}

export interface OverlayState {
  context: OverlayContext | null;
  lifecycle: OverlayLifecycleState;
}

export type OverlayLifecycleListener = (state: OverlayState) => void;
