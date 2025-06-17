import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import StylelintPlugin from 'stylelint-webpack-plugin';
import WebpackBar from 'webpackbar';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(new StylelintPlugin());
    config.plugins.push(new WebpackBar());

    return config;
  },
};

export default bundleAnalyzer(nextConfig);
