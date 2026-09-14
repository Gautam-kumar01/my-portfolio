export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  problem: string;
  approach: string;
  whatIBuilt: string[];
  architectureHighlights: { title: string; desc: string }[];
  technologies: string[];
  currentStatus: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  resumecraft: {
    id: 'resumecraft',
    title: 'ResumeCraft',
    subtitle: 'AI-Powered Resume Builder & ATS Scoring Engine',
    category: 'AI • Career • SaaS',
    accentColor: '#00ff66',
    githubUrl: 'https://github.com',
    liveUrl: 'https://resumecraft.co.in',
    problem:
      'Job candidates struggle to tailor their resumes to modern Applicant Tracking Systems (ATS), often failing keyword filtering and formatting parsers despite possessing strong qualifications.',
    approach:
      'Engineered a structured, real-time resume editor with integrated LLM prompts that analyze content against industry standard job descriptions, score ATS readability, and generate targeted bullet points with action verbs.',
    whatIBuilt: [
      'Interactive modular resume builder with live side-by-side preview',
      'AI prompt pipeline providing instant feedback and bullet point enhancement',
      'ATS score calculator assessing keyword density and section structure',
      'Clean PDF generation with standard typographic layout',
      'Secure MongoDB storage for user profiles and multi-version resume drafts',
    ],
    architectureHighlights: [
      {
        title: 'Real-Time State Sync',
        desc: 'React state engine with debounced persistence to avoid lag during rapid typing.',
      },
      {
        title: 'OpenAI Prompt Pipeline',
        desc: 'Structured JSON response formatting ensuring accurate ATS parsing recommendations.',
      },
      {
        title: 'Vector-Accurate Export',
        desc: 'Client-side PDF compilation ensuring sharp typography and selectable text for ATS bots.',
      },
    ],
    technologies: ['React', 'Node.js', 'LLM / OpenAI API', 'Tailwind CSS', 'MongoDB', 'Express'],
    currentStatus: 'Functional SaaS prototype with active feature development and live testing.',
  },

  cloudlab: {
    id: 'cloudlab',
    title: 'CloudLab',
    subtitle: 'Browser-Based Cloud Development Environment & Terminal',
    category: 'Cloud • Dev Env • Platform',
    accentColor: '#3b82f6',
    githubUrl: 'https://github.com',
    liveUrl: 'https://cloudlab.preview',
    problem:
      'Setting up local developer environments for students and beginner coders often leads to configuration headaches, dependency mismatches, and operating system incompatibilities.',
    approach:
      'Designed a lightweight cloud IDE accessible directly via modern browsers, connected via WebSockets to isolated backend execution environments with an interactive web terminal.',
    whatIBuilt: [
      'Interactive web terminal with command history and shell simulation',
      'In-browser code editor with syntax highlighting and file tree navigation',
      'Backend container orchestration routing commands securely',
      'Real-time WebSocket bridge ensuring low latency interactive feedback',
      'Pre-configured runtime environments for rapid project prototyping',
    ],
    architectureHighlights: [
      {
        title: 'WebSocket Terminal Bridge',
        desc: 'Bi-directional stream delivering sub-50ms keystroke echo and output rendering.',
      },
      {
        title: 'Virtual File System',
        desc: 'Memory-mapped file hierarchy supporting tree navigation, creation, and editing.',
      },
      {
        title: 'Isolated Execution',
        desc: 'Sandboxed process model preventing system-level privilege escalation.',
      },
    ],
    technologies: ['React', 'Node.js', 'Docker', 'WebSockets', 'REST APIs', 'CSS Custom Properties'],
    currentStatus: 'Core architecture and interactive terminal completed; sandbox optimizations ongoing.',
  },

  'sih-3d-ulpin': {
    id: 'sih-3d-ulpin',
    title: 'SIH 2026 — 3D ULPIN',
    subtitle: '3D GIS Unique Land Parcel Identification & Cadastral Mapping',
    category: '3D GIS • GovTech • Geospatial',
    accentColor: '#10b981',
    githubUrl: 'https://github.com',
    liveUrl: 'https://ulpin-3d.preview',
    problem:
      'Conventional 2D cadastral land parcel maps lack elevation and terrain context, making slope analysis, flood risk planning, and accurate boundary visualization difficult for government bodies and property owners.',
    approach:
      'Constructed a 3D GIS visualization engine that plots ULPIN (Unique Land Parcel Identification Number) polygon coordinates on 3D terrain meshes using Three.js and PostgreSQL spatial queries.',
    whatIBuilt: [
      '3D terrain mesh renderer with interactive orbit controls, parcel extrusions, and zoom',
      'ULPIN database lookup modal displaying ownership classification, area, and spatial coordinates',
      'Interactive layer toggles (cadastral boundary, satellite overlay, elevation contours)',
      'PostgreSQL database queries mapping spatial polygons to unique government identification codes',
      'Awarded 3rd Rank in the Smart India Hackathon Internal College Selection',
    ],
    architectureHighlights: [
      {
        title: 'Three.js Geospatial Projection',
        desc: 'Translating GPS coordinates and cadastral polygon vertices into 3D world space.',
      },
      {
        title: 'Spatial Parcel Indexing',
        desc: 'Fast bounding-box raycasting for clicking and inspecting specific land parcels.',
      },
      {
        title: 'Elevation Contours',
        desc: 'Dynamic height displacement based on topographic elevation data.',
      },
    ],
    technologies: ['Three.js', 'PostgreSQL', 'GIS Spatial APIs', 'React', 'Python', 'WebGL'],
    currentStatus: 'Award-winning hackathon platform (3rd Rank SIH Internal); working demonstration.',
  },

  skillsync: {
    id: 'skillsync',
    title: 'SkillSync',
    subtitle: 'Automated Skill Gap & Job Requirement Analysis Engine',
    category: 'Resume Analysis • AI • Career',
    accentColor: '#a855f7',
    githubUrl: 'https://github.com',
    problem:
      'Students and junior engineers often do not know which specific missing skills prevent them from qualifying for their target technology roles.',
    approach:
      'Built a parsing pipeline that compares user skill profiles against aggregated technical job descriptions to identify exact competency gaps and generate focused learning recommendations.',
    whatIBuilt: [
      'Skill extraction engine using natural language processing',
      'Role compatibility score visualizer with breakdown by competency domain',
      'Custom learning path recommendations based on identified gaps',
      'Interactive dashboard for tracking acquired skills over time',
    ],
    architectureHighlights: [
      {
        title: 'NLP Entity Extraction',
        desc: 'Categorizing technical keywords, frameworks, and database tools from raw text.',
      },
      {
        title: 'Gap Weighting Algorithm',
        desc: 'Prioritizing essential prerequisites versus nice-to-have supplementary tools.',
      },
    ],
    technologies: ['Python', 'React', 'LLM Integrations', 'REST APIs', 'Node.js'],
    currentStatus: 'Working prototype with ongoing algorithm refinements.',
  },

  hunarhub: {
    id: 'hunarhub',
    title: 'HunarHub',
    subtitle: 'Student Talent Showcase & Peer Collaboration Network',
    category: 'Students • Projects • Community',
    accentColor: '#f59e0b',
    githubUrl: 'https://github.com',
    problem:
      'College students frequently build impressive hackathon and course projects that remain hidden in GitHub repositories, making it hard to find peer collaborators or team members.',
    approach:
      'Created a focused project showcase community where university builders can publish their work, find hackathon teammates based on verified skills, and exchange technical feedback.',
    whatIBuilt: [
      'Project submission and showcase gallery with tags and live previews',
      'Student profile builder highlighting verified skills and active repositories',
      'Team discovery search filtering by tech stack and hackathon availability',
      'Discussion boards for technical problem solving and peer code reviews',
    ],
    architectureHighlights: [
      {
        title: 'Tag-Based Discovery',
        desc: 'Fast faceted search across student projects, skill domains, and collaboration status.',
      },
      {
        title: 'Responsive Grid Architecture',
        desc: 'High-density card system optimized for desktop portfolios and mobile browsing.',
      },
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS', 'Node.js', 'MongoDB'],
    currentStatus: 'Community platform MVP with active student project submissions.',
  },
};
