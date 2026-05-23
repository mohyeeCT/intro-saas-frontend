/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'faq-saas-frontend.vercel.app' }],
        destination: 'https://faq.copypilot.app/:path*',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig

