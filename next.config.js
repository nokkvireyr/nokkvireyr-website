const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: { domains: ['data-api.nokkvi.is'] },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  optimizeFonts: true,
  // experimental: {
  //   nextScriptWorkers: true,
  // }
}

module.exports = nextConfig
