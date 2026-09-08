import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory makes Turbopack infer the
  // wrong workspace root, which breaks CSS file watching in dev.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
