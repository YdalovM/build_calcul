export type TileCoverageInput = {
  areaLengthM: number;
  areaWidthM: number;
  excludedAreaM2: number;
  tileLengthMm: number;
  tileWidthMm: number;
  reservePercent: number;
  tilesPerPack: number;
};

export type TileCoverageResult = {
  floorAreaM2: number;
  workingAreaM2: number;
  tileAreaM2: number;
  tilesNeeded: number;
  packsNeeded: number;
};

export const tileCoverageDefaults: TileCoverageInput = {
  areaLengthM: 4.2,
  areaWidthM: 3.1,
  excludedAreaM2: 0,
  tileLengthMm: 600,
  tileWidthMm: 600,
  reservePercent: 10,
  tilesPerPack: 4,
};

function roundOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function squareMmToSquareM(value: number): number {
  return value / 1_000_000;
}

export function calculateTileCoverage(
  input: TileCoverageInput,
): TileCoverageResult {
  const floorAreaM2 = input.areaLengthM * input.areaWidthM;
  const workingAreaM2 = Math.max(0, floorAreaM2 - input.excludedAreaM2);
  const tileAreaM2 = squareMmToSquareM(input.tileLengthMm * input.tileWidthMm);
  const reserveMultiplier = 1 + input.reservePercent / 100;

  const tilesRaw = (workingAreaM2 * reserveMultiplier) / tileAreaM2;
  const tilesNeeded = Math.ceil(tilesRaw);
  const packsNeeded = Math.ceil(tilesNeeded / input.tilesPerPack);

  return {
    floorAreaM2: roundOne(floorAreaM2),
    workingAreaM2: roundOne(workingAreaM2),
    tileAreaM2: roundOne(tileAreaM2),
    tilesNeeded,
    packsNeeded,
  };
}
