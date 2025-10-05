import bundleAnalyzer from '@next/bundle-analyzer';
import WebpackObfuscator from 'webpack-obfuscator';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
  },
  
  // Compress images for better performance
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [65, 70, 75, 80, 85, 90], // Add quality values used in the app
  },
  
  // Enable compression
  compress: true,
  
  // Optimize production build
  productionBrowserSourceMaps: false,
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Only apply obfuscation in production and client-side
    if (!dev && !isServer && process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.8,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
          identifierNamesGenerator: 'mangled-shuffled',
          // Don't obfuscate reserved names
          reservedNames: ['React', 'ReactDOM', 'next', '__next', 'window', 'document'],
          // Exclude certain files from obfuscation
          exclude: [/node_modules/, /\.min\.js$/],
        })
      );
    }
    
    // Add bundle optimization
    if (!isServer) {
      // Ensure splitChunks is properly initialized
      if (!config.optimization.splitChunks || config.optimization.splitChunks === false) {
        config.optimization.splitChunks = {};
      }
      
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...(config.optimization.splitChunks.cacheGroups || {}),
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
        },
        fontawesome: {
          test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
          name: 'fontawesome',
          priority: 20,
          chunks: 'all',
        },
      };
    }
    
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
