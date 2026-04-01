import React, { useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Textarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  required = false,
  icon = null,
  error = '',
  success = false,
  warning = false,
  disabled = false,
  maxLength = 500,
  helperText = '',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef(null);

  // Handle textarea change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setHasValue(newValue.length > 0);
    setCharCount(newValue.length);
    if (onChange) onChange(e);
  };

  // Clear textarea
  const handleClear = () => {
    const syntheticEvent = { target: { value: '', name } };
    handleChange(syntheticEvent);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Get status color
  const getStatusColor = () => {
    if (error) return '#e53e3e';
    if (success) return '#10b981';
    if (warning) return '#f59e0b';
    return '#C4A35A';
  };

  const statusColor = getStatusColor();

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const labelVariants = {
    idle: { y: 0, fontSize: '0.875rem', color: '#7B4B3A' },
    active: { y: -28, fontSize: '0.75rem', color: statusColor },
    filled: { y: -28, fontSize: '0.75rem', color: '#C4A35A' }
  };

  const textareaVariants = {
    idle: { 
      borderColor: '#E8DCCC',
      backgroundColor: '#FAF1E2',
      scale: 1
    },
    hover: { 
      borderColor: '#C4A35A',
      backgroundColor: '#FFFFFF',
      scale: 1.01,
      transition: { duration: 0.2 }
    },
    focus: { 
      borderColor: statusColor,
      backgroundColor: '#FFFFFF',
      boxShadow: `0 0 0 3px ${statusColor}15`,
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    error: { 
      borderColor: '#e53e3e',
      backgroundColor: '#FEF2F2',
      boxShadow: '0 0 0 3px rgba(229, 62, 62, 0.1)'
    },
    success: { 
      borderColor: '#10b981',
      backgroundColor: '#F0FDF4',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    warning: { 
      borderColor: '#f59e0b',
      backgroundColor: '#FFFBEB',
      boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.1)'
    },
    disabled: {
      backgroundColor: '#F5F3F0',
      borderColor: '#E8DCCC',
      opacity: 0.6
    }
  };

  const iconVariants = {
    idle: { scale: 1, opacity: 0.6, color: '#7B4B3A' },
    focus: { scale: 1.1, opacity: 1, color: statusColor },
    error: { scale: 1.05, color: '#e53e3e' },
    success: { scale: 1.05, color: '#10b981' }
  };

  const borderVariants = {
    idle: { scaleX: 0, opacity: 0 },
    focus: { scaleX: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  const clearButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } }
  };

  const helperVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.2 } }
  };

  const charCounterVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 10 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2 } },
    warning: { 
      color: '#f59e0b',
      scale: 1.05,
      transition: { type: 'spring', stiffness: 500 }
    },
    danger: {
      color: '#e53e3e',
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  const getTextareaState = () => {
    if (disabled) return 'disabled';
    if (error) return 'error';
    if (success) return 'success';
    if (warning) return 'warning';
    if (isFocused) return 'focus';
    if (isHovered && !disabled) return 'hover';
    return 'idle';
  };

  const currentTextareaState = getTextareaState();
  const currentLabelState = (isFocused || hasValue) ? 'active' : 'idle';
  const currentIconState = isFocused ? 'focus' : (error ? 'error' : (success ? 'success' : 'idle'));
  const isNearLimit = charCount > maxLength * 0.85;
  const isVeryNearLimit = charCount > maxLength * 0.95;
  const isOverLimit = charCount > maxLength;

  return (
    <Motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`relative w-full ${className}`}
    >
      {/* Floating Label */}
      {label && (
        <Motion.label
          htmlFor={name}
          variants={labelVariants}
          initial="idle"
          animate={currentLabelState}
          className="absolute left-4 top-3 pointer-events-none z-10 origin-left"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {label} {required && <span className="text-[#C4A35A] ml-0.5">*</span>}
        </Motion.label>
      )}

      {/* Textarea Container */}
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        
        {/* Icon on left */}
        {icon && (
          <Motion.div
            variants={iconVariants}
            initial="idle"
            animate={currentIconState}
            className="absolute left-4 top-5 z-10"
          >
            {icon}
          </Motion.div>
        )}

        {/* Textarea Field */}
        <Motion.textarea
          ref={textareaRef}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          rows={rows}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          variants={textareaVariants}
          initial="idle"
          animate={currentTextareaState}
          className={`
            w-full px-4 py-3 rounded-xl text-[#4A2C2C] 
            placeholder-[#7B4B3A]/40 focus:outline-none transition-all duration-300
            resize-y min-h-[100px]
            ${icon ? 'pl-12' : 'pl-4'}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{ fontFamily: 'Inter, sans-serif' }}
          {...props}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {hasValue && !disabled && (
            <Motion.div
              variants={clearButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute right-3 top-4 cursor-pointer z-10"
              onClick={handleClear}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4 text-[#7B4B3A] hover:text-[#C4A35A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Animated Bottom Border */}
        <Motion.div
          variants={borderVariants}
          initial="idle"
          animate={isFocused && !error ? 'focus' : 'idle'}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] origin-left rounded-full"
        />

        {/* Character Counter and Status */}
        <div className="flex justify-between items-center mt-2 px-1 min-h-[24px]">
          
          {/* Helper Text / Status Message */}
          <AnimatePresence>
            {(helperText || error || success || warning) && (
              <Motion.div
                variants={helperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center gap-1.5"
              >
                {error && (
                  <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {success && (
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {warning && (
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <span className={`text-xs ${
                  error ? 'text-red-400' : 
                  success ? 'text-green-600' : 
                  warning ? 'text-amber-600' : 
                  'text-[#7B4B3A]'
                }`}>
                  {error || helperText || (success && '✓ Looks good!') || (warning && '⚠️ Almost at limit')}
                </span>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Character Counter */}
          {!disabled && (
            <AnimatePresence>
              {charCount > 0 && (
                <Motion.div
                  variants={charCounterVariants}
                  initial="hidden"
                  animate={isOverLimit ? 'danger' : (isVeryNearLimit ? 'warning' : 'visible')}
                  className={`text-xs ml-auto ${
                    isOverLimit ? 'text-red-500 font-medium' : 
                    isVeryNearLimit ? 'text-amber-500' : 
                    isNearLimit ? 'text-[#C4A35A]' : 
                    'text-[#7B4B3A]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {charCount} / {maxLength}
                  </span>
                </Motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Character Limit Warning Overlay */}
      <AnimatePresence>
        {isOverLimit && !disabled && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-xs text-red-600 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              Character limit exceeded! Please reduce your text by {charCount - maxLength} characters.
            </p>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Resize Hint */}
      {rows > 3 && !disabled && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 right-3 text-[10px] text-[#7B4B3A]/40 pointer-events-none"
        >
          ↕️ drag to resize
        </Motion.div>
      )}
    </Motion.div>
  );
};

export default Textarea;