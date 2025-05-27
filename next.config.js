/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iezdiximqlkcfmkdivdzr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
} 