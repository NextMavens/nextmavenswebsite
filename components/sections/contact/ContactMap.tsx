'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactMap() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="location" className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <FaMapMarkerAlt className="text-primary-purple" />
              <span className="text-sm text-white/80">Our Location</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Come meet us in person and let&apos;s discuss your project over a cup of coffee.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative aspect-[16/9] rounded-xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818396737542!2d36.81196!3d-1.263319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNDguMCJTIDM2wrA0OCc0My4xIkU!5e0!3m2!1sen!2ske!4v1635444444444!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <motion.a
              href="https://goo.gl/maps/your-location-link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all duration-300"
            >
              <FaMapMarkerAlt />
              Get Directions
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}