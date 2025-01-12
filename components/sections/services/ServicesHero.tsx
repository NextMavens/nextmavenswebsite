'use client';

import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaCode, 
  FaMobile, 
  FaRocket, 
  FaCogs, 
  FaDatabase,
  FaLaptopCode,
  FaServer
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript,
  SiFirebase
} from 'react-icons/si';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function ServicesHero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const iconComponents = [
    { Icon: FaReact, delay: 0, x: -20, y: -20, tooltip: 'React.js Development' },
    { Icon: SiNextdotjs, delay: 0.1, x: 20, y: -20, tooltip: 'Next.js Development' },
    { Icon: SiTailwindcss, delay: 0.2, x: -20, y: 20, tooltip: 'Tailwind CSS' },
    { Icon: SiTypescript, delay: 0.3, x: 20, y: 20, tooltip: 'TypeScript' },
    { Icon: FaCode, delay: 0.4, x: 0, y: -30, tooltip: 'Web Development' },
    { Icon: FaMobile, delay: 0.5, x: -30, y: 0, tooltip: 'Mobile Development' },
    { Icon: FaRocket, delay: 0.6, x: 30, y: 0, tooltip: 'Rocket Development' },
    { Icon: FaCogs, delay: 0.7, x: 0, y: 30, tooltip: 'System Integration' },
    { Icon: FaDatabase, delay: 0.8, x: -25, y: 25, tooltip: 'Database Management' },
    { Icon: SiFirebase, delay: 0.9, x: 25, y: -25, tooltip: 'Firebase Integration' },
    { Icon: FaLaptopCode, delay: 1, x: -15, y: -25, tooltip: 'Laptop Code' },
    { Icon: FaServer, delay: 1.1, x: 15, y: 25, tooltip: 'Server Management' }
  ];

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center bg-[#0f0428] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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
              <span className="text-sm text-white/80 relative z-10">Our Services</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Digital Solutions for
              </motion.span>
              <motion.span
                className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Modern Businesses
              </motion.span>
            </h1>
            
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              From web development to digital marketing, we provide comprehensive solutions 
              to help your business thrive in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-lg 
                    text-white font-semibold relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Services
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

              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white/5 backdrop-blur-sm rounded-lg text-white 
                    font-semibold border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="flex items-center">
                    Contact Us
                    <motion.svg 
                      className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '30+', label: 'Happy Clients' },
                { value: '100%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-purple to-light-blue 
                    text-transparent bg-clip-text mb-2"
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Icon Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[500px]"
          >
            {/* Central Circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48
                bg-gradient-to-r from-primary-purple to-light-blue rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Orbiting Icons */}
            {iconComponents.map(({ Icon, delay, x, y, tooltip }, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: x * 8, 
                  y: y * 8,
                }}
                transition={{
                  duration: 0.5,
                  delay: delay,
                }}
              >
                <motion.div className="relative">
                  <Icon 
                    className="w-10 h-10 text-white/80 hover:text-light-blue 
                      transition-colors duration-300 cursor-pointer"
                  />
                  
                  {/* Enhanced Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1
                      bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white whitespace-nowrap
                      pointer-events-none"
                  >
                    {tooltip}
                  </motion.div>
                  
                  {/* Icon Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-light-blue rounded-full blur-xl"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.8)' }}>
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {iconComponents.map((_, index) => (
                  <motion.line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + iconComponents[index].x}%`}
                    y2={`${50 + iconComponents[index].y}%`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    className="opacity-20"
                  />
                ))}
              </motion.g>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-purple)" />
                  <stop offset="100%" stopColor="var(--light-blue)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 