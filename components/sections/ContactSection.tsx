'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  customBudget?: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const initialFormState: ContactForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  phone: '',
  budget: '',
  timeline: '',
  customBudget: ''
};

const services = [
  'Web Development',
  'Full-Stack Solutions',
  'SEO & Performance',
  'Graphic Design',
  'Video Editing',
  'Digital Marketing'
];

// Service-specific budget ranges
const serviceBudgets = {
  'Web Development': [
    'KSH 50,000 - 150,000',
    'KSH 150,000 - 300,000',
    'KSH 300,000 - 500,000',
    'KSH 500,000+',
    'Custom Amount'
  ],
  'Full-Stack Solutions': [
    'KSH 200,000 - 400,000',
    'KSH 400,000 - 800,000',
    'KSH 800,000 - 1,500,000',
    'KSH 1,500,000+',
    'Custom Amount'
  ],
  'SEO & Performance': [
    'KSH 30,000 - 80,000',
    'KSH 80,000 - 150,000',
    'KSH 150,000 - 300,000',
    'KSH 300,000+',
    'Custom Amount'
  ],
  'Graphic Design': [
    'KSH 20,000 - 50,000',
    'KSH 50,000 - 100,000',
    'KSH 100,000 - 200,000',
    'KSH 200,000+',
    'Custom Amount'
  ],
  'Video Editing': [
    'KSH 25,000 - 75,000',
    'KSH 75,000 - 150,000',
    'KSH 150,000 - 300,000',
    'KSH 300,000+',
    'Custom Amount'
  ],
  'Digital Marketing': [
    'KSH 40,000 - 100,000',
    'KSH 100,000 - 250,000',
    'KSH 250,000 - 500,000',
    'KSH 500,000+',
    'Custom Amount'
  ]
};

const timelines = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months'
];

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>(initialFormState);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          phone: formData.phone || 'Not provided',
          budget: formData.budget === 'Custom Amount' ? formData.customBudget : formData.budget,
          timeline: formData.timeline || 'Not specified',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
  
      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.',
        });
        setFormData(initialFormState);
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email us directly at contact@nextmavens.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'budget' && value !== 'Custom Amount') {
      setFormData(prev => ({
        ...prev,
        budget: value,
        customBudget: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.service && formData.company;
      case 3:
        return formData.message;
      default:
        return true;
    }
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const getBudgetRanges = () => {
    if (!formData.service) return [];
    return serviceBudgets[formData.service as keyof typeof serviceBudgets] || [];
  };
  
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      service: e.target.value,
      budget: '',
      customBudget: ''
    }));
  };
  
  const renderConnectionWarning = () => {
    if (false) {
      // Disabled warning message
      return null;
    }
    return null;
  };
  
  return (
    <section ref={ref} className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>
  
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm
              border border-white/10 relative group"
          >
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-purple/20 to-light-blue/20 blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm text-white/80 relative z-10">Get in Touch</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Digital Journey
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Ready to transform your digital presence? Let&apos;s create something amazing together.
          </p>
        </motion.div>
  
        <div className="max-w-2xl mx-auto">
          {renderConnectionWarning()}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 h-0.5 w-full bg-white/10 -translate-y-1/2" />
              {[1, 2, 3].map((stepNumber) => (
                <motion.div
                  key={stepNumber}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                    ${step >= stepNumber ? 'bg-light-blue' : 'bg-white/10'} 
                    transition-colors duration-300`}
                  animate={{
                    scale: step === stepNumber ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: step === stepNumber ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  <span className="text-white font-medium">{stepNumber}</span>
                </motion.div>
              ))}
            </div>
  
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                          transition-colors duration-200"
                        placeholder="John Doe"
                      />
                    </div>
  
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                          transition-colors duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                        text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                        transition-colors duration-200"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleServiceChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                          text-white focus:outline-none focus:border-light-blue
                          transition-colors duration-200"
                      >
                        <option value="" className="bg-[#0f0428]">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service} className="bg-[#0f0428]">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                          transition-colors duration-200"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.service && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
                          Budget Range for {formData.service}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleBudgetChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                            text-white focus:outline-none focus:border-light-blue
                            transition-colors duration-200"
                        >
                          <option value="" className="bg-[#0f0428]">Select budget range</option>
                          {getBudgetRanges().map(range => (
                            <option key={range} value={range} className="bg-[#0f0428]">
                              {range}
                            </option>
                          ))}
                        </select>

                        <AnimatePresence mode="wait">
                          {formData.budget === 'Custom Amount' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="relative mt-2">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                                  KSH
                                </span>
                                <input
                                  type="number"
                                  id="customBudget"
                                  name="customBudget"
                                  value={formData.customBudget}
                                  onChange={handleBudgetChange}
                                  placeholder="Enter amount"
                                  className="w-full pl-14 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                                    text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                                    transition-colors duration-200"
                                  min="0"
                                  step="1000"
                                />
                              </div>
                              <p className="text-xs text-white/60 mt-1">
                                Enter your specific budget amount in KSH
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                        text-white focus:outline-none focus:border-light-blue
                        transition-colors duration-200"
                    >
                      <option value="" className="bg-[#0f0428]">Select timeline</option>
                      {timelines.map(timeline => (
                        <option key={timeline} value={timeline} className="bg-[#0f0428]">
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                        text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                        transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 rounded-lg ${
                        status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-light-blue rounded-lg 
                      text-white font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        'Send Message'
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-white/5 rounded-lg text-white/80 hover:bg-white/10
                    transition-colors duration-200"
                >
                  Back
                </motion.button>
              )}
              
              {step < 3 && (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto px-6 py-2 bg-gradient-to-r from-primary-purple to-light-blue 
                    rounded-lg text-white font-medium"
                >
                  Next Step
                </motion.button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}