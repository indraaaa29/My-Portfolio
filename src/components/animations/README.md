# Animation System

This directory contains the reusable animation library for the Cinematic Portfolio.

## Structure

```
animations/
├── TextPressure/       # Variable font pressure effect
├── ScrollReveal/       # Scroll-triggered reveal (Session 4)
├── MotionProvider/     # Centralized animation context
├── index.ts            # Barrel exports
└── README.md           # This file
```

## Guidelines

### Every Animation Component MUST:

1. **Live in its own directory** — `animations/<Name>/`
2. **Have a barrel export** — `animations/<Name>/index.ts`
3. **Use CSS Modules** — `animations/<Name>/<Name>.module.css`
4. **Be a `'use client'` component** — All animations run on the client
5. **Be strict TypeScript** — No `any`, all props have interfaces
6. **Be reduced-motion aware** — Respect `prefers-reduced-motion` via `useMotion()` or `useReducedMotion()`
7. **Clean up on unmount** — Cancel all `requestAnimationFrame`, observer, and event listener calls

### Naming Conventions

- Component file: `ComponentName.tsx`
- CSS Module: `ComponentName.module.css`
- Barrel: `index.ts`
- Export pattern: `export { default as ComponentName } from './ComponentName'`

### MotionProvider

Wrap any section or page that needs animation with `<MotionProvider>` to access:

- `reducedMotion` — Respects user accessibility preference
- `durations` — Design token animation durations
- `easings` — Design token easing curves
- `getDuration()` — Returns 0 when reduced motion is active
- `framerConfig` — Pre-configured Framer Motion transition (reduced-motion aware)

## Future Components

- `ScrollReveal` — Session 4
- `Particles` — Background particle system (future session)
- `ParallaxLayer` — Scroll-driven parallax (future session)

## Dependencies

- `framer-motion` — React animation primitives
- `gsap` — High-performance animation engine
- `lenis` — Smooth scroll (imported at the page/layout level)
