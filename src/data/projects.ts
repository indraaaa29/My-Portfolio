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
  image: string;     // primary image path
  images?: string[]; // optional array for gallery carousel
  status: 'Production' | 'Research' | 'Hackathon' | 'Internship' | 'Open Source';
  links?: {
    live?: string;
    github?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    variant: 'immersive',
    title: 'VoteSetu',
    category: 'Full Stack Architecture',
    year: '2026',
    tagline: 'Smart Voting & Civic Engagement Platform.',
    context: 'Voting awareness and public participation needed a streamlined, secure platform that bridges the gap between citizens and election data.',
    thinking: 'Civic tech must be built on trust and accessibility. The architecture needed to securely handle user workflows while serving real-time constituency insights without lag.',
    execution: 'Engineered a Next.js platform integrating a MongoDB backend for secure registration guidance. Applied clean modular code practices and scalable real-time data handling.',
    outcome: 'Deployed a responsive, production-ready dashboard optimized for accessibility and performance.',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    color: '#D4C5A9',
    imageHue: 'linear-gradient(135deg, #0F0E0C 0%, #1A1714 40%, #2C2419 100%)',
    image: '/project-01.png',
    status: 'Production',
    links: {
      live: 'https://vote-setu.vercel.app'
    }
  },
  {
    index: '02',
    variant: 'editorial',
    title: 'FlowSync',
    category: 'Real-Time Analytics',
    year: '2026',
    tagline: 'Smart Venue Management Dashboard.',
    context: 'Large-scale events struggle with crowd density and queue management, leading to poor attendee experiences and operational inefficiencies.',
    thinking: 'Data is useless if it is not actionable. We needed a live spatial tracking system combined with sentiment analysis to proactively dispatch staff before bottlenecks occur.',
    execution: 'Built a real-time analytics dashboard featuring live crowd density tracking across gates and restrooms, incorporating WebGL for spatial visualization and predictive alerts.',
    outcome: 'Delivered a fully responsive mobile/desktop dashboard capable of predicting crowd shifts and improving staff dispatch efficiency.',
    stack: ['React 18', 'Next.js', 'TypeScript', 'Three.js (WebGL)', 'Tailwind CSS'],
    color: '#B8C9D4',
    imageHue: 'linear-gradient(135deg, #080C10 0%, #101820 40%, #141F2A 100%)',
    image: '/project-02.png',
    status: 'Production',
    links: {
      live: 'https://flow-sync-kohl.vercel.app'
    }
  },
  {
    index: '03',
    variant: 'typography',
    title: 'CarbWiser',
    category: 'AI-Powered Platform',
    year: '2025',
    tagline: 'Carbon Footprint Reduction Engine.',
    context: 'Understanding personal carbon footprints is often abstract and disconnected from daily behavioral changes.',
    thinking: 'To drive actual behavioral change, users need dynamic analytics, personalized hotspot identification, and actionable what-if simulations, not just static graphs.',
    execution: 'Developed dynamic carbon analytics and action commitment tracking using Vite and React, heavily integrating AI for tailored sustainability recommendations.',
    outcome: 'Achieved a 95.8/100 evaluation score and ranked #185 among 32,000+ participants in the Hack2Skill × Google Prompt Wars.',
    stack: ['React', 'TypeScript', 'Vite', 'Vitest', 'AI Integration'],
    color: '#C9C2D4',
    imageHue: 'linear-gradient(135deg, #0C080F 0%, #180F1E 40%, #1E1528 100%)',
    image: '/project-03.png',
    status: 'Hackathon',
    links: {
      live: 'https://carbwiser-phi.vercel.app'
    }
  },
  {
    index: '04',
    variant: 'fullscreen',
    title: 'Enervia',
    category: 'Smart Energy Systems',
    year: '2026',
    tagline: 'AI-Powered Smart Hostel Energy Management.',
    context: 'Hostel environments suffer from massive energy wastage due to a lack of occupancy-aware monitoring and real-time tracking.',
    thinking: 'Energy management requires impact visualization. An interactive digital map combined with an AI recommendation engine can directly identify and curb wastage.',
    execution: 'Engineered an interactive digital hostel map and an AI-powered recommendation engine to track energy savings analytics and occupancy data.',
    outcome: 'Built a highly responsive, production-ready web application with optimized performance and scalable component design.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AI Integration'],
    color: '#C9D4C2',
    imageHue: 'linear-gradient(135deg, #080F08 0%, #0F1A0E 40%, #141F14 100%)',
    image: '/project-04.png',
    status: 'Production',
    links: {
      live: 'https://drompulse.vercel.app'
    }
  },
  {
    index: '05',
    variant: 'editorial',
    title: 'Sentinel Architecture',
    category: 'Cybersecurity',
    year: '2026',
    tagline: 'Threat Detection & Secure DevOps.',
    context: 'Modern web applications require robust threat detection and system monitoring baked into the architecture from day one.',
    thinking: 'Security is not an afterthought; it is an architectural foundation. I needed to apply real-world threat detection workflows directly into a secure DevOps pipeline.',
    execution: 'Developed a cybersecurity-focused system applying concepts of threat detection, system monitoring, and secure architecture design during my VOIS internship.',
    outcome: 'Strengthened practical skills in real-world cybersecurity implementation and integrated version control structuring.',
    stack: ['Cybersecurity', 'Threat Detection', 'GitHub Actions', 'Secure DevOps'],
    color: '#D4B8B8',
    imageHue: 'linear-gradient(135deg, #1A0A0A 0%, #2A1010 40%, #3A1515 100%)',
    image: '/project-01.png',
    status: 'Internship'
  },
  {
    index: '06',
    variant: 'typography',
    title: 'AI Face Recognition',
    category: 'Computer Vision',
    year: '2025',
    tagline: 'Identity Verification System.',
    context: 'User authentication workflows are increasingly relying on biometric verification for enhanced security and seamless access.',
    thinking: 'Building an identity verification system requires deep understanding of computer vision algorithms to ensure high accuracy and low false-positive rates.',
    execution: 'Built a facial detection and identity verification system using Python and OpenCV, optimizing the model for accurate real-time inference.',
    outcome: 'Successfully automated user authentication workflows, drastically improving verification accuracy.',
    stack: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    color: '#D4C5A9',
    imageHue: 'linear-gradient(135deg, #101010 0%, #1A1A1A 40%, #2A2A2A 100%)',
    image: '/project-02.png',
    status: 'Research'
  },
  {
    index: '07',
    variant: 'immersive',
    title: 'Namaste',
    category: 'Web Development',
    year: '2026',
    tagline: 'Restaurant Ordering Workflow.',
    context: 'Local restaurants need reliable, responsive digital platforms to manage both delivery and takeaway orders efficiently.',
    thinking: 'A food ordering platform must prioritize user experience and operational efficiency, requiring a clean frontend tied to a robust ordering state machine.',
    execution: 'Developed and deployed a responsive food ordering platform utilizing HTML, CSS, and Vanilla JavaScript.',
    outcome: 'Enhanced the digital presence and operational efficiency for a real client-based restaurant.',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    color: '#B8C9D4',
    imageHue: 'linear-gradient(135deg, #0A101A 0%, #101A2A 40%, #152A3A 100%)',
    image: '/project-03.png',
    status: 'Production'
  }
];
