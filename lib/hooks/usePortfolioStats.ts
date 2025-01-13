import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PortfolioStats {
  totalProjects: number;
  categories: number;
  clients: number;
  isLoading: boolean;
}

export function usePortfolioStats() {
  const [stats, setStats] = useState<PortfolioStats>({
    totalProjects: 50,
    categories: 50,
    clients: 50,
    isLoading: true
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const projectsRef = collection(db, 'projects');
        const projectsSnap = await getDocs(projectsRef);

        const totalProjects = projectsSnap.size;
        setStats({
          totalProjects,
          categories: 50, 
          clients: 50,    
          isLoading: false
        });
      } catch {
        setStats(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    }

    fetchStats();
  }, []);

  return stats;
}
