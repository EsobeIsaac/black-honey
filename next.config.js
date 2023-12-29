/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {ignoreDuringBuilds: true},
    experimental: {
      serverComponentsExternalPackages: ["mongoose"]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'drive.google.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
    },
    webpack(config) {
      config.experiments={
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
}


module.exports = nextConfig
