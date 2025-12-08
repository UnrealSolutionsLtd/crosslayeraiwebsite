/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment - set your repo name
  basePath: '/crosslayeraiwebsite',
  assetPrefix: '/crosslayeraiwebsite/',
  trailingSlash: true,
}

module.exports = nextConfig

