'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Server, Code, Sparkles, GraduationCap, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

// ─── Pillar data with per-pillar color tokens ────────────────────────────────
const pillars = [
  {
    title: 'Full Stack Architecture',
    description:
      'Engineering layouts with React 19 Server Components, Tailwind v4 cascade layers, and Framer Motion spring physics.',
    icon: Sparkles,
    color: 'blue',
    glow: 'rgba(59,130,246,0.18)',
    border: 'rgba(59,130,246,0.25)',
    bg: 'rgba(59,130,246,0.06)',
    accent: '#60a5fa',
  },
  {
    title: 'Real-Time & Distributed',
    description:
      'Constructing WebRTC video streaming pipelines, Socket.io gateways, and low-latency Node.js controller structures.',
    icon: Server,
    color: 'violet',
    glow: 'rgba(139,92,246,0.18)',
    border: 'rgba(139,92,246,0.25)',
    bg: 'rgba(139,92,246,0.06)',
    accent: '#a78bfa',
  },
  {
    title: 'Contest Algorithms',
    description:
      'Applying dynamic programming, sliding-window buffers, and monotonic stacks to optimize complex space-time execution paths.',
    icon: Code,
    color: 'emerald',
    glow: 'rgba(16,185,129,0.18)',
    border: 'rgba(16,185,129,0.25)',
    bg: 'rgba(16,185,129,0.06)',
    accent: '#34d399',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Packaging workspaces in Docker containers, automating GitHub Actions CI/CD workflows, and deploying to AWS + Azure.',
    icon: Shield,
    color: 'amber',
    glow: 'rgba(245,158,11,0.18)',
    border: 'rgba(245,158,11,0.25)',
    bg: 'rgba(245,158,11,0.06)',
    accent: '#fbbf24',
  },
];


