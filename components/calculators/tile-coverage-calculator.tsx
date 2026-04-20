"use client";

import { useMemo, useState } from "react";
import { CalculatorHeader } from "@/components/calculators/calculator-header";
import { NumberField } from "@/components/calculators/number-field";
import { tileCoverageContent } from "@/content/calculators/tile-coverage";
import {
  calculateTileCoverage,
  tileCoverageDefaults,
  type TileCoverageInput,
} from "@/lib/calculators/tile-coverage";

export function TileCoverageCalculator() {
  const [input, setInput] = useState<TileCoverageInput>(tileCoverageDefaults);
  const result = useMemo(() => calculateTileCoverage(input), [input]);

  return (
    // ИИ: @container — см. комментарий в wall-finishing-calculator.tsx.
    <section className="@container rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <CalculatorHeader
        title="Калькулятор: плитка и покрытия"
        description="Рассчитайте количество плитки и упаковок для закупки с учетом запаса."
        onReset={() => setInput(tileCoverageDefaults)}
      />

      <div className="mt-6 grid gap-4 @3xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Параметры укладки
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              label={tileCoverageContent.labels.areaLengthM}
              value={input.areaLengthM}
              min={0.5}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, areaLengthM: Math.max(0.5, value) }))
              }
            />
            <NumberField
              label={tileCoverageContent.labels.areaWidthM}
              value={input.areaWidthM}
              min={0.5}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, areaWidthM: Math.max(0.5, value) }))
              }
            />
            <NumberField
              label={tileCoverageContent.labels.excludedAreaM2}
              value={input.excludedAreaM2}
              min={0}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, excludedAreaM2: Math.max(0, value) }))
              }
            />
            <NumberField
              label={tileCoverageContent.labels.reservePercent}
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
              label={tileCoverageContent.labels.tileLengthMm}
              value={input.tileLengthMm}
              min={100}
              step={10}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  tileLengthMm: Math.max(100, Math.round(value)),
                }))
              }
            />
            <NumberField
              label={tileCoverageContent.labels.tileWidthMm}
              value={input.tileWidthMm}
              min={100}
              step={10}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  tileWidthMm: Math.max(100, Math.round(value)),
                }))
              }
            />
            <NumberField
              label={tileCoverageContent.labels.tilesPerPack}
              value={input.tilesPerPack}
              min={1}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  tilesPerPack: Math.max(1, Math.round(value)),
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
                Количество плитки
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {result.tilesNeeded} шт
              </p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                Количество упаковок
              </p>
              <p className="accent-text-glow mt-2 text-xl font-semibold text-accent">
                {result.packsNeeded} уп.
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                При {input.tilesPerPack} плитках в упаковке
              </p>
            </article>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Как посчитано</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          <li>
            Площадь укладки = длина × ширина = {result.floorAreaM2} м².
          </li>
          <li>
            Рабочая площадь = площадь укладки − исключаемые зоны ={" "}
            {result.workingAreaM2} м².
          </li>
          <li>
            Площадь одной плитки = {result.tileAreaM2} м², далее учитывается запас{" "}
            {input.reservePercent}%.
          </li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Ограничения расчета</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          {tileCoverageContent.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
