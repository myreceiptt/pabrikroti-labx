/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is stable; use the top-level config.
  turbopack: {
    rules: {}, // Enables default Turbopack configuration
  },

  // ✅ Keeps Webpack fixes (if needed)
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
