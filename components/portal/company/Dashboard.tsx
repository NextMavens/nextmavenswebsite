'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project } from '@/lib/types/project';
import CompanyStats from './CompanyStats';
import ProjectsOverview from './ProjectsOverview';
import RecentActivity from './RecentActivity';
import { UserProfile } from '@/lib/types/user';

interface Props {
  profile: UserProfile;
}

export default function CompanyDashboard({ profile }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsQuery = query(
      collection(db, 'applications'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as Project));
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-primary-purple border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Company Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <CompanyStats projects={projects} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Projects Overview */}
        <ProjectsOverview projects={projects} />

        {/* Recent Activity */}
        <RecentActivity projects={projects} />
      </div>
    </div>
  );
} 