const terminalLines = [
  { num: '1', content: <span className="text-blue-400">{'{'}</span> },
  {
    num: '2',
    content: (
      <>
        &nbsp;&nbsp;<span className="text-indigo-400">&quot;engineer&quot;</span>
        {': '}
        <span className="text-emerald-400">&quot;Aman Shishodia&quot;</span>,
      </>
    ),
  },
  {
    num: '3',
    content: (
      <>
        &nbsp;&nbsp;<span className="text-indigo-400">&quot;role&quot;</span>
        {': '}
        <span className="text-emerald-400">&quot;Full Stack Developer&quot;</span>,
      </>
    ),
  },
  {
    num: '4',
    content: (
      <>
        &nbsp;&nbsp;<span className="text-indigo-400">&quot;degree&quot;</span>
        {': '}
        <span className="text-emerald-400">&quot;B.Tech CST @ MAIT&quot;</span>,
      </>
    ),
  },
  {
    num: '5',
    content: (
      <>
        &nbsp;&nbsp;<span className="text-indigo-400">&quot;focus&quot;</span>
        {': '}
        <span className="text-blue-400">[</span>
      </>
    ),
  },
  {
    num: '6',
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-emerald-400">&quot;Full Stack Architecture&quot;</span>,
      </>
    ),
  },
  {
    num: '7',
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-emerald-400">&quot;Algorithmic Optimization&quot;</span>,
      </>
    ),
  },
  {
    num: '8',
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-emerald-400">&quot;Cloud Infrastructure&quot;</span>
      </>
    ),
  },
  { num: '9', content: <>&nbsp;&nbsp;<span className="text-blue-400">]</span>,</> },
  { num: '10', content: <span className="text-blue-400">{'}'}</span> },
];

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// ─── Component ────────────────────────────────────────────────────────────────
export function AboutSection() {
  const [lineCount, setLineCount] = useState(0);

  // Typewriter effect — reveal terminal lines one-by-one
  useEffect(() => {
    if (lineCount >= terminalLines.length) return;
    const timer = setTimeout(() => setLineCount((c) => c + 1), 80);
    return () => clearTimeout(timer);
  }, [lineCount]);

  return (
    <section
      id="about-profile"
      className="bg-background border-border/50 relative z-10 overflow-hidden border-t py-28"
    >
      {/* ── Background ────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.03]" />
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Label + Heading ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
          className="mb-20"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-blue-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              Profile
            </span>
          </div>
          <Text as="h2" size="4xl" weight="extrabold" className="mb-4 tracking-tight">
            About Me.
          </Text>
          <Text color="muted" size="lg" className="max-w-xl leading-relaxed">
            Academic background, core engineering principles, and the values that drive my work.
          </Text>
        </motion.div>

        {/* ── Main 12-col Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* ══ LEFT COLUMN (5 cols) ══════════════════════════════════════════ */}
          <div className="space-y-6 lg:col-span-5">

            {/* ── Profile Avatar ───────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col items-center gap-4"
            >
              <style>{`
                @keyframes avatarFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
                @keyframes ringPulse {
                  0%, 100% { opacity: 0.6; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.04); }
                }
                .avatar-float { animation: avatarFloat 5s ease-in-out infinite; }
                .avatar-ring-pulse { animation: ringPulse 3s ease-in-out infinite; }
              `}</style>

              {/* Avatar with glowing ring */}
              <div className="relative flex items-center justify-center">
                {/* Outer animated glow ring */}
                <div className="avatar-ring-pulse pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-purple-500/40 blur-xl" style={{ inset: '-8px' }} />
                {/* Neon border ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: '-3px',
                    background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                    borderRadius: '50%',
                    padding: '3px',
                  }}
                >
                  <div className="h-full w-full rounded-full bg-background" />
                </div>
                {/* Avatar image */}
                <div className="avatar-float relative z-10 h-[140px] w-[140px] overflow-hidden rounded-full sm:h-[160px] sm:w-[160px]">
                  <Image
                    src="/images/profile-avatar.png"
                    alt="Aman Shishodia — developer avatar"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              {/* Name + status badge */}
              <div className="flex flex-col items-center gap-1.5 text-center">
                <p className="font-mono text-sm font-bold tracking-tight text-white">Aman Shishodia</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 font-mono text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  Available · Full-time
                </span>
              </div>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Card className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]">
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Top edge highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Terminal chrome */}
                <div className="relative border-b border-white/5 bg-zinc-900/60 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        <span className="font-mono text-[10px] text-zinc-500">main</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
                      profile_config.json
                    </span>
                  </div>
                </div>

                {/* Terminal body with typewriter */}
                <div className="relative bg-[#0d0d0d] p-5 font-mono text-[11px] leading-[1.8] sm:text-xs">
                  <div className="space-y-0 text-zinc-400">
                    {terminalLines.slice(0, lineCount).map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-3 select-none text-zinc-700">{line.num}</span>
                        {line.content}
                      </motion.p>
                    ))}
                  </div>
                  {/* Blinking cursor */}
                  {lineCount < terminalLines.length && (
                    <motion.span
                      className="mt-0.5 inline-block"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      style={{ width: 2, height: 13, backgroundColor: '#60a5fa', display: 'inline-block', verticalAlign: 'middle' }}
                    />
                  )}
                  {lineCount >= terminalLines.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3"
                    >
                      <span className="text-emerald-400">✓</span>
                      <span className="text-zinc-500 text-[10px]">ready to collaborate</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ width: 2, height: 12, backgroundColor: '#60a5fa', display: 'inline-block', verticalAlign: 'middle' }}
                      />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/8">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-white">B.TECH CST — MAIT, Delhi</p>
                  <p className="font-mono text-[10px] text-zinc-600">2022 – 2026</p>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-zinc-400 pl-1">
                <p>
                  I'm a{' '}
                  <span className="font-medium text-zinc-200">Computer Science & Technology</span>{' '}
                  undergraduate at Maharaja Agrasen Institute of Technology, supplementing coursework
                  with deep practice in{' '}
                  <span className="font-medium text-blue-400">competitive algorithms</span> and{' '}
                  <span className="font-medium text-blue-400">modern full-stack systems</span>.
                </p>
                <p>
                  I focus on measurable performance metrics, structured schemas, and shipping
                  products that solve{' '}
                  <span className="font-medium text-zinc-200">real-world problems</span> at scale.
                </p>
              </div>

              {/* Open-to-work status */}
              <a
                href="mailto:amanshishodia863@gmail.com"
                className="group mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 px-4 py-2 font-mono text-xs font-medium text-emerald-400 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                Open to full-time roles
                <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN — Pillars grid (7 cols) ══════════════════════════ */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Card
                      variant="interactive"
                      spotlightColor={pillar.glow}
                      className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#0f0f0f] p-6 transition-all duration-500"
                      style={{
                        '--hover-glow': pillar.glow,
                        '--hover-border': pillar.border,
                        '--hover-bg': pillar.bg,
                      } as React.CSSProperties}
                    >
                      {/* Per-pillar colored glow on hover */}
                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${pillar.glow}, transparent 70%)` }}
                      />
                      {/* Top-edge shimmer */}
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}60, transparent)` }}
                      />

                      <div className="relative space-y-4">
                        {/* Icon + title row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="mb-2 text-sm font-bold tracking-tight text-white leading-snug">
                              {pillar.title}
                            </p>
                            {/* Colored underline accent */}
                            <motion.div
                              className="h-0.5 rounded-full"
                              style={{ background: `linear-gradient(to right, ${pillar.accent}, transparent)` }}
                              initial={{ width: '1.5rem' }}
                              whileHover={{ width: '3rem' }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          {/* Icon box with per-pillar color */}
                          <div
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                            style={{
                              background: pillar.bg,
                              borderColor: 'rgba(255,255,255,0.08)',
                              color: pillar.accent,
                            }}
                          >
                            <Icon className="h-4.5 w-4.5 h-5 w-5" />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                          {pillar.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Footnote / CTA strip below pillars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-5 py-4"
            >
              <div className="flex -space-x-1">
                {['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
                  <span
                    key={i}
                    className={`h-5 w-5 rounded-full border-2 border-[#0f0f0f] ${c}`}
                  />
                ))}
              </div>
              <p className="font-mono text-[11px] text-zinc-500">
                4 core specialisations &nbsp;·&nbsp; always learning
              </p>
              <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
                <span className="h-1 w-1 rounded-full bg-zinc-600" />
                <span>React · Node · AWS · C++</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
