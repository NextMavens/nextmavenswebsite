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
            x: position.x - 8,
            y: position.y - 8,
            scale: isPointer ? 1.5 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-primary-purple/40 to-light-blue/40 
            pointer-events-none z-50 backdrop-blur-sm"
          transition={{
            type: "spring",
            mass: 0.3,
            stiffness: 100,
            damping: 10,
          }}
        />
        
        {/* Trail cursor */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            x: position.x - 16,
            y: position.y - 16,
            scale: isPointer ? 1.5 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed w-8 h-8 rounded-full border border-light-blue/30 pointer-events-none z-50 backdrop-blur-sm"
          transition={{
            type: "spring",
            mass: 0.7,
            stiffness: 50,
            damping: 10,
          }}
        />
      </>
    </AnimatePresence>
  );
} 