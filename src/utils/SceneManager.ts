import { CinematicScene } from '@/types/scene';

export type SceneChangeEvent = (previousScene: CinematicScene | null, currentScene: CinematicScene) => void;

export class SceneManager {
  private scenes: CinematicScene[];
  private currentScene: CinematicScene | null = null;
  private listeners: Set<SceneChangeEvent> = new Set();

  constructor(scenes: CinematicScene[]) {
    // Sort scenes by start frame to ensure sequential order
    this.scenes = [...scenes].sort((a, b) => a.startFrame - b.startFrame);
  }

  public getCurrentScene(frame: number): CinematicScene | null {
    // Binary search could be used for thousands of scenes, but find() is O(N) which is instant for ~10 scenes
    return this.scenes.find(s => frame >= s.startFrame && frame <= s.endFrame) || null;
  }

  public getPreviousScene(frame: number): CinematicScene | null {
    const current = this.getCurrentScene(frame);
    if (!current) return null;
    const index = this.scenes.indexOf(current);
    return index > 0 ? this.scenes[index - 1] : null;
  }

  public getNextScene(frame: number): CinematicScene | null {
    const current = this.getCurrentScene(frame);
    if (!current) return null;
    const index = this.scenes.indexOf(current);
    return index < this.scenes.length - 1 ? this.scenes[index + 1] : null;
  }

  public getSceneProgress(frame: number): number {
    const scene = this.getCurrentScene(frame);
    if (!scene) return 0;
    if (scene.endFrame === scene.startFrame) return 1;
    return (frame - scene.startFrame) / (scene.endFrame - scene.startFrame);
  }

  public isSceneChanging(previousFrame: number, currentFrame: number): boolean {
    const prevScene = this.getCurrentScene(previousFrame);
    const currScene = this.getCurrentScene(currentFrame);
    return prevScene?.id !== currScene?.id;
  }
  
  public updateFrame(frame: number) {
    const newScene = this.getCurrentScene(frame);
    if (newScene && this.currentScene?.id !== newScene.id) {
      this.notifyListeners(this.currentScene, newScene);
      this.currentScene = newScene;
    }
  }

  public onSceneChange(callback: SceneChangeEvent): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(prev: CinematicScene | null, curr: CinematicScene) {
    this.listeners.forEach(listener => listener(prev, curr));
  }
}
