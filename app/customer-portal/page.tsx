'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CustomerDashboard from '@/components/portal/customer/Dashboard';
import { useAuthContext } from '@/lib/contexts/AuthContext';
import { getUserProfile } from '@/lib/firebase';
import { UserProfile } from '@/lib/types/user';

export default function CustomerPortalPage() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      getUserProfile(user.id).then(setProfile);
    }
  }, [user]);

  if (!profile || profile.role !== 'customer') {
    return <div>Access Denied</div>;
  }

  return (
    <ProtectedRoute>
      <CustomerDashboard profile={profile} />
    </ProtectedRoute>
  );
} 