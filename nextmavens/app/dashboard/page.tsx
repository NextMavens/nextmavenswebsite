'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import ProjectOverview from '@/components/portal/customer/ProjectOverview';
import ProjectAnalytics from '@/components/portal/customer/ProjectAnalytics';
import InvoicesList from '@/components/portal/customer/InvoicesList';

export default function CustomerDashboard() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Welcome back, {user?.displayName || 'Customer'}</h1>
      
      {/* Stats Overview */}
      <ProjectOverview />
      
      {/* Analytics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Analytics</h2>
        <ProjectAnalytics />
      </div>
      
      {/* Recent Invoices */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Recent Invoices</h2>
        <InvoicesList />
      </div>
    </div>
  );
} 