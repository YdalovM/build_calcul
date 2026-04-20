"use client";

import { useMemo, useState } from "react";
import { CalculatorHeader } from "@/components/calculators/calculator-header";
import { NumberField } from "@/components/calculators/number-field";
import { costEstimateContent } from "@/content/calculators/cost-estimate";
import {
  calculateCostEstimate,
  costEstimateDefaults,
  type CostEstimateInput,
} from "@/lib/calculators/cost-estimate";

const rubFormatter = new Intl.NumberFormat("ru-RU");

function formatRub(value: number): string {
  return `${rubFormatter.format(value)} ₽`;
}

export function CostEstimateCalculator() {
  const [input, setInput] = useState<CostEstimateInput>(costEstimateDefaults);
  const result = useMemo(() => calculateCostEstimate(input), [input]);

  return (
    // ИИ: @container — см. комментарий в wall-finishing-calculator.tsx.
    <section className="@container rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <CalculatorHeader
        title="Калькулятор: расходники и смета"
        description="Оцените бюджет ремонта по площади с учетом материалов, работ, логистики и финансового резерва."
        onReset={() => setInput(costEstimateDefaults)}
      />

      <div className="mt-6 grid gap-4 @3xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Параметры сметы
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              label={costEstimateContent.labels.areaM2}
              value={input.areaM2}
              min={1}
              step={0.5}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, areaM2: Math.max(1, value) }))
              }
            />
            <NumberField
              label={costEstimateContent.labels.materialsPerM2}
              value={input.materialsPerM2}
              min={0}
              step={100}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, materialsPerM2: Math.max(0, value) }))
              }
            />
            <NumberField
              label={costEstimateContent.labels.laborPerM2}
              value={input.laborPerM2}
              min={0}
              step={100}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, laborPerM2: Math.max(0, value) }))
              }
            />
            <NumberField
              label={costEstimateContent.labels.logisticsCost}
              value={input.logisticsCost}
              min={0}
              step={500}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, logisticsCost: Math.max(0, value) }))
              }
            />
            <NumberField
              label={costEstimateContent.labels.reservePercent}
              value={input.reservePercent}
              min={0}
              max={50}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  reservePercent: Math.min(50, Math.max(0, value)),
                }))
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Итог расчета
          </h3>
          {/* ИИ: ключевые числа итога = акцентный цвет DayLab. Итог бюджета — главный ответ. */}
          <div className="mt-3 space-y-2">
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Материалы
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {formatRub(result.materialsCost)}
              </p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Работа</p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {formatRub(result.laborCost)}
              </p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Резерв и итог
              </p>
              <p className="mt-2 text-base text-zinc-700">
                Резерв: {formatRub(result.reserveAmount)}
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                Итого: {formatRub(result.total)}
              </p>
            </article>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Как посчитано</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          <li>Материалы = площадь × цена материалов за м².</li>
          <li>Работа = площадь × цена работ за м².</li>
          <li>Промежуточный итог = материалы + работа + логистика.</li>
          <li>Финальный итог = промежуточный итог + резерв.</li>
        </ul>
        <p className="mt-2 text-sm text-zinc-700">
          Промежуточный итог: <strong>{formatRub(result.subtotal)}</strong>.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Ограничения расчета</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          {costEstimateContent.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
