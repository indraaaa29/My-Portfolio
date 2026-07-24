import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ─── Strict Mode ─── */
  reactStrictMode: true,

  /* ─── Powered By Header (security) ─── */
  poweredByHeader: false,

  /* ─── Image Optimization ─── */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ─── Headers ─── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  /* ─── Experimental Features ─── */
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
