'use client';

import { useState, useEffect } from 'react';
import { FaProjectDiagram, FaMoneyBillWave, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import StatCard from '../shared/StatCard';

export default function ProjectOverview() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSpent: 0,
    activeProjects: 0,
    completedProjects: 0
  });

  useEffect(() => {
    // Fetch stats from your API
    // Update stats using setStats
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon={FaProjectDiagram}
        trend={15}
      />
      <StatCard
        title="Total Spent"
        value={`KES ${stats.totalSpent.toLocaleString()}`}
        icon={FaMoneyBillWave}
        trend={25}
      />
      <StatCard
        title="Active Projects"
        value={stats.activeProjects}
        icon={FaSpinner}
      />
      <StatCard
        title="Completed Projects"
        value={stats.completedProjects}
        icon={FaCheckCircle}
      />
    </div>
  );
} 