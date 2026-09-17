import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { SelectedWork } from './components/SelectedWork/SelectedWork';
import { HowIBuild } from './components/HowIBuild/HowIBuild';
import { About } from './components/About/About';
import { EducationTimeline } from './components/Education/EducationTimeline';
import { TechConstellation } from './components/Skills/TechConstellation';
import { Experience } from './components/Experience/Experience';
import { Achievements } from './components/Achievements/Achievements';
import { ContactCTA } from './components/ContactCTA/ContactCTA';
import { Footer } from './components/Footer/Footer';
import { CaseStudyModal } from './components/SelectedWork/CaseStudyModal';
import { CustomCursor } from './components/UI/CustomCursor';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { Toast } from './components/UI/Toast';

export function App() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [activeSkillHighlight, setActiveSkillHighlight] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleOpenCaseStudy = useCallback((projectId: string) => {
    setActiveCaseStudyId(projectId);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudyId(null);
  }, []);

  const handleShowToast = useCallback((message: string) => {
    setToastMsg(message);
    setTimeout(() => {
      setToastMsg(null);
    }, 3200);
  }, []);

  const handleContactClick = useCallback(() => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="portfolio-app-root bg-grid-pattern">
      {/* Accessible Skip To Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Fast Initial Loading Experience */}
      <LoadingScreen />

      {/* Custom Desktop Fluid Cursor */}
      <CustomCursor />

      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* 01: Sticky Navigation Bar */}
      <Navbar onContactClick={handleContactClick} />

      <main id="main-content">
        {/* 02: Hero Section & 3D Command Center */}
        <Hero
          onContactClick={handleContactClick}
          onShowToast={handleShowToast}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        <div className="cosmic-divider" />

        {/* 03: Projects Centerpiece (ResumeCraft, CloudLab, SIH 3D ULPIN, SkillSync, HunarHub) */}
        <SelectedWork
          onOpenCaseStudy={handleOpenCaseStudy}
          activeSkillHighlight={activeSkillHighlight}
        />

        <div className="cosmic-divider" />

        {/* 04: How I Build (01 Idea → 02 Design → 03 Build → 04 Iterate → 05 Ship) */}
        <HowIBuild />

        <div className="cosmic-divider" />

        {/* 09: About ("More than just code." - Story, 3D Education Timeline & Freelancing) */}
        <About onContactClick={handleContactClick} />

        {/* 10: Education Timeline (2023, 2025, 2026-Present Amity BCA) */}
        <EducationTimeline />

        <div className="cosmic-divider" />

        {/* 11: Skills / Technology Constellation */}
        <TechConstellation
          onSkillHover={setActiveSkillHighlight}
          onSelectProject={handleOpenCaseStudy}
        />

        <div className="cosmic-divider" />

        {/* 12: Experience ("From ideas to products.") */}
        <Experience
          onContactClick={handleContactClick}
          onSelectProject={handleOpenCaseStudy}
        />

        {/* 13: Achievements ("Built. Competed. Learned.") */}
        <Achievements />

        <div className="cosmic-divider" />

        {/* 14: Final CTA ("Have an idea? Let's build it.") */}
        <ContactCTA onShowToast={handleShowToast} />
      </main>

      {/* 15: Footer */}
      <Footer />

      {/* Interactive Case Study Fullscreen Modal */}
      <CaseStudyModal
        projectId={activeCaseStudyId}
        onClose={handleCloseCaseStudy}
      />

      {/* Global Interactive Action Toast */}
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
    </div>
  );
}

export default App;
