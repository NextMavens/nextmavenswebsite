'use client';

import ContactHero from '@/components/sections/contact/ContactHero';

import ContactForm from '@/components/sections/contact/ContactForm';
import ContactInfo from '@/components/sections/contact/ContactInfo';
import ContactMap from '@/components/sections/contact/ContactMap';
import FAQ from '@/components/sections/contact/FAQ';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="relative bg-[#0f0428]">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactMap />
      <FAQ />
    </>
  );
} 