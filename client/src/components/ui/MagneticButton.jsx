import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';

const MagneticButton = ({ 
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  strength = 0.3,
  className = '',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e) => {
    if (!magnetic || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) * strength;
    const deltaY = (mouseY - centerY) * strength;
    
    // Limit movement
    const maxMove = 20;
    setPosition({
      x: Math.min(Math.max(deltaX, -maxMove), maxMove),
      y: Math.min(Math.max(deltaY, -maxMove), maxMove)
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Button variants
  const variants = {
    primary: 'bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] text-white shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-[#C4A35A] text-[#C4A35A] hover:bg-[#C4A35A] hover:text-white',
    outline: 'border border-[#4A2C2C] text-[#4A2C2C] hover:bg-[#4A2C2C] hover:text-white',
    ghost: 'text-[#4A2C2C] hover:bg-[#FAF1E2]',
    dark: 'bg-[#4A2C2C] text-white hover:bg-[#2C1A1A] shadow-md'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3 text-base gap-2.5',
    lg: 'px-9 py-4 text-lg gap-3',
    xl: 'px-12 py-5 text-xl gap-4'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <Motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <Motion.button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative inline-flex items-center justify-center
          font-medium rounded-full
          transition-all duration-300
          overflow-hidden
          ${variants[variant]}
          ${sizes[size]}
          ${disabledClasses}
          ${className}
        `}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </Motion.button>
    </Motion.div>
  );
};

// ==================== PREMIUM VARIANTS ====================

// Floating button that follows cursor
export const FloatingButton = ({ children, ...props }) => (
  <MagneticButton magnetic={true} strength={0.5} {...props}>
    {children}
  </MagneticButton>
);

// Glowing button
export const GlowButton = ({ children, className = '', ...props }) => (
  <MagneticButton
    variant="primary"
    className={`relative group ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 rounded-full bg-[#C4A35A] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
  </MagneticButton>
);

// Animated border button
export const BorderButton = ({ children, className = '', ...props }) => (
  <MagneticButton
    variant="outline"
    className={`relative overflow-hidden ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 bg-[#C4A35A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
  </MagneticButton>
);

// Pulse button
export const PulseButton = ({ children, ...props }) => (
  <MagneticButton
    variant="primary"
    className="relative animate-pulse hover:animate-none"
    {...props}
  >
    {children}
  </MagneticButton>
);

export default MagneticButton;