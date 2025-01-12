'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendToTelegram } from '@/lib/telegram';

interface FormData {

  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: ''
};

const services = [
  'Web Development',
  'Full-Stack Solutions',
  'SEO & Performance',
  'Graphic Design',
  'Video Editing',
  'Digital Marketing'
];

const budgetRanges = [
  'Less than $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'More than $50,000'
];

const timelines = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  'More than 6 months',
  'Not sure yet'
];

export default function QuotePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);


    try {
      const result = await sendToTelegram({
        subject: 'New Quote Request',
        name: formData.name,
        email: formData.email,
        message: `
Service: ${formData.service}
Company: ${formData.company}
Phone: ${formData.phone}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Message:
${formData.message}
        `
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0428] pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Get a Quote</h1>
          <p className="text-white/60 mb-8">
          Fill out the form below and we&apos;ll get back to you with a custom quote for your project.
          </p>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Service *</label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                  focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                    focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                >
                  <option value="">Select timeline</option>
                  {timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Project Details *</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white 
                  focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                placeholder="Tell us about your project..."
              />
            </div>

            {error && (
              <p className="text-red-400 animate-fade-in">
              {error}
              </p>
            )}

            {success && (
              <p className="text-green-400 animate-fade-in">
              Quote request sent successfully! Redirecting...
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue 
              rounded-xl text-white font-medium relative overflow-hidden group disabled:opacity-50
              hover:opacity-90 transition-opacity"
            >

              <span className="relative z-10">
              {isLoading ? 'Sending...' : 'Request Quote'}
              </span>
            </button>
            </form>
          </div>

      </div>
    </div>
  );
} 