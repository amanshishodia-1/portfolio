'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function PremiumBackground() {
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // High performance mouse tracking values from framer-motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse transition to avoid jitter
  const springConfig = { damping: 55, stiffness: 250, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Check media preference for motion settings
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener('change', handleQueryChange);

    // Window mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      // Offset values by 200px to center the 400px glow circle
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mediaQuery.removeEventListener('change', handleQueryChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Ensure zero hydration mismatches
  if (!mounted) {
    return null;
  }

  // Define ambient floating keyframes conditionally based on user accessibility preferences
  const blob1Animation = shouldAnimate
    ? {
        x: [0, 100, -50, 0],
        y: [0, 80, 120, 0],
        scale: [1, 1.15, 0.9, 1],
      }
    : undefined;

  const blob2Animation = shouldAnimate
    ? {
        x: [0, -120, 60, 0],
        y: [0, -90, -40, 0],
        scale: [1, 0.85, 1.1, 1],
      }
    : undefined;

  const blob3Animation = shouldAnimate
    ? {
        x: [0, 80, -90, 0],
        y: [0, -110, 70, 0],
        scale: [1, 1.05, 0.95, 1],
      }
    : undefined;

  return (
    <div className="fixed inset-0 pointer-events-none select-none -z-50 overflow-hidden h-full w-full bg-[#030303]">
      
      {/* LAYER 1: Subtle CSS Grid Pattern with radial mask */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)]" 
        aria-hidden="true"
      />

      {/* LAYER 2: Mouse-Interactive Glow (Desktop Only) */}
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[100px] hidden md:block will-change-transform"
        style={{
          x: glowX,
          y: glowY,
        }}
        aria-hidden="true"
      />

      {/* LAYER 2 Alternative: Static top-center glow (Mobile Only) */}
      <div 
        className="absolute top-0 left-1/2 h-[300px] w-[450px] -translate-x-1/2 rounded-full bg-blue-500/[0.03] blur-[90px] md:hidden"
        aria-hidden="true"
      />

      {/* LAYER 3: Tiny static SVG noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* LAYER 4: Floating Ambient Blobs */}
      {/* Top Left Blob */}
      <motion.div
        className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-blue-600/[0.03] blur-[120px] will-change-transform"
        animate={blob1Animation}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* Bottom Right Blob */}
      <motion.div
        className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-indigo-600/[0.03] blur-[140px] will-change-transform"
        animate={blob2Animation}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* Center Floating Accent Blob */}
      <motion.div
        className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-purple-600/[0.02] blur-[100px] will-change-transform"
        animate={blob3Animation}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
