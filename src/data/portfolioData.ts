export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  filterCategories: ('AI' | 'Web' | 'Cloud' | '3D/GIS')[];
  tagline: string;
  summary: string;
  status: string;
  tags: string[];
  featured: boolean;
  visualType: 'resumecraft' | 'cloudlab' | 'sih3d' | 'skillsync' | 'hunarhub';
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  hasCaseStudy: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: string;
    linkedProjects: string[]; // Project IDs connected
  }[];
}

export interface TimelineItem {
  year: string;
  degree: string;
  institution: string;
  location?: string;
  status: 'completed' | 'current';
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  details: string;
  actionTag: string;
}

export interface AchievementItem {
  title: string;
  rank: string;
  category: string;
  year: string;
  description: string;
  badgeType: 'rank' | 'participant';
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Gautam Kumar',
    monogram: 'GK',
    title: 'Full-Stack Developer • Builder • Freelancer',
    subTitle: 'BCA Student @ Amity University',
    email: 'gautamkr192007@gmail.com',
    github: 'https://github.com/Gautam-kumar01',
    linkedin: 'https://www.linkedin.com/in/imgautam01',
    status: 'Available for freelance & product engineering',
    currentFocus: 'AI-powered platforms, Cloud environments & 3D GIS',
    heroHeading: 'I build digital products that solve real problems.',
    heroDescription:
      'Full-stack developer and BCA student building AI-powered products, cloud platforms and modern web experiences. Engineering practical software from idea to production.',
  },

  projects: [
    {
      id: 'resumecraft',
      number: '01',
      title: 'ResumeCraft',
      category: 'AI • Career • SaaS',
      filterCategories: ['AI', 'Web'],
      tagline: 'AI-powered resume builder & ATS optimizer',
      summary:
        'An AI-powered resume builder designed to help users create professional, ATS-friendly resumes quickly with modern templates and intelligent suggestions.',
      status: 'Working / Live Project',
      tags: ['React', 'Node.js', 'LLM / OpenAI API', 'Tailwind CSS', 'MongoDB'],
      featured: true,
      visualType: 'resumecraft',
      accentColor: '#00ff66',
      githubUrl: 'https://github.com',
      liveUrl: 'https://resumecraft.co.in',
      hasCaseStudy: true,
    },
    {
      id: 'cloudlab',
      number: '02',
      title: 'CloudLab',
      category: 'Cloud • Developer Tools',
      filterCategories: ['Cloud', 'Web'],
      tagline: 'Cloud development workspace & interactive terminal',
      summary:
        'A cloud development workspace focused on giving developers a modern environment to build, run and experiment with projects.',
      status: 'Working / Active Project',
      tags: ['React', 'Node.js', 'Docker', 'WebSockets', 'Server-side APIs'],
      featured: true,
      visualType: 'cloudlab',
      accentColor: '#3b82f6',
      githubUrl: 'https://github.com',
      liveUrl: 'https://cloudlab.preview',
      hasCaseStudy: true,
    },
    {
      id: 'sih-3d-ulpin',
      number: '03',
      title: 'SIH 2026 — 3D ULPIN',
      category: 'GIS • 3D • Spatial Technology',
      filterCategories: ['3D/GIS', 'Web'],
      tagline: '3D GIS property mapping & Cadastral terrain visualizer',
      summary:
        'A 3D property mapping platform focused on visualizing land/property information using spatial data and ULPIN concepts.',
      status: 'Working Project',
      tags: ['Three.js', 'PostgreSQL', 'GIS Spatial API', 'React', 'Python'],
      featured: true,
      visualType: 'sih3d',
      accentColor: '#10b981',
      githubUrl: 'https://github.com',
      liveUrl: 'https://ulpin-3d.preview',
      hasCaseStudy: true,
    },
    {
      id: 'skillsync',
      number: '04',
      title: 'SkillSync',
      category: 'AI • Career',
      filterCategories: ['AI', 'Web'],
      tagline: 'Automated skill gap analyzer & match engine',
      summary:
        'A resume and portfolio analysis concept that evaluates a candidate\'s profile and provides recommendations for improving their career opportunities.',
      status: 'Concept & Prototype',
      tags: ['Python', 'React', 'LLM Integrations', 'APIs'],
      featured: true,
      visualType: 'skillsync',
      accentColor: '#a855f7',
      githubUrl: 'https://github.com',
      hasCaseStudy: true,
    },
    {
      id: 'hunarhub',
      number: '05',
      title: 'HunarHub',
      category: 'Education • Community',
      filterCategories: ['Web'],
      tagline: 'Student talent showcase & peer collaboration hub',
      summary:
        'A student-focused platform concept for showcasing projects, achievements, badges, peer connections and internship opportunities.',
      status: 'Platform Concept & MVP',
      tags: ['JavaScript', 'HTML5/CSS', 'Node.js', 'MongoDB'],
      featured: true,
      visualType: 'hunarhub',
      accentColor: '#f59e0b',
      githubUrl: 'https://github.com',
      hasCaseStudy: true,
    },
  ] as ProjectItem[],

  processSteps: [
    {
      step: '01',
      title: 'IDEA',
      subtitle: 'Problem Discovery & Friction Analysis',
      details:
        'I begin by diagnosing genuine pain points rather than building for the sake of novelty. Defining the exact user friction dictates every downstream decision.',
      actionTag: 'Research & Scope',
    },
    {
      step: '02',
      title: 'DESIGN',
      subtitle: 'System Architecture & High-Contrast UX',
      details:
        'Creating the data models, system boundaries, and wireframing minimal, high-utility interfaces where content and clarity always come first.',
      actionTag: 'Wireframing & Schema',
    },
    {
      step: '03',
      title: 'BUILD',
      subtitle: 'Full-Stack Engineering & API Integration',
      details:
        'Writing modular, scalable code across modern frontend frameworks, backend microservices, resilient databases, and AI model orchestration.',
      actionTag: 'Core Development',
    },
    {
      step: '04',
      title: 'ITERATE',
      subtitle: 'Performance Tuning & Edge-Case Testing',
      details:
        'Benchmarking latency, refining 60fps animations, verifying responsive layouts on all viewports, and eliminating technical bottlenecks.',
      actionTag: 'Optimization & QA',
    },
    {
      step: '05',
      title: 'SHIP',
      subtitle: 'Cloud Deployment & Live Telemetry',
      details:
        'Deploying to production cloud environments, configuring CI/CD pipelines, and ensuring uninterrupted uptime for real-world users.',
      actionTag: 'Production Release',
    },
  ] as ProcessStep[],

  about: {
    statement:
      'Gautam Kumar is a full-stack developer, builder and BCA student focused on turning ideas into functional digital products.',
    details:
      'He works across modern web development, AI-powered applications, cloud-based platforms and data-driven experiences. Gautam approaches every project with a digital workshop philosophy: writing purposeful code, architecting clean databases, and shipping software that solves actual real-world friction.',
    corePrinciples: [
      { title: 'Product Over Theory', desc: 'Prioritizing working deployments over abstract designs.' },
      { title: 'Performance by Default', desc: 'Crafting lightweight, responsive, and high-FPS web systems.' },
      { title: 'Verified Execution', desc: 'Building with transparent architectures and real databases.' },
    ],
  },

  education: [
    {
      year: '2023',
      degree: '10th Standard — CBSE',
      institution: 'Bal Vidya Niketan School',
      location: 'Jehanabad, Bihar',
      status: 'completed',
      description: 'Foundational secondary education with strong analytical and scientific focus.',
    },
    {
      year: '2025',
      degree: '12th Standard — Higher Secondary',
      institution: 'Gandhi Memorial Inter College',
      location: 'Bihar',
      status: 'completed',
      description: 'Senior secondary curriculum focusing on computer science, mathematics, and logical foundations.',
    },
    {
      year: '2026 — Present',
      degree: 'Bachelor of Computer Applications (B.C.A)',
      institution: 'Amity University',
      location: 'Active Program',
      status: 'current',
      description: 'Undergraduate specialization in software development, cloud infrastructure, AI models, and database systems.',
    },
  ] as TimelineItem[],

  skillGroups: [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML5', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
        { name: 'CSS', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
        { name: 'JavaScript', linkedProjects: ['resumecraft', 'cloudlab', 'hunarhub'] },
        { name: 'React', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync'] },
        { name: 'Tailwind CSS', linkedProjects: ['resumecraft', 'skillsync'] },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', linkedProjects: ['resumecraft', 'cloudlab', 'hunarhub'] },
        { name: 'Python', linkedProjects: ['sih-3d-ulpin', 'skillsync'] },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'MongoDB', linkedProjects: ['resumecraft', 'hunarhub'] },
        { name: 'PostgreSQL', linkedProjects: ['sih-3d-ulpin'] },
      ],
    },
    {
      category: 'AI',
      skills: [
        { name: 'AI APIs / LLM integrations', linkedProjects: ['resumecraft', 'skillsync'] },
      ],
    },
    {
      category: 'Cloud / DevOps',
      skills: [
        { name: 'Cloud technologies', linkedProjects: ['cloudlab'] },
        { name: 'Git', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
        { name: 'GitHub', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
      ],
    },
    {
      category: 'Data / Analytics',
      skills: [
        { name: 'Power BI', linkedProjects: [] },
        { name: 'DAX', linkedProjects: [] },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
        { name: 'GitHub', linkedProjects: ['resumecraft', 'cloudlab', 'sih-3d-ulpin', 'skillsync', 'hunarhub'] },
      ],
    },
  ] as SkillCategory[],

  experience: {
    freelance: {
      title: 'Freelance Web Development',
      badge: 'Client & Solution Engineering',
      description:
        'Collaborating directly with founders, businesses, and creators to architect tailored web presences, SaaS MVPs, and responsive web applications with optimal SEO and loading speed.',
      points: [
        'Custom high-conversion websites and web apps',
        'Full-stack API development and database setup',
        'Performance optimization and modern UI design',
      ],
    },
    productBuilding: {
      title: 'Product Engineering & Innovation',
      badge: 'Independent Building',
      description:
        'Engineering standalone software platforms (ResumeCraft, CloudLab, 3D ULPIN) solving specific workflow bottlenecks with AI, cloud sandbox instances, and spatial visualizations.',
      points: [
        'End-to-end product design, development, and hosting',
        'Integrating Large Language Models and geospatial data',
        'Iterative development based on real user feedback',
      ],
    },
  },

  achievements: [
    {
      title: 'Smart India Hackathon (SIH) Internal Hackathon',
      rank: '3rd Rank',
      category: '3D GIS & Geospatial Innovation',
      year: '2026',
      description:
        'Awarded 3rd place for architecting the 3D ULPIN GIS parcel visualization system that mapped cadastral land boundaries onto realistic 3D elevation terrains.',
      badgeType: 'rank',
    },
    {
      title: 'Google Gen AI Hackathon',
      rank: 'Participated',
      category: 'Generative AI & LLM Systems',
      year: '2025',
      description:
        'Built an AI-driven workflow engine leveraging state-of-the-art Generative AI models for structured document generation and contextual analysis.',
      badgeType: 'participant',
    },
  ] as AchievementItem[],
};
