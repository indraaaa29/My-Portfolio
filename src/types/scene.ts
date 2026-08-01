export interface CinematicScene {
  id: string;
  name: string;
  startFrame: number;
  endFrame: number;
  description: string;
  overlayEnabled: boolean;
  priority: number;
}
