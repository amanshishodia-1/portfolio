'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Trophy, Flame } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { AnimatedCounter } from './Dashboard';

// --- INLINE VECTOR BADGES ---

function LeetCodeKnightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Shield base */}
      <path d="M12 2L3 5v6c0 5.5 4.5 10 9 11 4.5-1 9-5.5 9-11V5l-9-3z" fill="rgba(245, 158, 11, 0.04)" stroke="currentColor" />
      {/* Chess Knight Horse representation */}
      <path d="M14 6.5c-1-.5-2.2 0-2.8 1C10.6 8 9.5 9 9.5 10v3c0 .8.5 1.5 1.2 1.8.8.3 1.8 0 2.2-.8l.8-1.5h1.8c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H14z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.5" cy="10" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CodeforcesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      {/* Three vertical columns: blue, red, yellow representing Codeforces */}
      <rect x="3" y="11" width="4.5" height="9" rx="1" className="text-[#3b82f6]" />
      <rect x="9.5" y="4" width="4.5" height="16" rx="1" className="text-[#ef4444]" />
      <rect x="16" y="7.5" width="4.5" height="12.5" rx="1" className="text-[#f59e0b]" />
    </svg>
  );
}

function CodeChefIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Stylized Chef Hat */}
      <path d="M6 18c0 1.5 1 2 2.5 2h7c1.5 0 2.5-.5 2.5-2v-5H6v5z" fill="rgba(217, 119, 6, 0.04)" />
      <path d="M5.5 13c0-2.5 1.5-4 3.5-4s3 1.5 3 1.5 1-1.5 3-1.5 3.5 1.5 3.5 4" stroke="currentColor" strokeLinecap="round" />
      {/* Two stars */}
      <path d="M9 14l.3.6.7-.1-.5-.5.3-.6-.6.2-.2-.6M15 14l.3.6.7-.1-.5-.5.3-.6-.6.2-.2-.6" fill="currentColor" stroke="none" />
    </svg>
  );
}


function ConsistencyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="3" />
      <path d="M7 14.5l3-3 3 2 4.5-4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.5" cy="9" r="1.5" fill="#10b981" stroke="none" />
    </svg>
  );
}

// --- DATA STRUCTURE ---

interface AchievementCard {
  title: string;
  subtitle: string;
  metric: string;
  badge: React.ReactNode;
  detail: string;
  colorClass: string;
  progressPercent: number; // percentage progress towards next rank tier
  progressText: string; // "Toward Guardian", "Toward Specialist", etc.
  platformStats: { label: string; val: string }[];
  profileUrl: string;
}

