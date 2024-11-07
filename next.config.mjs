/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config,{isServer}) {
          config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
        if (!isServer) {
            config.resolve.fallback = {
              net: false,
              tls: false,
              perf_hooks: false,
              fs: false,
            };
          }
    return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            }
        ]
    }

};

export default nextConfig;
