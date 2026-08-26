import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
