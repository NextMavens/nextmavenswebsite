'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import JobApplicationForm from './JobApplicationForm';
import ProjectsList from './ProjectsList';
import MessagesSection from './MessagesSection';
import { UserProfile } from '@/lib/types/user';
import { Project } from '@/lib/types/project';
import { FaPlus, FaList, FaComments, FaFileAlt } from 'react-icons/fa';

interface Props {
  profile: UserProfile;
}

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
}

export default function CustomerDashboard({ profile }: Props) {
  const [activeTab, setActiveTab] = useState('projects');
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projectsRef = collection(db, 'applications');
        const projectsQuery = query(
          projectsRef,
          where('userId', '==', profile.id),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(projectsQuery);
        const projects = snapshot.docs.map(doc => ({ ...doc.data() } as Project));

        setStats({
          totalProjects: projects.length,
          activeProjects: projects.filter(p => p.status === 'in-progress').length,
          completedProjects: projects.filter(p => p.status === 'completed').length,
          pendingProjects: projects.filter(p => p.status === 'pending').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [profile.id]);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FaList },
    { id: 'messages', label: 'Messages', icon: FaComments },
    { id: 'new-application', label: 'New Application', icon: FaFileAlt },
  ];

  return (
    <div className="min-h-screen bg-[#0f0428] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {profile.name}
            </h1>
            <p className="text-white/60">
              Manage your projects and applications
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('new-application')}
            className="px-6 py-3 bg-gradient-to-r from-primary-purple to-light-blue 
              rounded-lg text-white mt-4 md:mt-0 flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            New Application
          </motion.button>
        </div>

        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-white/60 text-sm mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-white/60 text-sm mb-2">Active Projects</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.activeProjects}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-white/60 text-sm mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-400">{stats.completedProjects}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-white/60 text-sm mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-400">{stats.pendingProjects}</p>
            </motion.div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-white/60 hover:text-white transition-colors flex items-center gap-2
                  ${activeTab === tab.id ? 'border-b-2 border-primary-purple text-white' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeTab === 'projects' && <ProjectsList userId={profile.id} />}
            {activeTab === 'messages' && <MessagesSection userId={profile.id} />}
            {activeTab === 'new-application' && <JobApplicationForm userId={profile.id} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 