'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function OurStory() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a vision to transform digital landscapes.'
    },
    {
      year: '2021',
      title: 'Growing Team',
      description: 'Expanded our team and capabilities.'
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Started serving clients worldwide.'
    },
    {
      year: '2023',
      title: 'Innovation Hub',
      description: 'Established our innovation center.'
    }
  ];

  return (
    <section id="story" className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Our Journey
          </h2>
          
          <p className="text-white/60 text-lg mb-12 text-center">
            From humble beginnings to digital excellence, our story is one of passion, 
            innovation, and continuous growth.
          </p>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-purple to-light-blue 
                    flex items-center justify-center text-white text-2xl font-bold">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/60">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="absolute left-12 top-24 bottom-0 w-0.5 bg-gradient-to-b 
                    from-primary-purple to-light-blue opacity-20" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 