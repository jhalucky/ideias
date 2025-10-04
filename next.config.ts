/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this 'images' configuration to whitelist Google's domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Ensure we don't have 'redirect' in client components, but your existing code is fine
};

module.exports = nextConfig;
