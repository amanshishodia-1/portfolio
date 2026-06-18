'use client';

import React from 'react';
import { Calendar, Briefcase, Check, ArrowLeft, ArrowUpRight, Terminal, Globe, Cpu, Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

const skillCategories = [
  {
    title: 'Frontend Architecture',
    icon: <Globe className="h-4.5 w-4.5 text-blue-500" />,
    skills: ['React', 'Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'HTML5/CSS3'],
  },
  {
    title: 'Backend & Systems',
    icon: <Cpu className="h-4.5 w-4.5 text-indigo-500" />,
    skills: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'Developer Utilities & APIs',
    icon: <Terminal className="h-4.5 w-4.5 text-emerald-500" />,
    skills: ['Git & GitHub', 'PuterJS', 'Stream Video API', 'Docker', 'Vercel / Netlify', 'Postman'],
  },
  {
    title: 'Core Competencies',
    icon: <Award className="h-4.5 w-4.5 text-amber-500" />,
    skills: ['Data Structures (DSA)', 'Object-Oriented Coding', 'Load Optimization', 'Real-time sync', 'System Analysis'],
  },
];

const credentials = [
  {
    role: 'LeetCode Knight',
    detail: 'Top 3.5% Globally (Rating 1850+)',
    description: 'Solved 1000+ problems, regular weekly contest competitor.',
    link: 'https://leetcode.com/u/0Aman5/',
  },
  {
    role: 'Codeforces Pupil',
    detail: 'Competitive CP logic Rounds',
    description: 'Compete in math and algorithm challenges under strict constraints.',
    link: 'https://codeforces.com/profile/2Aman9',
  },
  {
    role: 'CodeChef 2 Star',
    detail: 'Competitive Programming profile',
    description: 'Practiced structured logic, quick implementation, and edge-case handling.',
    link: 'https://www.codechef.com/users/crash_yarn_66',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background relative min-h-screen pb-20">
      {/* Subtle background gradients */}
      <div className="absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <Container className="pt-12 md:pt-20">
        {/* Back Link */}
        <Link
          href="/"
          className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center space-x-2 text-xs font-mono transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>BACK TO HOME</span>
        </Link>

        {/* Page Header */}
        <div className="mb-16 flex flex-col space-y-4">
          <Text
            as="span"
            family="mono"
            size="xs"
            color="accent"
            weight="bold"
            className="tracking-widest uppercase"
          >
            WHO I AM
          </Text>
          <Text as="h1" size="4xl" weight="extrabold" className="tracking-tight">
            About Me.
          </Text>
          <Text color="muted" size="base" className="max-w-[34rem] text-sm sm:text-base leading-relaxed">
            Full Stack Developer specializing in high-performance React architectures, real-time node pipelines, and contest-tested algorithmic speed.
          </Text>
        </div>

        {/* Grid layout: Bio & Stats */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-12 mb-20">
          {/* Bio text */}
          <div className="md:col-span-7 space-y-6">
            <Text as="h2" size="2xl" weight="bold" className="tracking-tight text-foreground">
              Focused on performance indices, algorithms, and clean states.
            </Text>
            <Text color="muted" className="leading-relaxed text-sm sm:text-base">
              I build web applications with strict attention to performance. My practice centers on writing clean typescript states, refactoring server routes to reduce DB load, and managing Socket connections for low-latency updates.
            </Text>
            <Text color="muted" className="leading-relaxed text-sm sm:text-base">
              During my internship at **Cantilever**, I shipped backend and frontend features for a News Aggregator and TravelBuddy. Direct impacts included reducing page load times from 3.2s to 2.1s (~35%) using Redis caching, and optimizing Express API response times from 1.2s to 700ms (~40%) with index tuning.
            </Text>
            <Text color="muted" className="leading-relaxed text-sm sm:text-base">
              Additionally, I practice competitive coding. Reaching LeetCode **Knight** (top 3.5% globally) has trained me to quickly identify algorithmic optimizations (dynamic programming, sliding window indices, monotonic stacks) and maintain clean execution under constraints.
            </Text>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                variant="accent"
                href="mailto:amanshishodia863@gmail.com"
                rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                Let&apos;s Connect
              </Button>
              <Button
                variant="secondary"
                href="https://github.com/amanshishodia-1"
                leftIcon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                }
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Quick specs grid */}
          <div className="md:col-span-5 space-y-6">
            <Text family="mono" size="xs" color="primary" weight="semibold" className="tracking-widest uppercase">
              CREDENTIALS & RANKINGS
            </Text>
            <div className="grid gap-4">
              {credentials.map((cred) => (
                <Card key={cred.role} className="bg-[#111111] p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Text weight="bold" size="lg" className="text-foreground">
                        {cred.role}
                      </Text>
                      <Text family="mono" size="xs" color="accent" weight="medium">
                        {cred.detail}
                      </Text>
                    </div>
                    <a
                      href={cred.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <Text size="sm" color="muted" className="mt-3 leading-relaxed">
                    {cred.description}
                  </Text>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Skills System */}
        <div className="mb-24 space-y-8">
          <div>
            <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest uppercase mb-2">
              ENGINEERING STACK
            </Text>
            <Text as="h2" size="2xl" weight="bold" className="tracking-tight">
              Competencies.
            </Text>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat) => (
              <Card key={cat.title} className="bg-[#111111] p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-border/60 flex items-center justify-between border-b pb-3">
                    <Text weight="bold" className="text-foreground text-sm sm:text-base leading-none">
                      {cat.title}
                    </Text>
                    {cat.icon}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border-border rounded border bg-[#161618] px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience timeline (Chronological) */}
        <div className="space-y-8">
          <div>
            <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest uppercase mb-2">
              TIMELINE
            </Text>
            <Text as="h2" size="2xl" weight="bold" className="tracking-tight">
              Work History.
            </Text>
          </div>

          <div className="border-border relative ml-4 space-y-12 border-l pl-6 md:ml-8 pt-2">
            {/* Timeline Dot */}
            <div className="bg-accent absolute top-1.5 -left-[6px] h-3 w-3 rounded-full ring-4 ring-blue-500/20" />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Briefcase className="text-accent h-4.5 w-4.5" />
                  <Text size="lg" weight="bold" className="text-foreground">
                    Full Stack Developer Intern
                  </Text>
                  <Text size="base" color="accent" weight="semibold">
                    @ Cantilever
                  </Text>
                </div>
                <div className="text-muted-foreground bg-card border-border flex items-center space-x-1.5 rounded-full border px-3 py-1 font-mono text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>July 2025 &ndash; Sept 2025</span>
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#111111] p-5">
                  <div className="border-border/40 flex items-center justify-between border-b pb-2 mb-3">
                    <Text weight="bold" className="text-foreground text-sm sm:text-base">News Aggregator</Text>
                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                      +35% Speed
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Optimized cache strategies, boosting speed indexes by 35%.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Created secure JWT authentication protocols for user logins.</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-[#111111] p-5">
                  <div className="border-border/40 flex items-center justify-between border-b pb-2 mb-3">
                    <Text weight="bold" className="text-foreground text-sm sm:text-base">TravelBuddy</Text>
                    <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-400">
                      +40% Optimized
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Integrated map-based search interfaces for destination discovery.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Built WebSockets chat layer for instant communication.</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-12">
                <div className="flex flex-wrap items-center gap-2">
                  <Briefcase className="text-accent h-4.5 w-4.5" />
                  <Text size="lg" weight="bold" className="text-foreground">
                    Independent Software Developer
                  </Text>
                </div>
                <div className="text-muted-foreground bg-card border-border flex items-center space-x-1.5 rounded-full border px-3 py-1 font-mono text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Sept 2025 &ndash; Present</span>
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid gap-6 md:grid-cols-2 mt-4">
                <Card className="bg-[#111111] p-5">
                  <div className="border-border/40 flex items-center justify-between border-b pb-2 mb-3">
                    <Text weight="bold" className="text-foreground text-sm sm:text-base">Full Stack Products</Text>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Architected and launched scalable full-stack applications like Trackly and Streamify.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-accent mt-0.5 mr-2 h-3.5 w-3.5 flex-shrink-0" />
                      <span>Integrated WebRTC, Socket.io, and secure JWT authentication systems.</span>
                    </li>
                  </ul>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
