/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- Crucial for GitHub Pages
  
  // 1. If your repo name is "my-website", set this to "/my-website"
  // 2. If your repo name is exactly "username.github.io", leave this empty or remove it.
  basePath: '/your-repo-name', 

  images: {
    unoptimized: true, // <--- Crucial: Next.js Image component doesn't work with static export by default
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dentcare-website-s3-bucket-01.s3.eu-north-1.amazonaws.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
};

module.exports = nextConfig;
