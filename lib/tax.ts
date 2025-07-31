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
      { maxIncome: 6000000, rate: 0.275, fixedTax: 435000 },
      { maxIncome: Infinity, rate: 0.35, fixedTax: 1095000 },
    ],
  },
  {
    year: "2024-2025",
    slabs: [
      { maxIncome: 600000, rate: 0, fixedTax: 0 },
      { maxIncome: 1200000, rate: 0.05, fixedTax: 0 },
      { maxIncome: 2200000, rate: 0.15, fixedTax: 30000 },
      { maxIncome: 3200000, rate: 0.25, fixedTax: 180000 },
      { maxIncome: 4100000, rate: 0.3, fixedTax: 430000 },
      { maxIncome: Infinity, rate: 0.35, fixedTax: 700000 },
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
] as const;

export const calculateTax = (
  yearlyIncome: number,
  taxYear: string = "2025-2026"
): number => {
  const year = taxYears.find((y) => y.year === taxYear);
  if (!year) {
    throw new Error(`Tax year ${taxYear} not found`);
  }

  // Find the appropriate tax slab
  for (let i = 0; i < year.slabs.length; i++) {
    const slab = year.slabs[i];
    if (yearlyIncome <= slab.maxIncome) {
      if (i === 0) {
        return 0; // First slab is always 0%
      }
      // Calculate tax for this slab
      const previousSlab = year.slabs[i - 1];
      const taxableIncome = yearlyIncome - previousSlab.maxIncome;
      return slab.fixedTax + taxableIncome * slab.rate;
    }
  }

  // If income exceeds all slabs, use the last slab
  const lastSlab = year.slabs[year.slabs.length - 1];
  const previousSlab = year.slabs[year.slabs.length - 2];
  const taxableIncome = yearlyIncome - previousSlab.maxIncome;
  return previousSlab.fixedTax + taxableIncome * lastSlab.rate;
};
