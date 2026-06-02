'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Boundary radius in pixels to snap focus
  strength?: number; // Pull intensity index
}

export function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Motion positions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring config for dynamic fluid magnetic drift
  const springConfig = { damping: 20, stiffness: 180, mass: 0.12 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || !shouldAnimate) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Child coordinate center mapping
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < range) {
      // Calculate spring coordinates pull based on distance strength
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    } else {
      // Return to default base coordinate bounds
      x.set(0);
      y.set(0);
    }
  }, [shouldAnimate, range, strength, x, y]);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  if (!shouldAnimate) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
