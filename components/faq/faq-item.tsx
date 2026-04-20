type FaqItemProps = {
  question: string;
  answer: string;
  /** Главная: акцентная точка DayLab перед вопросом (как на `app/page.tsx`). */
  variant?: "default" | "accentLead";
};

// ИИ: `<details>` без явного шеврона и hover выглядит как статичная карточка.
// `group-open:*` крутит стрелку; `summary` — крупная зона нажатия + focus-visible.

export function FaqItem({ question, answer, variant = "default" }: FaqItemProps) {
  return (
    <details className="group rounded-lg border border-zinc-200 bg-zinc-50 transition hover:border-zinc-300 hover:bg-white">
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-zinc-900 outline-none transition [-webkit-tap-highlight-color:transparent] [&::-webkit-details-marker]:hidden min-h-11 hover:bg-accent-soft/50 focus-visible:bg-accent-soft/60 focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2"
      >
        {variant === "accentLead" ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span
              aria-hidden="true"
              className="accent-ring-glow mt-0.5 inline-block h-1.5 w-1.5 shrink-0 self-start rounded-full bg-accent sm:mt-0 sm:self-center"
            />
            <span className="min-w-0">{question}</span>
          </span>
        ) : (
          <span className="min-w-0 flex-1 pr-1">{question}</span>
        )}
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-180 group-open:text-accent"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 8 4 4 4-4" />
        </svg>
      </summary>
      <div className="border-t border-zinc-200/80 px-4 pb-4 pt-1">
        <p className="text-sm leading-relaxed text-zinc-700">{answer}</p>
      </div>
    </details>
  );
}
