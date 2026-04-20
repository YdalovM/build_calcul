type NumberFieldProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

// ИИ: подписи полей умышленно НЕ используют uppercase + tracking (он для
// заголовков секций). Неразрывный пробел перед единицей — см. withNonBreakingUnit.
// Высота подписи без искусственного min-height: иначе у однострочных лейблов
// остаётся пустота под «вторую строку».

function withNonBreakingUnit(label: string) {
  // Заменяем последний пробел перед единицей измерения (", %", ", м²",
  // ", мм", ", шт") на неразрывный — чтобы единица никогда не уезжала
  // на отдельную строку.
  return label.replace(/, (\S+)$/, ",\u00a0$1");
}

export function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium leading-snug text-zinc-700">
        {withNonBreakingUnit(label)}
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step ?? "any"}
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          onChange(Number.isFinite(nextValue) ? nextValue : 0);
        }}
        className="min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
      />
    </label>
  );
}
