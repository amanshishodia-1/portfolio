'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'default' | 'accent' | 'interactive';
  spotlight?: boolean;
  spotlightColor?: string;
  children?: React.ReactNode;
}

export function Card({
  className,
  variant = 'default',
  spotlight = true,
  spotlightColor,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: CardProps) {
  const [mounted, setMounted] = React.useState(false);
  const [shouldAnimate, setShouldAnimate] = React.useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Perspective 3D rotation motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs to smooth out mouse coordinate changes on rotations
  const rotateXSpring = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 200, damping: 25 });

  // Springs to smooth out mouse coordinate changes on spotlight glare
  const spotlightXSpring = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const spotlightYSpring = useSpring(mouseY, { stiffness: 150, damping: 22 });

  React.useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  const isInteractive = variant === 'interactive';
  const showSpotlight = spotlight && isInteractive;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xVal = clientX - left;
    const yVal = clientY - top;
    
    mouseX.set(xVal);
    mouseY.set(yVal);

    if (isInteractive && shouldAnimate) {
      // Map offsets relative to center to maximum of 4.5 degrees rotation
      const rotX = -((yVal - height / 2) / (height / 2)) * 4.5;
      const rotY = ((xVal - width / 2) / (width / 2)) * 4.5;
      rotateX.set(rotX);
      rotateY.set(rotY);
    }

    if (onMouseMove) {
      onMouseMove(event);
    }
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    rotateX.set(0);
    rotateY.set(0);

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }

  return (
    <motion.div
      onMouseMove={showSpotlight ? handleMouseMove : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
      className={cn(
        'group border-border bg-card text-foreground relative overflow-hidden rounded-xl border transition-colors duration-300',
        variant === 'accent' && 'border-t-accent border-t-2',
        className,
      )}
      style={isInteractive && shouldAnimate && mounted ? {
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...props.style,
      } : props.style}
      whileHover={isInteractive ? {
        y: -6,
        scale: 1.04,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      {...props}
    >
      {showSpotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${spotlightXSpring}px ${spotlightYSpring}px,
                ${spotlightColor || 'rgba(59, 130, 246, 0.1)'},
                rgba(255, 255, 255, 0.03) 30%,
                transparent 80%
              )
            `,
            transform: 'translateZ(40px)', // Glare floats highest
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-sans text-lg leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-muted-foreground font-sans text-sm', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0 font-sans text-sm/relaxed', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}
