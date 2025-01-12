'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PortfolioStats {
  totalProjects: number;
  categories: number;
  clients: number;
  isLoading: boolean;
  error: string | null;
}

export function usePortfolioStats() {
  const [stats, setStats] = useState<PortfolioStats>({
    totalProjects: 50,
    categories: 50,
    clients: 50,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const projectsRef = collection(db, 'projects');
        const projectsSnap = await getDocs(projectsRef);
        
        const projects = projectsSnap.docs.map(doc => doc.data());
        
        setStats({
          totalProjects: 50,
          categories: 50,
          clients: 50,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load portfolio stats'
        }));
      }
    }

    fetchStats();
  }, []);

  return stats;
} 