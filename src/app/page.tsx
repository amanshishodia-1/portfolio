'use client';

import React from 'react';

import { Projects } from '@/components/features/Projects';
import { Skills } from '@/components/features/Skills';
import { Experience } from '@/components/features/Experience';
import { Achievements } from '@/components/features/Achievements';
import { Dashboard } from '@/components/features/Dashboard';
import { Contact } from '@/components/features/Contact';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CinematicHero } from '@/components/features/CinematicHero';

export default function Home() {
  return (
    <div className="bg-background relative w-full overflow-hidden">
      <CinematicHero />

      <ScrollReveal childSelector=".gsap-reveal-item">
        <Projects />
      </ScrollReveal>
      <ScrollReveal childSelector=".gsap-reveal-item">
        <Experience />
      </ScrollReveal>
      <ScrollReveal childSelector=".gsap-reveal-item">
        <Skills />
      </ScrollReveal>
      <ScrollReveal childSelector=".gsap-reveal-item">
        <Achievements />
      </ScrollReveal>
      <ScrollReveal childSelector=".gsap-reveal-item">
        <Dashboard />
      </ScrollReveal>
      <ScrollReveal childSelector=".gsap-reveal-item">
        <Contact />
      </ScrollReveal>
    </div>
  );
}
