import HeroSection from '@/components/sections/HeroSection';
import SubHeroSection from '@/components/sections/SubHeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SubHeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
      {/* Other sections */}
    </main>
  );
} 