export interface ProjectCaseStudy {
  overview: string;
  role: string;
  status: string;
  problem: string;
  challenges: { title: string; description: string }[];
  solution: string;
  architecture: {
    overview: string;
    flow: string[];
    decisions: { title: string; description: string }[];
    tradeoffs: { title: string; description: string }[];
  };
  engineeringHighlights: { title: string; description: string }[];
  techStack: { category: string; items: string[] }[];
  keyFeatures: { title: string; description: string }[];
  results: {
    description: string;
    metrics?: { label: string; value: string }[];
  };
  engineeringReflection: string[];
}

export const CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  '01': {
    overview: 'VoteSetu is a secure, scalable civic engagement platform built to streamline the voting process. It acts as a bridge between citizens and election data, providing real-time constituency insights and an accessible registration workflow.',
    role: 'Full Stack Engineer',
    status: 'Production',
    problem: 'Civic tech often struggles with accessibility and trust. Existing voter registration systems were fragmented, slow, and non-intuitive, leading to drop-offs. Citizens lacked a unified dashboard to track election data and verify their registration securely.',
    challenges: [
      { title: 'Data Synchronization', description: 'Ensuring constituency dashboards updated in real-time without overwhelming the database with polling requests during peak election traffic.' },
      { title: 'Secure Authentication', description: 'Balancing a frictionless onboarding experience for non-technical users with compliance-grade security for sensitive civic data.' }
    ],
    solution: 'Engineered a Next.js application that handles SSR for fast initial loads, paired with a highly scalable MongoDB backend. We decoupled the read-heavy dashboard from the write-heavy registration flow to ensure high availability.',
    architecture: {
      overview: 'A serverless, edge-deployed Next.js application interfacing with a managed NoSQL database. State is handled optimally across the client and server components.',
      flow: ['Next.js Client Layer', 'Server Actions / API', 'Validation Middleware', 'MongoDB Atlas'],
      decisions: [
        { title: 'Server-Side Rendering', description: 'Used Next.js App Router for aggressive caching of static election data, minimizing database hits.' },
        { title: 'Schema Design', description: 'Denormalized constituency data in MongoDB to optimize for read-heavy operations.' }
      ],
      tradeoffs: [
        { title: 'Eventual Consistency', description: 'Accepted slight delays in global dashboard stats to allow for high-throughput localized caching.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Optimized Rendering', description: 'Reduced First Contentful Paint (FCP) by 40% through selective hydration and static generation.' },
      { title: 'Robust Validation', description: 'Implemented strict Zod schema validation at the edge before data reaches the core database.' }
    ],
    techStack: [
      { category: 'Frontend', items: ['React 18', 'Next.js App Router', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'Next.js API Routes'] },
      { category: 'Database', items: ['MongoDB Atlas', 'Mongoose'] },
      { category: 'Tools', items: ['TypeScript', 'Zod', 'Vercel'] }
    ],
    keyFeatures: [
      { title: 'Secure Onboarding', description: 'Multi-step registration workflow with built-in data sanitization.' },
      { title: 'Live Dashboards', description: 'Real-time aggregation pipelines computing constituency-level insights.' }
    ],
    results: {
      description: 'Deployed a robust, accessible platform capable of handling concurrent traffic spikes. The architecture scales seamlessly while maintaining a fluid user experience.',
      metrics: [
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'Latency', value: '< 200ms' }
      ]
    },
    engineeringReflection: [
      'Designing for accessibility from day one forced a simpler, more robust DOM structure.',
      'Separating the read/write paths in the database was critical for performance during load tests.',
      'Future iterations would benefit from a dedicated caching layer like Redis for election stats.'
    ]
  },
  '02': {
    overview: 'FlowSync is a real-time spatial analytics dashboard for large-scale venues. It aggregates sensor data to visualize crowd density, predict bottlenecks, and guide proactive staff dispatch.',
    role: 'Frontend Engineer',
    status: 'Production',
    problem: 'Large venues operate reactively. Event staff dispatch happens only after a queue has formed. Management lacked a unified, real-time spatial view of venue occupancy to make proactive operational decisions.',
    challenges: [
      { title: 'High-Frequency Data', description: 'Streaming thousands of positional updates per second into the UI without blocking the main thread.' },
      { title: 'Rendering Performance', description: 'Maintaining 60FPS WebGL spatial visualizations on mid-tier hardware.' }
    ],
    solution: 'Built a high-performance React dashboard that offloads spatial rendering to Three.js (WebGL) and uses efficient data structures to batch incoming WebSocket events. React handles the UI state, while the canvas handles the heavy lifting.',
    architecture: {
      overview: 'A real-time data visualization pipeline where a WebSocket layer feeds batched data into a React application, which syncs with a WebGL rendering context.',
      flow: ['Sensor Data Stream', 'WebSocket Gateway', 'React State Manager', 'Three.js Render Pipeline'],
      decisions: [
        { title: 'Decoupled Rendering', description: 'Separated the React DOM tree from the Three.js scene graph to prevent unnecessary re-renders of the UI when entity positions updated.' },
        { title: 'Event Batching', description: 'Throttled incoming positional data and applied linear interpolation (LERP) on the client for smooth movement.' }
      ],
      tradeoffs: [
        { title: 'Bundle Size', description: 'Including Three.js increased the initial JS payload, mitigated by lazy-loading the map component.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Custom Render Pipeline', description: 'Engineered a highly optimized WebGL heatmap overlay that computes density via fragment shaders.' },
      { title: 'Memory Management', description: 'Implemented object pooling for venue entities to eliminate garbage collection stutters during peak data flow.' }
    ],
    techStack: [
      { category: 'Frontend', items: ['React 18', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Visualization', items: ['Three.js', 'WebGL', 'GLSL'] },
      { category: 'Networking', items: ['WebSockets'] }
    ],
    keyFeatures: [
      { title: 'Spatial Visualization', description: '3D interactive map of the venue with real-time occupancy.' },
      { title: 'Predictive Alerts', description: 'Threshold-based alerting system that identifies queue formation before it happens.' }
    ],
    results: {
      description: 'Delivered a fluid, visually striking dashboard that fundamentally shifts venue management from reactive to proactive.',
      metrics: [
        { label: 'Render Target', value: '60 FPS' },
        { label: 'Data Points', value: '10k+ / sec' }
      ]
    },
    engineeringReflection: [
      'Synchronizing React state with imperative WebGL code requires strict discipline regarding data ownership.',
      'Writing custom GLSL shaders proved far more performant than trying to calculate heatmaps in JavaScript.',
      'Data batching is just as important on the client as it is on the server.'
    ]
  },
  '03': {
    overview: 'CarbWiser is a dynamic carbon footprint analytics engine that uses AI to identify personal emission hotspots and simulate the impact of behavioral changes.',
    role: 'Full Stack Engineer',
    status: 'Hackathon (Hack2Skill x Google)',
    problem: 'Personal carbon calculators are static and guilt-driven. Users see a high number but lack actionable, personalized pathways to reduce their emissions based on their specific lifestyle constraints.',
    challenges: [
      { title: 'Complex Data Modeling', description: 'Translating varied daily activities into standardized carbon metrics required a flexible data schema.' },
      { title: 'AI Integration', description: 'Prompt engineering a language model to return structured, deterministic JSON recommendations rather than generic text.' }
    ],
    solution: 'Developed a Vite/React application that collects user data incrementally, processes the carbon math locally for instant feedback, and calls an AI endpoint to generate a personalized reduction roadmap.',
    architecture: {
      overview: 'A fast, client-heavy application leveraging Vite for rapid development. AI calls are abstracted through a serverless function to protect API keys.',
      flow: ['React Client', 'State Store', 'Serverless Edge Function', 'AI Inference API'],
      decisions: [
        { title: 'Local Calculation', description: 'All base carbon calculations happen client-side to ensure zero latency during the onboarding flow.' },
        { title: 'Structured AI Output', description: 'Utilized few-shot prompting to force the LLM to return actionable JSON steps rather than conversational text.' }
      ],
      tradeoffs: [
        { title: 'Client-Heavy State', description: 'Opted for a thick client architecture to speed up development for the hackathon timeline.' }
      ]
    },
    engineeringHighlights: [
      { title: 'What-If Simulation Engine', description: 'Built a reactive engine that recalculates the entire user footprint in real-time as they adjust sliders (e.g., "reduce meat consumption by 20%").' },
      { title: 'Test Coverage', description: 'Achieved exceptionally high test coverage using Vitest within the tight hackathon timeframe.' }
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Zustand'] },
      { category: 'AI', items: ['Google GenAI API', 'Prompt Engineering'] },
      { category: 'Testing', items: ['Vitest', 'React Testing Library'] }
    ],
    keyFeatures: [
      { title: 'Dynamic Analytics', description: 'Granular breakdown of emissions by category (Travel, Diet, Energy).' },
      { title: 'AI Recommendations', description: 'Tailored, realistic goals generated based on the user\'s specific high-emission areas.' }
    ],
    results: {
      description: 'The rigorous engineering approach and polished execution resulted in a top-tier evaluation in a massive global hackathon.',
      metrics: [
        { label: 'Evaluation Score', value: '95.8 / 100' },
        { label: 'Global Rank', value: 'Top 1%' }
      ]
    },
    engineeringReflection: [
      'Strict TypeScript interfaces saved hours of debugging when parsing unpredictable AI responses.',
      'Client-side state management is incredibly powerful when dealing with complex, interdependent math (like carbon tracking).',
      'Hackathons prove that prioritizing architecture early actually speeds up development.'
    ]
  },
  '04': {
    overview: 'Enervia is a smart energy management platform designed for hostel environments. It tracks occupancy and energy usage per room, leveraging AI to identify wastage and recommend efficiency measures.',
    role: 'Frontend Engineer',
    status: 'Production',
    problem: 'Hostels experience massive energy wastage because residents do not pay utility bills directly. Management lacked granular visibility into which blocks or rooms were consuming excess power when unoccupied.',
    challenges: [
      { title: 'Data Aggregation', description: 'Structuring an interface that can effortlessly zoom from a high-level campus view down to individual room metrics.' },
      { title: 'Actionable Visualization', description: 'Designing a digital map that clearly highlights wastage without overwhelming the user with raw data tables.' }
    ],
    solution: 'Engineered an interactive, SVG-based digital map of the hostel blocks. The React application queries a centralized database and maps the energy telemetry onto the visual layer in real-time.',
    architecture: {
      overview: 'A component-driven React application that separates the complex map visualization from the underlying data management layer.',
      flow: ['Data Provider', 'Aggregation Hook', 'Interactive Map Component', 'AI Insights Panel'],
      decisions: [
        { title: 'SVG Visualization', description: 'Chose SVG over Canvas for the map to allow easy DOM-based event binding (hover, click) on individual rooms.' },
        { title: 'Memoization Strategy', description: 'Heavily memoized the map sectors so that an update in one room does not trigger a re-render of the entire campus.' }
      ],
      tradeoffs: [
        { title: 'Map Complexity', description: 'Hardcoding the SVG structure required significant initial effort but yielded better accessibility and styling control.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Scalable Component Design', description: 'Abstracted the telemetry logic into custom hooks, keeping the UI components pure and testable.' },
      { title: 'Impact Visualization', description: 'Created dynamic sparklines and heat indicators that translate abstract kW/h numbers into intuitive visual cues.' }
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { category: 'Visualization', items: ['SVG DOM', 'Recharts'] },
      { category: 'AI', items: ['Recommendation Engine'] }
    ],
    keyFeatures: [
      { title: 'Interactive Campus Map', description: 'Clickable blocks and rooms reflecting real-time usage data.' },
      { title: 'Anomaly Detection', description: 'Automated flagging of rooms with high consumption and low occupancy.' }
    ],
    results: {
      description: 'Delivered a highly responsive, production-ready dashboard that makes abstract energy waste highly visible and actionable.',
      metrics: [
        { label: 'Component Reusability', value: 'High' },
        { label: 'Performance', value: '99/100' }
      ]
    },
    engineeringReflection: [
      'SVG maps are incredibly powerful in React when broken down into functional components.',
      'Visualizing data is about removing noise; showing users exactly where they need to look is more important than showing them everything.',
      'A strict separation of data fetching and presentation logic is crucial for complex dashboards.'
    ]
  },
  '05': {
    overview: 'Sentinel Architecture is a cybersecurity-focused DevOps framework designed during an internship at VOIS. It bakes threat detection and system monitoring directly into the CI/CD pipeline.',
    role: 'DevOps & Security Intern',
    status: 'Internship (VOIS)',
    problem: 'Security is often treated as an afterthought or a final audit step. This reactive approach leads to vulnerabilities reaching staging or production environments before being caught.',
    challenges: [
      { title: 'Pipeline Integration', description: 'Integrating complex security scanning tools into an existing deployment pipeline without causing excessive build times.' },
      { title: 'False Positives', description: 'Tuning the threat detection rules to minimize noise so that developers do not suffer from alert fatigue.' }
    ],
    solution: 'Designed and implemented a secure DevOps workflow using GitHub Actions that automatically scans infrastructure as code (IaC) and application dependencies for vulnerabilities on every pull request.',
    architecture: {
      overview: 'An automated security gate integrated directly into the version control workflow, blocking insecure code from merging.',
      flow: ['Pull Request', 'Static Code Analysis', 'Dependency Audit', 'Container Scan', 'Merge Gateway'],
      decisions: [
        { title: 'Shift-Left Security', description: 'Moved security checks to the earliest possible stage in the development lifecycle.' },
        { title: 'Automated Alerting', description: 'Configured webhooks to notify the security team only when critical thresholds are breached.' }
      ],
      tradeoffs: [
        { title: 'Build Time', description: 'Security scans added ~2 minutes to the CI pipeline, accepted as a necessary tradeoff for proactive risk mitigation.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Threat Detection Workflow', description: 'Configured automated scanning for hardcoded secrets and known CVEs in dependencies.' },
      { title: 'Reproducible Hardening', description: 'Codified the security policies using version-controlled configuration files.' }
    ],
    techStack: [
      { category: 'DevOps', items: ['GitHub Actions', 'CI/CD'] },
      { category: 'Security', items: ['Threat Detection', 'Dependency Scanning'] },
      { category: 'Infrastructure', items: ['System Monitoring'] }
    ],
    keyFeatures: [
      { title: 'Automated Audits', description: 'Zero-touch security scanning on every commit.' },
      { title: 'Hardened Pipeline', description: 'Strict branch protection rules tied to security check outcomes.' }
    ],
    results: {
      description: 'Successfully demonstrated the viability of embedding security workflows into standard engineering practices without severely impacting developer velocity.',
      metrics: [
        { label: 'Vulnerability Catch Rate', value: 'Increased' },
        { label: 'Manual Audits', value: 'Reduced' }
      ]
    },
    engineeringReflection: [
      'Security tooling is only effective if the signal-to-noise ratio is high; developers ignore noisy alerts.',
      'Treating infrastructure and security policies as code enables peer review and auditability.',
      'Shifting left fundamentally changes how engineers approach secure coding.'
    ]
  },
  '06': {
    overview: 'An automated identity verification system built using Python and OpenCV. It processes raw video feeds to detect and verify faces in real-time, designed for seamless authentication workflows.',
    role: 'Computer Vision Engineer',
    status: 'Research',
    problem: 'Traditional authentication workflows are friction-heavy. While biometric verification exists, implementing a custom pipeline that is accurate, fast, and resistant to varying lighting conditions is highly complex.',
    challenges: [
      { title: 'Inference Latency', description: 'Processing high-resolution video frames through a machine learning model fast enough to feel instantaneous to the user.' },
      { title: 'Environmental Variance', description: 'Maintaining high accuracy across different camera qualities, angles, and lighting setups.' }
    ],
    solution: 'Developed a robust computer vision pipeline that pre-processes incoming frames, extracts facial landmarks, and computes a feature vector for rapid comparison against a known database.',
    architecture: {
      overview: 'A sequential data pipeline that takes raw video input, normalizes it, and passes it through an optimized inference engine.',
      flow: ['Video Capture', 'Frame Normalization', 'Haar/HOG Detection', 'Feature Extraction', 'Verification Logic'],
      decisions: [
        { title: 'Grayscale Processing', description: 'Converted frames to grayscale before detection to reduce computational load without sacrificing structural accuracy.' },
        { title: 'Threshold Tuning', description: 'Strictly tuned the confidence thresholds to heavily penalize false positives over false negatives (favoring security).' }
      ],
      tradeoffs: [
        { title: 'Resolution vs Speed', description: 'Downsampled the video feed prior to processing to maintain a high framerate, at the cost of long-distance detection.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Optimized Inference', description: 'Leveraged OpenCV\'s highly optimized C++ backend through the Python bindings for maximum performance.' },
      { title: 'Robust Verification Loop', description: 'Implemented temporal smoothing—requiring positive identification across multiple consecutive frames to prevent spoofing.' }
    ],
    techStack: [
      { category: 'Languages', items: ['Python'] },
      { category: 'Libraries', items: ['OpenCV', 'NumPy'] },
      { category: 'Domain', items: ['Computer Vision', 'Machine Learning'] }
    ],
    keyFeatures: [
      { title: 'Real-Time Tracking', description: 'Continuous facial detection bounding boxes overlaid on live video.' },
      { title: 'Automated Authentication', description: 'Seamless verification workflow requiring zero user interaction.' }
    ],
    results: {
      description: 'Prototyped a highly capable identity verification system that balances security requirements with the need for low-latency processing.',
      metrics: [
        { label: 'False Positives', value: '< 1%' },
        { label: 'Inference Speed', value: '30+ FPS' }
      ]
    },
    engineeringReflection: [
      'Pre-processing (lighting normalization, alignment) often matters more than the underlying ML model complexity.',
      'In security applications, designing the failure state (how the system behaves when unsure) is critical.',
      'Python is excellent for orchestration, but the heavy lifting must be pushed to lower-level libraries.'
    ]
  },
  '07': {
    overview: 'Namaste is a bespoke food ordering platform developed for a local restaurant. It provides a clean, responsive workflow for managing delivery and takeaway orders without the overhead of heavy frameworks.',
    role: 'Web Developer',
    status: 'Production',
    problem: 'The client required a reliable digital ordering presence but had a limited budget and needed incredibly fast load times. Heavy single-page application (SPA) frameworks were unnecessary and would complicate long-term maintenance.',
    challenges: [
      { title: 'State Management', description: 'Handling complex cart state, order type toggles (delivery vs. takeaway), and checkout validation using pure Vanilla JavaScript.' },
      { title: 'Zero Dependencies', description: 'Building a rich, interactive UI without relying on React, Vue, or utility CSS frameworks.' }
    ],
    solution: 'Engineered a highly optimized static site using semantic HTML, scoped CSS, and a custom JavaScript state machine to handle the ordering flow. Deployed globally via GitHub Pages.',
    architecture: {
      overview: 'A classic multi-page application (MPA) enhanced with progressive JavaScript for the cart and checkout interactivity.',
      flow: ['Static HTML/CSS', 'Vanilla JS Event Listeners', 'Local Storage State', 'Checkout Gateway'],
      decisions: [
        { title: 'Vanilla JS Architecture', description: 'Opted for zero frameworks to guarantee instant load times and minimize maintenance overhead for the client.' },
        { title: 'Local Storage Persistence', description: 'Persisted cart data locally so users do not lose their order if they accidentally navigate away.' }
      ],
      tradeoffs: [
        { title: 'Manual DOM Manipulation', description: 'Accepted the verbosity of manual DOM updates in exchange for zero dependency weight.' }
      ]
    },
    engineeringHighlights: [
      { title: 'Custom State Machine', description: 'Built a lightweight, predictable state manager pattern in plain JavaScript to handle the cart logic.' },
      { title: 'Performance Optimization', description: 'Achieved a perfect Lighthouse score by eliminating render-blocking resources and heavily optimizing assets.' }
    ],
    techStack: [
      { category: 'Frontend', items: ['HTML5', 'CSS3', 'Vanilla JavaScript'] },
      { category: 'Deployment', items: ['GitHub Pages'] },
      { category: 'Architecture', items: ['MPA', 'State Machine'] }
    ],
    keyFeatures: [
      { title: 'Fluid Ordering Flow', description: 'Seamless transitions between menu, cart, and checkout states.' },
      { title: 'Responsive Design', description: 'Mobile-first layout optimized for on-the-go ordering.' }
    ],
    results: {
      description: 'Delivered a lightning-fast, highly reliable ordering platform that meets the client\'s operational needs with zero ongoing infrastructure costs.',
      metrics: [
        { label: 'Lighthouse Score', value: '100/100' },
        { label: 'Bundle Size', value: '< 50KB' }
      ]
    },
    engineeringReflection: [
      'Building without frameworks is an excellent exercise in understanding the browser DOM API and event delegation.',
      'A well-structured CSS file is often vastly superior to utility classes for simple, bespoke designs.',
      'Performance is a feature; removing dependencies is the easiest way to make a site fast.'
    ]
  }
};
