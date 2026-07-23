export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  thinking: string;
  solution: string;
  techStack: string[];
  architecture: string;
  impact: string;
  lessons: string[];
  image: string;
  category: 'ai' | 'fullstack' | 'software';
  featured: boolean;
  links: {
    github?: string;
    live?: string;
    caseStudy?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'ai-platform',
    title: 'SynthAI Platform',
    subtitle: 'Intelligent automation at scale',
    description: 'A full-stack AI platform that leverages large language models to automate complex document processing workflows.',
    problem: 'Enterprises were spending thousands of hours manually processing invoices, contracts, and reports. Existing OCR solutions lacked contextual understanding.',
    thinking: 'Instead of building a generic document parser, I designed a multi-agent system where specialized AI agents handle different document types, each trained on domain-specific patterns.',
    solution: 'Built a microservices architecture with a React frontend, Python ML backend, and a custom RAG pipeline that processes documents with 97% accuracy.',
    techStack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'Redis', 'Docker', 'AWS'],
    architecture: 'Frontend sends documents via WebSocket to an orchestrator service. The orchestrator routes to specialized agent services (invoice, contract, report). Each agent uses a RAG pipeline against domain-specific vector stores. Results are streamed back in real-time.',
    impact: 'Reduced document processing time by 85%. Processed 50,000+ documents in the first quarter. Used by 3 enterprise clients.',
    lessons: [
      'Streaming responses were critical for user trust',
      'Domain-specific agents significantly outperformed a single general model',
      'Caching embeddings reduced latency by 60%'
    ],
    image: '/projects/ai-platform.jpg',
    category: 'ai',
    featured: true,
    links: {
      github: 'https://github.com/indranilpaul',
      live: 'https://synthai.example.com',
    }
  },
  {
    id: 'devops-dashboard',
    title: 'Pipeline Commander',
    subtitle: 'Real-time DevOps observability',
    description: 'A real-time CI/CD monitoring dashboard that aggregates pipelines across GitHub Actions, GitLab CI, and Jenkins.',
    problem: 'Engineering teams were context-switching across multiple CI/CD platforms. No single pane of glass for deployment health.',
    thinking: 'Rather than building yet another dashboard, I focused on the developer experience — making failed pipelines instantly actionable with one-click rollbacks and root-cause suggestions.',
    solution: 'Built with Next.js and Server-Sent Events for real-time updates. Used a plugin architecture for different CI providers.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    architecture: 'Event-driven architecture using Redis pub/sub. Each CI provider has a connector service that normalizes webhook events. Frontend subscribes to SSE streams filtered by team and project.',
    impact: 'Reduced mean-time-to-recovery (MTTR) by 40%. Used by 12 engineering teams internally.',
    lessons: [
      'SSE was more reliable than WebSockets for this use case',
      'Plugin architecture made adding new CI providers trivial',
      'Real-time filtering at the backend reduced frontend complexity'
    ],
    image: '/projects/devops-dashboard.jpg',
    category: 'fullstack',
    featured: false,
    links: {
      github: 'https://github.com/indranilpaul',
    }
  },
  {
    id: 'mobile-app',
    title: 'Campaign Crafter',
    subtitle: 'Mobile-first marketing automation',
    description: 'A cross-platform mobile app for creating and managing social media marketing campaigns with AI-powered content suggestions.',
    problem: 'Small businesses lacked affordable tools for creating professional social media campaigns. Existing tools were either too expensive or too complex.',
    thinking: 'The key insight was to make campaign creation feel like composing a story — the AI assists with content, but the user stays in creative control.',
    solution: 'React Native app with a Node.js backend. Integrated GPT-4 for content suggestions and a drag-and-drop campaign builder.',
    techStack: ['React Native', 'Node.js', 'Express', 'MongoDB', 'OpenAI', 'Firebase'],
    architecture: 'Mobile app communicates with a REST API. Campaign drafts are stored locally using WatermelonDB for offline support. AI content generation is async with polling for results.',
    impact: 'Launched with 500+ beta users. Average campaign creation time reduced from 2 hours to 15 minutes.',
    lessons: [
      'Offline-first was essential for mobile reliability',
      'AI suggestions need to feel helpful, not intrusive',
      'Drag-and-drop required careful gesture handling on mobile'
    ],
    image: '/projects/mobile-app.jpg',
    category: 'fullstack',
    featured: false,
    links: {
      github: 'https://github.com/indranilpaul',
      live: 'https://campaigncrafter.example.com',
    }
  },
  {
    id: 'data-pipeline',
    title: 'StreamWeaver',
    subtitle: 'Real-time data processing at scale',
    description: 'A distributed streaming data pipeline that processes millions of events per second with sub-second latency.',
    problem: 'The existing batch processing system had 4+ hour latency. Real-time decisions required sub-second data.',
    thinking: 'Inspired by Kafka Streams and Apache Flink, I designed a lightweight stream processing framework optimized for the specific data patterns we handled.',
    solution: 'Built on Kafka with custom stream processors. Used Rust for performance-critical transformations and Go for the orchestration layer.',
    techStack: ['Rust', 'Go', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Terraform', 'AWS'],
    architecture: 'Data flows through Kafka topics. Stream processors (Rust) transform and enrich data. Orchestrator (Go) manages processor topology and scaling. Processed data is written to PostgreSQL and Redis for serving.',
    impact: 'Reduced data latency from 4 hours to under 500ms. Scaled to 5M+ events/second. Saved $200K/year in infrastructure costs.',
    lessons: [
      'Rust\'s memory safety was invaluable for stream processing reliability',
      'Backpressure handling was the hardest design challenge',
      'Auto-scaling stream processors required careful state management'
    ],
    image: '/projects/data-pipeline.jpg',
    category: 'software',
    featured: false,
    links: {
      github: 'https://github.com/indranilpaul',
    }
  }
];

export const featuredProject = projects.find(p => p.featured) || projects[0];
