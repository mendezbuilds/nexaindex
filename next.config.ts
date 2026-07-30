import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // RainbowKit's default wallet list pulls in Coinbase's Base Account SDK,
  // whose optional x402-payment dynamic imports aren't installed and don't
  // need to be — they're guarded at runtime, but Next's SSR bundler still
  // tries to statically resolve them unless the package is external.
  serverExternalPackages: ["@coinbase/cdp-sdk", "@base-org/account"],
};

export default nextConfig;
