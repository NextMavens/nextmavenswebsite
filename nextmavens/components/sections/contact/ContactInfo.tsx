'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaClock, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactDetail {
  icon: typeof FaClock;
  title: string;
  details: string[];
  action?: {
    label: string;
    href: string;
  };
}

const contactDetails: ContactDetail[] = [
  {
    icon: FaClock,
    title: 'Business Hours',
    details: [
      'Monday - Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 1:00 PM',
      'Sunday: Closed'
    ]
  },
  {
    icon: FaPhoneAlt,
    title: 'Phone Numbers',
    details: [
      '+254 712 345 678',
      '+254 734 567 890'
    ],
    action: {
      label: 'Call Now',
      href: 'tel:+254712345678'
    }
  },
  {
    icon: FaEnvelope,
    title: 'Email Addresses',
    details: [
      'info@nextmavens.com',
      'support@nextmavens.com'
    ],
    action: {
      label: 'Send Email',
      href: 'mailto:info@nextmavens.com'
    }
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Office Location',
    details: [
      'Westlands Business Center',
      'Floor 3, Suite 304',
      'Nairobi, Kenya'
    ],
    action: {
      label: 'Get Directions',
      href: '#location'
    }
  }
];

export default function ContactInfo() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {contactDetails.map((detail, index) => (
        <motion.div
          key={detail.title}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
            border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-purple to-light-blue 
                flex items-center justify-center shrink-0">
                <detail.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {detail.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {detail.details.map((item, idx) => (
                    <p key={idx} className="text-white/60">
                      {item}
                    </p>
                  ))}
                </div>
                {detail.action && (
                  <motion.a
                    href={detail.action.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-primary-purple hover:text-light-blue 
                      transition-colors duration-300"
                  >
                    {detail.action.label}
                    <svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
            rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
} 