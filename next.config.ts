/** @type {import('next').NextConfig} */const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins:[
        'localhost:3000',
        'potental-yodal-pj7p554wj5g926gx9.github.dev/',
      ],
    },
  },
};

module.exports = nextConfig;
