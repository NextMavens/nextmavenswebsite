'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  trend?: number;
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-purple/20 rounded-lg">
          <Icon className="w-6 h-6 text-primary-purple" />
        </div>
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <h4 className="text-2xl font-semibold text-white">{value}</h4>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 