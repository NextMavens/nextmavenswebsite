'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaEye } from 'react-icons/fa';

export default function MissionVision() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative z-10 p-8 bg-white/5 backdrop-blur-sm rounded-xl 
                border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-purple to-light-blue 
                    flex items-center justify-center mb-6 rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <FaRocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-white/60">
                    To empower businesses with innovative digital solutions that drive growth, 
                    enhance user experience, and create lasting impact in the digital landscape.
                  </p>
                </div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="relative z-10 p-8 bg-white/5 backdrop-blur-sm rounded-xl 
                border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-purple to-light-blue 
                    flex items-center justify-center mb-6 -rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                    <FaEye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-white/60">
                    To be the leading force in digital transformation, recognized globally for 
                    delivering exceptional solutions that shape the future of digital experiences.
                  </p>
                </div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 