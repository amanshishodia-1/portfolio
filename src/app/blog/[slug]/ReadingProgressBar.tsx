'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-16 left-0 z-50 h-[2px] w-full bg-zinc-950 pointer-events-none">
      <motion.div
        className="bg-accent h-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        style={{ scaleX, originX: 0 }}
      />
    </div>
  );
}
