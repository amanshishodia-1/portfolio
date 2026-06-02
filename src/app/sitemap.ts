import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();
  const baseUrl = 'https://amanshishodia.com';

  // Map dynamic blog posts sitemaps
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Standard static page maps
  const routes = ['', '/projects', '/about', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...blogUrls];
}
