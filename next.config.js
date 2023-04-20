/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
module.exports = withBundleAnalyzer(nextConfig)
