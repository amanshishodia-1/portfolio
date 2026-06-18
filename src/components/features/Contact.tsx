'use client';

import React, { useState } from 'react';
import { Mail, FileText, Download, Check, Copy, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

// --- INLINE VECTOR ICONS ---

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('amanshishodia863@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-background border-border/50 relative z-10 border-t py-20">
      {/* Background: Blue connection/signal atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Directional upward beam */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-full w-[2px] opacity-[0.06]"
          style={{
            background: 'linear-gradient(to top, rgba(59,130,246,0.8), transparent 70%)',
          }}
        />
        {/* Primary center blue glow */}
        <div className="absolute top-1/3 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[100px]" />
        {/* Secondary indigo bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] w-[350px] rounded-full bg-indigo-500/5 blur-[80px]" />
        {/* Faint dot-pattern covering full section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col space-y-2">
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            CONNECT
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Get In Touch.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            Seeking full-time roles, engineering collaborations, or simply technical discussions.
          </Text>
        </div>

        {/* Layout grid */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-12 items-center">
          
          {/* Left Column: Call to Action (Covers 5 columns) */}
          <div className="gsap-reveal-item md:col-span-5 space-y-6">
            <Text as="h3" size="2xl" weight="bold" className="tracking-tight text-foreground leading-tight">
              Let&apos;s build something together.
            </Text>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              I am currently open to full-time **Full Stack Developer** or **Software Engineer** positions. If you are looking for an engineer with structured DSA practices, system optimization experience, and frontend accuracy, let&apos;s discuss.
            </p>
            
            {/* Primary Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="accent"
                href="mailto:amanshishodia863@gmail.com"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Send an Email
              </Button>
              <Button
                variant="secondary"
                href="/resume.pdf"
                leftIcon={<Download className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Download CV
              </Button>
            </div>
          </div>

          {/* Right Column: Cards Grid (Covers 7 columns) */}
          <div className="md:col-span-7 grid gap-4 grid-cols-1 sm:grid-cols-2">
            
            {/* Email Card (With click-to-copy trigger) */}
            <Card
              variant="interactive"
              onClick={handleCopyEmail}
              className="gsap-reveal-item bg-[#111111] p-6 flex flex-col justify-between cursor-pointer select-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="border-border/80 bg-zinc-950 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <button
                    className="text-zinc-500 hover:text-foreground p-1 rounded hover:bg-secondary transition-all"
                    aria-label="Copy email"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <div className="space-y-1">
                  <h4 className="text-foreground text-sm font-semibold tracking-tight">Email Contact</h4>
                  <p className="text-zinc-500 font-mono text-[10px]">amanshishodia863@gmail.com</p>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                  {copied ? 'Copied to clipboard!' : 'Click to copy email address instantly.'}
                </p>
              </div>
            </Card>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-reveal-item block group h-full"
            >
              <Card
                variant="interactive"
                className="bg-[#111111] p-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="border-border/80 bg-zinc-950 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm">
                      <LinkedInIcon />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-foreground text-sm font-semibold tracking-tight">LinkedIn</h4>
                    <p className="text-zinc-500 font-mono text-[10px]">linkedin.com/in/aman</p>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                    Connect for professional networking and career inquiries.
                  </p>
                </div>
              </Card>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/amanshishodia-1"
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-reveal-item block group h-full"
            >
              <Card
                variant="interactive"
                className="bg-[#111111] p-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="border-border/80 bg-zinc-950 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm">
                      <GitHubIcon />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-foreground text-sm font-semibold tracking-tight">GitHub</h4>
                    <p className="text-zinc-500 font-mono text-[10px]">github.com/amanshishodia-1</p>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                    Browse repository files, review commit logs, and inspect source files.
                  </p>
                </div>
              </Card>
            </a>

            {/* Resume Download Card */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-reveal-item block group h-full"
            >
              <Card
                variant="interactive"
                className="bg-[#111111] p-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="border-border/80 bg-zinc-950 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm">
                      <FileText className="h-5 w-5 text-emerald-500" />
                    </div>
                    <Download className="h-4 w-4 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-foreground text-sm font-semibold tracking-tight">Curriculum Vitae</h4>
                    <p className="text-zinc-500 font-mono text-[10px]">resume_latest.pdf</p>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                    Download professional credentials and career experience summary sheets.
                  </p>
                </div>
              </Card>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
