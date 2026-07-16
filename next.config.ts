import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/awards/",
        destination: "/achievements/",
        permanent: true,
      },
      {
        source: "/awards",
        destination: "/achievements/",
        permanent: true,
      },
      {
        source: "/speaking/",
        destination: "/achievements/",
        permanent: false,
      },
      {
        source: "/speaking",
        destination: "/achievements/",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.robinfrancis.in",
          },
        ],
        destination: "https://robinfrancis.in/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sanity.io",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  outputFileTracingExcludes: {
    "*": [
      "./.next-build/**/*",
      "./.next/dev/**/*",
      "./portfolio-cms/node_modules/**/*",
    ],
  },
};

export default nextConfig;
