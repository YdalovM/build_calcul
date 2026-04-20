export type FloorScreedInput = {
  roomLengthM: number;
  roomWidthM: number;
  excludedAreaM2: number;
  screedThicknessMm: number;
  reservePercent: number;
  bagWeightKg: number;
};

export type FloorScreedResult = {
  floorAreaM2: number;
  workingAreaM2: number;
  screedThicknessM: number;
  screedVolumeM3: number;
  dryMixKg: number;
  dryMixBags: number;
};

export const floorScreedDefaults: FloorScreedInput = {
  roomLengthM: 5,
  roomWidthM: 3.2,
  excludedAreaM2: 0,
  screedThicknessMm: 60,
  reservePercent: 10,
  bagWeightKg: 25,
};

const AVERAGE_DRY_MIX_DENSITY_KG_PER_M3 = 1800;

function roundOne(value: number): number {
  return Math.round(value * 10) / 10;
}

export function calculateFloorScreed(input: FloorScreedInput): FloorScreedResult {
  const floorAreaM2 = input.roomLengthM * input.roomWidthM;
  const workingAreaM2 = Math.max(0, floorAreaM2 - input.excludedAreaM2);
  const screedThicknessM = input.screedThicknessMm / 1000;
  const reserveMultiplier = 1 + input.reservePercent / 100;

  const screedVolumeRaw = workingAreaM2 * screedThicknessM * reserveMultiplier;
  const dryMixKgRaw = screedVolumeRaw * AVERAGE_DRY_MIX_DENSITY_KG_PER_M3;

  return {
    floorAreaM2: roundOne(floorAreaM2),
    workingAreaM2: roundOne(workingAreaM2),
    screedThicknessM: roundOne(screedThicknessM),
    screedVolumeM3: roundOne(screedVolumeRaw),
    dryMixKg: roundOne(dryMixKgRaw),
    dryMixBags: Math.ceil(dryMixKgRaw / input.bagWeightKg),
  };
}
