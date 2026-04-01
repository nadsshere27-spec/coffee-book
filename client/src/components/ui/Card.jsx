import React from 'react';
import { motion as Motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  animate = true,
  ...props 
}) => {
  
  // Base styles
  const baseClasses = 'overflow-hidden transition-all duration-700 ease-out';
  
  // Premium variants with subtle gradients and borders
  const variants = {
    default: 'bg-white rounded-2xl shadow-md border border-[#E8DCCC]/30 hover:shadow-xl',
    cream: 'bg-[#FAF1E2] rounded-2xl shadow-md border border-[#E8DCCC]/40 hover:shadow-xl',
    glass: 'bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl',
    elevated: 'bg-white rounded-2xl shadow-xl hover:shadow-2xl',
    gold: 'bg-gradient-to-br from-[#C4A35A]/5 via-white to-[#B87C4B]/5 rounded-2xl border border-[#C4A35A]/20 hover:border-[#C4A35A]/40',
    dark: 'bg-[#2C1A1A] rounded-2xl shadow-md border border-[#4A2C2C] text-white'
  };
  
  // Animation variants for smooth entry
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    hover: {
      y: -8,
      scale: 1.01,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.3
      }
    }
  };
  
  return (
    <Motion.div
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : false}
      whileHover={hover ? "hover" : false}
      variants={cardVariants}
      viewport={{ once: true, amount: 0.2 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Motion.div>
  );
};

// ==================== CARD SUBCOMPONENTS ====================

Card.Image = ({ src, alt, className = '', overlay = true, zoom = true }) => (
  <div className="relative overflow-hidden group">
    <Motion.img 
      src={src} 
      alt={alt} 
      whileHover={zoom ? { scale: 1.08 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full h-56 object-cover ${className}`} 
    />
    {overlay && (
      <Motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />
    )}
  </div>
);

Card.Header = ({ children, className = '' }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-[#E8DCCC]/50 bg-gradient-to-r from-transparent to-[#FAF1E2]/20 ${className}`}>
    {children}
  </div>
);

Card.Title = ({ children, className = '' }) => (
  <Motion.h3 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className={`font-serif text-xl font-medium text-[#4A2C2C] tracking-tight ${className}`}
  >
    {children}
  </Motion.h3>
);

Card.Description = ({ children, className = '' }) => (
  <Motion.p 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.2 }}
    className={`text-sm text-[#7B4B3A] leading-relaxed mt-1 ${className}`}
  >
    {children}
  </Motion.p>
);

Card.Price = ({ children, className = '' }) => (
  <Motion.span 
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
    className={`text-lg font-semibold text-[#C4A35A] ${className}`}
  >
    RS {children}
  </Motion.span>
);

Card.Badge = ({ children, variant = 'gold', className = '' }) => {
  const badgeVariants = {
    gold: 'bg-[#C4A35A]/15 text-[#C4A35A] border border-[#C4A35A]/30',
    brown: 'bg-[#4A2C2C]/10 text-[#4A2C2C] border border-[#4A2C2C]/20',
    cream: 'bg-[#FAF1E2] text-[#7B4B3A] border border-[#E8DCCC]',
    outline: 'border border-[#C4A35A] text-[#C4A35A] bg-transparent hover:bg-[#C4A35A]/5'
  };
  
  return (
    <Motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={`inline-block px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 hover:scale-105 ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </Motion.span>
  );
};

// Staggered grid wrapper for multiple cards
Card.Grid = ({ children, className = '' }) => (
  <Motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    }}
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
  >
    {children}
  </Motion.div>
);

export default Card;