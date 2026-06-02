import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout';
import { Text } from '@/components/ui/Text';
import { getBlogPosts } from '@/lib/content';
import { BlogSearchList } from './BlogSearchList';

export const metadata = {
  title: 'Blog',
  description: 'Technical articles, research write-ups, and developer notes by Aman Shishodia.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="bg-background relative min-h-screen pb-20">
      {/* Subtle top spotlight glow */}
      <div className="absolute top-0 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

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
        <div className="mb-12 flex flex-col space-y-4">
          <Text
            as="span"
            family="mono"
            size="xs"
            color="accent"
            weight="bold"
            className="tracking-widest uppercase"
          >
            engineering logs
          </Text>
          <Text as="h1" size="4xl" weight="extrabold" className="tracking-tight">
            Blog.
          </Text>
          <Text color="muted" size="base" className="max-w-[34rem] text-sm sm:text-base leading-relaxed">
            Writing about front-end architecture, full-stack systems, performance optimization, and
            algorithmic problem solving.
          </Text>
        </div>

        {/* Search & Listing */}
        <BlogSearchList initialPosts={posts} />
      </Container>
    </div>
  );
}
