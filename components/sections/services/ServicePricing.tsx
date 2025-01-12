'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

interface ValuePoint {
  title: string;
  description: string;
}

const valuePoints: ValuePoint[] = [
  {
    title: 'Custom Solutions',
    description: 'Every project is unique, and we tailor our solutions to match your specific needs, goals, and industry requirements.'
  },
  {
    title: 'Transparent Pricing',
    description: 'Get detailed proposals with clear breakdowns based on your project requirements, with no hidden costs or surprises.'
  },
  {
    title: 'Flexible Scope',
    description: 'Scale your project up or down based on your priorities and budget constraints. We adapt to your business needs.'
  },
  {
    title: 'Value-Based Pricing',
    description: 'Our pricing reflects the value and complexity of your specific requirements, ensuring you get the best return on investment.'
  },
  {
    title: 'Phased Implementation',
    description: 'Break down large projects into manageable phases, allowing for better budget allocation and faster time-to-market.'
  },
  {
    title: 'Future-Proof Investment',
    description: 'We build scalable solutions that grow with your business, ensuring long-term value for your investment.'
  },
  {
    title: 'Quality Assurance',
    description: 'Every project undergoes rigorous testing and quality checks, ensuring you receive a robust and reliable solution.'
  },
  {
    title: 'Ongoing Support',
    description: 'Choose from flexible maintenance plans to keep your solution running smoothly and up-to-date after launch.'
  }
];

const factors = [
  'Project Complexity',
  'Feature Requirements',
  'Timeline Needs',
  'Integration Requirements',
  'Maintenance Plans',
  'Support Level',
  'Technology Stack',
  'Security Requirements',
  'Performance Needs',
  'Scalability Requirements'
];

export default function ServicePricing() {
  return (
    <section className="relative py-20 bg-[#0f0428] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
            <span className="text-sm text-white/80 relative z-10">Investment</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tailored Solutions for
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Your Unique Needs
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            We provide custom pricing based on your specific project requirements
          </p>
        </motion.div>

        {/* Value Points Grid - Updated to 2x4 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valuePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative z-10 h-full p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-light-blue" />
                  {point.title}
                </h3>
                <p className="text-white/60">{point.description}</p>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Pricing Factors - Updated to 2x5 grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-xl 
            border border-white/10 p-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Pricing Factors We Consider</h3>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
            {factors.map((factor, index) => (
              <motion.div
                key={factor}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center text-white/80 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3
                  group-hover:bg-light-blue/20 transition-colors duration-300">
                  <FaCheck className="w-4 h-4 text-light-blue" />
                </div>
                {factor}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            Ready to discuss your project requirements and get a custom quote?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-xl 
              text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Request Custom Quote
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 