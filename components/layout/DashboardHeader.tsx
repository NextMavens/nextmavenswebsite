'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';

export function DashboardHeader() {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect is handled by AuthContext
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-white/10 h-16 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <button className="text-white/70 hover:text-white">
          <FaBell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <FaUserCircle className="w-6 h-6 text-white/70" />
          <span className="text-white">{user?.email}</span>
        </div>
        <button 
          onClick={handleSignOut}
          className="text-white/70 hover:text-white flex items-center gap-2"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
} 