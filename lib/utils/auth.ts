import { UserProfile } from '@/lib/types/user';

export const getDashboardPath = (user: UserProfile | null) => {
  if (!user) return '/auth';
  
  switch (user.role) {
    case 'customer':
      return '/dashboard';
    case 'companyadmin':
      return '/company';
    default:
      return '/auth';
  }
}; 