import React from 'react';
import { motion as Motion } from 'framer-motion';  // ✅ Capital M

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  
  // Base styles - premium, smooth, modern
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C4A35A] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';
  
  // Premium variant styles with subtle gradients
  const variants = {
    primary: 'bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'border-2 border-[#C4A35A] text-[#C4A35A] hover:bg-[#C4A35A] hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-[#4A2C2C] text-[#4A2C2C] hover:bg-[#4A2C2C] hover:text-white hover:shadow-md',
    ghost: 'text-[#4A2C2C] hover:bg-[#FAF1E2] hover:shadow-sm',
    gold: 'bg-[#C4A35A] text-white hover:bg-[#B87C4B] hover:shadow-lg hover:-translate-y-0.5',
    dark: 'bg-[#4A2C2C] text-white hover:bg-[#2C1A1A] hover:shadow-lg hover:-translate-y-0.5'
  };
  
  // Premium size options
  const sizes = {
    sm: 'px-5 py-2.5 text-xs gap-1.5',
    md: 'px-7 py-3 text-sm gap-2',
    lg: 'px-9 py-4 text-base gap-2.5',
    xl: 'px-12 py-5 text-lg gap-3'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Ripple effect on click (premium touch)
  const handleClick = (e) => {
    if (disabled) return;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    if (onClick) onClick(e);
  };
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {/* Animated shine effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
      
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </button>
  );
};

// Add ripple styles to global CSS
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
if (!document.querySelector('#button-styles')) {
  style.id = 'button-styles';
  document.head.appendChild(style);
}

export default Button;