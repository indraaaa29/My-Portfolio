'use client';

import type { Project as ProjectData } from '@/data/projects';
import ImmersiveVariant from './variants/ImmersiveVariant';
import EditorialVariant from './variants/EditorialVariant';
import TypographyVariant from './variants/TypographyVariant';
import FullscreenVariant from './variants/FullscreenVariant';

const VARIANTS = {
  immersive: ImmersiveVariant,
  editorial: EditorialVariant,
  typography: TypographyVariant,
  fullscreen: FullscreenVariant,
} as const;

/**
 * Reusable editorial project — one design system, multiple layouts.
 * <Project variant="immersive" /> etc.
 */
export default function Project({ project }: { project: ProjectData }) {
  const Variant = VARIANTS[project.variant];
  return <Variant project={project} />;
}
