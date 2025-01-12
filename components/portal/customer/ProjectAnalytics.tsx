'use client';

import SpendingTrendsChart from './charts/SpendingTrendsChart';
import ProjectStatusDistribution from './charts/ProjectStatusDistribution';
import TimelineAnalysis from './charts/TimelineAnalysis';
import CategoryBreakdown from './charts/CategoryBreakdown';

export default function ProjectAnalytics() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SpendingTrendsChart />
      <ProjectStatusDistribution />
      <TimelineAnalysis />
      <CategoryBreakdown />
    </div>
  );
} 