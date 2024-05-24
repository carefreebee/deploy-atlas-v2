/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Disable minimization
    config.optimization.minimize = false;

    return config;
  },
};

export default nextConfig;
