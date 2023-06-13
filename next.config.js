/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    // appDir: true,
    // serverActions: true,
    serverComponentsExternalPackages: ['bcrypt', 'sharp', 'crypto', "uuid"],
  },
}

module.exports = nextConfig
