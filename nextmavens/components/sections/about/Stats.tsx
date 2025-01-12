'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaLaptopCode, FaStar, FaGlobe } from 'react-icons/fa';

interface Stat {
  icon: typeof FaUsers;
  number: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: FaUsers,
    number: '100+',
    label: 'Happy Clients'
  },
  {
    icon: FaLaptopCode,
    number: '200+',
    label: 'Projects Completed'
  },
  {
    icon: FaStar,
    number: '50+',
    label: '5-Star Reviews'
  },
  {
    icon: FaGlobe,
    number: '10+',
    label: 'Countries Served'
  }
];

export default function Stats() {
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-purple to-light-blue 
                      flex items-center justify-center mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.h3 
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-white/60">
                      {stat.label}
                    </p>
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 