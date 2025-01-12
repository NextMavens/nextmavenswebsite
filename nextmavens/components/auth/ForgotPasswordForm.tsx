'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
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
      <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
      
      {success ? (
        <div className="text-center">
          <p className="text-white mb-4">
            Password reset email sent! Check your inbox for further instructions.
          </p>
          <Link
            href="/auth?mode=signin"
            className="text-primary-purple hover:text-light-blue transition-colors duration-300"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-12 py-4 bg-white/5 rounded-xl text-white placeholder:text-white/60
                border border-white/10 focus:border-white/20 transition-colors duration-300"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue 
              rounded-xl text-white font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Sending...' : 'Reset Password'}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          <div className="text-center text-white/60">
            Remember your password?{' '}
            <Link
              href="/auth?mode=signin"
              className="text-white hover:text-primary-purple transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
} 