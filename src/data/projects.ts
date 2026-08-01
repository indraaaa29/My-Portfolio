export type ProjectVariant = 'immersive' | 'editorial' | 'typography' | 'fullscreen';

export interface Project {
  index: string; // "01", "02", ...
  title: string;
  category: string;
  year: string;
  tagline: string;
  /** Storytelling arc — each project reads like a story, not a resume entry. */
  context: string;   // where the story begins — the scene
  thinking: string;  // the question / the reasoning
  execution: string; // what was built and how
  outcome: string;   // what changed because of it
  stack: string[];
  color: string;     // accent hue for subtle hover states
  image: string;     // editorial visual
  variant: ProjectVariant; // editorial layout identity
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    title: 'Cinematic Canvas',
    category: 'Interaction Design',
    year: '2025',
    tagline: 'Scroll-driven film, frame by frame.',
    context:
      'The brief was the medium itself — prove that motion-first design thinking is an architecture, not decoration. The most honest way to show it was to become it.',
    thinking:
      'If cinema is twenty-four frames a second, a website can be a thousand frames per scroll. What if the introduction wasn\u2019t a page you read, but a film you scrub with your own hand?',
    execution:
      'A 995-frame scroll-sequenced canvas engine with scene management, narrative overlays, and GSAP synchronisation — this very experience, composed frame by frame.',
    outcome:
      'Sub-16ms frame delivery. Zero layout shift. A steady 60 FPS on mobile — performance written into the story itself.',
    stack: ['Next.js', 'TypeScript', 'GSAP', 'Canvas API', 'Lenis'],
    color: '#D4C5A9',
    image: '/project-01.png',
    variant: 'immersive',
  },
  {
    index: '02',
    title: 'Signal Dashboard',
    category: 'Data Visualisation',
    year: '2024',
    tagline: 'Real-time intelligence at institutional scale.',
    context:
      'Trading desks were drowning in raw streams. Risk lived somewhere in the noise, but nobody could see where — spatial awareness had collapsed.',
    thinking:
      'Don\u2019t show everything at once. Give the noise a place to rest, and the signal becomes self-evident. Calm is a design decision.',
    execution:
      'A live streaming data surface with WebSocket ingestion, GPU-accelerated canvas charts, and a composable filter architecture tuned for split-second reading.',
    outcome:
      '4× reduction in analyst response time. 800K events processed per minute without dropping a frame.',
    stack: ['React', 'D3.js', 'WebSocket', 'WebGL', 'Rust backend'],
    color: '#B8C9D4',
    image: '/project-02.png',
    variant: 'editorial',
  },
  {
    index: '03',
    title: 'Arc Design System',
    category: 'Design Engineering',
    year: '2024',
    tagline: 'One language. Thirty teams. Zero drift.',
    context:
      'A 120-person product org was shipping inconsistent interfaces across twelve products. Every screen disagreed with the one next to it.',
    thinking:
      'A design system is not a component library — it is a language. Start with the atoms, the tokens, and let the grammar fall out of them.',
    execution:
      'A token-first design system — 400+ components, a Figma-to-code pipeline, automated visual regression, published as a versioned npm package.',
    outcome:
      '68% fewer UI-related bug reports. Feature cycles collapsed from three weeks to four days.',
    stack: ['React', 'Storybook', 'Style Dictionary', 'Chromatic', 'Turborepo'],
    color: '#C9C2D4',
    image: '/project-03.png',
    variant: 'typography',
  },
  {
    index: '04',
    title: 'Parallax Narrative Engine',
    category: 'Creative Technology',
    year: '2023',
    tagline: 'Stories that respond to how you read them.',
    context:
      'Long-form editorial had a 23% scroll depth. Readers were not leaving the story — they were leaving the page that ignored how they read.',
    thinking:
      'Reading has a rhythm. What if the page could feel how fast you were reading, and pace itself to keep you inside the story?',
    execution:
      'A scroll-aware narrative pacing engine — text, imagery, and ambient sound synchronised to reading velocity and dwell time.',
    outcome:
      'Average scroll depth rose to 81%. Time-on-site grew 340%. Readers stopped skipping and started living in the story.',
    stack: ['Three.js', 'GSAP', 'Howler.js', 'Next.js', 'Framer Motion'],
    color: '#C9D4C2',
    image: '/project-04.png',
    variant: 'fullscreen',
  },
];