const achievementsList: AchievementCard[] = [
  {
    title: 'LeetCode Knight',
    subtitle: 'Competitive DSA Solvers',
    metric: 'Rating 1900+',
    badge: <LeetCodeKnightIcon />,
    detail: 'Secured Knight tier (Rating 1900+, Top 3.5% globally) in biweekly speed contests. Optimization focuses include modular arithmetic, sliding-window array buffers, and memoized DP recursion.',
    colorClass: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
    progressPercent: 50, // (1900-1600)/(2190-1600) * 100 ≈ 50% toward Guardian (2190)
    progressText: '50% toward Guardian (Rating 2190+)',
    platformStats: [
      { label: 'Global Rank', val: 'Top 3.5%' },
      { label: 'Contests Solved', val: '40+' },
    ],
    profileUrl: 'https://leetcode.com/u/0Aman5/',
  },
  {
    title: 'Codeforces Pupil',
    subtitle: 'High Speed Logic Rounds',
    metric: 'Rating 1200+',
    badge: <CodeforcesIcon />,
    detail: 'Competing in 2-hour high-pressure math and algorithmic logic rounds. Solved diverse problems in greedy approaches, combinatorics, and graphing structures.',
    colorClass: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
    progressPercent: 66, // (1200-800)/(1400-800) * 100 = 66% toward Specialist (1400)
    progressText: '66% toward Specialist (Rating 1400+)',
    platformStats: [
      { label: 'Contest Tier', val: 'Pupil' },
      { label: 'Max Rating', val: '1210' },
    ],
    profileUrl: 'https://codeforces.com/profile/2Aman9',
  },
  {
    title: 'CodeChef 2 Star',
    subtitle: 'Monthly Division Contests',
    metric: 'Rating 1564+',
    badge: <CodeChefIcon />,
    detail: 'Consistently placing in Division 3 challenges. Solved complex modular arithmetic and number theory arrays with quick implementation and edge-case validation.',
    colorClass: 'text-amber-700 border-amber-700/20 bg-amber-700/5',
    progressPercent: 82, // (1564-1400)/(1600-1400) * 100 = 82% toward 3 Star (1600)
    progressText: '82% toward 3-Star Chef (Rating 1600+)',
    platformStats: [
      { label: 'Division Group', val: 'Division 3' },
      { label: 'Peak Rating', val: '1564' },
    ],
    profileUrl: 'https://www.codechef.com/users/crash_yarn_66',
  },
  {
    title: '1000+ Solved',
    subtitle: 'Daily Coding Practice',
    metric: '1,000+ Solutions',
    badge: <ConsistencyIcon />,
    detail: 'Maintained 365+ day consistency tracks across primary data structure platforms (LeetCode, GFG, Codeforces, and CodeChef). Engineered dynamic recursion tables.',
    colorClass: 'text-blue-500 border-blue-500/20 bg-blue-500/5',
    progressPercent: 100,
    progressText: 'Milestone fully achieved',
    platformStats: [
      { label: 'LeetCode', val: '750+' },
      { label: 'CodeChef & GFG', val: '250+' },
    ],
    profileUrl: 'https://leetcode.com/u/0Aman5/',
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="bg-background border-border/50 relative z-10 border-t py-20">
      {/* Background: Golden championship atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial burst lines – trophy/medal feel */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-conic-gradient(from 0deg at 50% 30%, rgba(245,158,11,0.6) 0deg, transparent 2deg, transparent 18deg, rgba(245,158,11,0.6) 20deg)',
          }}
        />
        {/* Primary amber top-center glow */}
        <div className="absolute top-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
        {/* Secondary gold right glow */}
        <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-yellow-500/4 blur-[90px]" />
        {/* Rose accent bottom-left – competitive urgency */}
        <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full bg-rose-500/3 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col space-y-2">
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            BENCHMARKS
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Coding Achievements.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            Competitive programming ratings, platform benchmarks, and algorithmic verification metrics.
          </Text>
        </div>

        {/* Horizontal Statistics Row */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-12">

          {/* Stat 1 */}
          <Card className="gsap-reveal-item bg-[#111111] p-6 text-center border-border/60">
            <div className="flex flex-col items-center space-y-2">
              <Award className="h-5 w-5 text-amber-500" />
              <Text size="3xl" family="mono" weight="extrabold" className="text-foreground mt-2">
                <AnimatedCounter value={1000} suffix="+" />
              </Text>
              <Text color="muted" size="xs" family="mono">problems_solved</Text>
            </div>
          </Card>

          {/* Stat 2 */}
          <Card className="gsap-reveal-item bg-[#111111] p-6 text-center border-border/60">
            <div className="flex flex-col items-center space-y-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <Text size="3xl" family="mono" weight="extrabold" className="text-foreground mt-2">
                <AnimatedCounter value={1900} suffix="+" />
              </Text>
              <Text color="muted" size="xs" family="mono">leetcode_rating</Text>
            </div>
          </Card>

          {/* Stat 3 */}
          <Card className="gsap-reveal-item bg-[#111111] p-6 text-center border-border/60">
            <div className="flex flex-col items-center space-y-2">
              <Target className="h-5 w-5 text-emerald-500" />
              <Text size="3xl" family="mono" weight="extrabold" className="text-foreground mt-2">
                <AnimatedCounter value={1210} suffix="+" />
              </Text>
              <Text color="muted" size="xs" family="mono">codeforces_rating</Text>
            </div>
          </Card>

          {/* Stat 4 */}
          <Card className="gsap-reveal-item bg-[#111111] p-6 text-center border-border/60">
            <div className="flex flex-col items-center space-y-2">
              <Flame className="h-5 w-5 text-amber-600" />
              <Text size="3xl" family="mono" weight="extrabold" className="text-foreground mt-2">
                <AnimatedCounter value={1564} suffix="+" />
              </Text>
              <Text color="muted" size="xs" family="mono">codechef_rating</Text>
            </div>
          </Card>
        </div>

        {/* Detailed Cards Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {achievementsList.map((ach) => (
            <a
              key={ach.title}
              href={ach.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-reveal-item block group"
            >
              <Card
                variant="interactive"
                className="bg-[#111111] p-6 sm:p-8 flex flex-col justify-between h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="space-y-6" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Header: Badge on left, Info on right */}
                  <div 
                    className="flex items-start space-x-4" 
                    style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
                  >
                    <div 
                      className="border-border/80 bg-zinc-950 flex h-14 w-14 items-center justify-center rounded-xl border shadow-md"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {ach.badge}
                    </div>
                    <div className="space-y-1 flex-1" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="flex items-center justify-between" style={{ transformStyle: 'preserve-3d' }}>
                        <h3 
                          className="text-foreground font-sans text-lg font-bold tracking-tight group-hover:text-accent transition-colors duration-300"
                          style={{ transform: 'translateZ(12px)' }}
                        >
                          {ach.title}
                        </h3>
                        <span 
                          className="font-mono text-xs font-semibold text-accent"
                          style={{ transform: 'translateZ(10px)' }}
                        >
                          {ach.metric}
                        </span>
                      </div>
                      <p 
                        className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wide"
                        style={{ transform: 'translateZ(8px)' }}
                      >
                        {ach.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Subtitle / Description Detail */}
                  <p 
                    className="text-muted-foreground text-sm leading-relaxed font-sans"
                    style={{ transform: 'translateZ(8px)' }}
                  >
                    {ach.detail}
                  </p>

                  {/* Rating dynamic progress bar slider */}
                  <div className="space-y-2" style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }}>
                    <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <span>RANK MILESTONE</span>
                      <span>{ach.progressText}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80 border border-border/20">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ach.progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="bg-accent h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Platform stats row */}
                <div 
                  className="border-border/40 mt-6 flex justify-between border-t pt-4 font-mono text-xs text-zinc-500"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {ach.platformStats.map((stat) => (
                    <div key={stat.label} className="flex space-x-2">
                      <span className="text-zinc-600">{stat.label}:</span>
                      <span className="text-zinc-400 font-bold">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
