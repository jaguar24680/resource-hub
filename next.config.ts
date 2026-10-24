import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  devIndicators: false,
  ...(githubPages
    ? {
        output: "export" as const,
        basePath: "/resource-hub",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default config;
