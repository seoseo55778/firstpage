import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
