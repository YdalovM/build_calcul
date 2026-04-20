import { faqItems } from "@/content/site";
import { costEstimateContent } from "@/content/calculators/cost-estimate";
import { floorScreedContent } from "@/content/calculators/floor-screed";
import { tileCoverageContent } from "@/content/calculators/tile-coverage";
import { wallFinishingContent } from "@/content/calculators/wall-finishing";
import { siteSeo } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

// ИИ: BreadcrumbList для всех внутренних страниц рендерит компонент
// `components/layout/breadcrumbs.tsx` — там единая точка правды
// (визуал + JSON-LD). В этих билдерах BreadcrumbList НЕ дублируем,
// иначе получим две структуры BreadcrumbList в одной странице.

function webpageGraphRefs(siteUrl: string) {
  const siteId = `${siteUrl}/#website`;
  const orgId = `${siteUrl}/#organization`;
  return {
    publisher: { "@id": orgId },
    isPartOf: { "@id": siteId },
  };
}

type FaqEntry = {
  question: string;
  answer: string;
};

function buildFaqEntities(items: readonly FaqEntry[]) {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}

export function buildHomeJsonLdExtended(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: buildFaqEntities(faqItems),
    },
  ];
}

export function buildAboutProjectJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/o-proekte`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.aboutProject.title,
      description: siteSeo.aboutProject.description,
      inLanguage: siteSeo.languageTag,
      about: "Строительные калькуляторы, категории и архитектура проекта",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}

export function buildPrivacyPolicyJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/politika-konfidencialnosti`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.privacyPolicy.title,
      description: siteSeo.privacyPolicy.description,
      inLanguage: siteSeo.languageTag,
      about: "Обработка данных посетителей, аналитика и реклама",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}

export function buildWallFinishingJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/steny-i-otdelka`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: buildFaqEntities(wallFinishingContent.faq),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.wallFinishing.title,
      description: siteSeo.wallFinishing.description,
      inLanguage: siteSeo.languageTag,
      about: "Расчет штукатурки, шпаклевки, грунтовки и краски для стен",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}

export function buildFloorScreedJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/pol-i-styazhka`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: buildFaqEntities(floorScreedContent.faq),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.floorScreed.title,
      description: siteSeo.floorScreed.description,
      inLanguage: siteSeo.languageTag,
      about: "Расчет объема стяжки пола и количества сухой смеси",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}

export function buildTileCoverageJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/plitka-i-pokrytiya`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: buildFaqEntities(tileCoverageContent.faq),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.tileCoverage.title,
      description: siteSeo.tileCoverage.description,
      inLanguage: siteSeo.languageTag,
      about: "Расчет количества плитки и упаковок для пола и покрытий",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}

export function buildCostEstimateJsonLd(): Array<Record<string, unknown>> {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/rashodniki-i-smety`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: buildFaqEntities(costEstimateContent.faq),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: siteSeo.costEstimate.title,
      description: siteSeo.costEstimate.description,
      inLanguage: siteSeo.languageTag,
      about: "Расчет бюджета ремонта по площади, расходникам и резерву",
      ...webpageGraphRefs(siteUrl),
    },
  ];
}
