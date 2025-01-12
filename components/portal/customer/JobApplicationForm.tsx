'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadFiles } from '@/lib/telegram-storage';

interface Props {
  userId: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  timeline: string;
  attachments: File[];
}

const categories = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Digital Marketing',
  'Branding',
  'Other'
];

const budgetRanges = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+'
];

const timelines = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months'
];

export default function JobApplicationForm({ userId }: Props) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    budget: '',
    timeline: '',
    attachments: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload attachments to Telegram if any
      const attachmentUrls = formData.attachments.length > 0
        ? await uploadFiles(formData.attachments)
        : [];

      // Create application in Firestore
      const applicationRef = collection(db, 'applications');
      await addDoc(applicationRef, {
        userId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        budget: formData.budget,
        timeline: formData.timeline,
        attachments: attachmentUrls,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: '',
        budget: '',
        timeline: '',
        attachments: []
      });
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Application submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(e.target.files!)
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
    >
      <h2 className="text-2xl font-bold text-white mb-6">New Project Application</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-white/80 mb-2" htmlFor="title">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-white/80 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category} className="bg-[#0f0428]">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/80 mb-2" htmlFor="description">
            Project Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            required
          />
        </div>

        {/* Budget and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2" htmlFor="budget">
              Budget Range
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
              required
            >
              <option value="">Select budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range} className="bg-[#0f0428]">
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2" htmlFor="timeline">
              Timeline
            </label>
            <select
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
              required
            >
              <option value="">Select timeline</option>
              {timelines.map(timeline => (
                <option key={timeline} value={timeline} className="bg-[#0f0428]">
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-white/80 mb-2">
            Attachments (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
              text-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
          <p className="text-white/60 text-sm mt-1">
            Max 5 files. Supported formats: PDF, DOC, PNG, JPG
          </p>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400"
          >
            {error}
          </motion.p>
        )}

        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400"
          >
            Application submitted successfully!
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue 
            rounded-xl text-white font-medium relative overflow-hidden disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </form>
    </motion.div>
  );
} 