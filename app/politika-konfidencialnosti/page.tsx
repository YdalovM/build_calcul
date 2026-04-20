import type { Metadata } from "next";
import Link from "next/link";
import { PageIntroBand } from "@/components/layout/page-intro-band";
import { JsonLd } from "@/components/seo/json-ld";
import { siteSeo } from "@/content/seo";
import { buildPrivacyPolicyJsonLd } from "@/lib/seo-page-jsonld";
import { buildRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildRouteMetadata("/politika-konfidencialnosti");

const linkExternal =
  "font-medium text-accent underline decoration-accent/35 underline-offset-2 transition hover:text-accent-hover";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-4">
      <JsonLd data={buildPrivacyPolicyJsonLd()} />

      <PageIntroBand>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Документ описывает, какие данные могут обрабатываться при посещении сайта
          Build Calcul (сервис линейки DayLab). Актуальная редакция всегда на этой
          странице; дата пересмотра контента по методике калькуляторов указана в
          ревизии контента: <strong>{siteSeo.contentRevision}</strong>.
        </p>
      </PageIntroBand>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          1. Область действия
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-700">
          Политика распространяется на страницы, отдаваемые с домена, на котором
          размещён Build Calcul (далее — «Сервис»). Конкретный адрес сайта задаётся
          при публикации; технический канонический URL используется в метаданных и
          файлах для поисковых систем.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          2. Данные калькуляторов
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-700">
          Введённые вами размеры, проценты запаса и прочие параметры для расчёта{" "}
          <strong>обрабатываются в браузере</strong> на устройстве пользователя,
          чтобы показать результат и пояснение. Мы не передаём эти значения на наш
          сервер для хранения личного профиля расчётов. Если вы сохраняете или
          пересылаете ссылку с параметрами в адресе — содержимое URL видно так же,
          как у любой открытой ссылки; делитесь адресом осознанно.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          3. Яндекс.Метрика
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-700">
          Если на Сервисе включён счётчик{" "}
          <a
            href="https://yandex.ru/legal/metrica_termsofuse/"
            className={linkExternal}
            rel="noopener noreferrer"
          >
            Яндекс.Метрики
          </a>
          , компания Яндекс может получать обезличенные сведения о визитах
          (например просмотры страниц, переходы, тип устройства, регион в
          обобщённом виде). Это помогает понимать нагрузку и популярность разделов.
          Условия использования Метрики — по ссылке выше.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          4. Реклама и cookie
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-700">
          При подключении рекламных сетей (в том числе{" "}
          <a
            href="https://yandex.ru/legal/rules_ads/"
            className={linkExternal}
            rel="noopener noreferrer"
          >
            рекламной сети Яндекса
          </a>
          ) для подбора и учёта показов могут использоваться cookie и аналогичные
          технологии; состав данных определяется политикой соответствующей
          площадки. Блоки размещаются так, чтобы не мешать вводу данных и чтению
          результатов расчёта.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          5. Изменения
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-700">
          Текст может обновляться при смене состава инструментов (аналитика,
          реклама, хостинг). Ревизия контента проекта:{" "}
          <strong>{siteSeo.contentRevision}</strong>.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
          Связанные страницы
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          <li>
            <Link
              href="/o-proekte"
              className="inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/35 underline-offset-2 transition hover:text-accent-hover"
            >
              О проекте и ограничениях расчётов
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/35 underline-offset-2 transition hover:text-accent-hover"
            >
              На главную
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
