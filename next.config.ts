import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
  webpack(config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/stockfish/stockfish-18.js', to: '../public/stockfish/stockfish-18.js' },
          { from: 'node_modules/stockfish/stockfish-18.wasm', to: '../public/stockfish/stockfish-18.wasm' },
        ],
      })
    );
    return config;
  },
};

export default nextConfig;
