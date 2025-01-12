'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from '../shared/ProjectDetailsModal';
import { Project, ProjectStatus } from '@/lib/types/project';

interface Props {
  userId: string;
  filter?: ProjectStatus | 'all';
  sortBy?: string;
  searchQuery?: string;
}

export default function ProjectsList({ userId, filter = 'all', sortBy = 'newest', searchQuery = '' }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectsRef = collection(db, 'applications');
    const constraints = [where('userId', '==', userId)];
    
    if (filter !== 'all') {
      constraints.push(where('status', '==', filter));
    }

    const projectsQuery = query(
      projectsRef,
      ...constraints,
      orderBy(sortBy === 'newest' ? 'createdAt' : 'updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        let projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        } as Project));

        // Apply search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          projectsData = projectsData.filter(project => 
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query)
          );
        }

        // Apply sort
        if (sortBy === 'title') {
          projectsData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'status') {
          projectsData.sort((a, b) => a.status.localeCompare(b.status));
        }

        setProjects(projectsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, filter, sortBy, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <motion.div
          className="w-12 h-12 border-4 border-primary-purple border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary-purple hover:text-light-blue mt-2"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 