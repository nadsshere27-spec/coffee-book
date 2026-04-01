import { useState, useEffect, useCallback, useRef } from 'react';

// Main scroll position hook
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      
      setScrollY(currentY);
      setScrollX(currentX);
      setDirection(currentY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollX, direction };
};

// Hook to check if element is in viewport
export const useInView = (options = { threshold: 0.1, rootMargin: '0px', once: true }) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        
        if (options.once && isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: options.threshold, rootMargin: options.rootMargin }
    );

    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options.threshold, options.rootMargin, options.once, hasAnimated]);

  return [setRef, inView, hasAnimated];
};

// Scroll progress hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Parallax effect hook
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight && elementTop > -ref.current.offsetHeight) {
        setOffset((scrollY - elementTop) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};

// Smooth scroll to element
export const useSmoothScroll = () => {
  const scrollTo = useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }, []);

  return { scrollTo, scrollToTop, scrollToBottom };
};

// Scroll velocity hook
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime.current;
      const scrollDiff = Math.abs(currentY - lastScrollY.current);
      
      if (timeDiff > 0) {
        const newVelocity = (scrollDiff / timeDiff) * 1000;
        setVelocity(Math.min(newVelocity, 1000));
      }
      
      lastScrollY.current = currentY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
};

// Sticky header detection
export const useStickyHeader = (offset = 50) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > offset);
      setIsAtTop(scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { isSticky, isAtTop };
};

// Element visibility tracker
export const useVisibilityTracker = (options = {}) => {
  const [visibleElements, setVisibleElements] = useState({});
  const refs = useRef({});

  const register = useCallback((id, ref) => {
    refs.current[id] = ref;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Object.keys(refs.current).find(
            key => refs.current[key] === entry.target
          );
          if (id) {
            setVisibleElements(prev => ({
              ...prev,
              [id]: entry.isIntersecting
            }));
          }
        });
      },
      options
    );

    Object.values(refs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [options]);

  return { register, visibleElements };
};

export default {
  useScrollPosition,
  useInView,
  useScrollProgress,
  useParallax,
  useSmoothScroll,
  useScrollVelocity,
  useStickyHeader,
  useVisibilityTracker
};