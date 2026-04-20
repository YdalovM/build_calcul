import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaqItem } from "@/components/faq/faq-item";
import { PageIntroBand } from "@/components/layout/page-intro-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  faqItems,
  siteTagline,
  siteTitle,
  workflowSteps,
} from "@/content/site";
import { buildHomeJsonLd } from "@/lib/seo-home-jsonld";
import { buildHomeJsonLdExtended } from "@/lib/seo-page-jsonld";
import { buildHomeMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildHomeMetadata();

function IconWalls({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M4 13h16" />
      <path d="M10 13v8" />
      <path d="M14 13v8" />
    </svg>
  );
}

function IconFloor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20h16" />
      <path d="M6 16h12" />
      <path d="M8 12h8" />
      <path d="M10 8h4" />
    </svg>
  );
}

function IconTile({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconEstimate({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  );
}

type ToolCard = {
  title: string;
  text: string;
  href: string;
  icon: ReactNode;
};

export default function Home() {
  const tools: ToolCard[] = [
    {
      title: "Стены и отделка",
      text: "Штукатурка, шпаклевка, грунтовка и краска.",
      href: "/steny-i-otdelka",
      icon: <IconWalls className="h-6 w-6" />,
    },
    {
      title: "Пол и стяжка",
      text: "Объем стяжки, масса смеси и количество мешков.",
      href: "/pol-i-styazhka",
      icon: <IconFloor className="h-6 w-6" />,
    },
    {
      title: "Плитка и покрытия",
      text: "Количество плитки и расчет упаковок.",
      href: "/plitka-i-pokrytiya",
      icon: <IconTile className="h-6 w-6" />,
    },
    {
      title: "Расходники и сметы",
      text: "Бюджет ремонта по площади и резерву.",
      href: "/rashodniki-i-smety",
      icon: <IconEstimate className="h-6 w-6" />,
    },
  ];

  return (
    <div className="space-y-4">
      <JsonLd data={buildHomeJsonLd()} />
      <JsonLd data={buildHomeJsonLdExtended()} />

      {/* ИИ: первый экран = выбор инструмента. Карточки — главный визуальный
          якорь: иконка в accent-soft, верхняя кирпичная полоса, целая карточка —
          ссылка (без «таблеток» rounded-full). CTA остаётся нейтральным по цвету. */}
      <PageIntroBand id="instrumenty">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          DayLab · <span className="text-accent accent-text-glow">{siteTitle}</span>
        </p>
        <h1 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          Строительные калькуляторы: выберите нужный расчет
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
          {siteTagline}
        </p>
        <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2">
          {tools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white p-5 shadow-sm outline-none ring-zinc-300 transition hover:border-zinc-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="accent-ring-glow absolute inset-x-0 top-0 h-0.5 bg-accent"
              />
              {/* ИИ: верхний ряд — иконка по центру только блока текста (items-center).
                  Ниже — пустой flex-1-спейсер: выравнивает футер в ряду без растягивания
                  описания, иначе иконка уезжает в середину всей карточки. */}
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    {tool.icon}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-mono text-[11px] font-semibold tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
                      {tool.title}
                    </h2>
                    <p className="mt-2 text-sm leading-snug text-zinc-600">{tool.text}</p>
                  </div>
                </div>
                <div className="min-h-0 flex-1" aria-hidden="true" />
              </div>
              <div className="mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                <span className="text-sm font-semibold text-zinc-800">
                  Перейти к расчёту
                </span>
                <span
                  className="text-lg font-medium text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-600"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageIntroBand>

      <section
        id="workflow"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Как пользоваться сервисом
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {workflowSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <h3 className="text-base font-semibold text-zinc-900">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-700">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          FAQ
        </h2>
        <div className="mt-4 space-y-2">
          {faqItems.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              variant="accentLead"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
