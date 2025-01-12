'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown } from 'react-icons/fa';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks, while larger applications may take 3-6 months. We\'ll provide a detailed timeline during our initial consultation.'
  },
  {
    question: 'How do you handle project communication?',
    answer: 'We maintain regular communication through scheduled updates, a dedicated project management platform, and direct access to your project team. You\'ll always be kept in the loop about your project\'s progress.'
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% upfront deposit and the remaining 50% upon project completion. For larger projects, we can arrange milestone-based payments. We accept bank transfers and other standard payment methods.'
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes, we offer various support packages including regular maintenance, security updates, content updates, and technical support. We\'ll help you choose the right support plan for your needs.'
  },
  {
    question: 'Can you help with existing projects?',
    answer: 'Yes, we can take over existing projects, perform audits, implement improvements, or help with specific features. We\'ll assess your current setup and recommend the best path forward.'
  }
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm
                border border-white/10"
            >
              <span className="text-sm text-white/80">FAQ</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Common Questions
            </h2>
            <p className="text-white/60 text-lg">
              Find answers to frequently asked questions about working with us
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <FaChevronDown className="w-5 h-5 text-primary-purple" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-white/10">
                          <p className="text-white/60">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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