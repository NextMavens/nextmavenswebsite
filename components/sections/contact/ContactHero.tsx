'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-[#0f0428] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,0,171,0.03)_1.5px,transparent_1.5px),linear-gradient(to_right,rgba(46,0,171,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0224] via-transparent to-[#0a0224] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s Create Something
            <span className="block mt-2 bg-gradient-to-r from-primary-purple to-light-blue text-transparent bg-clip-text">
              Amazing Together
            </span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Have a project in mind? We&apos;d love to hear about it. Let&apos;s discuss how we can help bring your ideas to life.
          </p>

          {/* Quick Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[{
              icon: FaEnvelope,
              label: 'Email Us',
              value: 'info@nextmavens.com',
              href: 'mailto:info@nextmavens.com'
            },
            {
              icon: FaPhone,
              label: 'Call Us',
              value: '+254 712 345 678',
              href: 'tel:+254712345678'
            },
            {
              icon: FaMapMarkerAlt,
              label: 'Visit Us',
              value: 'Nairobi, Kenya',
              href: '#location'
            }].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative group"
              >
                <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col items-center">
                    <item.icon className="w-6 h-6 text-primary-purple mb-3" />
                    <div className="text-sm text-white/60 mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
