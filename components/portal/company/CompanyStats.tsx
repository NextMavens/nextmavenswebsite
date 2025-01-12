'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { FaProjectDiagram, FaUserClock, FaCheckCircle, FaClock } from 'react-icons/fa';

interface Props {
  projects: Project[];
}

export default function AdminStats({ projects }: Props) {
  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FaProjectDiagram,
      color: 'from-blue-500/20 to-blue-600/20',
      textColor: 'text-blue-400',
    },
    {
      label: 'In Progress',
      value: projects.filter(p => p.status === 'in-progress').length,
      icon: FaUserClock,
      color: 'from-yellow-500/20 to-yellow-600/20',
      textColor: 'text-yellow-400',
    },
    {
      label: 'Completed',
      value: projects.filter(p => p.status === 'completed').length,
      icon: FaCheckCircle,
      color: 'from-green-500/20 to-green-600/20',
      textColor: 'text-green-400',
    },
    {
      label: 'Pending',
      value: projects.filter(p => p.status === 'pending').length,
      icon: FaClock,
      color: 'from-purple-500/20 to-purple-600/20',
      textColor: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div>
                <p className="text-sm text-white/60">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 