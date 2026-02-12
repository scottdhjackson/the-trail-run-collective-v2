import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['sanity', '@sanity/vision'],
  webpack: (config, { isServer }) => {
    // Polyfill useEffectEvent for Sanity compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      }
    }

    // Add polyfills for React Compiler and useEffectEvent
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react': require.resolve('react'),
      'react/compiler-runtime': path.resolve(__dirname, 'react-compiler-runtime.js'),
    }

    return config
  },
}

export default nextConfig
