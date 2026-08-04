export interface Project {
  id: string;
  title: string;
  category: 'Web Apps' | 'AI & ML' | '3D & Motion' | 'Mobile' | 'Cybersecurity';
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
    name: "Indranil Paul",
    title: "Engineer, Builder & AI Researcher",
    tagline: "Bridging the gap between intelligent systems, scalable web architecture, and secure infrastructure.",
    bio: "I am a third-year Computer Science (AI & ML) student who builds real products for real users. I specialize in full-stack web development, computer vision, and secure software practices. From engineering civic engagement platforms to researching AI, I solve problems by understanding the entire system architecture.",
    location: "Kolkata, India",
    status: "Available for select software engineering roles",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    stats: [
      { label: "Engineering Projects", value: "7+" },
      { label: "Hackathon Rank", value: "#185" },
      { label: "Community Reach", value: "500+" },
      { label: "Lines of Code", value: "100k+" }
    ]
  },

  projects: [] as Project[],

  experiences: [
    {
      id: "exp-1",
      role: "Google Student Ambassador (Gemini)",
      company: "West Bengal Connector",
      period: "Apr 2026 — Present",
      location: "Kolkata, India",
      description: [
        "Organized and led Gemini Product Trials, AI workshops, and campus engagement initiatives.",
        "Built and managed a campus Gemini community, increasing awareness of Google's AI ecosystem.",
        "Created AI-powered event concepts and educational content using Gemini, Nano Banana, Veo, and Lyria."
      ],
      technologies: ["Google Gemini", "Veo", "Lyria", "Community Leadership"]
    },
    {
      id: "exp-2",
      role: "Artificial Intelligence Intern",
      company: "Microsoft & SAP TechSaksham Initiative",
      period: "Jan 2025 — Feb 2025",
      location: "Remote",
      description: [
        "Completed a structured 4-week, end-to-end AI internship covering problem analysis, methodology design, and implementation.",
        "Contributed to the full project lifecycle — from defining problem statements to final delivery."
      ],
      technologies: ["Python", "Machine Learning", "Data Analysis", "AI Modelling"]
    },
    {
      id: "exp-3",
      role: "Cyber Security Intern",
      company: "Self / Independent (AICTE & VOIS)",
      period: "Jul 2025 — Present",
      location: "Remote",
      description: [
        "Studying ethical hacking, penetration testing, and AI-driven security techniques to build cybersecurity expertise.",
        "Developing practical skills in vulnerability assessment and system protection through hands-on learning."
      ],
      technologies: ["Ethical Hacking", "Penetration Testing", "Secure DevOps"]
    }
  ] as Experience[],

  skills: [
    {
      category: "Web Engineering",
      skills: [
        { name: "React & Next.js", level: 95 },
        { name: "TypeScript & JavaScript", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Node.js & Express", level: 85 },
        { name: "MongoDB & PostgreSQL", level: 80 }
      ]
    },
    {
      category: "AI & Machine Learning",
      skills: [
        { name: "Python", level: 90 },
        { name: "Computer Vision & OpenCV", level: 85 },
        { name: "Face Recognition", level: 85 },
        { name: "Applied ML Concepts", level: 80 },
        { name: "Google Gemini API", level: 88 }
      ]
    },
    {
      category: "Cloud & Cybersecurity",
      skills: [
        { name: "Google Cloud (GCP) & AWS", level: 80 },
        { name: "Secure DevOps", level: 75 },
        { name: "Ethical Hacking", level: 78 },
        { name: "Penetration Testing", level: 75 },
        { name: "C & C++", level: 85 }
      ]
    }
  ] as SkillCategory[],

  achievements: [
    {
      id: "ach-1",
      title: "Google Arcade Cohort 1 & Hands-On Challenges",
      organization: "Google Cloud",
      date: "2025",
      description: "Completed labs on Vertex AI, core GCP services, and cloud deployment. Recognized with official swag.",
      badge: "Google Cloud"
    },
    {
      id: "ach-2",
      title: "AI Infrastructure & Operations",
      organization: "NVIDIA",
      date: "Jan 2025",
      description: "Foundational certification on AI infrastructure and operations from NVIDIA.",
      badge: "NVIDIA"
    },
    {
      id: "ach-3",
      title: "GFG160 Coding Challenge",
      organization: "GeeksforGeeks",
      date: "2025",
      description: "Completed 160 curated DSA problems covering arrays, strings, recursion, trees, graphs, and DP.",
      badge: "DSA"
    },
    {
      id: "ach-4",
      title: "Advanced System Security Topics",
      organization: "University of Colorado",
      date: "2025",
      description: "Advanced certification covering modern system security and cryptography concepts.",
      badge: "Security"
    }
  ] as Achievement[]
};
