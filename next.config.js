/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Custom domain - no basePath needed
  trailingSlash: true,
}

module.exports = nextConfig

