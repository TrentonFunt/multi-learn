import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 30,
          scale: 0.98
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        exit={{ 
          opacity: 0, 
          y: -30,
          scale: 1.02
        }}
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth animation
          opacity: { duration: 0.3 },
          scale: { duration: 0.4 }
        }}
        style={{ minHeight: '100vh' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
