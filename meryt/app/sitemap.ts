import { MetadataRoute } from "next";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meryt.app";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
    { url: `${base}/leaderboard`, lastModified: now, changeFrequency: "hourly", priority: 0.95 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/verify`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/roadmap`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/api-docs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/status`, lastModified: now, changeFrequency: "hourly", priority: 0.6 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/rankings`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/newsletter`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${base}/hall-of-fame`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/open`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/score`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/discover`, lastModified: now, changeFrequency: "daily", priority: 0.75 },
    { url: `${base}/trending`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/api-docs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...(["iit-bombay","mit","oxford","eth-zurich","caltech","cambridge","tsinghua","tokyo"].map(s => ({
      url: `${base}/university/${s}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7,
    }))),
  ];

  const profilePages: MetadataRoute.Sitemap = LEADERBOARD_DATA.map(c => ({
    url: `${base}/profile/${c.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: c.rank <= 10 ? 0.9 : c.rank <= 50 ? 0.75 : 0.6,
  }));

  const orgPages: MetadataRoute.Sitemap = [
    "iit-bombay", "mit", "tokyo-u", "stanford", "oxford",
    "eth-zurich", "kaist", "tsinghua", "caltech", "cambridge",
  ].map(slug => ({
    url: `${base}/org/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    "ni-score-explained", "not-social-credit", "verification-accuracy",
    "global-talent-map", "api-v1-launch", "rank-card-embeds",
  ].map(slug => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...profilePages, ...orgPages, ...blogPages];
}
