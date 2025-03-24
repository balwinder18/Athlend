import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Modern approach (Next.js 13+ recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/**', // Allows all paths under /f/
      },
    ],
    
    // Legacy approach (still works)
    domains: ['utfs.io'],
  },
  // Other Next.js configurations...
}

export default nextConfig