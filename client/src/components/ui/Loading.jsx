import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Loading = ({ 
  type = 'spinner',
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  variant = 'default',
  progress = null,
  onComplete = null,
  minDuration = 800,
  className = ''
}) => {
  const [show, setShow] = useState(true);

  // Auto-hide after minDuration
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        setShow(false);
        onComplete();
      }, minDuration);
      return () => clearTimeout(timer);
    }
  }, [onComplete, minDuration]);

  // Use progress directly - no need for separate state
  const progressValue = progress !== null && progress !== undefined ? progress : 0;

  // Size configurations
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'text-2xl', text: 'text-xs' },
    md: { container: 'w-16 h-16', icon: 'text-3xl', text: 'text-sm' },
    lg: { container: 'w-20 h-20', icon: 'text-4xl', text: 'text-base' },
    xl: { container: 'w-24 h-24', icon: 'text-5xl', text: 'text-lg' }
  };

  // Variant configurations
  const variants = {
    default: { spinner: 'border-[#C4A35A] border-t-[#B87C4B]', bg: 'bg-[#FDF6E9]', text: 'text-[#4A2C2C]' },
    dark: { spinner: 'border-[#4A2C2C] border-t-[#C4A35A]', bg: 'bg-[#2C1A1A]', text: 'text-[#FAF1E2]' },
    gold: { spinner: 'border-[#C4A35A]/30 border-t-[#C4A35A]', bg: 'bg-gradient-to-br from-[#C4A35A]/10 to-[#B87C4B]/10', text: 'text-[#C4A35A]' },
    minimal: { spinner: 'border-[#E8DCCC] border-t-[#C4A35A]', bg: 'bg-transparent', text: 'text-[#7B4B3A]' }
  };

  // Spinner Loader
  const SpinnerLoader = () => (
    <div className="relative">
      <div className={`${sizes[size].container} rounded-full border-4 ${variants[variant].spinner} animate-spin`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${sizes[size].icon} animate-pulse`}>☕</span>
      </div>
    </div>
  );

  // Coffee Cup Loader
  const CoffeeLoader = () => (
    <div className={`relative ${sizes[size].container}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#C4A35A] rounded-b-full rounded-t-lg relative">
            <div className="absolute -right-2 md:-right-3 top-3 w-2 md:w-3 h-5 md:h-8 border-2 md:border-3 border-[#C4A35A] rounded-r-full"></div>
            <Motion.div
              animate={{ height: ['30%', '60%', '30%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1 left-1 right-1 bg-[#4A2C2C] rounded-b-lg"
            />
          </div>
          <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <Motion.div
                key={i}
                animate={{ y: [-10, -20, -30], opacity: [0.5, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
                className="w-0.5 md:w-1 h-3 md:h-5 bg-[#E8DCCC] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Book Loader
  const BookLoader = () => (
    <div className={`relative ${sizes[size].container}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Motion.div
            animate={{ rotateY: [0, -180, -360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-12 md:w-14 md:h-16 bg-[#4A2C2C] rounded-r-md relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-[#FAF1E2] rounded-r-md origin-left" />
            <div className="absolute right-0 top-1 bottom-1 w-0.5 md:w-1 bg-[#C4A35A]"></div>
          </Motion.div>
          <Motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 left-2 w-3 h-4 md:w-4 md:h-5 bg-[#C4A35A] rounded-sm"
          />
        </div>
      </div>
    </div>
  );

  // Dots Loader
  const DotsLoader = () => (
    <div className="flex gap-2 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <Motion.div
          key={i}
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          className={`rounded-full bg-[#C4A35A] ${
            size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-3 h-3'
          }`}
        />
      ))}
    </div>
  );

  // Progress Bar Loader
  const ProgressLoader = () => (
    <div className="w-full max-w-xs">
      <div className="h-1 bg-[#E8DCCC] rounded-full overflow-hidden">
        <Motion.div
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] rounded-full"
        />
      </div>
      <p className={`text-center mt-2 ${sizes[size].text} ${variants[variant].text}`}>
        {progressValue}%
      </p>
    </div>
  );

  // Pulse Loader
  const PulseLoader = () => (
    <div className="relative">
      <Motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`${sizes[size].container} bg-[#C4A35A]/20 rounded-full flex items-center justify-center`}
      >
        <span className={`${sizes[size].icon}`}>☕</span>
      </Motion.div>
    </div>
  );

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="w-full space-y-3">
      <Motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="h-4 bg-[#E8DCCC] rounded w-3/4"
      />
      <Motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="h-4 bg-[#E8DCCC] rounded w-full"
      />
      <Motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="h-4 bg-[#E8DCCC] rounded w-5/6"
      />
    </div>
  );

  // Animated Text Loader
  const TextLoader = () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {['B', 'R', 'E', 'W', 'I', 'N', 'G'].map((letter, i) => (
          <Motion.span
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            className={`${sizes[size].text} font-medium ${variants[variant].text}`}
          >
            {letter}
          </Motion.span>
        ))}
      </div>
      <p className={`${sizes[size].text} ${variants[variant].text}`}>{text}</p>
    </div>
  );

  // Select loader based on type
  const getLoader = () => {
    switch (type) {
      case 'spinner': return <SpinnerLoader />;
      case 'coffee': return <CoffeeLoader />;
      case 'book': return <BookLoader />;
      case 'dots': return <DotsLoader />;
      case 'progress': return <ProgressLoader />;
      case 'pulse': return <PulseLoader />;
      case 'skeleton': return <SkeletonLoader />;
      case 'text': return <TextLoader />;
      default: return <SpinnerLoader />;
    }
  };

  const loaderContent = getLoader();

  // Full screen wrapper
  if (fullScreen) {
    return (
      <AnimatePresence>
        {show && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${variants[variant].bg} z-50 flex items-center justify-center ${className}`}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              {loaderContent}
              {type !== 'text' && type !== 'skeleton' && text && (
                <p className={`${sizes[size].text} ${variants[variant].text} font-medium`}>
                  {text}
                </p>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Inline loader
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {loaderContent}
      {type !== 'text' && type !== 'skeleton' && text && (
        <p className={`${sizes[size].text} ${variants[variant].text} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;