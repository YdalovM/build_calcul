const DEFAULT_YM_COUNTER_ID = 108775784;

/**
 * Номер счётчика Яндекс.Метрики: по умолчанию `108775784`, переопределение
 * через `NEXT_PUBLIC_YM_COUNTER_ID`. Для отключения локально/на превью:
 * `NEXT_PUBLIC_YM_COUNTER_ID=0` или пустая строка.
 */
export function resolveYandexMetrikaCounterId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YM_COUNTER_ID;
  if (raw !== undefined) {
    const trimmed = String(raw).trim();
    if (trimmed === "" || trimmed === "0" || trimmed === "false" || trimmed === "off")
      return null;
    const n = Number.parseInt(trimmed, 10);
    if (Number.isFinite(n) && n > 0) return n;
    return null;
  }
  return DEFAULT_YM_COUNTER_ID;
}
