import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { pageIdentityByPath } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

type BreadcrumbsProps = {
  pathname: string;
};

// ИИ: единая точка правды для хлебных крошек (визуал + JSON-LD BreadcrumbList).
// Пути в проекте плоские (1 уровень), поэтому крошки всегда выглядят как
// "Главная / <текущая страница>". При появлении вложенных разделов здесь нужно
// будет нарезать pathname по сегментам и подтягивать их метки из pageIdentityByPath.
export function Breadcrumbs({ pathname }: BreadcrumbsProps) {
  if (pathname === "/") {
    return null;
  }

  const identity = pageIdentityByPath[pathname];
  if (!identity) {
    return null;
  }

  const siteUrl = getSiteUrl();
  const currentUrl = `${siteUrl}${pathname}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: identity.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <nav aria-label="Хлебные крошки">
        <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-zinc-500">
          <li>
            <Link
              href="/"
              className="transition hover:text-accent-hover hover:underline"
            >
              Главная
            </Link>
          </li>
          <li aria-hidden="true" className="text-accent/60">
            /
          </li>
          <li
            aria-current="page"
            className="min-w-0 max-w-full break-words font-medium text-zinc-800"
          >
            {identity.title}
          </li>
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
