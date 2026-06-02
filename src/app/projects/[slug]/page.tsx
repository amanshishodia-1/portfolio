import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, ChevronRight, Layers, MessageSquare, FileText } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/content';
import { TracklyMockup, ChatVideoMockup, ResumeMockup } from '@/components/features/Projects';
import { ReadingProgressBar } from '@/app/blog/[slug]/ReadingProgressBar';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${study.title} - Case Study`,
    description: study.description,
    openGraph: {
      title: `${study.title} - Case Study`,
      description: study.description,
      type: 'article',
      url: `https://amanshishodia.com/projects/${study.slug}`,
    },
  };
}

// Map slug to visual mockup component
function getVisualMockup(slug: string) {
  switch (slug) {
    case 'trackly':
      return <TracklyMockup />;
    case 'chat-video':
      return <ChatVideoMockup />;
    case 'resume-analyzer':
      return <ResumeMockup />;
    default:
      return null;
  }
}

// Map slug to Lucide category icon
function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'trackly':
      return <Layers className="h-5 w-5 text-blue-500" />;
    case 'chat-video':
      return <MessageSquare className="h-5 w-5 text-indigo-500" />;
    case 'resume-analyzer':
      return <FileText className="h-5 w-5 text-emerald-500" />;
    default:
      return null;
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <article className="bg-background relative min-h-screen pb-24">
      {/* Scroll reading progress bar */}
      <ReadingProgressBar />

      {/* Background spotlight */}
      <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Container className="pt-12 md:pt-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center space-x-2 font-mono text-[10px] sm:text-xs text-zinc-500">
          <Link href="/" className="hover:text-foreground transition-colors">
            HOME
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/projects" className="hover:text-foreground transition-colors">
            PROJECTS
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400 select-none truncate max-w-[150px] sm:max-w-xs text-xs">
            {study.title.toUpperCase()}
          </span>
        </div>

        {/* Back Link */}
        <Link
          href="/projects"
          className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center space-x-2 text-xs font-mono transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>BACK TO PROJECTS LIST</span>
        </Link>

        {/* Layout Split: Header details & mockup display */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12 border-b border-border/60 pb-10 mb-12 items-start">
          {/* Left: Info panel */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-2.5 font-mono text-xs text-zinc-500">
              <span className="border-border text-accent rounded border bg-zinc-950 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                {study.category}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {getCategoryIcon(slug)}
              <Text as="h1" size="3xl" weight="extrabold" className="text-foreground tracking-tight leading-tight">
                {study.title}
              </Text>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[40rem]">
              {study.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {study.tech.map((t) => (
                <span
                  key={t}
                  className="border-border rounded border bg-[#161618] px-2.5 py-0.5 font-mono text-[10px] font-medium text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                variant="secondary"
                size="sm"
                href={study.liveUrl}
                rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Launch Demo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                href={study.githubUrl}
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
                className="text-xs"
              >
                Source Code
              </Button>
            </div>
          </div>

          {/* Right: Mockup container (Covers 5 columns) */}
          <div className="lg:col-span-5 border-border bg-[#09090b] flex min-h-[220px] items-center justify-center rounded-xl border p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] bg-[size:16px_16px] opacity-15" />
            <div className="relative z-10 w-full max-w-[280px]">
              {getVisualMockup(slug)}
            </div>
          </div>
        </div>

        {/* Dynamic Markdown parsed body content */}
        <div className="max-w-[44rem]">
          <div
            className="article-content text-zinc-300"
            dangerouslySetInnerHTML={{ __html: study.content }}
          />
        </div>
      </Container>
    </article>
  );
}
