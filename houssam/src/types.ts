export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Full-Stack' | 'SaaS' | 'GenAI' | 'Creative';
  stats: { label: string; value: string }[];
  color: string;
  image: string;
  demoUrl: string;
  githubUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  tier: string;
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
  category: 'Frontend' | 'Backend' | 'DevOps & AI' | 'Tools';
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
}
