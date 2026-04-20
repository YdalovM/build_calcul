/**
 * События для Яндекс.Метрики (`reachGoal`). Счётчик задаётся в
 * `components/analytics/YandexMetrika.tsx` через `window.YM_COUNTER_ID`.
 * До загрузки тега вызовы безопасны (no-op).
 */
export function reachGoal(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  const ym = (
    window as unknown as {
      ym?: (id: number, ev: string, goal: string, p?: Record<string, unknown>) => void;
    }
  ).ym;
  const counterId = (window as unknown as { YM_COUNTER_ID?: number }).YM_COUNTER_ID;
  if (typeof ym === "function" && typeof counterId === "number") {
    ym(counterId, "reachGoal", name, params as Record<string, unknown> | undefined);
  }
}
