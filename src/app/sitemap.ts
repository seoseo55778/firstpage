import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { cases, site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    ...services.map((item) => `/services/${item.slug}`),
    "/cases",
    ...cases.map((item) => `/cases/${item.slug}`),
    "/blog",
    ...posts.map((item) => `/blog/${item.slug}`),
    "/approach",
    "/brief",
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
