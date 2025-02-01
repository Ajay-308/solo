/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.leetcode.com",
        pathname: "/users/**",
      },
    ],
  },
};

module.exports = nextConfig;
