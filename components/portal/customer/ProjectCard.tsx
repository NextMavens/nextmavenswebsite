'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Project } from '@/lib/types/project';

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 
        hover:bg-white/10 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-purple 
          transition-colors line-clamp-2"
        >
          {project.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs
          ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
            project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
            project.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <p className="text-white/60 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex justify-between items-center text-sm">
        <span className="text-white/40">
          {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
        </span>
        <motion.span
          className="text-primary-purple group-hover:text-light-blue flex items-center gap-1"
          whileHover={{ x: 5 }}
        >
          View Details
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.span>
      </div>
    </motion.div>
  );
} 