'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { blurRevealVariants, staggerContainerVariants } from '@/lib/motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  mode?: 'word' | 'char';
}

const charContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 4, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ease: [0.16, 1, 0.3, 1], // easeApple
      duration: 0.45,
    },
  },
} as const;

export function AnimatedText({ text, className = '', as = 'span', mode = 'word' }: AnimatedTextProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  const Component = as as React.ElementType; // Dynamic tag rendering wrapper
  const words = text.split(' ');

  if (!mounted) {
    return <Component className={className}>{text}</Component>;
  }

  // Graceful degradation for motion-sensitive users
  if (!shouldAnimate) {
    return <Component className={className}>{text}</Component>;
  }

  if (mode === 'char') {
    return (
      <Component className={className}>
        <motion.span
          variants={charContainerVariants}
          initial="hidden"
          animate="show"
          className="inline-block"
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
              {Array.from(word).map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={charVariants}
                  className="inline-block origin-center"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.span>
      </Component>
    );
  }

  return (
    <Component className={className}>
      <motion.span
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="inline-block"
      >
        {words.map((word, idx) => (
          <motion.span key={idx} className="inline-block overflow-hidden whitespace-nowrap mr-[0.25em] align-bottom pb-[0.1em] -mb-[0.1em]">
            <motion.span
              variants={blurRevealVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
