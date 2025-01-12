'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLightbulb, FaHandshake, FaRocket, FaHeart } from 'react-icons/fa';

interface Value {
  icon: typeof FaLightbulb;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.'
  },
  {
    icon: FaHandshake,
    title: 'Collaboration',
    description: 'We work closely with our clients, fostering strong partnerships and shared success.'
  },
  {
    icon: FaRocket,
    title: 'Excellence',
    description: 'We strive for excellence in every project, ensuring the highest quality standards.'
  },
  {
    icon: FaHeart,
    title: 'Passion',
    description: 'We are passionate about creating impactful digital solutions that make a difference.'
  }
];

export default function OurValues() {
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
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Our Values
          </h2>
          
          <p className="text-white/60 text-lg mb-12 text-center">
            The principles that guide us in delivering exceptional digital solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-purple to-light-blue 
                      flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-white/60">
                    {value.description}
                  </p>
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