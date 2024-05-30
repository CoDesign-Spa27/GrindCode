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

};

export default nextConfig;
