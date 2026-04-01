import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const ScrollProgress = ({ 
  position = 'top',
  height = 'h-1',
  color = 'from-[#C4A35A] to-[#B87C4B]',
  bgColor = 'bg-[#E8DCCC]/50',
  showPercentage = false,
  showOnMobile = true,
  threshold = 5,
  className = '',
  ...props 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = Math.abs(currentScrollY - lastScrollY);
          
          // Hide progress bar when at top or not scrolling
          if (scrollDiff < threshold && currentScrollY < 50) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          // Calculate progress
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalScroll > 0 ? (currentScrollY / totalScroll) * 100 : 0;
          setScrollProgress(currentProgress);
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Position styles
  const positionStyles = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0 w-1 h-auto flex-col',
    right: 'right-0 top-0 bottom-0 w-1 h-auto flex-col'
  };

  const isHorizontal = position === 'top' || position === 'bottom';
  const isVertical = position === 'left' || position === 'right';

  // Hide on mobile if needed
  if (!showOnMobile && window.innerWidth < 768) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && scrollProgress > 0.5 && (
        <Motion.div
          initial={{ opacity: 0, y: position === 'top' ? -20 : position === 'bottom' ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -20 : position === 'bottom' ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 ${positionStyles[position]} ${className}`}
          {...props}
        >
          {/* Progress Bar Container */}
          <div className={`
            ${isHorizontal ? 'w-full' : 'h-full'}
            ${bgColor}
            ${isHorizontal ? height : 'w-1'}
            overflow-hidden
          `}>
            {/* Progress Fill */}
            <Motion.div
              className={`
                bg-gradient-to-r ${color}
                ${isHorizontal ? height : 'w-full'}
                ${isVertical ? 'absolute bottom-0' : ''}
              `}
              style={{
                [isHorizontal ? 'width' : 'height']: `${scrollProgress}%`,
                [isHorizontal ? 'height' : 'width']: '100%'
              }}
              initial={{ [isHorizontal ? 'width' : 'height']: 0 }}
              animate={{ [isHorizontal ? 'width' : 'height']: `${scrollProgress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Percentage Display */}
          {showPercentage && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`
                fixed ${position === 'top' ? 'top-3' : position === 'bottom' ? 'bottom-3' : 'top-1/2'}
                ${position === 'left' ? 'left-6' : position === 'right' ? 'right-6' : 'right-6'}
                transform ${position === 'left' || position === 'right' ? '-translate-y-1/2' : ''}
                bg-[#4A2C2C]/80 backdrop-blur-sm
                text-white text-xs font-medium
                px-3 py-1.5 rounded-full
                shadow-lg
                z-50
              `}
            >
              {Math.round(scrollProgress)}%
            </Motion.div>
          )}
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== VARIATIONS ====================

// Thin progress bar (minimal)
export const ThinProgress = (props) => (
  <ScrollProgress height="h-0.5" bgColor="bg-[#E8DCCC]/30" {...props} />
);

// Thick progress bar (bold)
export const ThickProgress = (props) => (
  <ScrollProgress height="h-2" bgColor="bg-[#E8DCCC]/60" {...props} />
);

// Gold progress bar
export const GoldProgress = (props) => (
  <ScrollProgress color="from-[#C4A35A] to-[#C4A35A]" showPercentage={true} {...props} />
);

// Gradient progress bar
export const GradientProgress = (props) => (
  <ScrollProgress 
    color="from-[#C4A35A] via-[#B87C4B] to-[#C4A35A]" 
    height="h-1.5"
    showPercentage={true}
    {...props} 
  />
);

// Vertical progress bar (left side)
export const VerticalProgress = (props) => (
  <ScrollProgress position="left" showPercentage={true} {...props} />
);

export default ScrollProgress;