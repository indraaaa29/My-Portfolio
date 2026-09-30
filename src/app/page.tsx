

import Hero from '@/components/hero/Hero';
import { Navbar } from '@/components/navbar';

import SelectedWork from '@/components/portfolio/SelectedWork';
import AboutSection from '@/components/portfolio/AboutSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import LeadershipSection from '@/components/portfolio/LeadershipSection';
import LogoLoopSection from '@/components/portfolio/LogoLoopSection';
import AchievementsSection from '@/components/portfolio/AchievementsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import LineWavesBackground from '@/components/background/LineWavesBackground';

export default function Home() {
  return (
    <main className="relative w-full bg-background">
      <LineWavesBackground />

      <div className="relative z-10 flex flex-col">
        <Navbar />


        <div className="relative w-full z-0">
          <Hero />
        </div>

        <AboutSection />
        <ExperienceSection />
        <SkillsSection />

        <SelectedWork />

        <LeadershipSection />
        <LogoLoopSection />
        <AchievementsSection />

        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
