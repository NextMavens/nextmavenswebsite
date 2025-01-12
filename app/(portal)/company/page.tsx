'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import CompanyDashboard from '@/components/portal/company/Dashboard';

export default function CompanyPage() {
  const { user } = useAuthContext();
  
  if (!user || user.role !== 'companyadmin') {
    return <div>Access Denied</div>;
  }

  return <CompanyDashboard profile={user} />;
}
