
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      DOMAIN: process.env.DOMAIN_NAME || 'localhost:3000'
    }
  }

  module.exports = nextConfig