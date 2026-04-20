import type { NextConfig } from "next";

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
