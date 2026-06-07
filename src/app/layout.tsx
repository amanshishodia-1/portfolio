import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar, Footer } from '@/components/layout';
import { PremiumBackground } from '@/components/ui/PremiumBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'Aman Shishodia - Portfolio',
    template: '%s | Aman Shishodia',
  },
  description:
    'Full stack developer building React interfaces, Node.js backends, and real-time systems. Knight-ranked on LeetCode (1900+, Top 3.5% globally).',
  keywords: [
    'Aman Shishodia',
    'Portfolio',
    'Full Stack Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'LeetCode Knight',
    'Competitive Programming',
  ],
  authors: [{ name: 'Aman Shishodia' }],
  creator: 'Aman Shishodia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-amanshishodia.vercel.app',
    siteName: 'Aman Shishodia',
    title: 'Aman Shishodia - Full Stack Developer Portfolio',
    description:
      'Full stack developer building React interfaces, Node.js backends, and real-time systems. Knight-ranked on LeetCode (1900+, Top 3.5%).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aman Shishodia - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Shishodia - Full Stack Developer Portfolio',
    description:
      'Full stack developer building React interfaces, Node.js backends, and real-time systems. Knight-ranked on LeetCode (1900+, Top 3.5%).',
    images: ['/og-image.png'],
    creator: '@aman_shishodia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aman Shishodia',
    jobTitle: 'Full Stack Developer',
    url: 'https://portfolio-amanshishodia.vercel.app',
    email: 'amanshishodia863@gmail.com',
    sameAs: [
      'https://github.com/amanshishodia-1',
      'https://www.linkedin.com/in/aman-shishodiaa/',
      'https://leetcode.com/u/0Aman5/',
      'https://www.codechef.com/users/crash_yarn_66',
      'https://codeforces.com/profile/2Aman9',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Maharaja Agrasen Institute of Technology (MAIT)',
    },
    knowsAbout: [
      'Full Stack Development',
      'Scalable Systems',
      'Problem Solving',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'C++',
      'PostgreSQL',
      'MongoDB',
      'Docker',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PremiumBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
