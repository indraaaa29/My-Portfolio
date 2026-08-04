import { scenes as cinematicScenes } from './cinematicScenes';
import { adaptNarratives } from '@/adapters/cinematicAdapters';

export interface NarrativeEntry {
  sceneId: string;
  title: string;
  message: string;
  emphasis: string;
  duration: string;
}

export const NARRATIVE_DATA: NarrativeEntry[] = adaptNarratives(cinematicScenes);
