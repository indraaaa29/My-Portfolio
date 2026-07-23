export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React / Next.js', category: 'Frontend', level: 5, icon: '⚛️' },
      { name: 'TypeScript', category: 'Frontend', level: 5, icon: '📘' },
      { name: 'Tailwind CSS', category: 'Frontend', level: 4, icon: '🎨' },
      { name: 'Framer Motion', category: 'Frontend', level: 4, icon: '✨' },
      { name: 'React Native', category: 'Frontend', level: 3, icon: '📱' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', category: 'Backend', level: 5, icon: '🟢' },
      { name: 'Python', category: 'Backend', level: 4, icon: '🐍' },
      { name: 'Go', category: 'Backend', level: 3, icon: '🔵' },
      { name: 'Rust', category: 'Backend', level: 3, icon: '🦀' },
      { name: 'PostgreSQL', category: 'Backend', level: 5, icon: '🐘' },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', category: 'DevOps', level: 5, icon: '🐳' },
      { name: 'Kubernetes', category: 'DevOps', level: 4, icon: '☸️' },
      { name: 'AWS', category: 'DevOps', level: 4, icon: '☁️' },
      { name: 'Terraform', category: 'DevOps', level: 3, icon: '🏗️' },
      { name: 'CI/CD', category: 'DevOps', level: 4, icon: '🔄' },
    ],
  },
  {
    name: 'AI/ML',
    skills: [
      { name: 'LangChain', category: 'AI/ML', level: 4, icon: '🔗' },
      { name: 'OpenAI API', category: 'AI/ML', level: 4, icon: '🤖' },
      { name: 'RAG Pipelines', category: 'AI/ML', level: 4, icon: '📚' },
      { name: 'Vector Databases', category: 'AI/ML', level: 3, icon: '🔍' },
      { name: 'Fine-tuning', category: 'AI/ML', level: 3, icon: '🎯' },
    ],
  },
];

export const allSkills = skillCategories.flatMap(c => c.skills);

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'project';
}

export const timeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Senior Full Stack Engineer',
    description: 'Led the architecture and development of the SynthAI platform, serving 3 enterprise clients.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'AI Integration Specialist',
    description: 'Designed and deployed RAG pipelines for document processing at scale. Reduced processing time by 85%.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    description: 'Built real-time DevOps observability platform. Reduced MTTR by 40% across 12 engineering teams.',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Open Source Contributor',
    description: 'Contributed to React ecosystem projects. Built Campaign Crafter mobile app with 500+ beta users.',
    type: 'project',
  },
  {
    year: '2020',
    title: 'Computer Science Degree',
    description: 'Graduated with focus on distributed systems and machine learning.',
    type: 'education',
  },
];

export interface Metric {
  value: string;
  label: string;
  suffix: string;
}

export const metrics: Metric[] = [
  { value: '50', label: 'Projects Delivered', suffix: '+' },
  { value: '97', label: 'Code Quality Score', suffix: '%' },
  { value: '85', label: 'Efficiency Improved', suffix: '%' },
  { value: '12', label: 'Enterprise Clients', suffix: '+' },
];
