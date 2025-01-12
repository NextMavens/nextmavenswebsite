'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
  const { user, loading, userRole } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && userRole) {
      const dashboardPath = userRole === 'companyadmin' ? '/company' : '/dashboard';
      router.replace(dashboardPath);
    }
  }, [user, loading, userRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
} 