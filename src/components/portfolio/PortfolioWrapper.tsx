'use client';

import Navbar from './Navbar';
import TransitionDivider from './TransitionDivider';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import AchievementsSection from './AchievementsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function PortfolioWrapper() {
  return (
    <div className="relative z-20 w-full bg-zinc-950 text-white min-h-screen">
      <Navbar />
      <TransitionDivider />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
