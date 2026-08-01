export interface NarrativeContext {
  sceneId: string;
  message: string;
  emphasis: string;
  progress: number;
}

export type NarrativeListener = (context: NarrativeContext | null) => void;
