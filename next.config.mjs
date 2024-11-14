/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: false,
  pwa: {
    dest: "public",
  },
};

module.exports = withPWA(nextConfig);
