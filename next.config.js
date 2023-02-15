const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: { domains: ['data-api.nokkvi.is'] },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://data-api.nokkvi.is',
  },

}

module.exports = nextConfig
