export interface NarrativeEntry {
  sceneId: string;
  title: string;
  message: string;
  emphasis: string;
  duration: string;
}

export const NARRATIVE_DATA: NarrativeEntry[] = [
  {
    sceneId: "scene-01",
    title: "Opening",
    message: "Look closer.",
    emphasis: "soft",
    duration: "normal"
  },
  {
    sceneId: "scene-02",
    title: "Discovery",
    message: "A world of unseen details.",
    emphasis: "medium",
    duration: "long"
  },
  {
    sceneId: "scene-03",
    title: "Journey",
    message: "Every frame crafted with precision.",
    emphasis: "strong",
    duration: "long"
  },
  {
    sceneId: "scene-04",
    title: "Climax",
    message: "Pushing the boundaries of interaction.",
    emphasis: "epic",
    duration: "normal"
  },
  {
    sceneId: "scene-05",
    title: "Transition",
    message: "Experience the portfolio.",
    emphasis: "soft",
    duration: "short"
  }
];
