import type { Metadata } from "next";
import Link from "next/link";
import { WallFinishingCalculator } from "@/components/calculators/wall-finishing-calculator";
import { FaqItem } from "@/components/faq/faq-item";
import { PageIntroBand } from "@/components/layout/page-intro-band";
import { JsonLd } from "@/components/seo/json-ld";
import { wallFinishingContent } from "@/content/calculators/wall-finishing";
import { buildWallFinishingJsonLd } from "@/lib/seo-page-jsonld";
import { buildRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildRouteMetadata("/steny-i-otdelka");

export default function WallFinishingPage() {
  return (
    <div className="space-y-4">
      <JsonLd data={buildWallFinishingJsonLd()} />

      <PageIntroBand>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          {wallFinishingContent.pageTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          {wallFinishingContent.pageDescription}
        </p>
        <p className="mt-3 max-w-3xl text-sm text-zinc-700">
          {wallFinishingContent.seoAnswer}
        </p>
      </PageIntroBand>

      <WallFinishingCalculator />

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Частые тематические вопросы по отделке стен
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {wallFinishingContent.queryIntents.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <h3 className="text-base font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          FAQ по расчету материалов
        </h2>
        <div className="mt-4 space-y-2">
          {wallFinishingContent.faq.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Связанные страницы
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            На главную
          </Link>
          <Link
            href="/o-proekte"
            className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            О проекте
          </Link>
          <Link
            href="/pol-i-styazhka"
            className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Пол и стяжка
          </Link>
          <Link
            href="/plitka-i-pokrytiya"
            className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Плитка и покрытия
          </Link>
          <Link
            href="/rashodniki-i-smety"
            className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Расходники и сметы
          </Link>
        </div>
      </section>
    </div>
  );
}
