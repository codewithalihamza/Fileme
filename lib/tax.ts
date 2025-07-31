// Pakistan Tax Slabs for different years (Salaried Persons)

export interface TaxSlab {
  maxIncome: number;
  rate: number;
  fixedTax: number;
}

export interface TaxYear {
  year: string;
  slabs: TaxSlab[];
}

export const taxYears: TaxYear[] = [
  {
    year: "2023-2024",
    slabs: [
      { maxIncome: 600000, rate: 0, fixedTax: 0 },
      { maxIncome: 1200000, rate: 0.025, fixedTax: 0 },
      { maxIncome: 2400000, rate: 0.125, fixedTax: 15000 },
      { maxIncome: 3600000, rate: 0.225, fixedTax: 165000 },
      { maxIncome: 6000000, rate: 0.275, fixedTax: 615000 },
      { maxIncome: Infinity, rate: 0.35, fixedTax: 1245000 },
    ],
  },
  {
    year: "2024-2025",
    slabs: [
      { maxIncome: 600000, rate: 0, fixedTax: 0 },
      { maxIncome: 1200000, rate: 0.025, fixedTax: 0 },
      { maxIncome: 2400000, rate: 0.125, fixedTax: 15000 },
      { maxIncome: 3600000, rate: 0.225, fixedTax: 165000 },
      { maxIncome: 6000000, rate: 0.275, fixedTax: 615000 },
      { maxIncome: Infinity, rate: 0.35, fixedTax: 1245000 },
    ],
  },
  {
    year: "2025-2026",
    slabs: [
      { maxIncome: 600000, rate: 0, fixedTax: 0 },
      { maxIncome: 1200000, rate: 0.01, fixedTax: 0 },
      { maxIncome: 2200000, rate: 0.11, fixedTax: 6000 },
      { maxIncome: 3200000, rate: 0.23, fixedTax: 116000 },
      { maxIncome: 4100000, rate: 0.3, fixedTax: 346000 },
      { maxIncome: Infinity, rate: 0.35, fixedTax: 616000 },
    ],
  },
];

export const calculateTax = (
  yearlyIncome: number,
  taxYear: string = "2025-2026"
): number => {
  const year = taxYears.find((y) => y.year === taxYear);
  if (!year) {
    // Default to 2025-2026 if year not found
    return calculateTax2025_2026(yearlyIncome);
  }

  for (let i = 0; i < year.slabs.length; i++) {
    const slab = year.slabs[i];
    if (yearlyIncome <= slab.maxIncome) {
      if (i === 0) {
        return 0;
      }
      const previousSlab = year.slabs[i - 1];
      const taxableIncome = yearlyIncome - previousSlab.maxIncome;
      return previousSlab.fixedTax + taxableIncome * slab.rate;
    }
  }

  return 0;
};

// Keep the original function for backward compatibility
export const calculateTax2025_2026 = (yearlyIncome: number): number => {
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
