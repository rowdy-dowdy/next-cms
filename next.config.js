/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    // serverActions: true,
    serverComponentsExternalPackages: ['bcrypt', 'sharp', 'crypto', "uuid"],
  },
}

module.exports = nextConfig
