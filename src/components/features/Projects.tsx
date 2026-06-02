'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, MessageSquare, Video, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Trackly',
    category: 'Productivity SaaS',
    description:
      'Designed a collaborative workspace featuring optimistic drag-and-drop Kanban states, JWT auth guards, and team workspaces with role-based permissions (RBAC) to handle active issue tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://trackly-psi.vercel.app',
    githubUrl: 'https://github.com/amanshishodia/trackly',
    mockup: <TracklyMockup />,
    slug: 'trackly',
    accentColor: 'rgba(59,130,246,0.15)',
    borderHover: 'rgba(59,130,246,0.3)',
  },
  {
    title: 'Streamify',
    category: 'Real-time Communication',
    description:
      'Constructed a low-latency communication system integrating WebRTC peer feeds (Stream API) and Socket.io state reconciliations. Implemented optimistic updates for instant UI messaging feedback.',
    tech: ['React', 'Node.js', 'Socket.io', 'Stream API'],
    liveUrl: 'https://streamify-uv86.onrender.com/',
    githubUrl: 'https://github.com/amanshishodia/chat-video-app',
    mockup: <ChatVideoMockup />,
    slug: 'chat-video',
    accentColor: 'rgba(139,92,246,0.15)',
    borderHover: 'rgba(139,92,246,0.3)',
  },
  {
    title: 'Resume Analyzer',
    category: 'AI Tool',
    description:
      'Built an ATS profiling engine scanning PDF formats, parsing tokenized layout keyword weights, and utilizing PuterJS cloud nodes to calculate action metrics.',
    tech: ['React', 'TypeScript', 'PuterJS'],
    liveUrl: 'https://resume-analyzer-one-beige.vercel.app/',
    githubUrl: 'https://github.com/amanshishodia/resume-analyzer',
    mockup: <ResumeMockup />,
    slug: 'resume-analyzer',
    accentColor: 'rgba(16,185,129,0.15)',
    borderHover: 'rgba(16,185,129,0.3)',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const mockupVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: 0.35 + i * 0.07, ease: 'backOut' },
  }),
};

const actionsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── GitHub icon ─────────────────────────────────────────────────────────────
const GithubSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="bg-background border-border/50 relative z-10 border-t py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)]" />
        <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[130px]" />
        <div className="absolute -right-20 bottom-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/6 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">

        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col space-y-2"
        >
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            FEATURED WORK
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Projects I&apos;ve Built.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            A collection of SaaS products and utilities built with modern frontend frameworks and
            scalable backend systems.
          </Text>
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="gsap-reveal-item flex h-full"
            >
              <Card
                variant="interactive"
                className="flex h-full w-full flex-col bg-[#111111] transition-all duration-500"
                spotlightColor={project.accentColor}
              >
                {/* ── Mockup area ── */}
                <motion.div
                  variants={mockupVariants}
                  className="border-border relative flex h-48 w-full items-center justify-center overflow-hidden border-b bg-[#09090b] p-4"
                  style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Shimmer sweep on load */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent"
                    animate={{ translateX: ['−100%', '200%'] }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                  />
                  <div style={{ transform: 'translateZ(10px)' }}>
                    {project.mockup}
                  </div>
                </motion.div>

                {/* ── Card Body ── */}
                <div
                  className="flex flex-1 flex-col justify-between p-6"
                  style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                >
                  <div className="space-y-3">
                    {/* Category + title */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
                      }}
                      className="flex flex-col space-y-1"
                      style={{ transform: 'translateZ(5px)' }}
                    >
                      <Text family="mono" size="xs" color="muted">
                        {project.category}
                      </Text>
                      <CardTitleCustom>{project.title}</CardTitleCustom>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.4, delay: 0.28 } },
                      }}
                    >
                      <Text
                        size="sm"
                        color="muted"
                        className="line-clamp-4 leading-relaxed font-sans"
                        style={{ transform: 'translateZ(2px)' }}
                      >
                        {project.description}
                      </Text>
                    </motion.div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2" style={{ transform: 'translateZ(4px)' }}>
                      {project.tech.map((t, i) => (
                        <motion.span
                          key={t}
                          custom={i}
                          variants={badgeVariants}
                          className="border-border rounded border bg-[#161618] px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-400"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* ── Action buttons ── */}
                  <motion.div
                    variants={actionsVariants}
                    className="border-border/40 mt-6 flex flex-col gap-2.5 border-t pt-6 w-full"
                    style={{ transform: 'translateZ(8px)' }}
                  >
                    <Button
                      variant="accent"
                      size="sm"
                      href={`/projects/${project.slug}`}
                      rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                      className="w-full text-xs font-semibold"
                    >
                      Read Case Study
                    </Button>
                    <div className="flex gap-2.5 w-full">
                      <Button
                        variant="secondary"
                        size="sm"
                        href={project.liveUrl}
                        leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
                        className="flex-1 text-xs"
                      >
                        Demo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        href={project.githubUrl}
                        leftIcon={<GithubSVG />}
                        className="flex-1 text-xs"
                      >
                        GitHub
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Local helpers ────────────────────────────────────────────────────────────
function CardTitleCustom({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-foreground font-sans text-lg leading-tight font-semibold tracking-tight">
      {children}
    </h3>
  );
}

// ─── Mockup components ────────────────────────────────────────────────────────

// 1. Kanban Board Mockup for Trackly
export function TracklyMockup() {
  return (
    <div className="border-border flex h-full w-full flex-col space-y-2 rounded border bg-[#111111]/85 p-3 font-sans text-[10px] opacity-80 select-none">
      <div className="border-border/40 flex items-center justify-between border-b pb-1.5">
        <div className="flex items-center space-x-1.5">
          <Layers className="text-accent h-3.5 w-3.5" />
          <span className="text-foreground font-mono font-bold">trackly_board</span>
        </div>
        <div className="flex space-x-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 overflow-hidden">
        <div className="border-border/20 flex flex-col space-y-1.5 rounded border bg-[#161618]/50 p-1.5">
          <span className="font-mono text-[8px] font-bold text-zinc-500 uppercase">Todo</span>
          <div className="border-border/30 flex flex-col space-y-1 rounded border bg-[#1c1c1e] p-1.5 shadow-sm">
            <span className="h-1 w-4/5 rounded bg-zinc-600" />
            <span className="h-1 w-1/2 rounded bg-zinc-700" />
          </div>
        </div>
        <div className="border-border/20 flex flex-col space-y-1.5 rounded border bg-[#161618]/50 p-1.5">
          <span className="font-mono text-[8px] font-bold text-blue-500 uppercase">Active</span>
          <div className="bg-accent/10 border-accent/30 flex flex-col space-y-1 rounded border p-1.5 shadow-sm">
            <span className="h-1 w-11/12 rounded bg-blue-400" />
            <span className="h-1 w-3/4 rounded bg-blue-500/50" />
          </div>
        </div>
        <div className="border-border/20 flex flex-col space-y-1.5 rounded border bg-[#161618]/50 p-1.5">
          <span className="font-mono text-[8px] font-bold text-emerald-500 uppercase">Done</span>
          <div className="border-border/30 flex flex-col space-y-1 rounded border bg-[#1c1c1e] p-1.5 opacity-60 shadow-sm">
            <span className="h-1 w-5/6 rounded bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Video Calling App Mockup
export function ChatVideoMockup() {
  return (
    <div className="border-border flex h-full w-full flex-col space-y-2 rounded border bg-[#111111]/85 p-3 font-sans text-[10px] opacity-80 select-none">
      <div className="border-border/40 flex items-center justify-between border-b pb-1.5">
        <div className="flex items-center space-x-1.5">
          <MessageSquare className="text-accent h-3.5 w-3.5" />
          <span className="text-foreground font-mono font-bold">channel_general</span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-[8px] text-emerald-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span>LIVE</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 overflow-hidden">
        <div className="border-border/40 relative flex items-center justify-center overflow-hidden rounded border bg-zinc-950">
          <div className="text-accent flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/30 font-mono text-[9px] font-bold">AS</div>
          <span className="py-0.2 absolute bottom-1 left-1 rounded bg-black/60 px-1 font-mono text-[7px] text-zinc-500">Aman (You)</span>
          <Video className="absolute top-1 right-1 h-3 w-3 text-zinc-500" />
        </div>
        <div className="border-border/40 relative flex items-center justify-center overflow-hidden rounded border bg-zinc-950">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600/30 font-mono text-[9px] font-bold text-indigo-400">JD</div>
          <span className="py-0.2 absolute bottom-1 left-1 rounded bg-black/60 px-1 font-mono text-[7px] text-zinc-500">John D.</span>
          <Video className="absolute top-1 right-1 h-3 w-3 text-zinc-500" />
        </div>
      </div>
    </div>
  );
}

// 3. Resume Analyzer Mockup
export function ResumeMockup() {
  return (
    <div className="border-border flex h-full w-full flex-col space-y-2 rounded border bg-[#111111]/85 p-3 font-sans text-[10px] opacity-80 select-none">
      <div className="border-border/40 flex items-center justify-between border-b pb-1.5">
        <div className="flex items-center space-x-1.5">
          <FileText className="text-accent h-3.5 w-3.5" />
          <span className="text-foreground font-mono font-bold">resume_report</span>
        </div>
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      </div>
      <div className="flex flex-1 items-center space-x-4 overflow-hidden">
        <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform">
            <circle cx="28" cy="28" r="22" stroke="#27272a" strokeWidth="4" fill="transparent" />
            <circle cx="28" cy="28" r="22" stroke="#3b82f6" strokeWidth="4" fill="transparent"
              strokeDasharray={138} strokeDashoffset={138 - (138 * 87) / 100} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground font-mono text-[10px] font-bold">87%</span>
            <span className="font-mono text-[6px] text-zinc-500 uppercase">ATS</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col space-y-1.5">
          <div className="space-y-0.5">
            <div className="flex justify-between font-mono text-[7px] text-zinc-500">
              <span>Keywords</span><span>92%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[92%] rounded-full bg-blue-500" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between font-mono text-[7px] text-zinc-500">
              <span>Formatting</span><span>80%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[80%] rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
