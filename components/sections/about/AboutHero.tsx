'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0f0428] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
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
            <span className="text-sm text-white/80 relative z-10">About Us</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming Ideas into
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Digital Reality
            </span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            We&apos;re a team of passionate developers, designers, and digital craftsmen dedicated 
            to creating exceptional digital experiences.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#story"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary-purple to-light-blue rounded-xl 
                text-white font-medium"
            >
              Our Story
            </motion.a>
            <motion.a
              href="#team"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium"
            >
              Meet the Team
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}