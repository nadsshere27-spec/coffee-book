import React, { useRef, useEffect, useState } from 'react';
import { motion as Motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';

// ==================== MAIN COMPONENT ====================

const AnimatedSection = ({ 
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  margin = '-50px',
  className = '',
  stagger = false,
  staggerDelay = 0.1,
  customEasing = [0.22, 1, 0.36, 1],
  whileHover = null,
  whileTap = null,
  disabled = false,
  ...props 
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once, amount: threshold, margin });

  // Animation variants
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: customEasing } }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: customEasing } }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: customEasing } }
    },
    fadeRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: customEasing } }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: duration * 0.8, delay, ease: customEasing } }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: customEasing } }
    },
    scaleDown: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: customEasing } }
    },
    rotateIn: {
      hidden: { opacity: 0, rotate: -5, scale: 0.95 },
      visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration, delay, ease: customEasing } }
    },
    blurIn: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: duration * 0.8, delay } }
    },
    slideBounce: {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: 'spring', stiffness: 300, damping: 20, delay } 
      }
    },
    zoomGlow: {
      hidden: { opacity: 0, scale: 0.8, filter: 'brightness(0.8)' },
      visible: { 
        opacity: 1, 
        scale: 1, 
        filter: 'brightness(1)',
        transition: { duration: duration * 0.9, delay, ease: customEasing }
      }
    },
    staggerItem: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: customEasing } }
    }
  };

  const shouldAnimate = !prefersReducedMotion && !disabled;
  const selectedAnimation = animations[animation] || animations.fadeUp;

  useEffect(() => {
    if (isInView && shouldAnimate) {
      controls.start('visible');
    } else if (!once && !isInView) {
      controls.start('hidden');
    }
  }, [isInView, controls, once, shouldAnimate]);

  const staggerContainer = stagger ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  } : undefined;

  const hoverVariants = whileHover ? { whileHover: whileHover } : {};
  const tapVariants = whileTap ? { whileTap: whileTap } : {};

  return (
    <Motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={stagger ? staggerContainer : selectedAnimation}
      whileHover={hoverVariants.whileHover}
      whileTap={tapVariants.whileTap}
      className={className}
      {...props}
    >
      {stagger ? (
        React.Children.map(children, (child) => (
          <Motion.div variants={animations.staggerItem}>
            {child}
          </Motion.div>
        ))
      ) : (
        children
      )}
    </Motion.div>
  );
};

// ==================== SPECIALIZED COMPONENTS ====================

export const StaggerSection = ({ children, delay = 0, className = '' }) => (
  <AnimatedSection animation="fadeUp" stagger={true} staggerDelay={0.08} delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const HeroSection = ({ children, className = '' }) => (
  <AnimatedSection animation="slideBounce" duration={0.8} threshold={0.1} className={className}>
    {children}
  </AnimatedSection>
);

export const CardReveal = ({ children, delay = 0, className = '' }) => (
  <AnimatedSection animation="scaleUp" delay={delay} duration={0.5} threshold={0.3} className={className}>
    {children}
  </AnimatedSection>
);

export const ImageReveal = ({ children, className = '' }) => (
  <AnimatedSection animation="blurIn" duration={0.7} threshold={0.2} className={className}>
    {children}
  </AnimatedSection>
);

export const TextReveal = ({ children, delay = 0, className = '' }) => (
  <AnimatedSection animation="fadeLeft" delay={delay} duration={0.6} className={className}>
    {children}
  </AnimatedSection>
);

export const GlowReveal = ({ children, className = '' }) => (
  <AnimatedSection animation="zoomGlow" duration={0.7} className={className}>
    {children}
  </AnimatedSection>
);

export const RotateReveal = ({ children, className = '' }) => (
  <AnimatedSection animation="rotateIn" duration={0.6} className={className}>
    {children}
  </AnimatedSection>
);

// ==================== PARALLAX SECTION ====================

export const ParallaxSection = ({ children, speed = 0.3, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
      const newOffset = Math.min(Math.max(scrollProgress * 100 * speed, -50), 50);
      setOffset(direction === 'up' ? newOffset : -newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Motion.div
        style={{ transform: direction === 'up' ? `translateY(${offset}px)` : `translateY(${-offset}px)` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        {children}
      </Motion.div>
    </div>
  );
};

// ==================== SCROLL TRIGGERED COUNTER ====================

export const ScrollCounter = ({ target, suffix = '', prefix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-serif text-4xl font-light text-[#C4A35A]">
      {prefix}{count}{suffix}
    </span>
  );
};

// ==================== REVEAL ON SCROLL TEXT ====================

export const RevealText = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsRevealed(true), delay * 1000);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Motion.div
        initial={{ y: '100%' }}
        animate={{ y: isRevealed ? 0 : '100%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Motion.div>
    </div>
  );
};

// ==================== TYPEWRITER EFFECT ====================

export const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  cursor = true,
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || isTyping) return;

    setIsTyping(true);
    let i = 0;
    
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimer);
    };
  }, [isInView, text, speed, delay, isTyping]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && isInView && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default AnimatedSection;