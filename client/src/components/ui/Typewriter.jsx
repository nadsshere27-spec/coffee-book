import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion as Motion, useInView } from 'framer-motion';

const Typewriter = ({ 
  texts = [],
  speed = 80,
  delay = 1000,
  loop = false,
  cursor = true,
  cursorBlink = true,
  className = '',
  variant = 'light',
  onComplete = null,
  ...props 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // ✅ Use ref instead of state for tracking start
  const startedRef = useRef(false);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const variants = {
    light: 'text-[#4A2C2C]',
    dark: 'text-[#FAF1E2]',
    gold: 'text-[#C4A35A]',
    white: 'text-white'
  };

  const animateText = useCallback(() => {
    const currentText = texts[currentIndex] || '';
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            if (loop || currentIndex < texts.length - 1) {
              setIsDeleting(true);
            } else if (onComplete) {
              onComplete();
            }
          }, delay);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isPaused ? delay : speed);

    animationRef.current = timeout;
  }, [displayText, isDeleting, currentIndex, texts, speed, delay, loop, isPaused, onComplete]);

  // Start animation only when in view
  useEffect(() => {
    if (isInView && !startedRef.current) {
      startedRef.current = true;
      animateText();
    }
  }, [isInView, animateText]);

  // Continue animation loop
  useEffect(() => {
    if (!startedRef.current) return;
    animateText();
    
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [animateText]);

  return (
    <span ref={ref} className={`inline-flex items-center ${variants[variant]} ${className}`} {...props}>
      {displayText}
      {cursor && (
        <Motion.span
          animate={{ opacity: cursorBlink ? [1, 0, 1] : 1 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-0.5 h-5 ml-1 bg-current"
        />
      )}
    </span>
  );
};

// ==================== PRESET VARIANTS ====================

export const HeroTypewriter = ({ texts, className = '' }) => (
  <Typewriter
    texts={texts}
    speed={60}
    delay={1500}
    loop={true}
    variant="white"
    className={`text-4xl md:text-6xl font-serif font-light ${className}`}
  />
);

export const GoldTypewriter = ({ texts, className = '' }) => (
  <Typewriter
    texts={texts}
    speed={70}
    delay={1200}
    loop={true}
    variant="gold"
    className={`text-2xl font-medium ${className}`}
  />
);

export const SimpleTypewriter = ({ text, className = '' }) => (
  <Typewriter
    texts={[text]}
    speed={50}
    loop={false}
    variant="light"
    className={`text-xl ${className}`}
  />
);

export default Typewriter;