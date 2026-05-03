import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/leaderboard",
          "/search",
          "/verify",
          "/pricing",
          "/about",
          "/blog",
          "/blog/",
          "/profile/",
          "/org/",
          "/embed/",
          "/rankings",
          "/compare",
          "/partners",
          "/careers",
          "/status",
          "/roadmap",
          "/changelog",
          "/api-docs",
          "/faq",
          "/contact",
          "/privacy",
          "/terms",
          "/api/rss",
          "/api/v1/",
        ],
        disallow: [
          "/admin/",
          "/dashboard",
          "/settings",
          "/notifications",
          "/api/webhook",
          "/api/verify",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: "https://meryt.app/sitemap.xml",
    host: "https://meryt.app",
  };
}
