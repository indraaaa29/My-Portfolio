export interface Project {
  index: string;     // "01", "02", ...
  variant: 'immersive' | 'editorial' | 'typography' | 'fullscreen';
  title: string;
  category: string;
  year: string;
  tagline: string;
  context: string;
  thinking: string;
  execution: string;
  outcome: string;
  stack: string[];
  color: string;     // accent hue for hover state
  imageHue: string;  // CSS gradient for placeholder image
  image: string;     // image path
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    variant: 'immersive',
    title: 'Cinematic Canvas',
    category: 'Interaction Design',
    year: '2025',
    tagline: 'Scroll-driven film, frame by frame.',
    context: 'Static portfolio sites fail to communicate motion-first design thinking.',
    thinking: 'To show, not tell, we needed a seamless experience where the portfolio itself becomes the showcase piece, behaving like a film director\'s cut.',
    execution: 'A 995-frame scroll-sequenced canvas engine was engineered with custom scene management, narrative overlays, and GSAP synchronisation.',
    outcome: 'Sub-16ms frame delivery. Zero layout shift. Smooth 60 FPS on mobile devices.',
    stack: ['Next.js', 'TypeScript', 'GSAP', 'Canvas API', 'Lenis'],
    color: '#D4C5A9',
    imageHue: 'linear-gradient(135deg, #0F0E0C 0%, #1A1714 40%, #2C2419 100%)',
    image: '/project-01.png',
  },
  {
    index: '02',
    variant: 'editorial',
    title: 'Signal Dashboard',
    category: 'Data Visualisation',
    year: '2024',
    tagline: 'Real-time intelligence at institutional scale.',
    context: 'Financial teams were drowning in raw data streams, lacking any spatial awareness of where risk actually lived.',
    thinking: 'We stripped away the noise. The interface needed to be as silent and precise as a cockpit, surfacing only actionable anomalies.',
    execution: 'Built a live streaming data surface using WebSocket ingestion, highly optimized GPU-accelerated canvas charts, and a composable filter architecture.',
    outcome: 'Analysts saw a 4× reduction in response time, comfortably processing over 800K events per minute without UI stutter.',
    stack: ['React', 'D3.js', 'WebSocket', 'WebGL', 'Rust backend'],
    color: '#B8C9D4',
    imageHue: 'linear-gradient(135deg, #080C10 0%, #101820 40%, #141F2A 100%)',
    image: '/project-02.png',
  },
  {
    index: '03',
    variant: 'typography',
    title: 'Arc Design System',
    category: 'Design Engineering',
    year: '2024',
    tagline: 'One language. Thirty teams. Zero drift.',
    context: 'A 120-person product organization was shipping inconsistent interfaces across a suite of twelve different products.',
    thinking: 'Consistency couldn\'t rely on discipline alone; it had to be engineered. We needed a single source of truth from design tokens to production code.',
    execution: 'Developed a token-first design system with over 400 components, a seamless Figma-to-code pipeline, and automated visual regression testing.',
    outcome: 'Achieved a 68% reduction in UI-related bug reports and compressed the average feature cycle from 3 weeks to just 4 days.',
    stack: ['React', 'Storybook', 'Style Dictionary', 'Chromatic', 'Turborepo'],
    color: '#C9C2D4',
    imageHue: 'linear-gradient(135deg, #0C080F 0%, #180F1E 40%, #1E1528 100%)',
    image: '/project-03.png',
  },
  {
    index: '04',
    variant: 'fullscreen',
    title: 'Parallax Narrative',
    category: 'Creative Technology',
    year: '2023',
    tagline: 'Stories that respond to how you read them.',
    context: 'Long-form editorial content was suffering, with average scroll depth stalling at 23% before readers abandoned the page.',
    thinking: 'Reading shouldn\'t be static. By tying the environment to the user\'s reading velocity, we could pull them deeper into the narrative.',
    execution: 'Engineered a scroll-aware pacing engine where text, cinematic imagery, and ambient sound synchronize perfectly with the reader\'s pace and dwell time.',
    outcome: 'Average scroll depth increased to 81%, and total time-on-site grew by an unprecedented 340%.',
    stack: ['Three.js', 'GSAP', 'Howler.js', 'Next.js', 'Framer Motion'],
    color: '#C9D4C2',
    imageHue: 'linear-gradient(135deg, #080F08 0%, #0F1A0E 40%, #141F14 100%)',
    image: '/project-04.png',
  },
];
