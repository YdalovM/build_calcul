import type { Metadata } from "next";
import { type IndexedStaticRoute, siteSeo } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim();
  if (!google && !yandex) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
  };
}

// ИИ: root metadata = глобальные дефолты проекта.
// Для новых страниц используем локальные metadata поверх этой базы.
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteSeo.defaultTitle,
      template: `%s | ${siteSeo.siteName}`,
    },
    description: siteSeo.defaultDescription,
    keywords: [...siteSeo.defaultKeywords],
    applicationName: siteSeo.siteName,
    category: siteSeo.category,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
    },
    alternates: {
      languages: {
        [siteSeo.languageTag]: "/",
        "x-default": "/",
      },
    },
    verification: siteVerification(),
  };
}

// ИИ: metadata главной живет отдельно, чтобы проще расширять SEO
// без изменения layout-контракта.
export function buildHomeMetadata(): Metadata {
  return {
    title: {
      absolute: siteSeo.home.title,
    },
    description: siteSeo.home.description,
    keywords: [...siteSeo.defaultKeywords],
    alternates: {
      canonical: "/",
      languages: {
        [siteSeo.languageTag]: "/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
      title: siteSeo.home.title,
      description: siteSeo.home.description,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.home.title,
      description: siteSeo.home.description,
    },
  };
}

// ИИ: ключи Record должны совпадать с IndexedStaticRoute / indexedStaticRoutes
// в content/seo.ts — иначе тип упрётся или страница останется без SEO.
const pageSeoByRoute: Record<
  IndexedStaticRoute,
  {
    title: string;
    description: string;
    keywords?: readonly string[];
  }
> = {
  "/": siteSeo.home,
  "/o-proekte": siteSeo.aboutProject,
  "/politika-konfidencialnosti": siteSeo.privacyPolicy,
  "/steny-i-otdelka": siteSeo.wallFinishing,
  "/pol-i-styazhka": siteSeo.floorScreed,
  "/plitka-i-pokrytiya": siteSeo.tileCoverage,
  "/rashodniki-i-smety": siteSeo.costEstimate,
};

export function buildRouteMetadata(path: IndexedStaticRoute): Metadata {
  const routeSeo = pageSeoByRoute[path];

  return {
    title: {
      absolute: routeSeo.title,
    },
    description: routeSeo.description,
    keywords: [...siteSeo.defaultKeywords, ...(routeSeo.keywords ?? [])],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: path,
      languages: {
        [siteSeo.languageTag]: path,
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
      title: routeSeo.title,
      description: routeSeo.description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: routeSeo.title,
      description: routeSeo.description,
    },
  };
}
