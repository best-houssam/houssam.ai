import { Project, Service, Skill, Testimonial, FaqItem, ProcessStep } from './types';

export const projects: Project[] = [
  {
    id: 'aether-saas',
    title: 'AetherSaaS',
    subtitle: 'Next-Gen AI Business Intelligence Platform',
    description: 'A premium full-stack SaaS orchestrating real-time streams, vector database search, and visual analytics dashboards with responsive visual pipelines.',
    longDescription: 'AetherSaaS is an award-winning business intelligence pipeline. It leverages serverless event streams to aggregate real-time metrics, feeds them through an ultra-fast vector indexing database, and displays beautiful, high-density charts with near-zero latency. Built for high-frequency trading data, it supports custom automated actions and deep security logs.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind v4', 'FastAPI'],
    category: 'SaaS',
    stats: [
      { label: 'Latency', value: '< 24ms' },
      { label: 'Data Processing', value: '4.2M/sec' },
      { label: 'Uptime', value: '99.99%' }
    ],
    color: 'from-amber-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#demo'
  },
  {
    id: 'kroma-labs',
    title: 'KromaLabs',
    subtitle: 'Creative WebGL Asset Workspace',
    description: 'A multi-user design environment and physics canvas facilitating rapid prototyping, state synchronization, and custom asset pipelines.',
    longDescription: 'KromaLabs redefines real-time creative collaboration. Featuring custom canvas integration and dynamic fluid dynamics simulated in shaders, teams can co-create vector templates, generate visual assets via integrated models, and export optimized SVGs. It features custom undo-redo stacks and ultra-smooth state synchronization.',
    tags: ['React', 'WebGL', 'TypeScript', 'WebSockets', 'Tailwind'],
    category: 'Creative',
    stats: [
      { label: 'FPS Performance', value: '120 FPS' },
      { label: 'Sync Delay', value: '< 12ms' },
      { label: 'User Capacity', value: '10k+ concurrent' }
    ],
    color: 'from-violet-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#demo'
  },
  {
    id: 'lexicon-ai',
    title: 'LexiconAI',
    subtitle: 'Autonomous Agent Orchestration Pipeline',
    description: 'A serverless pipeline for deploying, monitoring, and debugging multi-agent LLM systems with autonomous self-healing execution logs.',
    longDescription: 'LexiconAI offers an intuitive, professional gateway into multi-agent operations. Teams can define custom agents, connect them to Live APIs and calendars, and watch them execute complex tasks autonomously. The system displays live log trees, evaluates agent reliability, and provides fallback human-in-the-loop triggers.',
    tags: ['Express', 'Gemini API', 'TypeScript', 'Redis', 'Docker'],
    category: 'GenAI',
    stats: [
      { label: 'Agent Deploy Time', value: '< 2sec' },
      { label: 'Token Efficiency', value: '+42%' },
      { label: 'Task Success Rate', value: '98.4%' }
    ],
    color: 'from-cyan-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#demo'
  },
  {
    id: 'veloce-pay',
    title: 'VelocePay',
    subtitle: 'High-Speed Luxury Fintech Framework',
    description: 'A high-performance payment orchestration engine resolving complex multi-region billing paths with bank-grade security standards.',
    longDescription: 'VelocePay powers digital merchants across the globe. Built from the ground up with low-latency in mind, the platform bridges multi-region clearinghouses, routes transactions dynamically to optimize costs, and provides interactive, secure developer dashboards that render live global transaction maps.',
    tags: ['React', 'NestJS', 'PostgreSQL', 'Stripe API', 'D3.js'],
    category: 'Full-Stack',
    stats: [
      { label: 'Security Standard', value: 'PCI-DSS L1' },
      { label: 'Avg Route Speed', value: '85ms' },
      { label: 'Processed Volume', value: '$240M+' }
    ],
    color: 'from-emerald-400 to-teal-600',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#demo'
  }
];

