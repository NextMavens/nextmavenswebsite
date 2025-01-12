'use client';

import { motion } from 'framer-motion';
import AboutHero from '@/components/sections/about/AboutHero';
import OurStory from '@/components/sections/about/OurStory';
import MissionVision from '@/components/sections/about/MissionVision';
import OurValues from '@/components/sections/about/OurValues';
import Stats from '@/components/sections/about/Stats';
import Testimonials from '@/components/sections/about/Testimonials';
import Partners from '@/components/sections/about/Partners';
import OurTeam from '@/components/sections/about/OurTeam';
import OurLocation from '@/components/sections/about/OurLocation';
import ContactCTA from '@/components/sections/about/ContactCTA';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <OurValues />
      <Stats />
      <Testimonials />
      <Partners />
      <OurTeam />
      <OurLocation />
      <ContactCTA />
    </>
  );
} 