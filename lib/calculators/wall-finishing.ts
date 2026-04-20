export type WallFinishingInput = {
  roomLengthM: number;
  roomWidthM: number;
  wallHeightM: number;
  openingsAreaM2: number;
  reservePercent: number;
  plasterThicknessMm: number;
  puttyThicknessMm: number;
  paintCoats: number;
};

// ИИ: паттерн для следующих модулей:
// 1) отдельный тип Input/Result;
// 2) дефолты в этом файле;
// 3) чистая функция calculate... без React/DOM.
export type WallFinishingResult = {
  wallAreaM2: number;
  workingAreaM2: number;
  reserveMultiplier: number;
  plasterKg: number;
  puttyKg: number;
  primerL: number;
  paintL: number;
  plasterBags30Kg: number;
  puttyBags20Kg: number;
  primerCanisters10L: number;
  paintBuckets10L: number;
};

export const wallFinishingDefaults: WallFinishingInput = {
  roomLengthM: 5,
  roomWidthM: 3.2,
  wallHeightM: 2.7,
  openingsAreaM2: 4,
  reservePercent: 10,
  plasterThicknessMm: 10,
  puttyThicknessMm: 1.5,
  paintCoats: 2,
};

const rates = {
  plasterKgPerM2Per10Mm: 8.5,
  puttyKgPerM2Per1Mm: 1.2,
  primerLPerM2: 0.1,
  paintLPerM2PerCoat: 0.12,
  plasterBagKg: 30,
  puttyBagKg: 20,
  liquidPackageL: 10,
} as const;

function roundOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function ceilPackages(total: number, packSize: number): number {
  return Math.ceil(total / packSize);
}

export function calculateWallFinishing(
  input: WallFinishingInput,
): WallFinishingResult {
  const wallAreaM2 = 2 * (input.roomLengthM + input.roomWidthM) * input.wallHeightM;
  const workingAreaM2 = Math.max(0, wallAreaM2 - input.openingsAreaM2);
  const reserveMultiplier = 1 + input.reservePercent / 100;

  const plasterKgRaw =
    workingAreaM2 *
    (input.plasterThicknessMm / 10) *
    rates.plasterKgPerM2Per10Mm *
    reserveMultiplier;
  const puttyKgRaw =
    workingAreaM2 *
    input.puttyThicknessMm *
    rates.puttyKgPerM2Per1Mm *
    reserveMultiplier;
  const primerLRaw = workingAreaM2 * rates.primerLPerM2 * reserveMultiplier;
  const paintLRaw =
    workingAreaM2 *
    input.paintCoats *
    rates.paintLPerM2PerCoat *
    reserveMultiplier;

  const plasterKg = roundOne(plasterKgRaw);
  const puttyKg = roundOne(puttyKgRaw);
  const primerL = roundOne(primerLRaw);
  const paintL = roundOne(paintLRaw);

  return {
    wallAreaM2: roundOne(wallAreaM2),
    workingAreaM2: roundOne(workingAreaM2),
    reserveMultiplier: roundOne(reserveMultiplier),
    plasterKg,
    puttyKg,
    primerL,
    paintL,
    plasterBags30Kg: ceilPackages(plasterKgRaw, rates.plasterBagKg),
    puttyBags20Kg: ceilPackages(puttyKgRaw, rates.puttyBagKg),
    primerCanisters10L: ceilPackages(primerLRaw, rates.liquidPackageL),
    paintBuckets10L: ceilPackages(paintLRaw, rates.liquidPackageL),
  };
}
