/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
  domains: ['pbcdnw.aoneroom.com', 'images.unsplash.com', 'ui-avatars.com', 'via.placeholder.com'],
},
  // TAMBAHKAN BAGIAN INI
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
