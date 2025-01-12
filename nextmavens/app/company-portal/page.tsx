'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CompanyDashboard from '@/components/portal/company/Dashboard';
import { useAuthContext } from '@/lib/contexts/AuthContext';
import { getUserProfile } from '@/lib/firebase';
import { UserProfile } from '@/lib/types/user';

export default function CompanyPortalPage() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      getUserProfile(user.id).then(setProfile);
    }
  }, [user]);

  if (!profile || profile.role !== 'companyadmin') {
    return <div>Access Denied</div>;
  }

  return (
    <ProtectedRoute>
      <CompanyDashboard profile={profile} />
    </ProtectedRoute>
  );
} 