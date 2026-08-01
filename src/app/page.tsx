import CinematicSequence from '@/components/CinematicSequence';
import PortfolioWrapper from '@/components/portfolio/PortfolioWrapper';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white relative">
      {/* Opening Scroll Experience */}
      <CinematicSequence />

      {/* Complete Redesigned Portfolio Experience */}
      <PortfolioWrapper />
    </main>
  );
}
