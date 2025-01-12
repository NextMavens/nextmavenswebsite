'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  budget: string;
  services: string[];
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  budget: '',
  services: []
};

const serviceOptions = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'E-commerce',
  'Digital Marketing',
  'SEO Optimization'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Over $50,000'
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative z-10 p-8 bg-white/5 backdrop-blur-sm rounded-xl 
        border border-white/10 hover:bg-white/10 transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-6">
          Let's Start Your Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                  focus:ring-primary-purple transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                  focus:ring-primary-purple transition-all duration-300"
              />
            </div>
          </div>

          {/* Phone & Subject Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 mb-2" htmlFor="phone">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                  focus:ring-primary-purple transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                  focus:ring-primary-purple transition-all duration-300"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-white/80 mb-2">
              Services Interested In
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="hidden"
                  />
                  <div className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 
                    ${formData.services.includes(service)
                      ? 'bg-primary-purple border-primary-purple text-white'
                      : 'border-white/10 text-white/60 group-hover:border-primary-purple/50'
                    }`}
                  >
                    {service}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-white/80 mb-2" htmlFor="budget">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                focus:ring-primary-purple transition-all duration-300"
            >
              <option value="">Select a budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white/80 mb-2" htmlFor="message">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                text-white focus:border-primary-purple focus:outline-none focus:ring-1 
                focus:ring-primary-purple transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue 
              rounded-xl text-white font-medium relative overflow-hidden group disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Status Messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}
            >
              {submitStatus === 'success'
                ? 'Message sent successfully! We\'ll get back to you soon.'
                : 'Failed to send message. Please try again.'}
            </motion.div>
          )}
        </form>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
        rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
    </motion.div>
  );
} 