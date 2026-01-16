/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- Forces Next.js to produce static HTML files
  
  // IMPORTANT: 
  // 1. If your repo is named 'my-dental-site', set this to '/my-dental-site'
  // 2. If you don't know yet, you can leave it commented out, but your CSS might not load.
  // basePath: '/your-repo-name', 

  images: {
    unoptimized: true, // <--- Required for GitHub Pages
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
