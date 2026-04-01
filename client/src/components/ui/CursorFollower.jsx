import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const CursorFollower = ({ 
  size = 32,
  color = '#C4A35A',
  blur = false,
  trail = false,
  children 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (trail) {
        setTrailPositions(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY }]);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [trail]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return children || null;
  }

  return (
    <>
      <Motion.div
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 30 }}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          filter: blur ? 'blur(4px)' : 'none'
        }}
      />
      {trail && trailPositions.map((pos, i) => (
        <div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-40 rounded-full opacity-20"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            backgroundColor: color,
            transform: `translate(${pos.x - size * 0.3}px, ${pos.y - size * 0.3}px)`,
            filter: 'blur(2px)'
          }}
        />
      ))}
      {children}
    </>
  );
};

export default CursorFollower;