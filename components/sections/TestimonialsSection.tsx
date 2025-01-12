'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Amara Wanjiku',
    role: 'Creative Director',
    company: 'Design Hub Africa',
    image: '/assets/feedback-profiles/p1.jpg',
    content: 'Next Mavens brought our African design vision to life with exceptional creativity. Their understanding of both modern trends and cultural elements made our brand truly stand out.',
    rating: 5
  },
  {
    id: '2',
    name: 'Jamal Odhiambo',
    role: 'Tech Lead',
    company: 'InnoTech Kenya',
    image: '/assets/feedback-profiles/p3.jpg',
    content: 'The development expertise at Next Mavens is outstanding. They delivered a solution that perfectly matched our local market needs while maintaining global standards.',
    rating: 5
  },
  {
    id: '3',
    name: 'Daniel Kimani',
    role: 'Product Owner',
    company: 'Digital Safari',
    image: '/assets/feedback-profiles/p4.jpg',
    content: 'Working with Next Mavens transformed our digital presence. Their understanding of the African market and global tech trends helped us scale remarkably.',
    rating: 5
  },
  {
    id: '4',
    name: 'Akinyi Otieno',
    role: 'Marketing Manager',
    company: 'Media Connect EA',
    image: '/assets/feedback-profiles/p5.jpg',
    content: 'The team at Next Mavens deeply understands the East African digital landscape. Their campaigns resonated perfectly with our target audience.',
    rating: 5
  },
  {
    id: '5',
    name: 'Mwangi Kariuki',
    role: 'CEO',
    company: 'Tech Savanna',
    image: '/assets/feedback-profiles/p6.jpg',
    content: 'Next Mavens provided excellent guidance in our digital transformation journey. Their expertise in both local and international markets is truly remarkable.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setActiveIndex((prevIndex) => (
      (prevIndex + newDirection + testimonials.length) % testimonials.length
    ));
  };

  return (
    <section className="relative py-20 bg-[#0f0428] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm
              border border-white/10 relative group"
          >
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-purple/20 to-light-blue/20 blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm text-white/80 relative z-10">Client Success Stories</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Leading
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              African Businesses
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} mode="wait" onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10
                hover:border-light-blue/30 transition-colors duration-300">
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image with Enhanced Animation */}
                  <motion.div 
                    className="relative w-24 h-24 mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-light-blue 
                      rounded-full blur-lg opacity-50" />
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover rounded-full relative z-10 border-2 border-white/10"
                    />
                  </motion.div>

                  {/* Enhanced Quote Design */}
                  <div className="relative max-w-2xl mx-auto mb-8">
                    <svg
                      className="absolute -top-6 -left-6 w-12 h-12 text-light-blue/10"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed italic">
                      {testimonials[activeIndex].content}
                    </p>
                  </div>

                  {/* Enhanced Profile Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-light-blue">
                      {testimonials[activeIndex].role}
                    </p>
                    <p className="text-white/60">
                      {testimonials[activeIndex].company}
                    </p>
                    
                    {/* Enhanced Rating Display */}
                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Navigation */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    const newDirection = index > activeIndex ? 1 : -1;
                    if (index !== activeIndex) paginate(newDirection);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-light-blue' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10
                  transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10
                  transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 