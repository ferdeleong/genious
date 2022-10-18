/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "genious-documents.s3.amazonaws.com"]
  }
};

module.exports = nextConfig;
