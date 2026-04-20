export type CostEstimateInput = {
  areaM2: number;
  materialsPerM2: number;
  laborPerM2: number;
  logisticsCost: number;
  reservePercent: number;
};

export type CostEstimateResult = {
  materialsCost: number;
  laborCost: number;
  subtotal: number;
  reserveAmount: number;
  total: number;
};

export const costEstimateDefaults: CostEstimateInput = {
  areaM2: 45,
  materialsPerM2: 3800,
  laborPerM2: 2500,
  logisticsCost: 25000,
  reservePercent: 12,
};

function roundRub(value: number): number {
  return Math.round(value);
}

export function calculateCostEstimate(
  input: CostEstimateInput,
): CostEstimateResult {
  const materialsCost = input.areaM2 * input.materialsPerM2;
  const laborCost = input.areaM2 * input.laborPerM2;
  const subtotal = materialsCost + laborCost + input.logisticsCost;
  const reserveAmount = subtotal * (input.reservePercent / 100);
  const total = subtotal + reserveAmount;

  return {
    materialsCost: roundRub(materialsCost),
    laborCost: roundRub(laborCost),
    subtotal: roundRub(subtotal),
    reserveAmount: roundRub(reserveAmount),
    total: roundRub(total),
  };
}
