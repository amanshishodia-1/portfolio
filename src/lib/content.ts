import fs from 'fs';
import path from 'path';

export interface BlogPost {
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  slug: string;
  content: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  slug: string;
  content: string;
}

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
const caseStudiesDirectory = path.join(process.cwd(), 'src/content/case-studies');

/**
 * Custom Markdown-to-HTML Compiler
 */
function parseMarkdownToHtml(markdown: string): string {
  // Convert standard markdown syntax to semantic HTML strings with premium styling classes
  let html = markdown
    // Escape HTML to prevent markdown breaking or injection
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Restore escaped tags inside markdown code blocks later
  
  // 1. Code blocks: ```lang\ncode\n```
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (_, lang, code) => {
    // Unescape code contents for display
    const cleanCode = code
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    return `<div class="my-6 border border-border/80 rounded-lg overflow-hidden bg-[#09090b] shadow-lg">
      <div class="border-b border-border/60 bg-zinc-950/80 px-4 py-2 flex items-center justify-between">
        <span class="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">${lang || 'code'}</span>
      </div>
      <pre class="p-4 overflow-x-auto"><code class="font-mono text-xs text-zinc-300 block leading-relaxed">${cleanCode}</code></pre>
    </div>`;
  });

  // 2. Inline code spans: `code`
  html = html.replace(/`([^`\n]+)`/g, (_, code) => {
    const cleanCode = code
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    return `<code class="font-mono bg-zinc-900 border border-border/60 px-1.5 py-0.5 rounded text-[11px] text-blue-400 font-medium">${cleanCode}</code>`;
  });

  // 3. Headings:
  html = html.replace(/^###### (.*$)/gim, '<h6 class="text-foreground text-sm font-semibold tracking-tight mt-6 mb-2">$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5 class="text-foreground text-base font-semibold tracking-tight mt-6 mb-2">$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-foreground text-lg font-semibold tracking-tight mt-6 mb-2">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-foreground text-xl font-bold tracking-tight mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-foreground text-2xl font-bold tracking-tight mt-10 mb-4 border-b border-border/40 pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-foreground text-3xl font-extrabold tracking-tight mt-12 mb-4">$1</h1>');

  // 4. Blockquotes: > quote
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-2 border-blue-500 bg-blue-500/5 pl-4 py-2 my-6 italic text-zinc-400 rounded-r">$1</blockquote>');

  // 5. Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');

  // 6. Italics: *text* or _text_
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-zinc-300">$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em class="italic text-zinc-300">$1</em>');

  // 7. Standard Lists parser (processes ul/ol sequentially)
  const lines = html.split('\n');
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isUlItem = /^\s*[\-\*]\s+(.*)$/.exec(line);
    const isOlItem = /^\s*\d+\.\s+(.*)$/.exec(line);

    if (isUlItem) {
      if (!inList || listType !== 'ul') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ul class="list-disc pl-6 my-4 space-y-2 text-zinc-400">');
        inList = true;
        listType = 'ul';
      }
      processedLines.push(`<li class="leading-relaxed">${isUlItem[1]}</li>`);
    } else if (isOlItem) {
      if (!inList || listType !== 'ol') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ol class="list-decimal pl-6 my-4 space-y-2 text-zinc-400">');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li class="leading-relaxed">${isOlItem[1]}</li>`);
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = null;
      }
      processedLines.push(line);
    }
  }
  if (inList) {
    processedLines.push(`</${listType}>`);
  }
  html = processedLines.join('\n');

  // 7.5. Images: ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-8 overflow-hidden rounded-xl border border-border/80 shadow-2xl bg-[#09090b]"><img src="$2" alt="$1" class="w-full h-auto object-cover select-none" /></div>');

  // 8. Hyperlinks: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors">$1</a>');

  // 9. Paragraphs: Surround blocks separated by empty lines
  const blocks = html.split(/\n\n+/);
  const parsedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Prevent wrapping structural HTML elements
    if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<pre') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<blockquote') || trimmed.startsWith('</')) {
      return trimmed;
    }
    return `<p class="leading-relaxed text-zinc-400 my-4 text-sm sm:text-base font-normal">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return parsedBlocks.join('\n');
}

/**
 * Parses frontmatter YAML block and markdown body content from file.
 */
function parseBlogPostFile(filePath: string, filename: string): BlogPost {
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Matches frontmatter block: --- (yaml lines) --- (markdown)
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContents.match(frontmatterRegex);

  const defaultSlug = filename.replace(/\.md$/, '');

  if (!match) {
    return {
      title: defaultSlug,
      description: '',
      publishedAt: 'Recent',
      category: 'General',
      readTime: '1 min read',
      tags: [],
      featured: false,
      slug: defaultSlug,
      content: parseMarkdownToHtml(fileContents),
    };
  }

  const frontmatterString = match[1];
  const markdownBody = match[2];

  // Parse YAML lines
  const metadata: Record<string, string | boolean | string[]> = {};
  frontmatterString.split('\n').forEach((line) => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim();

      // Clean string values
      if (value.startsWith('"') && value.endsWith('"')) {
        metadata[key] = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        metadata[key] = value.substring(1, value.length - 1);
      } else if (value === 'true') {
        metadata[key] = true;
      } else if (value === 'false') {
        metadata[key] = false;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Simple string array representation: [a, b, c]
        metadata[key] = value
          .substring(1, value.length - 1)
          .split(',')
          .map((t) => t.trim().replace(/^["']|["']$/g, ''));
      } else {
        metadata[key] = value;
      }
    }
  });

  const title = typeof metadata.title === 'string' ? metadata.title : defaultSlug;
  const description = typeof metadata.description === 'string' ? metadata.description : '';
  const publishedAt = typeof metadata.publishedAt === 'string' ? metadata.publishedAt : 'Recent';
  const category = typeof metadata.category === 'string' ? metadata.category : 'General';
  const readTime = typeof metadata.readTime === 'string' ? metadata.readTime : '3 min read';
  const tags = Array.isArray(metadata.tags) ? (metadata.tags as string[]) : [];
  const featured = typeof metadata.featured === 'boolean' ? metadata.featured : false;
  const slug = typeof metadata.slug === 'string' ? metadata.slug : defaultSlug;

  return {
    title,
    description,
    publishedAt,
    category,
    readTime,
    tags,
    featured,
    slug,
    content: parseMarkdownToHtml(markdownBody),
  };
}

/**
 * Fetches all blog posts sorted by published date descending.
 */
export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);
  const markdownFiles = files.filter((file) => file.endsWith('.md') && file !== 'placeholder.md');

  const posts = markdownFiles.map((file) => {
    const filePath = path.join(blogsDirectory, file);
    return parseBlogPostFile(filePath, file);
  });

  // Sort by date (latest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Fetches a single blog post by its slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(blogsDirectory)) {
    return null;
  }

  const files = fs.readdirSync(blogsDirectory);
  // Match slug to filename or internal slug parameter
  for (const file of files) {
    if (file.endsWith('.md') && file !== 'placeholder.md') {
      const filePath = path.join(blogsDirectory, file);
      const parsed = parseBlogPostFile(filePath, file);
      if (parsed.slug === slug || file.replace(/\.md$/, '') === slug) {
        return parsed;
      }
    }
  }

  return null;
}

function parseCaseStudyFile(filePath: string, filename: string): CaseStudy {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContents.match(frontmatterRegex);
  const defaultSlug = filename.replace(/\.md$/, '');

  if (!match) {
    return {
      title: defaultSlug,
      category: 'System',
      description: '',
      tech: [],
      liveUrl: '',
      githubUrl: '',
      slug: defaultSlug,
      content: parseMarkdownToHtml(fileContents),
    };
  }

  const frontmatterString = match[1];
  const markdownBody = match[2];

  const metadata: Record<string, string | boolean | string[]> = {};
  frontmatterString.split('\n').forEach((line) => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        metadata[key] = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        metadata[key] = value.substring(1, value.length - 1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        metadata[key] = value
          .substring(1, value.length - 1)
          .split(',')
          .map((t) => t.trim().replace(/^["']|["']$/g, ''));
      } else {
        metadata[key] = value;
      }
    }
  });

  const title = typeof metadata.title === 'string' ? metadata.title : defaultSlug;
  const category = typeof metadata.category === 'string' ? metadata.category : 'System';
  const description = typeof metadata.description === 'string' ? metadata.description : '';
  const tech = Array.isArray(metadata.tech) ? (metadata.tech as string[]) : [];
  const liveUrl = typeof metadata.liveUrl === 'string' ? metadata.liveUrl : '';
  const githubUrl = typeof metadata.githubUrl === 'string' ? metadata.githubUrl : '';
  const slug = typeof metadata.slug === 'string' ? metadata.slug : defaultSlug;

  return {
    title,
    category,
    description,
    tech,
    liveUrl,
    githubUrl,
    slug,
    content: parseMarkdownToHtml(markdownBody),
  };
}

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }
  const files = fs.readdirSync(caseStudiesDirectory);
  const markdownFiles = files.filter((file) => file.endsWith('.md') && file !== 'placeholder.md');

  return markdownFiles.map((file) => {
    const filePath = path.join(caseStudiesDirectory, file);
    return parseCaseStudyFile(filePath, file);
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return null;
  }
  const files = fs.readdirSync(caseStudiesDirectory);
  for (const file of files) {
    if (file.endsWith('.md') && file !== 'placeholder.md') {
      const filePath = path.join(caseStudiesDirectory, file);
      const parsed = parseCaseStudyFile(filePath, file);
      if (parsed.slug === slug || file.replace(/\.md$/, '') === slug) {
        return parsed;
      }
    }
  }
  return null;
}
