import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  poweredByHeader: false,
  // Origines autorisées en dev (liste séparée par des virgules), définie dans `.env.local`, non versionné.
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(','),
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons/io'],
    useTypeScriptCli: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }],
      },
    ];
  },
};

export default nextConfig;
