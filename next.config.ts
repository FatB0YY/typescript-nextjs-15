import type { NextConfig } from 'next';
import StylelintPlugin from 'stylelint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(new StylelintPlugin());
    config.plugins.push(new WebpackBar());

    if (process.env.ANALYZE === 'true') {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};

export default nextConfig;
