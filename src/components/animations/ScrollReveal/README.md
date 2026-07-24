# ScrollReveal

Scroll-triggered text reveal animation primitive. As the user scrolls, words fade in, rotate into place, and optionally unblur — creating a cinematic reading experience.

## Status

✅ Implemented — Session 4

## Dependencies

- `gsap` — Animation engine (`gsap.fromTo`, `ScrollTrigger`)
- `MotionProvider` — Reduced motion awareness via `useMotion()`

## Usage

```tsx
import { ScrollReveal } from '@/components/animations';

<ScrollReveal
  baseOpacity={0.1}
  enableBlur
  baseRotation={3}
  blurStrength={4}
>
  A man dies when he is forgotten!
</ScrollReveal>
```

## Props

| Prop                | Type       | Default          | Description                                    |
|---------------------|------------|------------------|------------------------------------------------|
| `children`          | `ReactNode`| —                | Text content to animate (string recommended)   |
| `scrollContainerRef`| `RefObject`| `window`         | Custom scroll container for horizontal scroll  |
| `enableBlur`        | `boolean`  | `true`           | Enable blur-to-clear reveal                    |
| `baseOpacity`       | `number`   | `0.1`            | Starting opacity of each word (0–1)            |
| `baseRotation`      | `number`   | `3`              | Starting rotation in degrees                   |
| `blurStrength`      | `number`   | `4`              | Blur strength in pixels                        |
| `containerClassName`| `string`   | `''`             | Additional class for outer h2 wrapper          |
| `textClassName`     | `string`   | `''`             | Additional class for inner p wrapper           |
| `rotationEnd`       | `string`   | `'bottom bottom'`| ScrollTrigger end for rotation                 |
| `wordAnimationEnd`  | `string`   | `'bottom bottom'`| ScrollTrigger end for word reveal              |

## Reduced Motion

When the user prefers reduced motion (detected via `useMotion()`), the component renders static content with no GSAP animations. The `getDuration()` helper returns `0` for all durations, and `gsapEnabled` is set to `false` in the MotionProvider context.

## Architecture

- Uses `gsap.context()` to scope all GSAP animations to the component's root element
- On unmount, `ctx.revert()` kills **only** the animations created within this component
- Does **not** interfere with unrelated ScrollTriggers elsewhere in the application
- Text is split into individual `<span>` elements for per-word stagger animations
- CSS Modules for scoped styling

## Cleanup

All animations, ScrollTriggers, and event listeners are cleaned up on unmount via:
- `gsap.context().revert()` — reverts all tweens/ScrollTriggers in scope
- `useEffect` return function — runs on unmount and dependency change
