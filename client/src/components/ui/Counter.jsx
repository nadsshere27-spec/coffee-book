import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ 
  target = 100,
  duration = 2,
  suffix = '',
  prefix = '',
  start = 0,
  once = true,
  format = (num) => num,
  className = '',
  variant = 'light',
  ...props 
}) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const variants = {
    light: 'text-[#4A2C2C]',
    dark: 'text-[#FAF1E2]',
    gold: 'text-[#C4A35A]',
    white: 'text-white'
  };

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (target - start) * eased;
      setCount(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration, start, hasAnimated]);

  return (
    <span ref={ref} className={`font-serif text-4xl font-light ${variants[variant]} ${className}`} {...props}>
      {prefix}{format(Math.floor(count))}{suffix}
    </span>
  );
};

// ==================== PRESET VARIANTS ====================

export const StatCounter = ({ target, label, suffix = '', className = '' }) => (
  <div className="text-center">
    <Counter target={target} suffix={suffix} variant="gold" className="text-5xl font-serif" />
    <p className={`text-sm text-[#7B4B3A] mt-2 ${className}`}>{label}</p>
  </div>
);

export const CoffeeCounter = () => (
  <StatCounter target={1500} suffix="+" label="Cups Served Daily" />
);

export const BooksCounter = () => (
  <StatCounter target={500} suffix="+" label="Books in Collection" />
);

export const YearsCounter = () => (
  <StatCounter target={5} suffix="+" label="Years of Excellence" />
);

export default Counter;