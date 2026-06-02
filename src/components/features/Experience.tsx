'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

// Reusable fade-up variant
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const bullets1 = [
  'Redesigned data caching layers to improve page load efficiency by 35%.',
  'Developed secure JSON Web Token (JWT) user authentication protocols.',
  'Implemented advanced client-side query filters to browse content topics.',
];

const bullets2 = [
  'Constructed interactive map overlays for geospatial travel destination discovery.',
  'Integrated Socket.io web-socket gateways to support real-time chat between travelers.',
  'Refactored Express.js schema resolvers, achieving 40% optimization of backend API endpoints.',
];

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-background border-border/50 relative z-10 border-t py-20"
    >
      {/* Background: Amber career-path atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 32px)',
          }}
        />
        <div className="absolute top-0 right-1/4 h-[400px] w-[350px] rounded-full bg-amber-500/5 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-[250px] w-[250px] rounded-full bg-orange-500/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">

        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col space-y-2"
        >
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            EXPERIENCE
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Work Experience.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            My professional history, internship highlights, and the direct engineering impacts I
            delivered.
          </Text>
        </motion.div>

        {/* ── Timeline Container ── */}
        <div className="relative ml-4 pl-6 md:ml-8">

          {/* Animated timeline line draw */}
          <motion.div
            className="border-border absolute top-0 left-0 w-px origin-top bg-border"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ height: '100%' }}
          />

          {/* Animated glowing dot */}
          <motion.div
            className="absolute top-1.5 -left-[6px] h-3 w-3 rounded-full bg-accent"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'backOut' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/30"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div className="space-y-12">

            {/* ── Experience Header ── */}
            <motion.div
              className="gsap-reveal-item space-y-2"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15, ease: 'backOut' }}
                  >
                    <Briefcase className="text-accent h-5 w-5" />
                  </motion.div>
                  <Text size="xl" weight="bold" className="text-foreground">
                    Full Stack Developer Intern
                  </Text>
                  <Text size="base" color="accent" weight="semibold">
                    @ Cantilever
                  </Text>
                </div>

                {/* Date pill slides in from right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-muted-foreground bg-card border-border flex items-center space-x-1.5 rounded-full border px-3 py-1 font-mono text-xs"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>July 2025 &ndash; Sept 2025</span>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Project Cards Grid ── */}
            <div className="grid gap-6 pt-2 md:grid-cols-2">

              {/* Card 1: News Aggregator */}
              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="gsap-reveal-item"
              >
                <Card className="border-border flex h-full flex-col justify-between border bg-[#111111] p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]">
                  <div className="space-y-4">
                    <div className="border-border/40 flex items-center justify-between border-b pb-3">
                      <Text size="lg" weight="bold">
                        News Aggregator
                      </Text>
                      {/* Metric pill fades in with delay */}
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5, ease: 'backOut' }}
                        className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400 shadow-sm shadow-emerald-500/5"
                      >
                        +35% Load Speed
                      </motion.span>
                    </div>

                    <ul className="space-y-2.5 text-sm text-zinc-400">
                      {bullets1.map((text, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <Check className="text-accent mt-0.5 mr-2.5 h-4 w-4 flex-shrink-0" />
                          <span>{text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Card 2: TravelBuddy */}
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="gsap-reveal-item"
              >
                <Card className="border-border flex h-full flex-col justify-between border bg-[#111111] p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]">
                  <div className="space-y-4">
                    <div className="border-border/40 flex items-center justify-between border-b pb-3">
                      <Text size="lg" weight="bold">
                        TravelBuddy
                      </Text>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6, ease: 'backOut' }}
                        className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-blue-400 shadow-sm shadow-blue-500/5"
                      >
                        +40% Optimised
                      </motion.span>
                    </div>

                    <ul className="space-y-2.5 text-sm text-zinc-400">
                      {bullets2.map((text, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.45 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <Check className="text-accent mt-0.5 mr-2.5 h-4 w-4 flex-shrink-0" />
                          <span>{text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
