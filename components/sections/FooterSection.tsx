'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaFacebookF,
  FaPhoneAlt
} from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

interface NewsletterStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' }
];

const services = [
  'Web Development',
  'Full-Stack Solutions',
  'SEO & Performance',
  'Graphic Design',
  'Video Editing',
  'Digital Marketing'
];

const socialLinks = [
  { 
    name: 'Twitter', 
    icon: FaTwitter, 
    href: 'https://twitter.com/nextmavens',
    color: '#1DA1F2'
  },
  { 
    name: 'LinkedIn', 
    icon: FaLinkedinIn, 
    href: 'https://linkedin.com/company/nextmavens',
    color: '#0A66C2'
  },
  { 
    name: 'Instagram', 
    icon: FaInstagram, 
    href: 'https://instagram.com/nextmavens',
    color: '#E4405F'
  },
  { 
    name: 'Facebook', 
    icon: FaFacebookF, 
    href: 'https://facebook.com/nextmavens',
    color: '#1877F2'
  }
];

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        timestamp: serverTimestamp()
      });

      setStatus({
        type: 'success',
        message: 'Successfully subscribed to our newsletter!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#0f0428] pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Updated with
                <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
                  Next Mavens
                </span>
              </h3>
              <p className="text-white/60">
                Subscribe to our newsletter for the latest updates and insights
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                    text-white placeholder-white/40 focus:outline-none focus:border-light-blue
                    transition-colors duration-200"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-primary-purple to-light-blue rounded-lg 
                    text-white font-medium relative overflow-hidden disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>
              
              {status.type && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm ${
                    status.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {status.message}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/assets/about-section/footer-logo.png"
                alt="Next Mavens"
                width={150}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-white/60">
              Transforming ideas into digital excellence. Your trusted partner for innovative web solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: social.color 
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                    transition-colors duration-200 group"
                >
                  <social.icon 
                    className="w-5 h-5 text-white/60 group-hover:text-white
                      transition-colors duration-200" 
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MdLocationOn className="w-6 h-6 text-light-blue shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-3">
                <MdEmail className="w-6 h-6 text-light-blue shrink-0" />
                <span>contact@nextmavens.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="w-6 h-6 text-light-blue shrink-0" />
                <span>+254 700 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Next Mavens. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 