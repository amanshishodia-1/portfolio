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

// 2. Simulated Contribution Calendar
function ContributionGrid() {
  // Generate 7 rows x 28 columns (196 cells)
  const rows = 7;
  const cols = 28;
  const totalCells = rows * cols;
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    // Seed commit levels (0: none, 1-4: low to high intensity)
    const mockContributions = Array.from({ length: totalCells }, (_, i) => {
      // Create some patterns (more activity in middle/recent weeks)
      const colIndex = Math.floor(i / rows);
      const isWeekend = i % rows === 0 || i % rows === 6;

      const rand = Math.random();
      if (rand < 0.15) return 0; // empty days
      if (isWeekend) {
        return rand < 0.6 ? 0 : Math.floor(rand * 3); // less on weekends
      }
      if (colIndex > 20) {
        return Math.floor(rand * 5); // higher commits in recent weeks
      }
      return Math.floor(rand * 4); // average commits
    });
    setCells(mockContributions);
  }, [totalCells]);

  // Color mappings matching GitHub intensity
  const getCellColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950/40 border border-emerald-950/20';
      case 2:
        return 'bg-emerald-800/60 border border-emerald-800/30';
      case 3:
        return 'bg-emerald-600/70 border border-emerald-600/30';
      case 4:
        return 'bg-emerald-500 border border-emerald-400/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]';
      default:
        return 'bg-[#161618] border border-border/10';
    }
  };

  return (
    <div className="gsap-reveal-item border-border flex flex-col space-y-2 rounded-xl border bg-[#09090b] p-4">
      <div className="flex items-center justify-between">
        <Text family="mono" size="xs" color="muted">
          git_contributions_graph (196 days)
        </Text>
        <div className="flex items-center space-x-1.5 font-mono text-[8px] text-zinc-500">
          <span>Less</span>
          <div className="border-border/10 h-1.5 w-1.5 rounded-sm border bg-[#161618]" />
          <div className="h-1.5 w-1.5 rounded-sm border border-emerald-950/20 bg-emerald-950/40" />
          <div className="h-1.5 w-1.5 rounded-sm border border-emerald-800/30 bg-emerald-800/60" />
          <div className="h-1.5 w-1.5 rounded-sm border border-emerald-600/30 bg-emerald-600/70" />
          <div className="h-1.5 w-1.5 rounded-sm border border-emerald-400/30 bg-emerald-500" />
          <span>More</span>
        </div>
      </div>

      {/* Grid rendering wrapper */}
      <div className="grid max-w-full grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1">
        {cells.map((level, idx) => (
          <div
            key={idx}
            className={`h-2.5 w-2.5 rounded-[2px] transition-colors duration-500 ${getCellColorClass(level)}`}
          />
        ))}
      </div>
    </div>
  );
}

// 3. Commit Velocity SVG Chart
function VelocityChart() {
  return (
    <div className="gsap-reveal-item border-border flex h-[190px] flex-col justify-between space-y-2 rounded-xl border bg-[#09090b] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-accent h-4 w-4 animate-pulse" />
          <Text family="mono" size="xs" color="muted">
            commit_velocity_index
          </Text>
        </div>
        <Text family="mono" size="xs" color="accent" weight="semibold">
          98.4% uptime
        </Text>
      </div>

      <div className="relative flex-1 pt-4">
        {/* SVG Vector Line Graph */}
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Chart Gradient Mask */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="0"
            y1="20"
            x2="500"
            y2="20"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <line
            x1="0"
            y1="50"
            x2="500"
            y2="50"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <line
            x1="0"
            y1="80"
            x2="500"
            y2="80"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4"
          />

          {/* Area fill path */}
          <motion.path
            d="M 0 85 C 50 80, 80 40, 120 45 C 160 50, 200 15, 240 25 C 280 35, 320 85, 360 80 C 400 75, 430 45, 470 50 L 500 35 L 500 100 L 0 100 Z"
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
          />

          {/* Smooth bezier line */}
          <motion.path
            d="M 0 85 C 50 80, 80 40, 120 45 C 160 50, 200 15, 240 25 C 280 35, 320 85, 360 80 C 400 75, 430 45, 470 50 L 500 35"
            stroke="#3b82f6"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Highlight Points */}
          <motion.circle
            cx="240"
            cy="25"
            fill="#3b82f6"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            className="animate-pulse"
            initial={{ r: 0 }}
            whileInView={{ r: 4.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
          />
          <motion.circle
            cx="500"
            cy="35"
            fill="#3b82f6"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            initial={{ r: 0 }}
            whileInView={{ r: 4.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.6, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="border-border/20 flex justify-between border-t pt-2 font-mono text-[8px] text-zinc-500">
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
      </div>
    </div>
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
            Live repository parameters, coding problem consistency, and core project numbers.
          </Text>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Statistics List (Left side, covers 1 column) */}
          <div className="grid gap-4 md:col-span-1">
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
                <Cpu className="h-4.5 w-4.5" />
              </div>
            </Card>
          </div>

          {/* Analytics Visualizers (Right side, covers 2 columns) */}
          <div className="grid gap-6 md:col-span-2">
            <VelocityChart />
            <ContributionGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
