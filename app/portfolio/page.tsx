'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectFilter } from '@/types/portfolio';
import Image from 'next/image';
import { FaGlobe, FaCode, FaTimes } from 'react-icons/fa';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<ProjectFilter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Websites' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'enterprise', name: 'Enterprise' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams(filters as Record<string, string>);
      const response = await fetch(`/api/portfolio?${params}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <section className="relative py-20 bg-[#0f0428] min-h-screen overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our
              <span className="bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
                {' '}Portfolio
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Explore our latest projects and see how we&apos;ve helped businesses transform their digital presence
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({ 
                  ...filters, 
                  category: category.id === 'all' ? undefined : category.id 
                })}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  ${filters.category === category.id || (category.id === 'all' && !filters.category)
                    ? 'bg-gradient-to-r from-primary-purple to-light-blue text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
            </div>
          )}

          {/* Portfolio Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={project.imageUrls[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="absolute bottom-0 p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-white/60 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-sm bg-white/10 rounded-full text-white/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-[#0f0428] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white/60 
                  hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <FaTimes size={20} />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Image Carousel */}
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={selectedProject.imageUrls[0]}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/60">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-white/10 rounded-full text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.testimonial && (
                    <div className="bg-white/5 rounded-xl p-6">
                      <p className="text-white/80 italic mb-4">
                      &ldquo;{selectedProject.testimonial.text}&rdquo;
                      </p>
                      <div>
                      <p className="text-white font-medium">
                        {selectedProject.testimonial.author}
                      </p>
                      <p className="text-white/60 text-sm">
                        {selectedProject.testimonial.position}
                      </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4">
                    {selectedProject.projectUrl && (
                      <motion.a
                        href={selectedProject.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
                          from-primary-purple to-light-blue rounded-xl text-white font-medium"
                      >
                        <FaGlobe />
                        Visit Website
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewUrl(selectedProject.projectUrl || null)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 
                        hover:bg-white/20 rounded-xl text-white font-medium"
                    >
                      <FaCode />
                      Preview
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Preview Modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-7xl bg-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 
                  hover:bg-black/40 transition-all duration-300"
              >
                <FaTimes size={20} />
              </button>
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="Website Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}