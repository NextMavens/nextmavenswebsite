'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    stats: "50+ Projects",
    technologies: ["React", "Next.js", "TypeScript"]
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end development services using React, Next.js, and Node.js",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    stats: "100+ APIs",
    technologies: ["Node.js", "MongoDB", "AWS"]
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to boost your online presence",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    ),
    stats: "2M+ Reach",
    technologies: ["SEO", "Analytics", "Social Media"]
  }
];

export default function SubHeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#0f0428]">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-purple/5 to-light-blue/5"
          style={{ opacity }}
        />
      </div>

      {/* Floating Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:block w-24 h-24 bg-gradient-to-r 
            ${i % 2 === 0 ? 'from-primary-purple/10 to-light-blue/10' : 'from-light-blue/10 to-primary-purple/10'}
            rounded-full blur-xl`}
          style={{
            top: `${20 + i * 30}%`,
            left: `${10 + i * 40}%`,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-4 relative"
        style={{ y }}
      >
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm
              border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm text-white/80">Trusted by 100+ Businesses</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Transforming Ideas into
            <motion.span 
              className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Digital Excellence
            </motion.span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            We combine innovation with expertise to deliver cutting-edge solutions that drive your business forward
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <div className="relative z-10 h-full p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10
                hover:bg-white/10 transition-all duration-300">
                {/* Enhanced Icon Container */}
                <div className="mb-6 relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r 
                      from-primary-purple to-light-blue text-white relative z-10"
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 
                    group-hover:opacity-70 transition-opacity duration-300" />
                </div>

                {/* Enhanced Content */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm md:text-base mb-4">{feature.description}</p>

                {/* Enhanced Technologies Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {feature.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10
                        transition-all duration-300 cursor-default select-none"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Enhanced Stats */}
                <div className="flex items-center text-sm text-white/80">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-light-blue font-semibold">{feature.stats}</span>
                    <span className="w-2 h-2 rounded-full bg-light-blue/30" />
                    <span>Delivered</span>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Hover Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-full 
                text-white font-semibold relative overflow-hidden shadow-lg shadow-primary-purple/20
                hover:shadow-xl hover:shadow-primary-purple/30 transition-shadow duration-300"
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
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 