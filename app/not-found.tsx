import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600">
        Возможно, ссылка устарела или страница была перенесена. Вернитесь на
        главную и откройте нужный раздел из навигации.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          На главную
        </Link>
        <Link
          href="/o-proekte"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          О проекте
        </Link>
      </div>
    </section>
  );
}
