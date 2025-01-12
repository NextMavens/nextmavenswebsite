'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, ProjectStatus } from '@/lib/types/project';

interface Props {
  project: Project;
  onStatusChange?: (newStatus: ProjectStatus) => void;
}

const statusOptions: { value: ProjectStatus; label: string; color: string }[] = [
  { 
    value: 'pending', 
    label: 'Pending Review',
    color: 'bg-yellow-500/20 text-yellow-400'
  },
  { 
    value: 'in-progress', 
    label: 'In Progress',
    color: 'bg-blue-500/20 text-blue-400'
  },
  { 
    value: 'completed', 
    label: 'Completed',
    color: 'bg-green-500/20 text-green-400'
  },
  { 
    value: 'rejected', 
    label: 'Rejected',
    color: 'bg-red-500/20 text-red-400'
  }
];

export default function ProjectStatusManager({ project, onStatusChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    if (newStatus === project.status) return;
    
    setLoading(true);
    setError(null);

    try {
      const projectRef = doc(db, 'applications', project.id);
      await updateDoc(projectRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });

      onStatusChange?.(newStatus);
    } catch (err) {
      console.error('Error updating project status:', err);
      setError('Failed to update project status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            disabled={loading || project.status === option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${project.status === option.value
                ? option.color
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-white/60"
        >
          <div className="w-4 h-4 border-2 border-primary-purple border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Updating status...</span>
        </motion.div>
      )}
    </div>
  );
} 