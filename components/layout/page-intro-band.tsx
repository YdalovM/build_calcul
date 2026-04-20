import type { ComponentPropsWithoutRef } from "react";

// ИИ: общая «первая полоса» страницы — тот же градиент, что у блока
// инструментов на главной (from-accent-soft/60 → белый), чтобы визуальный
// язык DayLab был единым на всех входных секциях. Использование: главная
// (#instrumenty), первый блок на страницах калькуляторов, «О проекте».

type PageIntroBandProps = ComponentPropsWithoutRef<"section">;

export function PageIntroBand({ className, ...props }: PageIntroBandProps) {
  const base =
    "relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-accent-soft/60 via-white to-white p-6 shadow-sm ring-1 ring-zinc-200/80 sm:p-8";

  return (
    <section
      className={className ? `${base} ${className}` : base}
      {...props}
    />
  );
}
