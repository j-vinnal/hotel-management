/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows all domains
      },
    ],
  },
    //output: 'export', // client side code only
    output: 'standalone', // standalone output for server-side rendering and dynamic routing
};

export default nextConfig;
