"use client";

import { useMemo, useState } from "react";
import { CalculatorHeader } from "@/components/calculators/calculator-header";
import { NumberField } from "@/components/calculators/number-field";
import { floorScreedContent } from "@/content/calculators/floor-screed";
import {
  calculateFloorScreed,
  floorScreedDefaults,
  type FloorScreedInput,
} from "@/lib/calculators/floor-screed";

export function FloorScreedCalculator() {
  const [input, setInput] = useState<FloorScreedInput>(floorScreedDefaults);
  const result = useMemo(() => calculateFloorScreed(input), [input]);

  return (
    // ИИ: @container — см. комментарий в wall-finishing-calculator.tsx.
    <section className="@container rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <CalculatorHeader
        title="Калькулятор: пол и стяжка"
        description="Рассчитайте объем стяжки и ориентировочное количество сухой смеси по параметрам помещения."
        onReset={() => setInput(floorScreedDefaults)}
      />

      <div className="mt-6 grid gap-4 @3xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Параметры помещения
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              label={floorScreedContent.labels.roomLengthM}
              value={input.roomLengthM}
              min={0.5}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, roomLengthM: Math.max(0.5, value) }))
              }
            />
            <NumberField
              label={floorScreedContent.labels.roomWidthM}
              value={input.roomWidthM}
              min={0.5}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, roomWidthM: Math.max(0.5, value) }))
              }
            />
            <NumberField
              label={floorScreedContent.labels.excludedAreaM2}
              value={input.excludedAreaM2}
              min={0}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, excludedAreaM2: Math.max(0, value) }))
              }
            />
            <NumberField
              label={floorScreedContent.labels.screedThicknessMm}
              value={input.screedThicknessMm}
              min={20}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  screedThicknessMm: Math.max(20, value),
                }))
              }
            />
            <NumberField
              label={floorScreedContent.labels.reservePercent}
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
            <NumberField
              label={floorScreedContent.labels.bagWeightKg}
              value={input.bagWeightKg}
              min={20}
              max={50}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  bagWeightKg: Math.min(50, Math.max(20, Math.round(value))),
                }))
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Итог расчета
          </h3>
          {/* ИИ: ключевые числа итога = акцентный цвет DayLab. */}
          <div className="mt-3 space-y-2">
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Рабочая площадь
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {result.workingAreaM2} м²
              </p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Объем стяжки
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {result.screedVolumeM3} м³
              </p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Сухая смесь
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {result.dryMixKg} кг
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                ~{result.dryMixBags} меш. по {input.bagWeightKg} кг
              </p>
            </article>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Как посчитано</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          <li>
            Площадь пола = длина × ширина = {result.floorAreaM2} м².
          </li>
          <li>
            Рабочая площадь = площадь пола − исключаемые зоны ={" "}
            {result.workingAreaM2} м².
          </li>
          <li>
            Объем = рабочая площадь × толщина стяжки × запас ={" "}
            {result.screedVolumeM3} м³.
          </li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Ограничения расчета</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          {floorScreedContent.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
