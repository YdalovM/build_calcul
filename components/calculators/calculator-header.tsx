type CalculatorHeaderProps = {
  title: string;
  description: string;
  onReset: () => void;
  resetLabel?: string;
};

// ИИ: шапка калькулятора — заголовок + описание + сброс. Сброс не оформляем
// как «вторую кнопку уровня формы» с рамкой: это вторичное действие, его место
// в правом верхнем углу блока текста как тихая текстовая кнопка с иконкой
// (без заливки и без конкурирования с полями ввода). См. blacklist CTA в
// build-calcul-visual-accent.mdc — красного на сбросе нет.

function IconReset({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function CalculatorHeader({
  title,
  description,
  onReset,
  resetLabel = "Сбросить",
}: CalculatorHeaderProps) {
  return (
    <header className="border-b border-zinc-100 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-600">{description}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <IconReset className="h-4 w-4 text-zinc-400 transition group-hover:text-zinc-600" />
          {resetLabel}
        </button>
      </div>
    </header>
  );
}
