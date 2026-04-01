import React from 'react';
import { motion as Motion } from 'framer-motion';

// Custom easing curve for butter-smooth transitions
const customEasing = [0.22, 1, 0.36, 1];

const PageTransition = ({ children }) => {
  return (
    <Motion.div
      initial={{ 
        opacity: 0, 
        y: 16,
        scale: 0.98,
        filter: 'blur(4px)'
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      exit={{ 
        opacity: 0, 
        y: -16,
        scale: 0.98,
        filter: 'blur(4px)'
      }}
      transition={{
        duration: 0.55,
        ease: customEasing,
        opacity: { duration: 0.4 },
        y: { duration: 0.55 },
        scale: { duration: 0.45 },
        filter: { duration: 0.45 },
      }}
    >
      {children}
    </Motion.div>
  );
};

export default PageTransition;