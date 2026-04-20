import type { Metadata } from "next";
import Link from "next/link";
import { PageIntroBand } from "@/components/layout/page-intro-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  categoryPreviews,
  projectSections,
} from "@/content/site";
import { buildAboutProjectJsonLd } from "@/lib/seo-page-jsonld";
import { buildRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildRouteMetadata("/o-proekte");

export default function AboutProjectPage() {
  return (
    <div className="space-y-4">
      <JsonLd data={buildAboutProjectJsonLd()} />

      <PageIntroBand>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          О проекте
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Build Calcul — это практичный сервис, где пользователь быстро получает
          строительные расчеты и сразу понимает, как применить их в реальной
          закупке и работах. Мы строим продукт как единый центр решений, а не
          набор разрозненных форм.
        </p>
      </PageIntroBand>

      <section
        id="razdely"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Разделы
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {projectSections.map((item) => (
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

      <section
        id="kategorii"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Категории проекта
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {categoryPreviews.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <h3 className="text-base font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-700">{item.text}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                {item.status}
              </p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-3 inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Открыть модуль
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        id="podhod"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Наш подход
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Базовый сценарий сервиса: быстрый ответ, прозрачный расчет, практичный
          следующий шаг. Пользователь не должен разбираться в сложных формулах —
          он должен сразу понимать, что покупать и что проверить до старта работ.
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          Юридическая информация:{" "}
          <Link
            href="/politika-konfidencialnosti"
            className="font-medium text-accent underline decoration-accent/35 underline-offset-2 transition hover:text-accent-hover"
          >
            политика конфиденциальности
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
