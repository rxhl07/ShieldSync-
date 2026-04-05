import HeroSection from '../components/landing/HeroSection';
import MiniGame from '../components/landing/MiniGame';
import Features from '../components/landing/Features';
import StatsAndCTA from '../components/landing/StatsAndCTA';

export default function Landing() {
  return (
    <div className="relative w-full">
      <div className="cyber-grid-global" />

      <MiniGame />
      <HeroSection />
      <Features />
      <StatsAndCTA />
    </div>
  );
}