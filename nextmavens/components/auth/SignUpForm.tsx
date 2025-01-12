'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, createUserProfile } from '@/lib/firebase';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { UserRole } from '@/lib/types/user';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: '' as UserRole
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.role) {
      setError("Please select your role");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await createUserProfile(
        user.uid,
        formData.email,
        formData.name,
        formData.role
      );

      router.push('/quote');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!formData.role) {
      setError("Please select your role before signing up with Google");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      
      await createUserProfile(
        user.uid,
        user.email!,
        user.displayName || formData.name,
        formData.role
      );

      router.push('/quote');
    } catch (err: any) {
      setError('Google sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
        rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300 -z-10" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-white/60 mb-6">Join us and start building amazing projects</p>

        {/* Google Sign Up Button - Moved to top for better visibility */}
        <motion.button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full px-8 py-4 mb-6 bg-white/5 hover:bg-white/10 border border-white/10 
            rounded-xl text-white font-medium flex items-center justify-center gap-2 
            transition-all duration-300 relative z-10 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGoogle className="group-hover:scale-110 transition-transform duration-300" />
          Sign up with Google
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-light-blue/20 rounded-xl opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 -z-10"
          />
        </motion.button>

        <div className="relative my-6 z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0f0428] text-white/60">Or sign up with email</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection - Add this before name input */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'customer' })}
              className={`px-6 py-4 rounded-xl font-medium relative overflow-hidden
                ${formData.role === 'customer' 
                  ? 'bg-gradient-to-r from-primary-purple to-light-blue text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                } transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Customer
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'companyadmin' })}
              className={`px-6 py-4 rounded-xl font-medium relative overflow-hidden
                ${formData.role === 'companyadmin'
                  ? 'bg-gradient-to-r from-primary-purple to-light-blue text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                } transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Company Admin
            </motion.button>
          </div>

          {/* Name Input */}
          <div className="relative group">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none
              group-focus-within:text-primary-purple transition-colors duration-300" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-12 py-4 bg-white/5 rounded-xl text-white placeholder:text-white/60
                border border-white/10 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple 
                transition-all duration-300 relative z-10"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none
              group-focus-within:text-primary-purple transition-colors duration-300" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-12 py-4 bg-white/5 rounded-xl text-white placeholder:text-white/60
                border border-white/10 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple 
                transition-all duration-300 relative z-10"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none
              group-focus-within:text-primary-purple transition-colors duration-300" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-12 py-4 bg-white/5 rounded-xl text-white placeholder:text-white/60
                border border-white/10 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple 
                transition-all duration-300 relative z-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-20"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none
              group-focus-within:text-primary-purple transition-colors duration-300" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-12 py-4 bg-white/5 rounded-xl text-white placeholder:text-white/60
                border border-white/10 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple 
                transition-all duration-300 relative z-10"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm relative z-10"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue 
              rounded-xl text-white font-medium relative overflow-hidden group z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Sign In Link */}
          <div className="text-center text-white/60 relative z-10">
            Already have an account?{' '}
            <Link
              href="/auth?mode=signin"
              className="text-white hover:text-primary-purple transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 