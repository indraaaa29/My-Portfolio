import type { CinematicScene as StoryboardScene } from '@/data/cinematicScenes';
import type { CinematicScene as EngineScene } from '@/types/scene';
import type { NarrativeEntry } from '@/data/narrative';

/**
 * SceneAdapter
 * Translates the rich 10-scene storyboard into the minimal EngineScene format
 * expected by SceneManager.
 */
export function adaptScene(scene: StoryboardScene, index: number): EngineScene {
  return {
    id: scene.id,
    name: scene.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    startFrame: scene.startFrame,
    endFrame: scene.endFrame,
    description: scene.message.replace('\n', ' '),
    overlayEnabled: true, // cinematicScenes typically span full sections, allowing overlays
    priority: index,
  };
}

export function adaptScenes(scenes: StoryboardScene[]): EngineScene[] {
  return scenes.map(adaptScene);
}

/**
 * NarrativeAdapter
 * Translates the rich typography and positioning payload of the storyboard
 * into the legacy NarrativeEntry format expected by NarrativeManager.
 */
export function adaptNarrative(scene: StoryboardScene): NarrativeEntry {
  // Map rich typography constraints to the legacy "emphasis" buckets
  let emphasis = 'medium';
  
  if (scene.typography.fontWeight >= 700 || scene.typography.fontSize.includes('8vw')) {
    emphasis = 'epic';
  } else if (scene.typography.fontWeight >= 500 || scene.typography.fontSize.includes('6vw')) {
    emphasis = 'strong';
  } else if (scene.typography.fontWeight === 300) {
    emphasis = 'soft';
  }

  // Determine duration bucket based on frame span
  const frameSpan = scene.endFrame - scene.startFrame;
  let duration = 'normal';
  if (frameSpan > 90) duration = 'long';
  if (frameSpan < 50) duration = 'short';

  return {
    sceneId: scene.id,
    title: scene.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    message: scene.message,
    emphasis,
    duration,
  };
}

export function adaptNarratives(scenes: StoryboardScene[]): NarrativeEntry[] {
  return scenes.map(adaptNarrative);
}

export function adaptTypographyLayout(scene: StoryboardScene): { layout: string; labelPosition: string; label: string } {
  // Strict, consistent layout grid mimicking high-end editorial margins
  let layout = 'fixed inset-0 flex flex-col pointer-events-none z-20 ';
  
  // Vertical Alignment
  if (scene.position.alignY === 'top') layout += 'justify-start pt-24 md:pt-32 ';
  else if (scene.position.alignY === 'bottom') layout += 'justify-end pb-24 md:pb-32 ';
  else layout += 'justify-center ';

  // Horizontal Alignment
  if (scene.position.alignX === 'left') layout += 'items-start pl-12 md:pl-24 lg:pl-32 text-left ';
  else if (scene.position.alignX === 'right') layout += 'items-end pr-12 md:pr-24 lg:pr-32 text-right ';
  else layout += 'items-center px-4 text-center ';

  return {
    layout: layout.trim(),
    labelPosition: 'mb-2 md:mb-3', // Tighter binding to primary text
    label: scene.id.split('-')[1] || '00',
  };
}
