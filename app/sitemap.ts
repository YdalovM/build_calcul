// ИИ: URL берутся только из content/seo indexedStaticRoutes — новые страницы
// добавляются там, а не вручную в этом файле.
import type { MetadataRoute } from "next";
import { type IndexedStaticRoute, indexedStaticRoutes, siteSeo } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

function sitemapPriority(path: IndexedStaticRoute): number {
  if (path === "/") return 1;
  if (path === "/o-proekte") return 0.65;
  if (path === "/politika-konfidencialnosti") return 0.45;
  return 0.85;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date(siteSeo.contentRevision);

  return indexedStaticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: sitemapPriority(path),
    alternates: {
      languages: {
        "ru-RU": `${siteUrl}${path}`,
        "x-default": `${siteUrl}${path}`,
      },
    },
  }));
}
