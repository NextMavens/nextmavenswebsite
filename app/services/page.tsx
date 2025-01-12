import ServicesHero from '@/components/sections/services/ServicesHero';
import ServicesList from '@/components/sections/services/ServicesList';
import ServiceProcess from '@/components/sections/services/ServiceProcess';
import ServicePricing from '@/components/sections/services/ServicePricing';
import ServiceFAQ from '@/components/sections/services/ServiceFAQ';
import ContactSection from '@/components/sections/ContactSection';

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <ServiceProcess />
      <ServicePricing />
      <ServiceFAQ />
      <ContactSection />
    </main>
  );
} 