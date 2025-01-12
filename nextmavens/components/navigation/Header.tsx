'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { FaTimes, FaBars, FaChevronDown } from 'react-icons/fa';

const menuItems = [
  { 
    name: 'Services', 
    href: '/services',
    subItems: [
      { name: 'Web Development', href: '/services?service=web-development' },
      { name: 'Full-Stack Solutions', href: '/services?service=full-stack' },
      { name: 'SEO & Performance', href: '/services?service=seo' },
      { name: 'Graphic Design', href: '/services?service=design' },
      { name: 'Video Editing', href: '/services?service=video' },
      { name: 'Digital Marketing', href: '/services?service=marketing' }
    ]
  },
  { 
    name: 'Portfolio', 
    href: '/portfolio' 
  },
  { 
    name: 'About Us', 
    href: '/about',
    subItems: [
      { name: 'Our Story', href: '/about#story' },
      { name: 'Team', href: '/about#team' },
      { name: 'Mission', href: '/about#mission' }
    ]
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-[#0f0428]/95 backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                  {item.subItems && (
                    <FaChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#0f0428]/95 backdrop-blur-sm 
                    rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 
                    translate-y-2"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 
                          first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Get Quote Button */}
            <motion.button
              onClick={() => router.push('/quote')}
              className="px-6 py-2 bg-gradient-to-r from-primary-purple to-light-blue 
                rounded-lg text-white relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Quote</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-white" />
            ) : (
              <FaBars className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-[#0f0428]/95 backdrop-blur-sm rounded-xl 
                border border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {menuItems.map((item) => (
                  <div key={item.href} className="space-y-2">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-white/80 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="ml-4 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-white/60 hover:text-white transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Get Quote Button */}
                <Link
                  href="/quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 bg-gradient-to-r from-primary-purple to-light-blue 
                    rounded-lg text-white text-center"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
