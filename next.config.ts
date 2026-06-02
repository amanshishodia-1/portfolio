import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  eslint: {
    // ESLint already runs in CI — never block the Vercel build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors are caught locally — don't block Vercel
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
