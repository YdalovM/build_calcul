"use client";

import { useMemo, useState } from "react";
import { wallFinishingContent } from "@/content/calculators/wall-finishing";
import { AreaSumHelper } from "@/components/calculators/area-sum-helper";
import { CalculatorHeader } from "@/components/calculators/calculator-header";
import { NumberField } from "@/components/calculators/number-field";
import {
  calculateWallFinishing,
  type WallFinishingInput,
  wallFinishingDefaults,
} from "@/lib/calculators/wall-finishing";

type MaterialCardProps = {
  title: string;
  amount: string;
  packageHint: string;
};

function MaterialCard({ title, amount, packageHint }: MaterialCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">{title}</p>
      {/* ИИ: ключевой ответ расчёта = акцентный цвет DayLab с лёгким неоном. */}
      <p className="accent-text-glow mt-2 text-xl font-semibold leading-none text-accent">
        {amount}
      </p>
      <p className="mt-2 text-xs text-zinc-600">{packageHint}</p>
    </article>
  );
}

export function WallFinishingCalculator() {
  const [input, setInput] = useState<WallFinishingInput>(wallFinishingDefaults);

  const result = useMemo(() => calculateWallFinishing(input), [input]);

  return (
    // ИИ: @container (Tailwind 4 container queries) — дочерние сетки реагируют
    // на ширину самого калькулятора, а не вьюпорта. Нужно потому, что контент
    // сайта капится max-w-4xl и слева съедается 260px сайдбар: без @container
    // lg:- и xl:-брейкпоинты включают многоколоночные сетки там, где по
    // фактической ширине карточки места уже нет. Переводить lg:grid-cols-*
    // обратно на viewport-брейкпоинты нельзя — поломает верстку параметров.
    <section className="@container rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <CalculatorHeader
        title="Калькулятор: стены и отделка"
        description="Введите параметры помещения и получите ориентировочный расход материалов для штукатурки, шпаклевки, грунтовки и покраски."
        onReset={() => setInput(wallFinishingDefaults)}
      />

      <div className="mt-6 grid gap-4 @3xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Параметры помещения
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              label={wallFinishingContent.labels.roomLengthM}
              value={input.roomLengthM}
              min={0.1}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, roomLengthM: Math.max(0.1, value) }))
              }
            />
            <NumberField
              label={wallFinishingContent.labels.roomWidthM}
              value={input.roomWidthM}
              min={0.1}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, roomWidthM: Math.max(0.1, value) }))
              }
            />
            <NumberField
              label={wallFinishingContent.labels.wallHeightM}
              value={input.wallHeightM}
              min={1}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, wallHeightM: Math.max(1, value) }))
              }
            />
            <NumberField
              label={wallFinishingContent.labels.openingsAreaM2}
              value={input.openingsAreaM2}
              min={0}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({ ...prev, openingsAreaM2: Math.max(0, value) }))
              }
            />
          </div>
          {/* ИИ: помощник по площади проемов. Часть аудитории не помнит формулу
              S = ширина × высота и вводит в поле 0. Помощник снимает этот
              барьер: пользователь вбивает габариты двери/окна, сумма едет
              в поле openingsAreaM2 автоматически. */}
          <AreaSumHelper
            triggerLabel="Посчитать площадь проемов по размерам"
            title="Площадь проемов по ширине и высоте"
            hint="Введите размеры каждого окна и двери. Сумма подставится в поле «Площадь проемов» автоматически."
            itemLabel="Проем"
            initialRows={[
              { widthM: 0.9, heightM: 2.05 },
            ]}
            onTotalChange={(value) =>
              setInput((prev) => ({ ...prev, openingsAreaM2: Math.max(0, value) }))
            }
          />
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Параметры отделки
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumberField
              label={wallFinishingContent.labels.reservePercent}
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
              label={wallFinishingContent.labels.paintCoats}
              value={input.paintCoats}
              min={1}
              max={5}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  paintCoats: Math.min(5, Math.max(1, Math.round(value))),
                }))
              }
            />
            <NumberField
              label={wallFinishingContent.labels.plasterThicknessMm}
              value={input.plasterThicknessMm}
              min={1}
              step={1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  plasterThicknessMm: Math.max(1, value),
                }))
              }
            />
            <NumberField
              label={wallFinishingContent.labels.puttyThicknessMm}
              value={input.puttyThicknessMm}
              min={0.5}
              step={0.1}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  puttyThicknessMm: Math.max(0.5, value),
                }))
              }
            />
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
          Базовые площади
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <article className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
              Площадь всех стен
            </p>
            <p className="mt-2 text-xl font-semibold text-zinc-950">
              {result.wallAreaM2} м²
            </p>
          </article>
          <article className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
              Рабочая площадь
            </p>
            <p className="mt-2 text-xl font-semibold text-zinc-950">
              {result.workingAreaM2} м²
            </p>
          </article>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">
          Материалы к закупке
        </h3>
        <div className="mt-3 grid gap-3 @md:grid-cols-2 @4xl:grid-cols-4">
          <MaterialCard
            title="Штукатурка"
            amount={`${result.plasterKg} кг`}
            packageHint={`~${result.plasterBags30Kg} меш. по 30 кг`}
          />
          <MaterialCard
            title="Шпаклевка"
            amount={`${result.puttyKg} кг`}
            packageHint={`~${result.puttyBags20Kg} меш. по 20 кг`}
          />
          <MaterialCard
            title="Грунтовка"
            amount={`${result.primerL} л`}
            packageHint={`~${result.primerCanisters10L} кан. по 10 л`}
          />
          <MaterialCard
            title="Краска"
            amount={`${result.paintL} л`}
            packageHint={`~${result.paintBuckets10L} вед. по 10 л`}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Как посчитано</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          <li>
            Площадь стен = 2 × (длина + ширина) × высота = {result.wallAreaM2} м².
          </li>
          <li>
            Рабочая площадь = площадь стен − проемы = {result.workingAreaM2} м².
          </li>
          <li>
            Запас = {input.reservePercent}% (коэффициент {result.reserveMultiplier}).
          </li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Ограничения расчета</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          {wallFinishingContent.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
