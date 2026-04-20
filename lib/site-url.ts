// ИИ: единая точка базового URL для metadata, JSON-LD, sitemap.
// В проде задать NEXT_PUBLIC_SITE_URL (https://..., без хвостового /).
// Локально без env — localhost:3000; при смене порта dev подставь env или
// оставь как есть и не дублируй URL в других файлах.
const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeUrl(input: string): string {
  return input.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (envUrl) {
    return normalizeUrl(envUrl);
  }

  return LOCAL_SITE_URL;
}
