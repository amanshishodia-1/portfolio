'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, Mail, Terminal, Award, Code2, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardDescription } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Magnetic } from '@/components/ui/Magnetic';
import { useGsapContext } from '@/hooks/useGsap';
import gsap from 'gsap';

// Toggle debug markers via URL query parameter: http://localhost:3000/?debug=true
const getDebugMode = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('debug') === 'true';
};

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useGsapContext(
    () => {
      if (reducedMotion || !mounted) return;
      const scrollContainer = containerRef.current;
      const pinTarget = pinTargetRef.current;
      if (!scrollContainer || !pinTarget) return;

      const DEBUG = getDebugMode();

      // GSAP Responsive MatchMedia setup
      const mm = gsap.matchMedia();

      // 1. DESKTOP TIMELINE (lg viewports >= 1024px)
      mm.add('(min-width: 1024px)', () => {
        // Set initial states - content starts fully visible so the page isn't empty on load
        gsap.set('.hero-content-column', { opacity: 1, y: 0, filter: 'blur(0px)' });
        gsap.set('.hero-centerpiece-column', { opacity: 0, scale: 0.7 });
        gsap.set('.metrics-card', { opacity: 0, y: 40, scale: 0.8, rotation: -5 });
        gsap.set('.orb-ring-horizontal', { rotationX: 75, rotationZ: 0 });
        gsap.set('.orb-ring-vertical', { rotationY: 75, rotationZ: 0 });
        gsap.set('.orb-svg-ring', { rotation: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: '+=100vh',
            pin: pinTarget,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: DEBUG ? { startColor: 'green', endColor: 'red', fontSize: '12px' } : false,
          },
        });

        // --- SCROLL 1 (0% to 100% of timeline - from 0px to 100vh scrolled) ---
        // Reveal centerpiece orb (0% to 25% of timeline duration)
        tl.to('.hero-centerpiece-column', { opacity: 1, scale: 1, duration: 1.5 }, 0);

        // Shift text layout in X-space (10% to 35% of timeline duration)
        tl.to('.hero-content-inner', { xPercent: -5, duration: 1.5 }, 0.5);

        // 3D Orbit Rotations (20% to 50% of timeline duration)
        tl.to('.orb-ring-horizontal', { rotationZ: 180, duration: 1.8 }, 1.2)
          .to('.orb-ring-vertical', { rotationZ: -180, duration: 1.8 }, 1.2)
          .to('.orb-svg-ring', { rotation: 180, duration: 1.8 }, 1.2);

        // Fade & slide in metrics grid (50% to 100% of timeline duration)
        // By 100% (exactly 1 scroll), metrics cards are fully visible and readable
        tl.to('.hero-text-primary', { opacity: 0.25, scale: 0.95, duration: 1.5 }, 2.0).to(
          '.metrics-card',
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
          },
          2.0,
        );
      });

      // 2. MOBILE & TABLET TIMELINE (viewports < 1024px)
      mm.add('(max-width: 1023px)', () => {
        // In mobile viewports, orb sits centered in the background as a glowing glass element
        gsap.set('.hero-content-column', { opacity: 1, y: 0, filter: 'blur(0px)' });
        gsap.set('.hero-centerpiece-column', { opacity: 0, scale: 0.6 });
        gsap.set('.metrics-card', { opacity: 0, y: 30, scale: 0.85 });
        gsap.set('.orb-svg-ring', { rotation: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: '+=100vh',
            pin: pinTarget,
            pinSpacing: true,
            scrub: 1.0,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: DEBUG ? { startColor: 'orange', endColor: 'purple' } : false,
          },
        });

        // Scroll 1 (0% to 100%):
        tl.to('.hero-centerpiece-column', { opacity: 0.25, scale: 0.9, duration: 1.5 }, 0);
        tl.to('.hero-text-primary', { opacity: 0.3, duration: 1.5 }, 0.75)
          .to('.orb-svg-ring', { rotation: 90, duration: 1.5 }, 0.75)
          .to(
            '.metrics-card',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.5)',
            },
            1.5,
          );
      });
    },
    containerRef,
    [reducedMotion, mounted],
  );

  // Static Fallback Layout for Reduced Motion or SSR phase
  if (reducedMotion && mounted) {
    return (
      <div className="bg-background relative flex min-h-screen w-full items-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-15" />
        </div>
        <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="border-border bg-card inline-flex items-center space-x-2 rounded-full border px-4 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <Text size="xs" color="muted" weight="medium" family="mono">
                Available for full-time opportunities
              </Text>
            </div>
            <div className="space-y-3">
              <Text
                as="span"
                family="mono"
                size="xs"
                color="accent"
                weight="bold"
                className="block tracking-widest uppercase"
              >
                FULL STACK DEVELOPER
              </Text>
              <Text
                as="h1"
                size="5xl"
                weight="extrabold"
                className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text leading-none tracking-tight text-transparent"
              >
                AMAN SHISHODIA
              </Text>
            </div>
            <Text color="muted" size="lg" className="max-w-[40rem] font-sans leading-relaxed">
              Specializing in Next.js core architectures, real-time node synchronization, and
              contest-tested algorithmic optimization. Focused on low-latency systems and clean
              interface state logic.
            </Text>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="accent"
                href="/projects"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                href="https://drive.google.com/file/d/1A1TOb4Pt56tx6bKtyMm64hagbvn9sAIq/view?usp=drive_link"
                size="lg"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5">
            <div className="relative flex h-[300px] w-[300px] items-center justify-center">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-3xl" />
              <style>{`
                @keyframes heroFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                @keyframes ringRotate {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                .coder-img-float { animation: heroFloat 5s ease-in-out infinite; }
                .coder-ring-spin { animation: ringRotate 6s linear infinite; }
              `}</style>
              {/* Spinning conic-gradient neon ring */}
              <div
                className="coder-ring-spin pointer-events-none absolute"
                style={{
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                  padding: '3px',
                }}
              >
                <div className="h-full w-full rounded-full bg-background" />
              </div>
              {/* Profile photo — circular clip */}
              <div className="coder-img-float relative z-10 h-[240px] w-[240px] overflow-hidden rounded-full border-2 border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.4)]">
                <Image
                  src="/images/coder-profile.png"
                  alt="Aman Shishodia — developer profile"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="cinematic-hero-scroll-container bg-background relative w-full"
      style={{ height: '100vh' }}
    >
      {/* Pinned viewport target */}
      <div
        ref={pinTargetRef}
        className="cinematic-hero-pin-target relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Background Grids */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] bg-[size:4.5rem_4.5rem] opacity-30" />
          <div className="hero-bg-glow-1 pointer-events-none absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="hero-bg-glow-2 pointer-events-none absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        {/* Inner Wrapper containing content + visual orb centerpiece */}
        <Container className="cinematic-hero-inner-wrapper relative z-10 flex h-full w-full items-center justify-center">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* 1. Left/Content Column */}
            <div className="hero-content-column relative z-20 flex flex-col items-start justify-center text-left select-none lg:col-span-7">
              <div className="hero-content-inner w-full space-y-6">
                {/* Visual wrap for primary elements that recede in Phase 4 */}
                <div className="hero-text-primary space-y-6">
                  {/* Availability Badge */}
                  <div className="hero-badge border-border bg-card flex max-w-max items-center space-x-2 rounded-full border px-4 py-1.5 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <Text size="xs" color="muted" weight="medium" family="mono">
                      Available for full-time opportunities
                    </Text>
                  </div>

                  {/* Title / Name */}
                  <div className="space-y-3">
                    <Text
                      as="span"
                      family="mono"
                      size="xs"
                      color="accent"
                      weight="bold"
                      className="block tracking-widest uppercase"
                    >
                      FULL STACK DEVELOPER
                    </Text>
                    <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text font-sans text-4xl leading-none font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                      AMAN SHISHODIA
                    </h1>
                  </div>

                  {/* Headline */}
                  <p className="text-muted-foreground max-w-[38rem] font-sans text-sm leading-relaxed sm:text-base lg:text-lg">
                    Specializing in Next.js core architectures, real-time node synchronization, and
                    contest-tested algorithmic optimization. Focused on low-latency systems and
                    clean interface state logic.
                  </p>

                  {/* Action buttons */}
                  <div className="hero-ctas flex flex-wrap items-center gap-3.5 pt-2">
                    <Magnetic range={40} strength={0.25}>
                      <Button
                        variant="accent"
                        href="/projects"
                        size="md"
                        rightIcon={<ArrowRight className="h-4 w-4" />}
                      >
                        View Projects
                      </Button>
                    </Magnetic>
                    <Magnetic range={40} strength={0.25}>
                      <Button
                        variant="secondary"
                        href="https://drive.google.com/file/d/1A1TOb4Pt56tx6bKtyMm64hagbvn9sAIq/view?usp=drive_link"
                        size="md"
                        leftIcon={<Download className="h-4 w-4" />}
                      >
                        Resume
                      </Button>
                    </Magnetic>
                    <Magnetic range={40} strength={0.25}>
                      <Button
                        variant="ghost"
                        href="mailto:amanshishodia863@gmail.com"
                        size="md"
                        leftIcon={<Mail className="h-4 w-4" />}
                      >
                        Contact
                      </Button>
                    </Magnetic>
                  </div>
                </div>
                {/* Metrics Highlights Grid (Fades in during Phase 4) */}
                <div className="hero-metrics-grid grid w-full grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
                  {/* Card 1 */}
                  <Card
                    variant="interactive"
                    className="metrics-card group border-white/[0.08] bg-[#111111]/85 shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-500/30 hover:bg-[#0a0a0a] hover:shadow-2xl"
                  >
                    <CardHeader
                      className="flex flex-col items-center p-6 text-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="border-border/80 text-accent flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-950 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        <Terminal className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <Text
                        family="mono"
                        weight="extrabold"
                        size="2xl"
                        className="mt-4 leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        Intern
                      </Text>
                      <CardDescription
                        className="text-muted-foreground/80 mt-2 text-xs transition-colors duration-300 group-hover:text-blue-300/70"
                        style={{ transform: 'translateZ(6px)' }}
                      >
                        Full Stack Developer
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Card 2 */}
                  <Card
                    variant="interactive"
                    className="metrics-card group border-white/[0.08] bg-[#111111]/85 shadow-xl transition-all duration-300 hover:scale-105 hover:border-indigo-500/30 hover:bg-[#0a0a0a] hover:shadow-2xl"
                  >
                    <CardHeader
                      className="flex flex-col items-center p-6 text-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="border-border/80 text-accent flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-950 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        <Code2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <Text
                        family="mono"
                        weight="extrabold"
                        size="2xl"
                        className="mt-4 leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-400"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        1000+
                      </Text>
                      <CardDescription
                        className="text-muted-foreground/80 mt-2 text-xs transition-colors duration-300 group-hover:text-indigo-300/70"
                        style={{ transform: 'translateZ(6px)' }}
                      >
                        Problems Solved
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Card 3 */}
                  <Card
                    variant="interactive"
                    className="metrics-card group border-white/[0.08] bg-[#111111]/85 shadow-xl transition-all duration-300 hover:scale-105 hover:border-amber-500/30 hover:bg-[#0a0a0a] hover:shadow-2xl"
                  >
                    <CardHeader
                      className="flex flex-col items-center p-6 text-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="border-border/80 text-accent flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-950 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        <Award className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <Text
                        family="mono"
                        weight="extrabold"
                        size="2xl"
                        className="mt-4 leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        Knight
                      </Text>
                      <CardDescription
                        className="text-muted-foreground/80 mt-2 text-xs transition-colors duration-300 group-hover:text-amber-300/70"
                        style={{ transform: 'translateZ(6px)' }}
                      >
                        LeetCode Profile
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Card 4 */}
                  <Card
                    variant="interactive"
                    className="metrics-card group border-white/[0.08] bg-[#111111]/85 shadow-xl transition-all duration-300 hover:scale-105 hover:border-emerald-500/30 hover:bg-[#0a0a0a] hover:shadow-2xl"
                  >
                    <CardHeader
                      className="flex flex-col items-center p-6 text-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="border-border/80 text-accent flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-950 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <Text
                        family="mono"
                        weight="extrabold"
                        size="2xl"
                        className="mt-4 leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        2 Star
                      </Text>
                      <CardDescription
                        className="text-muted-foreground/80 mt-2 text-xs transition-colors duration-300 group-hover:text-emerald-300/70"
                        style={{ transform: 'translateZ(6px)' }}
                      >
                        CodeChef Profile
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>

            {/* 2. Right/Centerpiece Column */}
            <div className="hero-centerpiece-column pointer-events-none relative z-10 flex items-center justify-center lg:col-span-5">
              <div className="style-3d relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]">
                {/* Glowing Aura (Behind) */}
                <div className="pointer-events-none absolute h-[180px] w-[180px] animate-pulse rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-[50px] sm:h-[220px] sm:w-[220px]" />

                {/* Orbit coordinates rings (Rotating on Z on scroll) */}
                <div
                  className="orb-ring-horizontal pointer-events-none absolute h-[240px] w-[240px] rounded-full border border-dashed border-blue-500/20 sm:h-[320px] sm:w-[320px]"
                  style={{ transformStyle: 'preserve-3d' }}
                />
                <div
                  className="orb-ring-vertical pointer-events-none absolute h-[240px] w-[240px] rounded-full border border-indigo-500/25 sm:h-[320px] sm:w-[320px]"
                  style={{ transformStyle: 'preserve-3d' }}
                />

                {/* SVG Concentric Ring with Orbit Nodes */}
                <svg
                  className="orb-svg-ring pointer-events-none absolute h-[260px] w-[260px] overflow-visible sm:h-[340px] sm:w-[340px]"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                  />
                  <g className="orb-code-nodes">
                    <circle cx="50" cy="4" r="1.5" fill="#61DAFB" />
                    <circle cx="96" cy="50" r="1.5" fill="#3178C6" />
                    <circle cx="50" cy="96" r="1.5" fill="#F7DF1E" />
                    <circle cx="4" cy="50" r="1.5" fill="#47A248" />
                  </g>
                </svg>

                {/* Profile photo — circular portrait inside orbit rings */}
                <div className="absolute z-10 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px]">
                  {/* Ambient glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/35 via-indigo-500/25 to-purple-500/35 blur-2xl" />
                  {/* Spinning conic-gradient neon ring */}
                  <div
                    className="coder-ring-spin pointer-events-none absolute"
                    style={{
                      inset: '-3px',
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                      padding: '3px',
                    }}
                  >
                    <div className="h-full w-full rounded-full bg-background" />
                  </div>
                  {/* Photo */}
                  <div className="coder-img-float relative z-10 h-full w-full overflow-hidden rounded-full border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.45)]">
                    <Image
                      src="/images/coder-profile.png"
                      alt="Aman Shishodia — developer profile"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>


              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
