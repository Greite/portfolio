import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons/io'],
  },
}

export default nextConfig
