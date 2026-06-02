'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGsapContext } from '@/hooks/useGsap';

interface ScrollRevealProps {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
  childSelector?: string; // Optional query selector to stagger nested items
}

export function ScrollReveal({
  children,
  yOffset = 24,
  duration = 0.85,
  childSelector,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Respect system reduced-motion configuration
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };
    mediaQuery.addEventListener('change', handleQueryChange);
    return () => mediaQuery.removeEventListener('change', handleQueryChange);
  }, []);

  useGsapContext(
    () => {
      if (!shouldAnimate || !containerRef.current) return;

      const container = containerRef.current;

      if (childSelector) {
        // Query elements matching selector inside this container scope
        const targets = container.querySelectorAll(childSelector);
        if (targets.length === 0) return;

        // Set initial state to prevent flash
        gsap.set(targets, { opacity: 0, y: yOffset, scale: 0.985 });

        // Trigger staggered animation on scroll
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: duration,
          ease: 'power3.out',
          stagger: {
            amount: 0.25, // Total stagger delay spread
            ease: 'power1.out',
          },
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        });
      } else {
        // Fallback: Animate the container itself
        gsap.set(container, { opacity: 0, y: yOffset });

        gsap.to(container, {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        });
      }
    },
    containerRef,
    [shouldAnimate, yOffset, duration, childSelector]
  );

  // Return simple markup during server render or initial client hydration
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  // Support browsers with prefers-reduced-motion
  if (!shouldAnimate) {
    return <div>{children}</div>;
  }

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
