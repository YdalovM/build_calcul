/**
 * Номер счётчика Яндекс.Метрики только из env — без «тихого» дефолта,
 * чтобы локальная разработка и превью не засоряли прод-статистику.
 *
 * На проде после создания счётчика: `NEXT_PUBLIC_YM_COUNTER_ID=12345678`.
 */
export function resolveYandexMetrikaCounterId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YM_COUNTER_ID;
  if (raw === undefined || raw === "") return null;
  const n = Number.parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}
