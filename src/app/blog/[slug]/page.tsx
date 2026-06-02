import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout';
import { Text } from '@/components/ui/Text';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content';
import { ReadingProgressBar } from './ReadingProgressBar';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://amanshishodia.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      tags: post.tags,
      authors: ['Aman Shishodia'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background relative min-h-screen pb-24">
      {/* Scroll reading progress bar */}
      <ReadingProgressBar />

      {/* Background radial spotlight */}
      <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Container className="pt-12 md:pt-20">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex flex-wrap items-center space-x-2 font-mono text-[10px] sm:text-xs text-zinc-500">
          <Link href="/" className="hover:text-foreground transition-colors">
            HOME
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            BLOG
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400 select-none truncate max-w-[150px] sm:max-w-xs">
            {post.title.toUpperCase()}
          </span>
        </div>

        {/* Action Bar */}
        <Link
          href="/blog"
          className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center space-x-2 text-xs font-mono transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>BACK TO BLOG LIST</span>
        </Link>

        {/* Article Header Container */}
        <div className="border-border/60 mb-10 space-y-5 border-b pb-8">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="border-border text-accent rounded border bg-zinc-950 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.publishedAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Primary Title */}
          <Text
            as="h1"
            size="4xl"
            weight="extrabold"
            className="text-foreground tracking-tight max-w-[48rem] leading-none sm:leading-tight"
          >
            {post.title}
          </Text>

          {/* Description summary */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-[44rem] font-normal leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Rich parsed content */}
        <div className="max-w-[44rem] mx-auto md:mx-0">
          <div
            className="article-content text-zinc-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tag footer */}
          <div className="border-border/40 mt-16 flex flex-wrap gap-2 border-t pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border-border rounded border bg-[#161618] px-3 py-1 font-mono text-xs text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
