import { CinematicScene } from '@/types/scene';

export const SCENES: CinematicScene[] = [
  {
    id: "scene-01",
    name: "Opening",
    startFrame: 1,
    endFrame: 85,
    description: "Opening cinematic sequence",
    overlayEnabled: true,
    priority: 1
  },
  {
    id: "scene-02",
    name: "Discovery",
    startFrame: 86,
    endFrame: 300,
    description: "Introduction to the world",
    overlayEnabled: true,
    priority: 2
  },
  {
    id: "scene-03",
    name: "Journey",
    startFrame: 301,
    endFrame: 600,
    description: "The main exploration",
    overlayEnabled: true,
    priority: 3
  },
  {
    id: "scene-04",
    name: "Climax",
    startFrame: 601,
    endFrame: 900,
    description: "The peak visual moment",
    overlayEnabled: true,
    priority: 4
  },
  {
    id: "scene-05",
    name: "Transition",
    startFrame: 901,
    endFrame: 995,
    description: "Transition into portfolio",
    overlayEnabled: false,
    priority: 5
  }
];
