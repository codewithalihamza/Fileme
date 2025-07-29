// Pakistan Tax Slabs for 2025-2026 (Salaried Persons)
export const calculateTax = (yearlyIncome: number): number => {
  if (yearlyIncome <= 600000) {
    return 0;
  } else if (yearlyIncome <= 1200000) {
    return (yearlyIncome - 600000) * 0.01;
  } else if (yearlyIncome <= 2200000) {
    return 6000 + (yearlyIncome - 1200000) * 0.11;
  } else if (yearlyIncome <= 3200000) {
    return 116000 + (yearlyIncome - 2200000) * 0.23;
  } else if (yearlyIncome <= 4100000) {
    return 346000 + (yearlyIncome - 3200000) * 0.3;
  } else {
    return 616000 + (yearlyIncome - 4100000) * 0.35;
  }
};
