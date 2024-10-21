/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dhbbmn2dq/**',
      },
      {
        protocol: 'https',
        hostname: 'upscaleimage-backend.work',
        port: '',
        pathname: '/**',
      }
      ],
        domains: ['localhost'],
      },
};

export default nextConfig;
