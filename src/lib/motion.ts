'use client';

// Centralized premium transition curves & physics
export const easeApple = [0.16, 1, 0.3, 1] as const; // easeOutExpo

export const transitionApple = {
  ease: easeApple,
  duration: 0.8,
} as const;

export const transitionAppleSlow = {
  ease: easeApple,
  duration: 1.25,
} as const;

export const transitionSpring = {
  type: 'spring',
  stiffness: 380,
  damping: 38,
  mass: 0.5,
} as const;

export const transitionSpringTight = {
  type: 'spring',
  stiffness: 450,
  damping: 28,
  mass: 0.4,
} as const;

export const transitionSpringSlow = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
  mass: 0.8,
} as const;

// Reusable motion variants
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionApple,
  },
} as const;

export const fadeInVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
} as const;

export const staggerContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
} as const;

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: transitionApple,
  },
} as const;

export const easeExpo = [0.19, 1, 0.22, 1] as const;

export const transitionExpo = {
  ease: easeExpo,
  duration: 1.0,
} as const;

export const blurRevealVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ease: easeApple,
      duration: 0.8,
    },
  },
} as const;
