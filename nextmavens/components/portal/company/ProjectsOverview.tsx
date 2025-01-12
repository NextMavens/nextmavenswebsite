'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Props {
  projects: Project[];
}

export default function ProjectsOverview({ projects }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<'all' | Project['status']>('all');

  const filteredProjects = selectedStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === selectedStatus);

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Projects Overview</h2>
          <Link
            href="/admin/projects"
            className="text-sm text-primary-purple hover:text-light-blue transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['all', 'pending', 'in-progress', 'completed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as 'all' | Project['status'])}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedStatus === status
                  ? 'bg-primary-purple/20 text-primary-purple'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {filteredProjects.slice(0, 5).map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">{project.title}</h3>
                <p className="text-sm text-white/60 mt-1">
                  {project.description.slice(0, 100)}...
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-white/40">
                    {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 