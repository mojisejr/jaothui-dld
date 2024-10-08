/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // if your website has no www, drop it
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default config;
