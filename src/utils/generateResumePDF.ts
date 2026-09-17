import { jsPDF } from 'jspdf';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/**
 * Generates an ATS-friendly, beautifully formatted, professional 1-page/2-page PDF resume
 * for Gautam Kumar using jsPDF with crisp vector typography, accent dividers, and clickable links.
 */
export function generateResumePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Palette
  const darkColor = [15, 23, 42]; // #0f172a (Deep Slate)
  const charcoalColor = [30, 41, 59]; // #1e293b
  const bodyColor = [51, 65, 85]; // #334155
  const mutedColor = [100, 116, 139]; // #64748b
  const accentGreen = [0, 150, 70]; // #009646
  const accentBlue = [14, 116, 144]; // #0e7490
  const lightBg = [248, 250, 252]; // #f8fafc

  let y = 16;

  // Helper: Section Header
  const renderSectionHeader = (title: string) => {
    // Check if near bottom
    if (y > pageHeight - 32) {
      doc.addPage();
      y = 16;
    }

    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.rect(margin, y - 4, contentWidth, 7.5, 'F');

    // Left accent bar
    doc.setFillColor(accentGreen[0], accentGreen[1], accentGreen[2]);
    doc.rect(margin, y - 4, 2.5, 7.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`${title.toUpperCase()}`, margin + 5, y + 1.2);

    y += 7.5;
  };

  // Helper: Bullet point with wrapping
  const renderBullet = (text: string, boldPrefix: string = '', indent = 4) => {
    if (y > pageHeight - 14) {
      doc.addPage();
      y = 16;
    }

    const startX = margin + indent;
    const textX = startX + 3.5;
    const maxTextWidth = contentWidth - indent - 3.5;

    // Bullet dot
    doc.setFillColor(accentGreen[0], accentGreen[1], accentGreen[2]);
    doc.circle(startX + 1, y - 1, 0.75, 'F');

    doc.setFontSize(8.5);

    if (boldPrefix) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
      const prefixWidth = doc.getTextWidth(boldPrefix + ' ');
      doc.text(boldPrefix + ' ', textX, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
      
      const fullText = boldPrefix + ' ' + text;
      const lines = doc.splitTextToSize(fullText, maxTextWidth);
      
      if (lines.length > 1) {
        // Render first line with offset or render normally
        const remainingTextLines = doc.splitTextToSize(text, maxTextWidth - prefixWidth);
        doc.text(remainingTextLines[0] || '', textX + prefixWidth, y);
        
        // Following lines full width
        if (remainingTextLines.length > 1) {
          const restOfLines = remainingTextLines.slice(1);
          for (let i = 0; i < restOfLines.length; i++) {
            y += 3.8;
            if (y > pageHeight - 12) {
              doc.addPage();
              y = 16;
            }
            doc.text(restOfLines[i], textX, y);
          }
        }
      } else {
        doc.text(text, textX + prefixWidth, y);
      }
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
      const lines = doc.splitTextToSize(text, maxTextWidth);
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) {
          y += 3.8;
          if (y > pageHeight - 12) {
            doc.addPage();
            y = 16;
          }
        }
        doc.text(lines[i], textX, y);
      }
    }
    y += 4.5;
  };

  // ==========================================
  // 1. HEADER SECTION
  // ==========================================
  // Header background subtle card
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, y - 5, contentWidth, 29, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y - 5, contentWidth, 29, 2, 2, 'S');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(PORTFOLIO_DATA.personal.name.toUpperCase(), margin + 5, y + 3);

  // Subtitle / Title badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
  doc.text('FULL-STACK DEVELOPER • SOFTWARE BUILDER • FREELANCE ENGINEER', margin + 5, y + 8.5);

  // Contact line with interactive links
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
  
  const contactText1 = `Email: ${PORTFOLIO_DATA.personal.email}  |  Location: India  |  Status: Open for Projects & Roles`;
  doc.text(contactText1, margin + 5, y + 14);

  const contactText2 = `GitHub: github.com/Gautam-kumar01   •   LinkedIn: linkedin.com/in/imgautam01   •   Portfolio: resumecraft.co.in`;
  doc.text(contactText2, margin + 5, y + 18.5);

  y += 28;

  // ==========================================
  // 2. PROFESSIONAL SUMMARY
  // ==========================================
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
  const summaryText =
    'Proactive Full-Stack Developer and BCA student at Amity University with a strong foundation in modern web engineering, AI integrations, cloud sandboxes, and spatial 3D systems. Proven track record of architecting and shipping standalone SaaS products (ResumeCraft, CloudLab), winning 3rd rank in Smart India Hackathon (SIH 2026), and delivering production-ready freelance solutions with high performance and clean code standards.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 4);
  doc.text(summaryLines, margin + 2, y);
  y += summaryLines.length * 4.2 + 2;

  // ==========================================
  // 3. CORE TECHNICAL SKILLS MATRIX
  // ==========================================
  renderSectionHeader('Technical Skills Matrix');
  
  const skillsList = [
    { cat: 'Frontend Engineering', items: 'React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design, Three.js WebGL' },
    { cat: 'Backend & Cloud', items: 'Node.js, Express, Python, RESTful APIs, WebSockets, Docker, Cloud Sandbox Environments, Linux / Bash' },
    { cat: 'Databases & Storage', items: 'PostgreSQL, MongoDB, Relational Schema Design, NoSQL Collections, Indexing & Spatial Data' },
    { cat: 'AI & Machine Learning', items: 'OpenAI API, Google Gemini API, LLM Integrations, Prompt Engineering, ATS Resume Scoring Models' },
    { cat: 'DevOps & Tooling', items: 'Git, GitHub, CI/CD, Vite, Postman, Power BI, DAX, NPM/PNPM Package Management' },
  ];

  skillsList.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
    const catLabel = `${sk.cat}: `;
    doc.text(catLabel, margin + 2, y);
    const catWidth = doc.getTextWidth(catLabel);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
    const itemLines = doc.splitTextToSize(sk.items, contentWidth - catWidth - 4);
    doc.text(itemLines[0], margin + 2 + catWidth, y);

    if (itemLines.length > 1) {
      for (let i = 1; i < itemLines.length; i++) {
        y += 3.8;
        doc.text(itemLines[i], margin + 6, y);
      }
    }
    y += 4.5;
  });

  y += 1.5;

  // ==========================================
  // 4. FEATURED PRODUCTS & ENGINEERING PROJECTS
  // ==========================================
  renderSectionHeader('Key Software Projects & Products');

  // Project 1: ResumeCraft
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('ResumeCraft — AI-Powered Resume Builder & ATS Scoring Engine', margin + 2, y);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
  doc.text('Live: https://resumecraft.co.in', pageWidth - margin - doc.getTextWidth('Live: https://resumecraft.co.in') - 2, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Tech Stack: React, Node.js, OpenAI LLM API, MongoDB, Tailwind CSS, Express', margin + 2, y);
  y += 4.2;

  renderBullet('Engineered a production-ready AI resume builder featuring real-time side-by-side template preview and instant ATS keyword matching.', 'Live SaaS:');
  renderBullet('Integrated LLM scoring prompts that evaluate resumes against industry job descriptions to provide automated actionable feedback.', 'AI Engine:');
  renderBullet('Implemented secure MongoDB storage for persistent multi-draft user profiles and exported clean, compliant PDF resumes.', 'Backend & Data:');
  y += 1;

  // Project 2: SIH 2026 3D ULPIN
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('SIH 2026 — 3D ULPIN (Geospatial Cadastral Elevation Visualizer)', margin + 2, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(accentBlue[0], accentBlue[1], accentBlue[2]);
  doc.text('3rd Rank Winner | Hackathon', pageWidth - margin - doc.getTextWidth('3rd Rank Winner | Hackathon') - 2, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Tech Stack: Three.js WebGL, PostgreSQL / PostGIS, GIS Spatial API, React, Python', margin + 2, y);
  y += 4.2;

  renderBullet('Developed an interactive 3D geospatial engine rendering Unique Land Parcel Identification Numbers (ULPIN) over 3D terrain elevation meshes.', 'Spatial 3D:');
  renderBullet('Built spatial SQL queries in PostgreSQL to verify boundary coordinates and eliminate spatial overlap discrepancies in real time.', 'GIS Querying:');
  y += 1;

  // Project 3: CloudLab
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('CloudLab — Browser-Based Cloud Sandbox & Interactive Terminal', margin + 2, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Tech Stack: React, Node.js, Docker, WebSockets, REST APIs', margin + 2, y);
  y += 4.2;

  renderBullet('Architected a live cloud workspace enabling instant project execution and code experiments in isolated sandbox environments.', 'Cloud Workspace:');
  renderBullet('Implemented low-latency bi-directional WebSocket channels for responsive browser-to-container terminal streaming.', 'Real-Time WebSockets:');
  y += 1;

  // Project 4: SkillSync
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('SkillSync — Automated Skill Gap & Candidate Match Engine', margin + 2, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Tech Stack: Python, React, LLM Integrations, REST APIs', margin + 2, y);
  y += 4.2;

  renderBullet('Constructed an automated candidate skill assessment tool that benchmarks applicant competencies against current job market matrices.', 'Skill Analysis:');
  y += 2;

  // ==========================================
  // 5. EXPERIENCE & FREELANCING
  // ==========================================
  renderSectionHeader('Professional Experience & Freelancing');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('Freelance Full-Stack Developer & Solution Engineer', margin + 2, y);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
  doc.text('2024 — Present', pageWidth - margin - doc.getTextWidth('2024 — Present') - 2, y);
  y += 4;

  renderBullet('Delivered custom web applications, high-converting digital landing pages, and full-stack solutions for founders and business clients.', 'Client Solutions:');
  renderBullet('Engineered robust REST APIs, configured secure database architectures (MongoDB/PostgreSQL), and integrated third-party AI APIs.', 'Full-Stack Delivery:');
  renderBullet('Ensured 60 FPS UI performance, responsive mobile layout compatibility, and rapid MVP turnarounds within 48-72 hours.', 'Quality & Speed:');
  y += 2;

  // ==========================================
  // 6. EDUCATION & ACADEMIC BACKGROUND
  // ==========================================
  renderSectionHeader('Education');

  const educationList = [
    {
      degree: 'Bachelor of Computer Applications (B.C.A)',
      institution: 'Amity University',
      duration: '2026 — Present (Active)',
      details: 'Specializing in Software Development, Cloud Computing, AI Architectures, and Database Systems.',
    },
    {
      degree: '12th Standard — Higher Secondary (Science & Computer)',
      institution: 'Gandhi Memorial Inter College, Bihar',
      duration: 'Completed 2025',
      details: 'Focus on Computer Science, Mathematics, and Analytical Problem Solving.',
    },
    {
      degree: '10th Standard — Secondary School Examination (CBSE)',
      institution: 'Bal Vidya Niketan School, Jehanabad, Bihar',
      duration: 'Completed 2023',
      details: 'Foundational academic training with strong emphasis on mathematics and science.',
    },
  ];

  educationList.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(edu.degree, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(edu.duration, pageWidth - margin - doc.getTextWidth(edu.duration) - 2, y);
    y += 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
    doc.text(edu.institution, margin + 2, y);
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(bodyColor[0], bodyColor[1], bodyColor[2]);
    doc.text(`• ${edu.details}`, margin + 4, y);
    y += 4.5;
  });

  y += 1;

  // ==========================================
  // 7. HONORS & HACKATHON ACCOLADES
  // ==========================================
  renderSectionHeader('Honors & Hackathon Accolades');
  
  renderBullet('Smart India Hackathon (SIH) Internal Hackathon — 3rd Rank Winner for 3D ULPIN GIS Elevation visualizer.', 'Award:');
  renderBullet('Google Gen AI Hackathon — Built generative AI workflow engine for structured document extraction.', 'Participant:');

  // Footer note on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 8, pageWidth - margin, pageHeight - 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(`Gautam Kumar — Full-Stack Developer Resume  |  Verified & Generated Live`, margin, pageHeight - 4.5);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - doc.getTextWidth(`Page ${i} of ${totalPages}`), pageHeight - 4.5);
  }

  // Save the PDF
  doc.save('Gautam_Kumar_Resume.pdf');
}
