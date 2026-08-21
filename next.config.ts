import type { NextConfig } from "next";

/**
 * Retired posts mapped to their nearest living replacement. Keeping these as
 * content-matched 301s consolidates any link equity instead of dumping every
 * old URL on the index page.
 */
const RETIRED_POST_REDIRECTS: Record<string, string> = {
  "future-of-accessible-technology": "/blog/inclucode-2026-inclusive-software-innovation-buildathon/",
  "scalable-systems-with-communities": "/blog/ieee-sahrdaya-student-branch-movement/",
  "people-centric-ai": "/blog/soulsync-emotional-wellness/",
};


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
      /*
       * Retired blog posts used to 301 to /blog/, which Google treats as a soft
       * redirect and keeps the old URLs in the index under their old titles.
       * Each now points at the closest surviving post so the redirect is a real
       * content match; anything without one is handled as 410 in middleware.
       */
      ...Object.entries(RETIRED_POST_REDIRECTS).flatMap(([slug, destination]) => [
        { source: `/blog/${slug}/`, destination, permanent: true },
        { source: `/blog/${slug}`, destination, permanent: true },
      ]),
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
