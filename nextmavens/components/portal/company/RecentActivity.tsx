'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { formatDistanceToNow } from 'date-fns';
import { FaCircle } from 'react-icons/fa';

interface Props {
  projects: Project[];
}

export default function RecentActivity({ projects }: Props) {
  // Sort projects by most recent first and take last 10 activities
  const recentActivities = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  const getActivityDescription = (project: Project) => {
    switch (project.status) {
      case 'pending':
        return 'New project submitted';
      case 'in-progress':
        return 'Project started';
      case 'completed':
        return 'Project completed';
      case 'rejected':
        return 'Project rejected';
      default:
        return 'Project updated';
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'in-progress':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-white/60';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
    >
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
      </div>

      <div className="p-4 space-y-4">
        {recentActivities.map((project) => (
          <motion.div
            key={`${project.id}-${project.status}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-4"
          >
            <FaCircle className={`w-2 h-2 mt-2 ${getStatusColor(project.status)}`} />
            
            <div className="flex-1">
              <p className="text-white font-medium">{project.title}</p>
              <p className="text-sm text-white/60">{getActivityDescription(project)}</p>
              <p className="text-xs text-white/40 mt-1">
                {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 