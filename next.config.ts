/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  experimental: {
    serverActions: {
      allowedOrigins:[
        'localhost:3000',
        'potental-yodal-pj7p554wj5g926gx9.github.dev/',
      ],
    },
  },
  // Turbopack is used automatically in dev mode in Next 13+
  // No need for custom webpack config unless absolutely needed
};

module.exports = nextConfig;
