const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@saas-template/core', '@saas-template/ui'],
  experimental: {
    optimizePackageImports: ['@saas-template/ui'],
  },
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = nextConfig;

