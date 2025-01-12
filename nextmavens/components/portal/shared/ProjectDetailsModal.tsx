'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Project } from '@/lib/types/project';
import ProjectStatusManager from './ProjectStatusManager';
import { FaTimes } from 'react-icons/fa';

interface Props {
  project: Project;
  onClose: () => void;
  isCompanyAdmin?: boolean;
}

export default function ProjectDetailsModal({ project, onClose, isCompanyAdmin }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0f0428] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0f0428] p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Status */}
          <div>
            <h3 className="text-white/80 font-medium mb-3">Status</h3>
            {isCompanyAdmin ? (
              <ProjectStatusManager project={project} />
            ) : (
              <span className={`inline-block px-3 py-1 rounded-full text-sm
                ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                  project.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            )}
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-white/80 font-medium mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 text-sm">Category</p>
                <p className="text-white">{project.category}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Budget</p>
                <p className="text-white">{project.budget}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Timeline</p>
                <p className="text-white">{project.timeline}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Submitted</p>
                <p className="text-white">
                  {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h3 className="text-white/80 font-medium mb-3">Description</h3>
            <p className="text-white/80 whitespace-pre-wrap">{project.description}</p>
          </div>

          {/* Project Attachments */}
          {project.attachments && project.attachments.length > 0 && (
            <div>
              <h3 className="text-white/80 font-medium mb-3">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {project.attachments.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm
                      text-primary-purple hover:text-light-blue transition-colors"
                  >
                    Attachment {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 