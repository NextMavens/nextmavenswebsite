'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaPencilRuler, 
  FaCode, 
  FaVial,
  FaRocket,
  FaHeadset
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconType;
  details: string[];
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Planning',
    description: 'Understanding your vision and project requirements.',
    icon: FaSearch,
    details: [
      'Project Requirements Analysis',
      'Target Audience Research',
      'Project Scope Definition',
      'Timeline Planning'
    ],
    color: '#6d28d9'
  },
  {
    id: 'proposal',
    number: '02',
    title: 'Custom Proposal',
    description: 'Tailored solution and pricing based on your specific needs.',
    icon: FaPencilRuler,
    details: [
      'Scope-Based Pricing',
      'Detailed Project Roadmap',
      'Resource Allocation',
      'Milestone Planning'
    ],
    color: '#3b82f6'
  },
  {
    id: 'design',
    number: '03',
    title: 'Design Phase',
    description: 'Creating the perfect design that matches your brand.',
    icon: FaCode,
    details: [
      'UI/UX Design',
      'Brand Integration',
      'Interactive Prototypes',
      'Design Review & Feedback'
    ],
    color: '#8b5cf6'
  },
  {
    id: 'development',
    number: '04',
    title: 'Development',
    description: 'Building your solution with cutting-edge technologies.',
    icon: FaVial,
    details: [
      'Agile Development',
      'Regular Updates',
      'Progress Tracking',
      'Quality Assurance'
    ],
    color: '#6366f1'
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    description: 'Thorough testing and smooth deployment.',
    icon: FaRocket,
    details: [
      'Final Testing',
      'Performance Optimization',
      'Security Checks',
      'Deployment'
    ],
    color: '#4f46e5'
  },
  {
    id: 'support',
    number: '06',
    title: 'Ongoing Support',
    description: 'Continuous support and maintenance options.',
    icon: FaHeadset,
    details: [
      'Maintenance Plans',
      'Technical Support',
      'Updates & Upgrades',
      'Performance Monitoring'
    ],
    color: '#4338ca'
  }
];

export default function ServiceProcess() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

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
            <span className="text-sm text-white/80 relative z-10">Our Development Process</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            How We Bring Your
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Vision to Life
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We believe in transparent pricing based on your specific needs. Our process ensures 
            you get a solution that perfectly matches your requirements and budget.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              className="relative group"
            >
              <motion.div
                className="relative z-10 h-full p-6 bg-white/5 backdrop-blur-sm rounded-2xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Step Number */}
                <div 
                  className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center 
                    rounded-xl text-white font-bold text-lg transform rotate-3 
                    group-hover:rotate-6 transition-transform duration-300"
                  style={{ background: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl 
                      bg-white/10 text-light-blue"
                  >
                    <step.icon size={24} />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 mb-4">{step.description}</p>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeStep === step.id ? 1 : 0,
                    height: activeStep === step.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mt-4 border-t border-white/10 pt-4">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-white/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-light-blue mr-3" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Hover Effect */}
              <div 
                className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 
                  transition duration-300"
                style={{ background: step.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Connection Lines (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 
          bg-gradient-to-r from-primary-purple to-light-blue opacity-20 
          transform -translate-y-1/2" 
        />

        {/* Add CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Ready to discuss your project? Let's talk about your specific needs and create 
            a custom solution that fits your budget.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-xl 
              text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Get Custom Quote
              <svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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