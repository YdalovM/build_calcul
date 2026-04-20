"use client";

import { useId, useState } from "react";
import { NumberField } from "@/components/calculators/number-field";

// ИИ: переиспользуемый раскрывающийся блок "посчитать площадь по размерам".
// Задача — снять с пользователя требование знать формулу площади: часть
// аудитории физически не перемножает два числа в уме. Компонент хранит
// локальный список пар "ширина × высота" и прокидывает их сумму в м²
// в родительское поле (NumberField "Площадь ..., м²") через onTotalChange.
// Вызов onTotalChange происходит ТОЛЬКО при пользовательских действиях
// (ввод значения, добавление/удаление строки), чтобы открытие помощника
// не затёрло ранее введённое в поле значение до первого взаимодействия.

type Row = {
  id: string;
  widthM: number;
  heightM: number;
};

type InitialRow = {
  widthM: number;
  heightM: number;
};

type AreaSumHelperProps = {
  /** Подпись кнопки-триггера в свёрнутом состоянии. */
  triggerLabel: string;
  /** Заголовок развёрнутого блока. */
  title: string;
  /** Короткая подпись-помощь под заголовком. */
  hint?: string;
  /** Подпись одного элемента в списке ("Проем", "Исключаемая зона" и т. п.). */
  itemLabel: string;
  /** Набор строк, который появляется при первом раскрытии. */
  initialRows?: ReadonlyArray<InitialRow>;
  /** Вызывается при каждом пользовательском изменении суммы (в м²). */
  onTotalChange: (total: number) => void;
};

function createRowId() {
  return Math.random().toString(36).slice(2, 10);
}

function computeTotal(rows: ReadonlyArray<Row>): number {
  const raw = rows.reduce(
    (sum, row) => sum + Math.max(0, row.widthM) * Math.max(0, row.heightM),
    0,
  );
  return Math.round(raw * 100) / 100;
}

export function AreaSumHelper({
  triggerLabel,
  title,
  hint,
  itemLabel,
  initialRows = [{ widthM: 0.8, heightM: 2 }],
  onTotalChange,
}: AreaSumHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState<Row[]>(() =>
    initialRows.map((row) => ({ id: createRowId(), ...row })),
  );
  const panelId = useId();

  const total = computeTotal(rows);

  const applyRows = (next: Row[]) => {
    setRows(next);
    onTotalChange(computeTotal(next));
  };

  const updateRow = (id: string, patch: Partial<InitialRow>) => {
    applyRows(
      rows.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const addRow = () => {
    applyRows([...rows, { id: createRowId(), widthM: 1, heightM: 1 }]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) {
      return;
    }
    applyRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full min-h-11 items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft px-3 py-3 text-left text-sm font-medium leading-snug text-accent-hover transition hover:border-accent hover:bg-accent/10 sm:inline-flex sm:w-auto sm:max-w-xl sm:items-center sm:py-2"
      >
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/45 bg-white text-base font-semibold leading-none text-accent sm:mt-0"
        >
          {isOpen ? "−" : "+"}
        </span>
        <span className="min-w-0 flex-1">
          {isOpen ? "Свернуть калькулятор площади" : triggerLabel}
        </span>
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className="mt-3 rounded-lg border border-zinc-200 bg-white p-4"
        >
          <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
          {hint ? (
            <p className="mt-1 text-xs text-zinc-600">{hint}</p>
          ) : null}

          <ul className="mt-3 space-y-3">
            {rows.map((row, index) => (
              <li
                key={row.id}
                className="rounded-md border border-zinc-200 bg-zinc-50 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-600">
                    {itemLabel} {index + 1}
                  </span>
                  {rows.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-xs font-medium text-zinc-500 transition hover:text-accent-hover"
                    >
                      Удалить
                    </button>
                  ) : null}
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <NumberField
                    label="Ширина, м"
                    value={row.widthM}
                    min={0}
                    step={0.1}
                    onChange={(value) =>
                      updateRow(row.id, { widthM: Math.max(0, value) })
                    }
                  />
                  <NumberField
                    label="Высота, м"
                    value={row.heightM}
                    min={0}
                    step={0.1}
                    onChange={(value) =>
                      updateRow(row.id, { heightM: Math.max(0, value) })
                    }
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Площадь этого элемента:{" "}
                  <span className="font-semibold text-zinc-800">
                    {(
                      Math.max(0, row.widthM) * Math.max(0, row.heightM)
                    ).toFixed(2)}{" "}
                    м²
                  </span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={addRow}
              className="min-h-11 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              + Добавить
            </button>
            <p className="text-sm text-zinc-700">
              Сумма:{" "}
              <span className="accent-text-glow font-semibold text-accent">
                {total.toFixed(2)} м²
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
