import { CinematicScene } from '@/types/scene';
import { scenes as cinematicScenes } from './cinematicScenes';
import { adaptScenes } from '@/adapters/cinematicAdapters';

export const SCENES: CinematicScene[] = adaptScenes(cinematicScenes);
