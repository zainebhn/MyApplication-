/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental',
    appDir: true, // Enable the app directory if using the new app directory structure
  },
  reactStrictMode: true, // Enable React Strict Mode for detecting potential problems
  swcMinify: true, // Use SWC for minification, which is faster than Terser
  output: 'standalone', // Configure the output to be standalone for easier deployment

  // Optional: Handle environment variables if needed
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Example for database URL
    // Add other environment variables as needed
  },

  // Optional: Configure headers, redirects, and rewrites if required
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', // Disable caching for API routes
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/custom-api/:path*',
        destination: '/api/:path*', // Rewrite custom API routes if needed
      },
    ];
  },
};

export default nextConfig;