export const services: Service[] = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Engineering',
    description: 'Developing heavy-duty, state-of-the-art web architectures from lightning-fast APIs to highly secure database infrastructures.',
    iconName: 'Cpu',
    features: [
      'High-throughput server entry points (Node/Express/Nest)',
      'Robust relational & vector databases (Postgres, Redis)',
      'Durable, scalable microservices and Docker containers',
      'Advanced caching and state synchronization pipelines'
    ],
    tier: 'Premium Core',
    color: 'from-amber-500/20 to-amber-600/5'
  },
  {
    id: 'creative-frontend',
    title: 'Creative Frontend & UI/UX',
    description: 'Crafting immersive interactive interfaces that move seamlessly. Turning designs into responsive, high-performance visual journeys.',
    iconName: 'Sparkles',
    features: [
      'Stunning, award-winning CSS & tailwind-driven styling',
      'Complex animations, canvas effects, and state motion',
      'Fluid page and module transitions using Framer Motion',
      'Responsive desktop-first and mobile-perfect density'
    ],
    tier: 'Signature Art',
    color: 'from-violet-500/20 to-violet-600/5'
  },
  {
    id: 'genai-integrations',
    title: 'GenAI & Agent Systems',
    description: 'Integrating state-of-the-art Large Language Models and autonomous workflows into software to solve business problems.',
    iconName: 'Brain',
    features: [
      'Semantic search structures and vector embeddings',
      'Custom Gemini API agent execution and tooling',
      'Context-aware chat, summary, and translation pipelines',
      'Server-side API proxying keeping keys fully protected'
    ],
    tier: 'Advanced Tech',
    color: 'from-cyan-500/20 to-cyan-600/5'
  },
  {
    id: 'saas-architecture',
    title: 'SaaS & Performance Optimization',
    description: 'Optimizing and scaling web software for low-latency responses, maximum security, and pristine Lighthouse scores.',
    iconName: 'Zap',
    features: [
      'Rigorous Web Core Vitals audits and code-splitting',
      'Subscription billing and secure user-management flows',
      'Automated CI/CD deploy channels to Cloud Run',
      'Search Engine Optimization and digital asset tuning'
    ],
    tier: 'Elite Operations',
    color: 'from-emerald-500/20 to-emerald-600/5'
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React / Next.js', level: 98, iconName: 'Layers', category: 'Frontend', description: 'Advanced rendering optimization, hooks, lazy state, hydration.' },
  { name: 'TypeScript', level: 96, iconName: 'Code', category: 'Frontend', description: 'Strict typing, advanced generic interfaces, utility signatures.' },
  { name: 'Tailwind CSS v4', level: 99, iconName: 'Wind', category: 'Frontend', description: 'Fluid design systems, bespoke themes, custom @layer components.' },
  { name: 'Motion Design', level: 94, iconName: 'Flame', category: 'Frontend', description: 'Scroll-driven motion, fluid layout transitions, micro-interactions.' },

  // Backend
  { name: 'Node.js / Express', level: 95, iconName: 'Terminal', category: 'Backend', description: 'Custom server setups, middleware architectures, high concurrency.' },
  { name: 'PostgreSQL / SQL', level: 90, iconName: 'Database', category: 'Backend', description: 'Optimized querying, indexing strategy, relational database schemes.' },
  { name: 'Redis / caching', level: 88, iconName: 'Zap', category: 'Backend', description: 'Memory caching store, low-latency queues, session managers.' },
  { name: 'GraphQL / REST APIs', level: 93, iconName: 'GitBranch', category: 'Backend', description: 'Structured response designs, secure token routes, performance schemas.' },

  // DevOps & AI
  { name: 'Docker / Containers', level: 86, iconName: 'Server', category: 'DevOps & AI', description: 'Containerized deployment packages, isolated runtime contexts.' },
  { name: 'Google Cloud Platform', level: 88, iconName: 'Cloud', category: 'DevOps & AI', description: 'Cloud Run pipelines, Cloud SQL configurations, serverless setup.' },
  { name: 'Gemini AI SDK', level: 92, iconName: 'Sparkles', category: 'DevOps & AI', description: 'Server-side LLM proxies, structured agent flows, embeddings.' },
  { name: 'CI/CD Pipelines', level: 89, iconName: 'Cpu', category: 'DevOps & AI', description: 'Automated test suite runners, seamless artifact deliveries.' }
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Deep Discovery',
    subtitle: 'Exploring Intent & Strategy',
    description: 'We align deeply with your strategic vision, identifying target benchmarks, technical scope, and ideal aesthetic styles to forge a solid roadmap.',
    metrics: 'Scope Defined within 48h'
  },
  {
    step: '02',
    title: 'Architectural Blueprint',
    subtitle: 'System & UI Layout Crafting',
    description: 'We map clean database schematics, design immersive visual mockups, and layout the interactive motion paths. No code is written blindly.',
    metrics: '99% Pre-code Alignment'
  },
  {
    step: '03',
    title: 'Code Synthesis',
    subtitle: 'High-Performance Engineering',
    description: 'We code the interfaces and backend systems in strict TypeScript and Tailwind, ensuring absolute modularity, zero dead code, and fast performance.',
    metrics: '100% Type-Safe Structure'
  },
  {
    step: '04',
    title: 'Vibe & Quality Audits',
    subtitle: 'Micro-Interactions & Speed Tuning',
    description: 'We run intensive tests checking Web Vitals, browser consistency, and interaction aesthetics. We polish every hover curve, load lag, and touch size.',
    metrics: '95+ Lighthouse Score'
  },
  {
    step: '05',
    title: 'Seamless Launch',
    subtitle: 'Global Deploy & Handover',
    description: 'Deploying securely to highly reliable edge hosting or Cloud Run with clean environment setups, complete with documentation and support.',
    metrics: 'Zero-Downtime Deployment'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Venture Architect',
    company: 'Nexus Ventures',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    content: 'Houssam is not just a software engineer. He is a technical visionary. He completely rebuilt our SaaS dashboard. The speed increased by 300%, and the aesthetic fidelity alone helped us secure our Series-A funding round.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Marcus Kael',
    role: 'Product Director',
    company: 'Synergy Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    content: 'The motion design combined with raw backend reliability that Houssam delivers is incredibly rare. He understands luxury branding and raw computer science in equal measure. A true world-class developer.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Sofia Rodriguez',
    role: 'CTO',
    company: 'Fintech Flow',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    content: 'Our payment pipelines require absolute security and zero downtime. Houssam delivered an elegant microservices backend that handles millions in processing with bulletproof logging. Highly recommended.',
    rating: 5
  }
];

export const faqs: FaqItem[] = [
  {
    question: 'How do you balance high-end animations with rapid website load speeds?',
    answer: 'We optimize assets meticulously, implement lazy-loading modules, configure code-splitting, and use Framer Motion selectively with CSS transform-based hardware acceleration. The result is a fluid, 120 FPS experience that still scores 95+ on Google Lighthouse audits.'
  },
  {
    question: 'Do you work with international clients and remote teams?',
    answer: 'Yes, absolutely. I work with premium agencies, startups, and enterprises globally across different timezones. I maintain a high-frequency communications schedule with transparent progress updates via Slack, Loom, and GitHub.'
  },
  {
    question: 'What is your preferred full-stack engineering stack?',
    answer: 'I specialize in the TypeScript ecosystem. For the frontend, I utilize React, Next.js, and Tailwind CSS. For backends, I prefer Node.js, Express, NestJS, and Python (FastAPI). For databases, I rely on PostgreSQL and Redis, containerized cleanly inside Docker.'
  },
  {
    question: 'How do you structure your projects for future scaling?',
    answer: 'Every project is structured following strict clean-code and modular architectural rules: clear separation between UI, business logic, and API states; strict type definitions; exhaustive environment validation; and complete testing suites.'
  }
];
