import type { NextConfig } from "next";

// Статический экспорт вшивает getSiteUrl() в sitemap/robots/metadata — без
// NEXT_PUBLIC_SITE_URL в окружении при `next build` туда попадёт localhost.
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL?.trim()
) {
  // eslint-disable-next-line no-console
  console.warn(
    "\n[build_calcul] Предупреждение: не задан NEXT_PUBLIC_SITE_URL. " +
      "sitemap.xml, robots.txt и metadataBase укажут http://localhost:3000. " +
      "Для Яндекс.Вебмастера задайте при сборке, например: https://example.com\n"
  );
}

// ИИ: `output: "export"` — статическая выкладка в `out/` без Node (`next start`).
// Несовместимо с `headers()` / `redirects` / `rewrites` в этом файле — заголовки
// безопасности (CSP и т.д.) задаются на стороне CDN/веб-сервера или панели хостинга.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
