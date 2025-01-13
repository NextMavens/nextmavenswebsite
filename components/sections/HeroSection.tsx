'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CustomCursor from '../ui/CustomCursor';


const services = [
  'Web Development', 'Full-Stack Solutions', 'SEO & Performance', 
  'Graphic Design', 'Video Editing', 'Digital Marketing'
];

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0224] via-[#1a0259] to-[#2e00ab]">
        <motion.div 
          className="absolute inset-0"
          initial={{ backgroundPosition: "0px 0px" }}
          animate={{ backgroundPosition: "100px 100px" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `linear-gradient(45deg,rgba(46,0,171,0.05) 1px,transparent 1px),
              linear-gradient(-45deg,rgba(46,0,171,0.05) 1px,transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary-purple/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-light-blue/20 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 pt-16">
        <div className="pt-8 pb-40 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
          <CustomCursor />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white z-10 flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 inline-block relative group cursor-pointer hero-logo-trigger"
              >
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm inline-flex items-center relative z-10">
                  <motion.span 
                    className="w-2 h-2 bg-[#2bc3fd] rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                 <span>Utawala, Kenya&apos;s Premier Digital Agency</span>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full"
                  >
                    Since 2020
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-light-blue/20 rounded-full blur-md"
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
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold mb-6"
              >
                Transform Your
                <motion.span 
                  className="block mt-2 bg-gradient-to-r from-white to-[#2bc3fd] text-transparent bg-clip-text"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Digital Vision
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                East Africa&apos;s leading tech innovator, delivering cutting-edge web solutions, 
                mobile apps, and digital marketing services. From Nairobi to global markets, 
                we transform businesses through technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {services.map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    }}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/70 cursor-pointer
                      backdrop-blur-sm transition-all duration-300 border border-white/10"
                  >
                    {service}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-full 
                    text-white font-semibold hover:shadow-lg hover:shadow-light-blue/25 transition-all duration-300
                    relative overflow-hidden"
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

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white 
                    font-semibold hover:bg-white/20 transition-all duration-300 flex items-center
                    border border-white/10"
                >
                  View Our Work
                  <span className="ml-2">→</span>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
              >
                {[
                  { value: '500+', label: 'Projects Completed' },
                  { value: '50M+', label: 'Users Reached' },
                  { value: '100%', label: 'Client Satisfaction' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <motion.div
                      className="text-2xl font-bold bg-gradient-to-r from-white to-light-blue text-transparent bg-clip-text"
                      animate={{
                        backgroundPosition: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="relative lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 h-full flex items-end justify-center">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-light-blue/20 to-primary-purple/20 blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-end justify-center"
              >
                <div className="relative w-full max-w-[600px] aspect-square">
                  <Image
                    src="/assets/hero/hero-x-blue.png"
                    alt="Next Mavens X"
                    fill
                    className="object-contain opacity-50 mix-blend-lighten"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-10 mt-auto"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-b from-light-blue/10 to-primary-purple/10 
                      rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="relative z-10 w-full max-w-[450px]">
                    <Image
                      src="/assets/hero/hero-guy-smilling.png"
                      alt="Digital Professional"
                      width={450}
                      height={450}
                      className="w-full h-full object-contain 
                        drop-shadow-[0_10px_20px_rgba(43,195,253,0.2)]"
                      priority
                    />
                  </div>

                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary-purple/10 to-light-blue/10 
                      rounded-full blur-xl z-0"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>

              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${
                    i === 0 ? 'top-1/4 right-1/4' :
                    i === 1 ? 'bottom-1/3 left-1/4' :
                    i === 2 ? 'top-1/2 right-1/3' :
                    i === 3 ? 'top-1/3 left-1/3' :
                    'bottom-1/4 right-1/3'
                  } w-${12 - i * 2} h-${12 - i * 2} bg-gradient-to-r 
                    ${i % 2 === 0 ? 'from-primary-purple to-light-blue' : 'from-light-blue to-primary-purple'}
                    rounded-full opacity-20 blur-xl`}
                  animate={{
                    y: [0, i % 2 === 0 ? -20 : 20, 0],
                    x: [0, i % 3 === 0 ? 15 : -15, 0],
                    scale: [1, i % 2 === 0 ? 1.1 : 0.9, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 