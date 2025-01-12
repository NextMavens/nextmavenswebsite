export type UserRole = 'customer' | 'companyadmin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'companyadmin';
  createdAt: string;
  updatedAt: string;
  photoURL?: string;
} 