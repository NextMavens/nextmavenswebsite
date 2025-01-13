'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <>
        {/* Main cursor */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            x: position.x - 6,  // Closer to the actual cursor position
            y: position.y - 6,  // Closer to the actual cursor position
            scale: isPointer ? 1.5 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-primary-purple/40 to-light-blue/40 
            pointer-events-none z-50 backdrop-blur-sm"
          transition={{
            type: "spring",
            mass: 0.3,
            stiffness: 300,  // Increased stiffness for more responsive follow
            damping: 12,  // Slightly reduced damping for smoother effect
          }}
        />
        
        {/* Trail cursor */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            x: position.x - 10, // Slightly adjusted for closer tracking
            y: position.y - 10, // Slightly adjusted for closer tracking
            scale: isPointer ? 1.5 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed w-6 h-6 rounded-full border border-light-blue/30 pointer-events-none z-50 backdrop-blur-sm"
          transition={{
            type: "spring",
            mass: 0.5,  // Adjusted mass for smoother trailing
            stiffness: 250, // Increased stiffness for better follow-up
            damping: 15,  // Increased damping for a smoother trail
          }}
        />
      </>
    </AnimatePresence>
  );
}
