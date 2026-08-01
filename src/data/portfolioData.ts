export interface Project {
  id: string;
  title: string;
  category: 'Web Apps' | 'AI & ML' | '3D & Motion' | 'Mobile';
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  demoUrl: string;
  githubUrl: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  badge?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Alex Thorne",
    title: "Creative Technologist & Staff Engineer",
    tagline: "Bridging the gap between high-performance software engineering and cinematic visual art.",
    bio: "I specialize in building immersive web experiences, real-time 3D graphics, and resilient distributed systems. With 8+ years of experience across Silicon Valley startups and digital creative agencies, I turn complex problems into elegant, memorable software.",
    location: "San Francisco, CA / Remote",
    status: "Available for select opportunities & consulting",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    stats: [
      { label: "Years Experience", value: "8+" },
      { label: "Projects Shipped", value: "45+" },
      { label: "Awards & Features", value: "12" },
      { label: "Client Satisfaction", value: "100%" }
    ]
  },

  projects: [
    {
      id: "project-1",
      title: "Aura Motion 3D Engine",
      category: "3D & Motion",
      description: "A WebGL & WebGPU real-time rendering engine designed for interactive product configurators and particle simulations with zero frame drops.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["TypeScript", "Three.js", "WebGPU", "GSAP", "Tailwind CSS"],
      featured: true,
      demoUrl: "https://example.com/aura",
      githubUrl: "https://github.com/example/aura",
      metrics: "60 FPS on 98% devices"
    },
    {
      id: "project-2",
      title: "Synthetix AI Copilot",
      category: "AI & ML",
      description: "Enterprise multimodal AI platform for creative teams, automating asset generation, style transfer, and real-time design feedback.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      tags: ["Next.js", "Python", "PyTorch", "Tailwind CSS", "FastAPI"],
      featured: true,
      demoUrl: "https://example.com/synthetix",
      githubUrl: "https://github.com/example/synthetix",
      metrics: "4.2x Faster Workflow"
    },
    {
      id: "project-3",
      title: "Nexus High-Frequency Trading Platform",
      category: "Web Apps",
      description: "Ultra-low latency crypto & equities dashboard featuring real-time WebSocket feeds, interactive WebGL charting, and automated order execution.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
      tags: ["React", "TypeScript", "WebSockets", "Rust", "Chart.js"],
      featured: true,
      demoUrl: "https://example.com/nexus",
      githubUrl: "https://github.com/example/nexus",
      metrics: "< 5ms Socket Latency"
    },
    {
      id: "project-4",
      title: "Pulse Spatial Mobile",
      category: "Mobile",
      description: "Cross-platform augmented reality app enabling interior architects to visualize digital twin environments in real-time.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      tags: ["React Native", "ARKit", "Unity", "GraphQL"],
      featured: false,
      demoUrl: "https://example.com/pulse",
      githubUrl: "https://github.com/example/pulse",
      metrics: "150k+ Downloads"
    }
  ] as Project[],

  experiences: [
    {
      id: "exp-1",
      role: "Lead Creative Technologist",
      company: "Vortex Interactive Lab",
      period: "2023 — Present",
      location: "San Francisco, CA",
      description: [
        "Architected award-winning web applications and 3D product launches for Fortune 500 tech clients.",
        "Pioneered GPU-accelerated canvas rendering pipelines reducing load times by 65%.",
        "Mentored a cross-functional team of 12 engineers, designers, and 3D artists."
      ],
      technologies: ["Next.js", "Three.js", "GSAP", "TypeScript", "Tailwind CSS", "WebGPU"]
    },
    {
      id: "exp-2",
      role: "Senior Frontend & Motion Engineer",
      company: "Horizon Digital Studios",
      period: "2020 — 2023",
      location: "New York, NY (Remote)",
      description: [
        "Engineered smooth, scroll-driven interactive narratives and web platforms with sub-second page loads.",
        "Built a modular UI design system adopted by 5 product divisions.",
        "Optimized web performance across low-end mobile devices to achieve 98+ Lighthouse scores."
      ],
      technologies: ["React", "TypeScript", "GSAP", "Framer Motion", "WebGL", "GraphQL"]
    },
    {
      id: "exp-3",
      role: "Full Stack Engineer",
      company: "Lumina Labs",
      period: "2018 — 2020",
      location: "Austin, TX",
      description: [
        "Developed microservices backend APIs and real-time analytics dashboards.",
        "Integrated payments, authentication, and cloud infrastructure pipelines."
      ],
      technologies: ["Node.js", "React", "PostgreSQL", "Docker", "AWS"]
    }
  ] as Experience[],

  skills: [
    {
      category: "Creative Engineering & Motion",
      skills: [
        { name: "GSAP & ScrollTrigger", level: 95 },
        { name: "Three.js / WebGL / WebGPU", level: 90 },
        { name: "Lenis / Canvas Rendering", level: 95 },
        { name: "Framer Motion", level: 92 },
        { name: "Shader Programming (GLSL)", level: 85 }
      ]
    },
    {
      category: "Frontend Architecture",
      skills: [
        { name: "React & Next.js (App Router)", level: 98 },
        { name: "TypeScript", level: 96 },
        { name: "Tailwind CSS & Modern CSS", level: 95 },
        { name: "State Management (Zustand/Redux)", level: 90 },
        { name: "Performance Optimization", level: 95 }
      ]
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js & Express", level: 88 },
        { name: "Python / FastAPI", level: 85 },
        { name: "REST & GraphQL APIs", level: 92 },
        { name: "PostgreSQL & Redis", level: 86 },
        { name: "Docker & Cloud Deployments", level: 84 }
      ]
    }
  ] as SkillCategory[],

  achievements: [
    {
      id: "ach-1",
      title: "Site of the Day x3",
      organization: "Awwwards & FWA",
      date: "2024",
      description: "Recognized for excellence in digital design, interactive motion, and technical craftsmanship.",
      badge: "Awwwards"
    },
    {
      id: "ach-2",
      title: "Best Experimental Web App",
      organization: "Webby Awards",
      date: "2023",
      description: "Awarded for pioneering scroll-driven WebGL visual storytelling.",
      badge: "Webby"
    },
    {
      id: "ach-3",
      title: "Keynote Speaker: Web Motion & Performance",
      organization: "JSConf Global",
      date: "2023",
      description: "Delivered talk on achieving 60fps canvas animations in modern React applications.",
      badge: "Speaker"
    }
  ] as Achievement[]
};
