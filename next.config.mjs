/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  images: {
    unoptimized: true, // This disables Next.js image optimization for static export
  },
};

export default nextConfig;