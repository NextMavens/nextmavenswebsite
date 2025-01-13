'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePortfolioStats } from '@/lib/hooks/usePortfolioStats';
import { useSwipeable } from 'react-swipeable';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 'jett-app',
    title: 'Jett Ride App Campaign',
    category: 'Social Media',
    image: '/assets/sub-hero/design 5.png',
    client: 'Jett',
    description: 'Comprehensive social media campaign for ride-hailing app launch',
    tags: ['Social Media', 'Branding', 'Digital Marketing']
  },
  {
    id: 'power-logistics',
    title: 'Power Logistics Branding',
    category: 'Branding',
    image: '/assets/sub-hero/design 6.png',
    client: 'Power Logistics',
    description: 'Complete brand identity and social media design for logistics company',
    tags: ['Branding', 'Social Media', 'Print Design']
  },
  {
    id: 'entwined-media',
    title: 'Entwined Media Billboard',
    category: 'Outdoor Advertising',
    image: '/assets/sub-hero/design3.png',
    client: 'Entwined Media',
    description: 'Strategic outdoor advertising campaign',
    tags: ['Outdoor Media', 'Advertising', 'Brand Strategy']
  },
  {
    id: 'game-center',
    title: 'Game Center Campaign',
    category: 'Digital Marketing',
    image: '/assets/sub-hero/design 4.png',
    client: 'Game Center',
    description: 'Gaming products promotional campaign',
    tags: ['Digital Marketing', 'Social Media', 'E-commerce']
  }
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const categories = ['All', 'Social Media', 'Branding', 'Digital Marketing', 'Outdoor Advertising'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const { totalProjects, categories: categoryCount, clients, isLoading } = usePortfolioStats();

  const stats = [
    { 
      label: 'Projects Completed', 
      value: totalProjects,
      loading: isLoading,
      prefix: '',
      suffix: '+',
      minDisplay: 50
    },
    { 
      label: 'Service Categories', 
      value: categoryCount,
      loading: isLoading,
      prefix: '',
      suffix: '+',
      minDisplay: 50
    },
    { 
      label: 'Happy Clients', 
      value: clients,
      loading: isLoading,
      prefix: '',
      suffix: '+',
      minDisplay: 50
    }
  ];

  const handlers = useSwipeable({
    onSwiping: (event) => {
      if (event.dir === 'Left' || event.dir === 'Right') {
        setIsSwiping(true);
      }
    },
    onSwiped: (event) => {
      setIsSwiping(false);
      const currentIndex = categories.findIndex(
        cat => cat.toLowerCase() === activeFilter
      );
      
      if (event.dir === 'Left' && currentIndex < categories.length - 1) {
        setActiveFilter(categories[currentIndex + 1].toLowerCase());
      } else if (event.dir === 'Right' && currentIndex > 0) {
        setActiveFilter(categories[currentIndex - 1].toLowerCase());
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const handleTouchStart = (e: React.TouchEvent, projectId: string) => {
    setTouchStartX(e.touches[0].clientX);
    setHoveredProject(projectId);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndX = e.touches[0].clientX;
    const deltaX = Math.abs(touchEndX - touchStartX);
    
    if (deltaX > 5) {
      setHoveredProject(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(0);
  };

  return (
    <section className="relative py-12 md:py-20 bg-[#0f0428]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Updated Stats Section with better mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <motion.div
                className="block text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-purple to-light-blue 
                  text-transparent bg-clip-text mb-2 min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {stat.loading ? (
                  <motion.div
                    className="w-6 h-6 md:w-8 md:h-8 border-2 border-light-blue border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.prefix}{stat.value}{stat.suffix}
                  </motion.span>
                )}
              </motion.div>
              <span className="text-xs md:text-sm text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Section Header for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-16 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm
              border border-white/10 relative group cursor-pointer"
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
            <span className="text-sm text-white/80 relative z-10">Our Latest Work</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Projects
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Explore our portfolio of successful client collaborations and creative solutions
          </p>
        </motion.div>

        {/* Enhanced Category Filter with touch support */}
        <div className="relative mb-8 md:mb-12 -mx-4 px-4 md:px-0 md:mx-0">
          <motion.div 
            {...handlers}
            className="flex overflow-x-auto py-2 gap-3 md:gap-4 md:flex-wrap md:justify-center
              scrollbar-none md:scrollbar-thin scrollbar-thumb-light-blue/20 scrollbar-track-transparent
              touch-pan-x"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category.toLowerCase())}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  whitespace-nowrap
                  ${activeFilter === category.toLowerCase()
                    ? 'bg-gradient-to-r from-primary-purple to-light-blue text-white shadow-lg shadow-primary-purple/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category}
                {activeFilter === category.toLowerCase() && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-primary-purple to-light-blue 
                      rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Enhanced touch feedback indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-light-blue rounded-full md:hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isSwiping ? '50%' : '0%',
              opacity: isSwiping ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Fade edges only on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0f0428] to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0f0428] to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Enhanced Projects Grid with touch interactions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative touch-manipulation"
                onMouseEnter={() => !isTouchDevice() && setHoveredProject(project.id)}
                onMouseLeave={() => !isTouchDevice() && setHoveredProject(null)}
                onTouchStart={(e) => handleTouchStart(e, project.id)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm 
                  border border-white/10 hover:border-light-blue/30 transition-all duration-300">
                  {/* Project Image with Enhanced Touch Feedback */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transform transition-all duration-700
                        ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0224] to-transparent
                      transition-opacity duration-300
                      ${hoveredProject === project.id ? 'opacity-40' : 'opacity-80'}`}
                    />
                    
                    {/* Enhanced Info Overlay with Touch Feedback */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6"
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        y: hoveredProject === project.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 transform
                        group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-sm text-light-blue font-medium">{project.category}</span>
                        <h3 className="text-xl font-semibold text-white mt-1">{project.title}</h3>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced View Project Button */}
                  <motion.button
                    className={`absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm 
                      border border-white/20 transition-all duration-300
                      ${hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    onClick={() => setSelectedProject(project)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Modal with Touch Support */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0f0428] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                  border border-white/10 relative scrollbar-thin scrollbar-thumb-light-blue/20 
                  scrollbar-track-transparent"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20
                    transition-colors duration-200 z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Project Hero Image */}
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0428]" />
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-light-blue/10 text-light-blue border border-light-blue/20">
                        {selectedProject.category}
                      </span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/60">{selectedProject.client}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                    <p className="text-white/60 text-lg">{selectedProject.description}</p>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Technologies Used */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Technologies & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-3 py-1 text-sm rounded-full bg-white/5 text-white/90 
                              border border-white/10 hover:border-light-blue/30 transition-colors duration-300"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Project Highlights</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Timeline', value: '4 weeks' },
                          { label: 'Platform', value: 'Web & Mobile' },
                          { label: 'Industry', value: selectedProject.category },
                          { label: 'Client', value: selectedProject.client }
                        ].map((stat) => (
                          <div key={stat.label} className="space-y-1">
                            <p className="text-sm text-white/60">{stat.label}</p>
                            <p className="text-white font-medium">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Gallery */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-white">Project Gallery</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, index) => (
                        <motion.div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden 
                            border border-white/10 hover:border-light-blue/30 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Image
                            src={selectedProject.image}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="flex justify-between items-center pt-8 border-t border-white/10">
                    <div>
                      <p className="text-white/60 mb-2">Interested in similar projects?</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-light-blue hover:underline flex items-center gap-2"
                      >
                        Contact Us
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </div>
                    <div className="flex gap-4">
                      {/* Social Share Buttons */}
                      {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                        <motion.button
                          key={platform}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                            transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA with better mobile spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center px-4"
        >
          <p className="text-white/60 mb-6">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-full 
              text-white font-semibold relative overflow-hidden shadow-lg shadow-primary-purple/20"
          >
            <span className="relative z-10 flex items-center">
              Explore All Projects
              <motion.svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
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

// Helper function to detect touch device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}; 