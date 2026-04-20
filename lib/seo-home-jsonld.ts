import { siteSeo } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

export function buildHomeJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageId = `${siteUrl}/#webpage`;
  const siteId = `${siteUrl}/#website`;
  const orgId = `${siteUrl}/#organization`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: siteSeo.brandName,
      url: siteUrl,
      description: siteSeo.defaultDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteId,
      url: siteUrl,
      name: siteSeo.siteName,
      inLanguage: siteSeo.languageTag,
      publisher: {
        "@id": orgId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": pageId,
      url: siteUrl,
      name: siteSeo.home.title,
      description: siteSeo.home.description,
      isPartOf: {
        "@id": siteId,
      },
      publisher: {
        "@id": orgId,
      },
      about: "Строительные калькуляторы и расчеты материалов",
      inLanguage: siteSeo.languageTag,
    },
  ];
}
