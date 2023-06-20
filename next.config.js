/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@deck.gl/layers", "@mapbox/tiny-sdf"],
    experimental: {
      esmExternals: "loose",
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;