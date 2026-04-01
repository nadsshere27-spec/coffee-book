import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  icon = null,
  error = '',
  disabled = false,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) onChange(e);
  };

  // Animation variants
  const labelVariants = {
    initial: { 
      y: 0, 
      scale: 1,
      color: '#7B4B3A'
    },
    focused: { 
      y: -28, 
      scale: 0.85,
      color: '#C4A35A',
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    },
    filled: { 
      y: -28, 
      scale: 0.85,
      color: '#C4A35A',
      transition: { duration: 0.2 }
    }
  };

  const inputVariants = {
    initial: { 
      borderColor: '#E8DCCC',
      boxShadow: '0 0 0 0 rgba(196, 163, 90, 0)'
    },
    focused: { 
      borderColor: '#C4A35A',
      boxShadow: '0 0 0 3px rgba(196, 163, 90, 0.1)',
      transition: { duration: 0.2 }
    },
    error: { 
      borderColor: '#e53e3e',
      boxShadow: '0 0 0 3px rgba(229, 62, 62, 0.1)'
    }
  };

  const iconVariants = {
    initial: { scale: 1, opacity: 0.6 },
    focused: { scale: 1.05, opacity: 1, color: '#C4A35A' },
    error: { color: '#e53e3e' }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.2 } }
  };

  const currentLabelState = isFocused || hasValue ? 'focused' : 'initial';
  const currentInputState = error ? 'error' : (isFocused ? 'focused' : 'initial');

  return (
    <div className={`relative w-full ${className}`}>
      {/* Floating Label */}
      {label && (
        <Motion.label
          htmlFor={name}
          variants={labelVariants}
          initial="initial"
          animate={currentLabelState}
          className="absolute left-4 top-3 pointer-events-none z-10 text-sm font-medium origin-left"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {label} {required && <span className="text-[#C4A35A] ml-0.5">*</span>}
        </Motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon on left */}
        {icon && (
          <Motion.div
            variants={iconVariants}
            initial="initial"
            animate={currentInputState}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#7B4B3A]"
          >
            {icon}
          </Motion.div>
        )}

        {/* Input Field */}
        <Motion.input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          disabled={disabled}
          required={required}
          variants={inputVariants}
          initial="initial"
          animate={currentInputState}
          className={`
            w-full px-4 py-3 rounded-xl bg-[#FAF1E2] text-[#4A2C2C] 
            placeholder-[#7B4B3A]/50 focus:outline-none transition-all duration-300
            ${icon ? 'pl-12' : 'pl-4'}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          style={{ fontFamily: 'Inter, sans-serif' }}
          {...props}
        />

        {/* Animated Bottom Line (premium touch) */}
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused && !error ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] origin-left rounded-full"
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <Motion.div
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-1.5 ml-1"
          >
            <span className="text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </span>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Character Counter (optional) */}
      {props.maxLength && value && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-3 bottom-3 text-xs text-[#7B4B3A]"
        >
          {value.length}/{props.maxLength}
        </Motion.div>
      )}
    </div>
  );
};

export default Input;