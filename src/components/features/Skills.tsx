'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

// --- INLINE HIGH-FIDELITY BRAND ICONS ---

function TSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#3178C6]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" stroke="none" />
      <path d="M8 9h4M10 9v7M14 11.5c.8-.8 2.2-.8 2.2.8s-1.5 1-1.5 2 1.5.5 1.5 1.2" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#F7DF1E]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E" stroke="none" />
      <path d="M10 14c.5.5 1 .5 1.5 0s.5-1.2-.5-1.5-1.5-.5-1-1.5.5-.5 1.5 0M16 9v5.5c0 1-.8 1.5-1.8 1.2" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CPPIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#00599C]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#00599C" stroke="none" />
      <path d="M9 10a2 2 0 1 0 0 4M14 12h4M16 10v4" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#3776AB]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2A5 5 0 0 0 7 7v2h5v1.5H7a5 5 0 0 0-5 5c0 2.8 2.2 5 5 5h3v-1.8c0-1.8 1.4-3.2 3.2-3.2h3.8A5 5 0 0 0 22 10.5V7c0-2.8-2.2-5-5-5h-3V3.8c0-1.8-1.4-3.2-3.2-3.2z" fill="#3776AB" stroke="none" className="opacity-90" />
      <circle cx="9.5" cy="5.5" r="0.8" fill="white" stroke="none" />
      <circle cx="14.5" cy="18.5" r="0.8" fill="white" stroke="none" />
    </svg>
  );
}

function SQLIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#4479A1]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="9" ry="3" fill="#4479A1" stroke="none" className="opacity-80" />
      <path d="M3 6v5c0 1.6 4 3 9 3s9-1.4 9-3V6M3 11v5c0 1.6 4 3 9 3s9-1.4 9-3v-5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#61DAFB]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

function NextjsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" fill="black" stroke="currentColor" />
      <path d="M9 16.5V8.5l6 8M15 8v8" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#06B6D4]" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#339933]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#339933" stroke="none" className="opacity-90" />
      <path d="M12 22V12m0 0L3 7m9 5l9-5" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

function ExpressIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="black" stroke="currentColor" />
      <path d="M6 10h4M6 14h5M14 10l4 4M18 10l-4 4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function PostgresIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#336791]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 0-10 10c0 4.2 2.6 7.8 6.3 9.3l2.7-2.7a5 5 0 0 1-1-3.1 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-1 3.1l2.7 2.7c3.7-1.5 6.3-5.1 6.3-9.3A10 10 0 0 0 12 2z" fill="#336791" stroke="none" className="opacity-90" />
    </svg>
  );
}

function MongoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#47A248]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2c0 0-6 4-6 10s6 10 6 10 6-4 6-10S12 2 12 2z" fill="#47A248" stroke="none" className="opacity-90" />
      <path d="M12 2v20" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

function PineconeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#23C8A2]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L4 9l8 13 8-13-8-7z" fill="#23C8A2" stroke="none" className="opacity-80" />
      <path d="M12 2v20M4 9h16M8 15.5h8" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#FF9900]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 15c2.5 2.5 9.5 2.5 12 0" stroke="#FF9900" strokeLinecap="round" />
      <path d="M17 12l1.5 2.5-2.8.5" stroke="#FF9900" fill="#FF9900" />
      <path d="M3 8v4M21 8v4M12 4v8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2496ED]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h20M7 12V9h3v3M11 12V9h3v3M15 12V9h3v3M9 9V6h3v3" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 20c4.4 0 8-3.6 8-8H4c0 4.4 3.6 8 8 8z" fill="#2496ED" stroke="none" className="opacity-80" />
    </svg>
  );
}

function AzureIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0078D4]" fill="currentColor">
      <path d="M5.4 19L12 7.6 18.6 19H5.4z" fill="#0078D4" className="opacity-60" />
      <path d="M12 7.6L18.6 19H22L14.4 5.6 12 7.6z" fill="#0078D4" />
    </svg>
  );
}

function ActionsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2088FF]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="6" height="6" rx="1" fill="#2088FF" stroke="none" />
      <rect x="16" y="3" width="6" height="6" rx="1" fill="#2088FF" stroke="none" />
      <rect x="9" y="15" width="6" height="6" rx="1" fill="#2088FF" stroke="none" />
      <path d="M5 9v3a2 2 0 0 0 2 2h2M19 9v3a2 2 0 0 1-2 2h-2M12 14v1" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

// --- DATA STRUCTURING ---

const skillCategories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Cloud'] as const;
type SkillCategory = (typeof skillCategories)[number];

interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  description: string;
  icon: React.ReactNode;
  brandColor?: string;
  spotlightColor?: string;
}

const skillsData: SkillItem[] = [
  // Languages
  { name: 'C++', category: 'Languages', description: 'High-performance system coding and data structure algorithms.', icon: <CPPIcon />, brandColor: '#00599C', spotlightColor: 'rgba(0, 89, 156, 0.15)' },
  { name: 'Python', category: 'Languages', description: 'AI models, dynamic scripting, and algorithm prototyping.', icon: <PythonIcon />, brandColor: '#3776AB', spotlightColor: 'rgba(55, 118, 171, 0.15)' },
  { name: 'JavaScript', category: 'Languages', description: 'Dynamic clientside scripting and interactive layout features.', icon: <JSIcon />, brandColor: '#F7DF1E', spotlightColor: 'rgba(247, 223, 30, 0.15)' },
  { name: 'TypeScript', category: 'Languages', description: 'Strict typing for robust frontend components and API endpoints.', icon: <TSIcon />, brandColor: '#3178C6', spotlightColor: 'rgba(49, 120, 198, 0.15)' },
  { name: 'SQL', category: 'Languages', description: 'Structured querying, schema setup, and query speed index tuning.', icon: <SQLIcon />, brandColor: '#4479A1', spotlightColor: 'rgba(68, 121, 161, 0.15)' },
  // Frontend
  { name: 'React', category: 'Frontend', description: 'Component abstraction, hooks layout, and high-fidelity page states.', icon: <ReactIcon />, brandColor: '#61DAFB', spotlightColor: 'rgba(97, 218, 251, 0.15)' },
  { name: 'Next.js', category: 'Frontend', description: 'SSR pipelines, App Router compilation, static page builds (SSG).', icon: <NextjsIcon />, brandColor: '#FFFFFF', spotlightColor: 'rgba(255, 255, 255, 0.15)' },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Cascade utility styling, design system properties, CSS custom layers.', icon: <TailwindIcon />, brandColor: '#38BDF8', spotlightColor: 'rgba(56, 189, 248, 0.15)' },
  // Backend
  { name: 'Node.js', category: 'Backend', description: 'V8 server runtime for high-throughput asynchronous execution.', icon: <NodeIcon />, brandColor: '#339933', spotlightColor: 'rgba(51, 153, 51, 0.15)' },
  { name: 'Express.js', category: 'Backend', description: 'Flexible middleware controllers and clean REST controller endpoints.', icon: <ExpressIcon />, brandColor: '#FFFFFF', spotlightColor: 'rgba(255, 255, 255, 0.1)' },
  // Databases
  { name: 'MongoDB', category: 'Databases', description: 'NoSQL document schemas, scaling collections, aggregations.', icon: <MongoIcon />, brandColor: '#47A248', spotlightColor: 'rgba(71, 162, 72, 0.15)' },
  { name: 'PostgreSQL', category: 'Databases', description: 'ACID transaction management, relations mapping, complex indexes.', icon: <PostgresIcon />, brandColor: '#4169E1', spotlightColor: 'rgba(65, 105, 225, 0.15)' },
  { name: 'Pinecone', category: 'Databases', description: 'Vector databases mapping query embeddings for AI models.', icon: <PineconeIcon />, brandColor: '#1CC4DB', spotlightColor: 'rgba(28, 196, 219, 0.15)' },
  // Cloud
  { name: 'AWS', category: 'Cloud', description: 'Infrastructure nodes, cloud assets storage, and API scaling.', icon: <AWSIcon />, brandColor: '#FF9900', spotlightColor: 'rgba(255, 153, 0, 0.15)' },
  { name: 'Docker', category: 'Cloud', description: 'Creating isolated workspace container containers for unified builds.', icon: <DockerIcon />, brandColor: '#2496ED', spotlightColor: 'rgba(36, 150, 237, 0.15)' },
  { name: 'Azure', category: 'Cloud', description: 'Enterprise computing services, VM setup, and deployment routes.', icon: <AzureIcon />, brandColor: '#0089D6', spotlightColor: 'rgba(0, 137, 214, 0.15)' },
  { name: 'GitHub Actions', category: 'Cloud', description: 'Setting trigger workflows for automated CI/CD builds and test suites.', icon: <ActionsIcon />, brandColor: '#2088FF', spotlightColor: 'rgba(32, 136, 255, 0.15)' },
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');

  const filteredSkills = skillsData.filter((skill) => {
    if (selectedCategory === 'All') return true;
    return skill.category === selectedCategory;
  });

  return (
    <section id="skills" className="bg-background border-border/50 relative z-10 border-t py-20">
      {/* Background: Cyan tech-tools atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Horizontal scan-line pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 24px)',
          }}
        />
        {/* Teal center-top glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-cyan-500/5 blur-[130px]" />
        {/* Cyan bottom-right hint */}
        <div className="absolute bottom-0 right-1/3 h-[250px] w-[300px] rounded-full bg-teal-500/5 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-[64rem] px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="mb-12 flex flex-col space-y-2">
          <Text family="mono" size="xs" color="accent" weight="bold" className="tracking-widest">
            CAPABILITIES
          </Text>
          <Text as="h2" size="3xl" weight="extrabold" className="tracking-tight">
            Skills & Tools.
          </Text>
          <Text color="muted" size="base" className="max-w-[32rem]">
            A catalog of technologies I use to architect systems, optimize backend servers, and build fluid frontend modules.
          </Text>
        </div>

        {/* Filter Navigation */}
        <div className="gsap-reveal-item border-border/60 mb-10 flex flex-wrap gap-1.5 border-b pb-4">
          {skillCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-3.5 py-1.5 font-mono text-xs font-medium transition-colors rounded-md focus:outline-none ${
                  isSelected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillsFilter"
                    className="border-border bg-secondary absolute inset-0 -z-10 rounded-md border shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid Display (Vercel Ecosystem Style) */}
        <motion.div layout className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="gsap-reveal-item"
              >
                <Card
                  variant="interactive"
                  className="flex h-full flex-col bg-[#111111] p-5 justify-between select-none"
                  spotlightColor={skill.spotlightColor}
                  style={{
                    '--hover-color': skill.brandColor || '#3b82f6',
                    '--hover-glow': skill.spotlightColor || 'rgba(59, 130, 246, 0.15)',
                  } as React.CSSProperties}
                >
                  <div className="space-y-4" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Header Row: Icon and Name */}
                    <div 
                      className="flex items-center space-x-3.5" 
                      style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                    >
                      <div 
                        className="border-border bg-[#09090b] flex h-10 w-10 items-center justify-center rounded-lg border shadow-inner transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[var(--hover-color)] group-hover:shadow-[0_0_15px_var(--hover-glow)]"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        <div className="transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-12 flex items-center justify-center">
                          {skill.icon}
                        </div>
                      </div>
                      <div className="space-y-0.5" style={{ transformStyle: 'preserve-3d' }}>
                        <h4 
                          className="text-foreground text-sm font-semibold tracking-tight leading-none transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                          style={{ transform: 'translateZ(8px)' }}
                        >
                          {skill.name}
                        </h4>
                        <span 
                          className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wide block"
                          style={{ transform: 'translateZ(6px)' }}
                        >
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Subtitle / Description */}
                    <p 
                      className="text-muted-foreground text-xs leading-relaxed font-sans transition-colors duration-300 group-hover:text-zinc-300"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      {skill.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
