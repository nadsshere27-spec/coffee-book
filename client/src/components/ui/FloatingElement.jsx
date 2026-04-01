import React from 'react';
import { motion as Motion } from 'framer-motion';

const FloatingElement = ({ 
  children,
  amplitude = 8,
  duration = 3,
  delay = 0,
  direction = 'vertical',
  hoverAmplify = true,
  className = '',
  ...props 
}) => {
  
  const floatingVariants = {
    vertical: {
      y: [0, -amplitude, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut', delay }
    },
    horizontal: {
      x: [0, amplitude, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut', delay }
    },
    diagonal: {
      x: [0, amplitude * 0.7, 0],
      y: [0, -amplitude * 0.7, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut', delay }
    },
    rotate: {
      rotate: [0, amplitude * 0.5, 0, -amplitude * 0.5, 0],
      transition: { duration: duration * 1.5, repeat: Infinity, ease: 'easeInOut', delay }
    },
    scale: {
      scale: [1, 1.02, 1, 0.98, 1],
      transition: { duration, repeat: Infinity, ease: 'easeInOut', delay }
    }
  };

  return (
    <Motion.div
      animate={floatingVariants[direction]}
      whileHover={hoverAmplify ? { scale: 1.05, transition: { duration: 0.3 } } : {}}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
};

// ==================== PRESET VARIANTS ====================

export const FloatingCoffee = ({ className = '' }) => (
  <FloatingElement direction="vertical" amplitude={6} duration={3}>
    <span className={`text-5xl ${className}`}>☕</span>
  </FloatingElement>
);

export const FloatingBook = ({ className = '' }) => (
  <FloatingElement direction="rotate" amplitude={5} duration={4}>
    <span className={`text-5xl ${className}`}>📖</span>
  </FloatingElement>
);

export default FloatingElement;