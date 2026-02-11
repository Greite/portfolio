import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['react-icons/io'],
  },
}

export default nextConfig
