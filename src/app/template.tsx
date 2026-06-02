'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { easeApple } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldAnimate ? 16 : 0, scale: shouldAnimate ? 0.995 : 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: easeApple, duration: 0.85 }}
    >
      {children}
    </motion.div>
  );
}
