'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { 
  FaCode, 
  FaDatabase, 
  FaSearch, 
  FaPalette, 
  FaVideo,
  FaBullhorn,
  FaMobileAlt,
  FaCloud,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaCogs
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  technologies: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web solutions built with modern technologies and best practices.',
    icon: FaCode,
    features: [
      'Responsive Design',
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps'
    ],
    technologies: [
      'React.js',
      'Next.js',
      'Node.js',
      'TypeScript'
    ],
    benefits: [
      'Improved User Experience',
      'Better Performance',
      'Scalable Solutions',
      'SEO Friendly'
    ]
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Solutions',
    description: 'End-to-end development services for complex applications.',
    icon: FaDatabase,
    features: [
      'Backend Development',
      'API Integration',
      'Database Design',
      'Cloud Solutions'
    ],
    technologies: [
      'MongoDB',
      'PostgreSQL',
      'Firebase',
      'AWS'
    ],
    benefits: [
      'Seamless Integration',
      'Robust Architecture',
      'High Performance',
      'Secure Systems'
    ]
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    description: 'Optimize your digital presence for better visibility and performance.',
    icon: FaSearch,
    features: [
      'Technical SEO',
      'Content Optimization',
      'Performance Audits',
      'Analytics Setup'
    ],
    technologies: [
      'Google Analytics',
      'Search Console',
      'Lighthouse',
      'GTmetrix'
    ],
    benefits: [
      'Increased Visibility',
      'Better Rankings',
      'More Traffic',
      'Higher Conversion'
    ]
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Creative design solutions that capture your brand\'s essence and engage your audience.',
    icon: FaPalette,
    features: [
      'Brand Identity Design',
      'UI/UX Design',
      'Marketing Materials',
      'Social Media Graphics'
    ],
    technologies: [
      'Adobe Creative Suite',
      'Figma',
      'Sketch',
      'Webflow'
    ],
    benefits: [
      'Strong Brand Identity',
      'Improved User Experience',
      'Consistent Design Language',
      'Enhanced Visual Appeal'
    ]
  },
  {
    id: 'video',
    title: 'Video Editing',
    description: 'Professional video editing services that bring your stories to life with stunning visuals.',
    icon: FaVideo,
    features: [
      'Content Creation',
      'Motion Graphics',
      'Video Production',
      'Animation'
    ],
    technologies: [
      'Adobe Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Cinema 4D'
    ],
    benefits: [
      'Engaging Content',
      'Professional Quality',
      'Brand Storytelling',
      'Higher Engagement'
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Strategic digital marketing solutions to grow your online presence and reach.',
    icon: FaBullhorn,
    features: [
      'Social Media Marketing',
      'Content Strategy',
      'Email Marketing',
      'PPC Campaigns'
    ],
    technologies: [
      'Google Ads',
      'Meta Business Suite',
      'Mailchimp',
      'HubSpot'
    ],
    benefits: [
      'Increased ROI',
      'Brand Awareness',
      'Lead Generation',
      'Market Growth'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    icon: FaMobileAlt,
    features: [
      'iOS Development',
      'Android Development',
      'Cross-Platform Apps',
      'App Store Optimization'
    ],
    technologies: [
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin'
    ],
    benefits: [
      'Wide Platform Reach',
      'Native Performance',
      'Cost-Effective',
      'Faster Development'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and solutions for modern business needs.',
    icon: FaCloud,
    features: [
      'Cloud Migration',
      'Infrastructure Setup',
      'DevOps Integration',
      'Serverless Architecture'
    ],
    technologies: [
      'AWS',
      'Google Cloud',
      'Azure',
      'Docker'
    ],
    benefits: [
      'Scalability',
      'Cost Optimization',
      'High Availability',
      'Enhanced Security'
    ]
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    icon: FaShieldAlt,
    features: [
      'Security Audits',
      'Penetration Testing',
      'Compliance Management',
      'Security Training'
    ],
    technologies: [
      'SSL/TLS',
      'Firewall Solutions',
      'OAuth 2.0',
      'JWT'
    ],
    benefits: [
      'Data Protection',
      'Risk Mitigation',
      'Compliance Assurance',
      'Peace of Mind'
    ]
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Innovative AI and machine learning solutions for business automation and insights.',
    icon: FaRobot,
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Predictive Analytics',
      'Computer Vision'
    ],
    technologies: [
      'TensorFlow',
      'PyTorch',
      'OpenAI API',
      'scikit-learn'
    ],
    benefits: [
      'Automation',
      'Smart Insights',
      'Enhanced Efficiency',
      'Competitive Edge'
    ]
  }
];

export default function ServicesList() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service');

  useEffect(() => {
    if (selectedService) {
      const element = document.getElementById(selectedService);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedService]);

  return (
    <section className="relative py-20 bg-[#0f0428]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`mb-32 last:mb-0 ${
              selectedService === service.id ? 'scroll-mt-24' : ''
            }`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            }`}>
              {/* Content Side */}
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl 
                      bg-gradient-to-r from-primary-purple to-light-blue text-white"
                  >
                    <service.icon size={20} />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h2>
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-white/60 text-lg mb-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {service.description}
                </motion.p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaCogs className="w-4 h-4 text-light-blue" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-center text-white/80 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-light-blue mr-3 group-hover:scale-150 transition-transform duration-300" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Technologies Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaCode className="w-4 h-4 text-light-blue" />
                      Technologies
                    </h3>
                    <ul className="space-y-3">
                      {service.technologies.map((tech, idx) => (
                        <motion.li
                          key={tech}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-center text-white/80 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-light-blue mr-3 group-hover:scale-150 transition-transform duration-300" />
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Benefits Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FaChartLine className="w-4 h-4 text-light-blue" />
                    Benefits
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="p-4 bg-white/5 backdrop-blur-sm rounded-xl 
                          border border-white/10 hover:bg-white/10 transition-all duration-300
                          hover:scale-105 cursor-pointer group"
                      >
                        <p className="text-white/80 group-hover:text-white transition-colors duration-300">
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Icon Side - Hidden on Mobile */}
              <motion.div
                className={`hidden lg:block order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative max-w-md mx-auto">
                  <div className="relative aspect-square bg-gradient-to-r from-primary-purple/20 
                    to-light-blue/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10
                    group hover:border-white/20 transition-all duration-300"
                  >
                    <service.icon className="w-full h-full text-white/80 group-hover:text-white 
                      transition-colors duration-300" />
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-1/4 -left-8 w-16 h-16 bg-primary-purple/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 -right-8 w-24 h-24 bg-light-blue/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 