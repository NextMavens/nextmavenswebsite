'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectStatus } from '@/lib/types/project';
import ProjectsList from '@/components/portal/customer/ProjectsList';
import { useAuthContext } from '@/lib/contexts/AuthContext';
import { FaFilter, FaSort, FaPlus } from 'react-icons/fa';

const statusFilters: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' }
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Project Name' },
  { value: 'status', label: 'Status' }
];

export default function ProjectsPage() {
  const { user } = useAuthContext();
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-white/60">Manage and track your projects</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {/* Handle new project */}}
          className="px-6 py-3 bg-gradient-to-r from-primary-purple to-light-blue 
            rounded-lg text-white flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          New Project
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white placeholder-white/40 focus:border-primary-purple focus:ring-1 
              focus:ring-primary-purple"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as ProjectStatus | 'all')}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white appearance-none cursor-pointer focus:border-primary-purple 
              focus:ring-1 focus:ring-primary-purple"
          >
            {statusFilters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white appearance-none cursor-pointer focus:border-primary-purple 
              focus:ring-1 focus:ring-primary-purple"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FaSort className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Projects List */}
      <ProjectsList
        userId={user.id}
        filter={activeFilter}
        sortBy={sortBy}
        searchQuery={searchQuery}
      />
    </div>
  );
} 