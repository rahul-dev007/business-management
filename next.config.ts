/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // ✅ THIS IS REQUIRED FOR app/layout.tsx TO WORK
  },
};

export default nextConfig;
