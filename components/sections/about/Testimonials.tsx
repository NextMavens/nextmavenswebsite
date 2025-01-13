'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechStart Inc.',
    image: '/testimonials/sarah.jpg',
    quote: 'NextMavens transformed our digital presence completely. Their innovative approach and attention to detail exceeded our expectations.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Marketing Director',
    company: 'Global Solutions',
    image: '/testimonials/michael.jpg',
    quote: 'Working with NextMavens was a game-changer for our business. Their team&apos;s expertise and dedication delivered outstanding results.'
  },
  {
    id: 3,
    name: 'Emma Williams',
    position: 'Founder',
    company: 'Creative Hub',
    image: '/testimonials/emma.jpg',
    quote: 'The level of professionalism and creativity at NextMavens is unmatched. They truly understand how to bring ideas to life.'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Client Testimonials
          </h2>
          
          <p className="text-white/60 text-lg mb-12 text-center">
            What our clients say about working with us
          </p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative z-10 p-8 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10">
                  <FaQuoteRight className="w-12 h-12 text-primary-purple/20 absolute top-8 right-8" />
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-white/80 text-lg mb-4 italic">
                        &quot;{testimonials[currentIndex].quote}&quot;
                      </p>
                      <h3 className="text-white font-semibold">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-primary-purple">
                        {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 
                  hover:text-white transition-all duration-300"
              >
                <FaChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 
                  hover:text-white transition-all duration-300"
              >
                <FaChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
