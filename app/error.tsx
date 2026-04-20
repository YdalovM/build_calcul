"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
        Техническая ошибка
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
        Не удалось загрузить страницу
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600">
        Попробуйте обновить расчет. Если ошибка повторяется, перейдите в другой
        раздел и вернитесь позже.
      </p>
      <p className="mt-3 text-xs text-zinc-500">
        Код: {error.digest ?? "unknown"}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Повторить
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
