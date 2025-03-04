/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', '@react-icons/all-files'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/9.x/pixel-art/**',
        search: '',
      }
    ]
  }
};

module.exports = nextConfig
