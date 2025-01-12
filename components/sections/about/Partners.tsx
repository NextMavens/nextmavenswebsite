'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logo: string;
  link: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'TechCorp',
    logo: '/partners/techcorp.svg',
    link: 'https://techcorp.com'
  },
  {
    id: 2,
    name: 'InnovateLabs',
    logo: '/partners/innovatelabs.svg',
    link: 'https://innovatelabs.com'
  },
  {
    id: 3,
    name: 'DigitalFlow',
    logo: '/partners/digitalflow.svg',
    link: 'https://digitalflow.com'
  },
  {
    id: 4,
    name: 'SmartSolutions',
    logo: '/partners/smartsolutions.svg',
    link: 'https://smartsolutions.com'
  },
  {
    id: 5,
    name: 'FutureWorks',
    logo: '/partners/futureworks.svg',
    link: 'https://futureworks.com'
  },
  {
    id: 6,
    name: 'CloudTech',
    logo: '/partners/cloudtech.svg',
    link: 'https://cloudtech.com'
  }
];

export default function Partners() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Trusted Partners
          </h2>
          
          <p className="text-white/60 text-lg mb-12 text-center">
            Companies we've collaborated with to create exceptional digital experiences
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="relative aspect-[3/2] grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-primary-purple/20 rounded-full blur-3xl"
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
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-light-blue/20 rounded-full blur-3xl"
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
        </motion.div>
      </div>
    </section>
  );
} 