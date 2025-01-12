'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project } from '@/lib/types/project';
import MessagingInterface from '../shared/MessagingInterface';

interface Props {
  companyId: string;
}

export default function CustomerMessages({ companyId }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'applications');
        const projectsQuery = query(
          projectsRef,
          where('assignedTo', '==', companyId),
          orderBy('updatedAt', 'desc')
        );

        const snapshot = await getDocs(projectsQuery);
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Project));

        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [companyId]);

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-12 h-full gap-4">
        {/* Projects Sidebar */}
        <div className="col-span-3 bg-white/5 rounded-lg p-4 overflow-y-auto">
          <h3 className="text-white font-medium mb-4">Active Projects</h3>
          <div className="space-y-2">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors
                  ${selectedProjectId === project.id 
                    ? 'bg-primary-purple/20 text-white' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                <h4 className="font-medium truncate">{project.title}</h4>
                <p className="text-sm opacity-60 truncate">
                  {project.category}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs
                    ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      project.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messaging Interface */}
        <div className="col-span-9 bg-white/5 rounded-lg">
          {selectedProjectId ? (
            <MessagingInterface
              projectId={selectedProjectId}
              role="companyadmin"
              userId={companyId}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              Select a project to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 