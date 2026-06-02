'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { BlogPost } from '@/lib/content';

interface BlogSearchListProps {
  initialPosts: BlogPost[];
}

export function BlogSearchList({ initialPosts }: BlogSearchListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(initialPosts.map((post) => post.category)))];

  // Filter posts based on search query and category
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Search & Filters Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="text-zinc-500 absolute top-3.5 left-3.5 h-4 w-4" />
          <input
            type="text"
            placeholder="Search articles, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border bg-card text-foreground placeholder:text-zinc-500 w-full rounded-md border py-2.5 pr-4 pl-10 text-sm outline-none transition-all focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-3.5 py-1.5 font-mono text-xs font-medium transition-colors rounded-md focus:outline-none ${
                  isSelected ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                {isSelected && (
                  <motion.div
                    layoutId="activeBlogFilter"
                    className="border-border bg-secondary absolute inset-0 -z-10 rounded-md border shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blog Cards List */}
      <div className="grid gap-6 grid-cols-1">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card variant="interactive" className="bg-[#111111] p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Meta information row */}
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
                        <span className="border-border text-accent rounded border bg-zinc-950 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
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

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text
                            as="h3"
                            size="xl"
                            weight="bold"
                            className="text-foreground group-hover:text-blue-400 transition-colors leading-tight"
                          >
                            {post.title}
                          </Text>
                          <ArrowRight className="h-4.5 w-4.5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <Text size="sm" color="muted" className="leading-relaxed line-clamp-2">
                          {post.description}
                        </Text>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border-border rounded border bg-[#161618] px-2 py-0.5 font-mono text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-border/60 flex flex-col items-center justify-center py-16 text-center rounded-lg border bg-[#111111]"
            >
              <Text family="mono" size="sm" color="muted" className="mb-2">
                No matching articles found.
              </Text>
              <Text size="xs" color="muted" className="max-w-xs">
                Try adjusting your search keywords or clearing the category filters.
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
