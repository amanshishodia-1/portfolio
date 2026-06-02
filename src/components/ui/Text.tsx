import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs tracking-wider uppercase',
      sm: 'text-sm tracking-normal',
      base: 'text-base tracking-normal',
      lg: 'text-lg tracking-normal',
      xl: 'text-xl tracking-tight',
      '2xl': 'text-2xl tracking-tight font-semibold',
      '3xl': 'text-3xl tracking-tight font-bold',
      '4xl': 'text-4xl tracking-tighter font-bold',
      '5xl': 'text-5xl md:text-6xl tracking-tighter font-extrabold',
    },
    family: {
      sans: 'font-sans',
      mono: 'font-mono text-[0.9em]',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      primary: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'base',
    family: 'sans',
    weight: 'normal',
    color: 'primary',
  },
});

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof textVariants> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'code' | 'div';
}

export function Text({
  as: Component = 'span',
  size,
  family,
  weight,
  color,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component className={cn(textVariants({ size, family, weight, color }), className)} {...props}>
      {children}
    </Component>
  );
}
