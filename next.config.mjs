/** @type {import('next').NextConfig} */

// HTTPS Enforcement:
// When deployed on Vercel (the target hosting platform), HTTPS is enforced automatically
// at the CDN/edge layer — all HTTP requests are redirected to HTTPS before reaching
// the Next.js application. No additional Next.js config is required for Vercel deployments.
//
// For self-hosted deployments, add a reverse proxy (nginx/Caddy) or use the headers()
// config below (uncommented) to redirect HTTP → HTTPS at the application layer.
//
// headers() example for self-hosted production:
// async headers() {
//   if (process.env.NODE_ENV !== 'production') return []
//   return [
//     {
//       source: '/(.*)',
//       headers: [
//         { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
//       ],
//     },
//   ]
// },

const nextConfig = {
  async redirects() {
    return [
      { source: '/parents', destination: '/for-parents', permanent: true },
      { source: '/education', destination: '/education-hub', permanent: true },
      { source: '/spiritual', destination: '/spiritual-food', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
