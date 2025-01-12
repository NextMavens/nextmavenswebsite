'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

interface ContactInfo {
  icon: typeof FaMapMarkerAlt;
  title: string;
  details: string[];
}

const contactInfo: ContactInfo[] = [
  {
    icon: FaMapMarkerAlt,
    title: 'Our Location',
    details: [
      'Nairobi, Kenya',
      'Westlands Business Center',
      'Floor 3, Suite 304'
    ]
  },
  {
    icon: FaPhone,
    title: 'Contact Numbers',
    details: [
      '+254 712 345 678',
      '+254 734 567 890'
    ]
  },
  {
    icon: FaEnvelope,
    title: 'Email Address',
    details: [
      'info@nextmavens.com',
      'support@nextmavens.com'
    ]
  },
  {
    icon: FaClock,
    title: 'Working Hours',
    details: [
      'Monday - Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ]
  }
];

export default function OurLocation() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="location" className="relative py-20 bg-[#0f0428] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Visit Our Office
          </h2>
          
          <p className="text-white/60 text-lg mb-12 text-center">
            Come meet us in person and let's discuss your project
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative z-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl 
                  border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-purple to-light-blue 
                      flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-white/60">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 relative rounded-xl overflow-hidden aspect-[16/9]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818396737542!2d36.81196!3d-1.263319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNDguMCJTIDM2wrA0OCc0My4xIkU!5e0!3m2!1sen!2ske!4v1635444444444!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 