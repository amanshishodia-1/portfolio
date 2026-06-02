'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:bg-white/90 shadow-md',
        secondary:
          'border border-border bg-card text-foreground hover:bg-secondary hover:border-zinc-700',
        accent: 'bg-accent text-accent-foreground hover:bg-blue-600 shadow-blue-500/20 shadow-lg',
        ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground shadow-none',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-xs',
        md: 'h-10 rounded-md px-4 text-sm',
        lg: 'h-11 rounded-md px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'href'>, VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  href,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classNames = cn(buttonVariants({ variant, size }), className);

  const innerContent = (
    <>
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </>
  );

  // Animation settings
  const hoverScale = 1.015;
  const tapScale = 0.985;
  const springTransition = { type: 'spring', stiffness: 500, damping: 30, mass: 0.4 } as const;

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: tapScale }}
          transition={springTransition}
        >
          {innerContent}
        </motion.a>
      );
    }
    return (
      <motion.div
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        transition={springTransition}
        className="inline-flex"
      >
        <Link href={href} className={classNames}>
          {innerContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      disabled={disabled || loading}
      className={classNames}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={springTransition}
      {...props}
    >
      {innerContent}
    </motion.button>
  );
}
