export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  published: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string[];
  client?: string;
  role?: string;
  duration?: string;
  coverImage: string;
  content: string;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
