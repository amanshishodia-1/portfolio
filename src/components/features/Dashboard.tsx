'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, LayoutGrid, Cpu, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

// 1. Eased requestAnimationFrame Counter Component
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  // Use a ref instead of state so the flag doesn't trigger useEffect re-runs
  // that would disconnect the observer and orphan the RAF loop.
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect(); // stop watching once triggered
          let startTime: number | null = null;

          function animate(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease-out quadratic function
            const easeOut = percentage * (2 - percentage);
            setCount(Math.floor(easeOut * value));

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          }
          requestAnimationFrame(animate);
        }
      },
      // threshold: 0 fires even when a parent has opacity:0 (GSAP reveal)
      // rootMargin gives a small buffer so the counter starts slightly before center
      { threshold: 0, rootMargin: '0px 0px -5% 0px' },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  // Only re-run if value or duration changes (not on every render)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

// 4. Main Dashboard Export
export function Dashboard() {
  return (
    <section id="dashboard" className="bg-background border-border/50 relative z-10 border-t py-20">
      {/* Background: Emerald analytics atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Vertical graph-line grid – analytics/data feel */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 48px)',
          }}
        />
        {/* Primary emerald glow – top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-emerald-500/5 blur-[130px]" />
        {/* Green bottom-right accent */}
        <div className="absolute bottom-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-green-500/4 blur-[90px]" />
        {/* Blue-green left glow – chart color echo */}
        <div className="absolute top-1/3 -left-20 h-[250px] w-[250px] rounded-full bg-blue-500/4 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col space-y-2">
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            ANALYTICS
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Engineering Metrics.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            Core project numbers and technical milestones.
          </Text>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stat Card 1 */}
          <Card 
            variant="interactive" 
            className="gsap-reveal-item flex items-center justify-between p-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-1" style={{ transform: 'translateZ(10px)' }}>
              <Text color="muted" size="xs" family="mono">
                solved_problems
              </Text>
              <div className="text-foreground font-mono text-2xl font-bold tracking-tight">
                <AnimatedCounter value={1000} suffix="+" />
              </div>
            </div>
            <div 
              className="border-border text-accent rounded-lg border bg-zinc-950 p-2.5"
              style={{ transform: 'translateZ(18px)' }}
            >
              <Terminal className="h-4.5 w-4.5" />
            </div>
          </Card>

          {/* Stat Card 2 */}
          <Card 
            variant="interactive" 
            className="gsap-reveal-item flex items-center justify-between p-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-1" style={{ transform: 'translateZ(10px)' }}>
              <Text color="muted" size="xs" family="mono">
                major_projects
              </Text>
              <div className="text-foreground font-mono text-2xl font-bold tracking-tight">
                <AnimatedCounter value={3} />
              </div>
            </div>
            <div 
              className="border-border text-accent rounded-lg border bg-zinc-950 p-2.5"
              style={{ transform: 'translateZ(18px)' }}
            >
              <LayoutGrid className="h-4.5 w-4.5" />
            </div>
          </Card>

          {/* Stat Card 3 */}
          <Card 
            variant="interactive" 
            className="gsap-reveal-item flex items-center justify-between p-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-1" style={{ transform: 'translateZ(10px)' }}>
              <Text color="muted" size="xs" family="mono">
                experience_years
              </Text>
              <div className="text-foreground font-mono text-2xl font-bold tracking-tight">
                <AnimatedCounter value={1} suffix=" Internship" />
              </div>
            </div>
            <div 
              className="border-border text-accent rounded-lg border bg-zinc-950 p-2.5"
              style={{ transform: 'translateZ(18px)' }}
            >
              <Cpu className="h-4.5 w-4.5" />
            </div>
          </Card>

          {/* Stat Card 4 */}
          <Card 
            variant="interactive" 
            className="gsap-reveal-item flex items-center justify-between p-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-1" style={{ transform: 'translateZ(10px)' }}>
              <Text color="muted" size="xs" family="mono">
                technologies_pool
              </Text>
              <div className="text-foreground font-mono text-2xl font-bold tracking-tight">
                <AnimatedCounter value={16} suffix="+" />
              </div>
            </div>
            <div 
              className="border-border text-accent rounded-lg border bg-zinc-950 p-2.5"
              style={{ transform: 'translateZ(18px)' }}
            >
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
