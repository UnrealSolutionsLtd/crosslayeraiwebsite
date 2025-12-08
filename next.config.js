/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment - uncomment and set your repo name if not using custom domain
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
  trailingSlash: true,
}

module.exports = nextConfig

