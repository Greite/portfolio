import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'react-icons/io'],
  },
}

export default nextConfig
