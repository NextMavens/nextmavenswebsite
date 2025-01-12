'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaHeadset } from 'react-icons/fa';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'process' | 'support';
}

const faqs: FAQ[] = [
  {
    id: 'timeline',
    question: 'How long does it typically take to complete a project?',
    answer: `Project timelines vary depending on complexity and requirements. Here's a general breakdown:

• Simple Websites: 4-6 weeks
• E-commerce Sites: 8-12 weeks
• Custom Web Applications: 12-16 weeks
• Enterprise Solutions: 16+ weeks

Factors that affect timeline:
- Project complexity
- Number of custom features
- Integration requirements
- Client feedback cycles
- Content preparation

We'll provide a detailed timeline during our initial consultation based on your specific needs.`,
    category: 'process'
  },
  {
    id: 'process',
    question: 'What is your development process like?',
    answer: `Our development process is structured into clear phases:

1. Discovery & Planning
   • Requirements gathering
   • Project scope definition
   • Timeline planning
   • Technology selection

2. Design Phase
   • Wireframing
   • UI/UX design
   • Design review and feedback
   • Design finalization

3. Development
   • Frontend development
   • Backend implementation
   • Regular progress updates
   • Continuous testing

4. Testing & QA
   • Functionality testing
   • Performance optimization
   • Cross-browser testing
   • Security checks

5. Launch & Support
   • Final testing
   • Deployment
   • Training and documentation
   • Ongoing support

We maintain clear communication throughout each phase with regular updates and feedback sessions.`,
    category: 'process'
  },
  {
    id: 'technology',
    question: 'What technologies do you use?',
    answer: `We use modern, industry-standard technologies chosen based on project requirements:

Frontend Technologies:
• React.js / Next.js
• TypeScript
• Tailwind CSS
• Framer Motion

Backend Technologies:
• Node.js
• Python
• PHP
• Java

Databases:
• MongoDB
• PostgreSQL
• MySQL
• Firebase

Cloud Services:
• AWS
• Google Cloud
• Azure
• Vercel

We select the most appropriate technology stack based on your project's specific needs, ensuring optimal performance and scalability.`,
    category: 'technical'
  },
  {
    id: 'communication',
    question: 'How do you handle project communication?',
    answer: `We maintain transparent and efficient communication through:

Daily/Weekly Updates:
• Progress reports
• Milestone updates
• Timeline tracking
• Issue resolution

Communication Channels:
• Dedicated project management platform
• Regular video calls
• Email updates
• Instant messaging

Documentation:
• Project documentation
• Technical specifications
• Meeting notes
• Change logs

You'll have direct access to your project team and a clear view of project progress at all times.`,
    category: 'process'
  },
  {
    id: 'changes',
    question: 'How do you handle change requests during development?',
    answer: `We have a structured change request process:

1. Change Request Submission
   • Detailed description of changes
   • Reason for changes
   • Priority level

2. Impact Analysis
   • Timeline impact
   • Cost implications
   • Technical feasibility
   • Resource requirements

3. Change Approval
   • Review and discussion
   • Cost and timeline adjustment
   • Client approval
   • Implementation planning

4. Implementation
   • Scheduled implementation
   • Testing and validation
   • Documentation update
   • Progress tracking

All changes are properly evaluated and implemented without disrupting the overall project flow.`,
    category: 'process'
  },
  {
    id: 'support',
    question: 'What kind of support do you provide after launch?',
    answer: `We offer comprehensive post-launch support:

Support Packages:
• Basic Maintenance
  - Security updates
  - Bug fixes
  - Basic monitoring

• Standard Support
  - Regular updates
  - Performance monitoring
  - Content updates
  - Technical support

• Premium Support
  - 24/7 monitoring
  - Priority support
  - Regular optimizations
  - Feature enhancements

All packages include:
- Security monitoring
- Regular backups
- Performance tracking
- Technical consultation

We'll help you choose the right support plan based on your needs and budget.`,
    category: 'support'
  },
  {
    id: 'ownership',
    question: 'Who owns the code and content after completion?',
    answer: `You retain 100% ownership of your project:

What You Get:
• Full source code
• All project assets
• Documentation
• Deployment files

Deliverables Include:
• Frontend code
• Backend code
• Database schemas
• API documentation
• Deployment instructions
• User guides

We provide everything you need to maintain full control of your project, including comprehensive documentation and transfer of all intellectual property rights.`,
    category: 'general'
  },
  {
    id: 'security',
    question: 'How do you ensure project security?',
    answer: `We implement comprehensive security measures:

Security Practices:
• Secure coding standards
• Regular security audits
• Vulnerability testing
• Penetration testing

Security Features:
• SSL/TLS encryption
• Data encryption
• Secure authentication
• Access control
• DDoS protection

Compliance:
• GDPR compliance
• Data protection
• Industry standards
• Regular updates

We continuously monitor and update security protocols to protect your project against emerging threats.`,
    category: 'technical'
  }
];

export default function ServiceFAQ() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'technical', name: 'Technical' },
    { id: 'process', name: 'Process' },
    { id: 'support', name: 'Support' }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

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
            <span className="text-sm text-white/80 relative z-10">FAQ</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Common
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Find answers to frequently asked questions about our services
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-purple to-light-blue text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <FaChevronDown className="w-5 h-5 text-light-blue" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openFAQ === faq.id ? "auto" : 0,
                      opacity: openFAQ === faq.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <div className="border-t border-white/10 pt-4">
                        <div className="text-white/60 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-white/60">
            <FaHeadset className="w-5 h-5 text-light-blue" />
            <p>Still have questions? We're here to help!</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-xl 
              text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Our Team</span>
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