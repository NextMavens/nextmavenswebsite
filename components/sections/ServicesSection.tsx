'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceFeature {
  name: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Custom websites and web applications that deliver exceptional user experiences',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Responsive Design',
      'Performance Optimization',
      'Custom CMS Integration',
      'E-commerce Solutions'
    ],
    image: '/assets/services/web-development.png'
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Solutions',
    description: 'End-to-end development services using modern technologies and best practices',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    features: [
      'API Development',
      'Database Design',
      'Cloud Integration',
      'Scalable Architecture'
    ],
    image: '/assets/services/full-stack.png'
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    description: 'Optimize your digital presence for better visibility and faster performance',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    features: [
      'Technical SEO',
      'Performance Audits',
      'Core Web Vitals',
      'Search Rankings'
    ],
    image: '/assets/services/seo-performance.png'
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Creative design solutions that capture your brand\'s essence',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Brand Identity',
      'UI/UX Design',
      'Marketing Materials',
      'Social Media Graphics'
    ],
    image: '/assets/services/graphic-design.png'
  },
  {
    id: 'video',
    title: 'Video Editing',
    description: 'Professional video editing services for engaging content',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Content Creation',
      'Motion Graphics',
      'Video Production',
      'Social Media Videos'
    ],
    image: '/assets/services/video-editing.png'
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Strategic marketing solutions to grow your online presence',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    features: [
      'Social Media Marketing',
      'Content Strategy',
      'Email Marketing',
      'Analytics & Reporting'
    ],
    image: '/assets/services/digital-marketing.png'
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section className="relative py-20 bg-[#0a0224]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        
        {/* Group Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/group-background-image.png"
            alt="Background Pattern"
            fill
            className="object-cover mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Header with animated badge */}
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
              border border-white/10 relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
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
            <span className="text-sm text-white/80 relative z-10">Comprehensive Digital Solutions</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Expertise,
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Your Success
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            From concept to execution, we deliver cutting-edge solutions tailored to your needs
          </p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <AnimatePresence>
                {activeService === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -inset-4 bg-gradient-to-r from-primary-purple/5 to-light-blue/5 
                      rounded-3xl blur-xl z-0"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 h-full p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl 
                border border-white/10 hover:bg-white/10 transition-all duration-300">
                {/* Enhanced Service Icon */}
                <div className="mb-6 relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r 
                      from-primary-purple to-light-blue text-white relative z-10"
                  >
                    {service.icon}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl blur"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Enhanced Service Content */}
                <motion.h3 
                  className="text-xl font-semibold text-white mb-3"
                  whileHover={{ x: 5 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-white/60 mb-6">{service.description}</p>

                {/* Enhanced Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature: string, idx: number) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center text-white/80 group/item"
                    >
                      <motion.svg 
                        className="w-4 h-4 mr-2 text-light-blue"
                        animate={{
                          scale: activeService === service.id ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: activeService === service.id ? Infinity : 0,
                        }}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span className="group-hover/item:text-light-blue transition-colors duration-200">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Enhanced Learn More Link */}
                <Link 
                  href={`/services?service=${service.id}`}
                  className="inline-flex items-center text-light-blue hover:underline cursor-pointer
                    group/learn relative"
                >
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <span className="relative z-10">Learn More</span>
                    <motion.svg 
                      className="w-4 h-4 ml-1 group-hover/learn:translate-x-1 transition-transform"
                      animate={{
                        x: activeService === service.id ? [0, 5, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: activeService === service.id ? Infinity : 0,
                      }}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </Link>
              </div>

              {/* Enhanced Hover Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Added Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-full 
              text-white font-semibold relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Your Project
              <motion.svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 