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
    year: "2024",
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
    year: "2025",
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
    year: "2026",
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
  taxYear: string = "2026"
): number => {
  const year = taxYears.find((y) => y.year === taxYear);
  if (!year) {
    throw new Error(`Tax year ${taxYear} not found`);
  }

  let baseTax = 0;

  // Find the appropriate tax slab
  for (let i = 0; i < year.slabs.length; i++) {
    const slab = year.slabs[i];
    if (yearlyIncome <= slab.maxIncome) {
      if (i === 0) {
        baseTax = 0; // First slab is always 0%
        break;
      }
      // Calculate tax for this slab
      const previousSlab = year.slabs[i - 1];
      const taxableIncome = yearlyIncome - previousSlab.maxIncome;
      baseTax = slab.fixedTax + taxableIncome * slab.rate;
      break;
    }
  }

  // If income exceeds all slabs, use the last slab
  if (baseTax === 0) {
    const lastSlab = year.slabs[year.slabs.length - 1];
    const previousSlab = year.slabs[year.slabs.length - 2];
    const taxableIncome = yearlyIncome - previousSlab.maxIncome;
    baseTax = previousSlab.fixedTax + taxableIncome * lastSlab.rate;
  }

  // Apply surcharge for 2025-2026 if income exceeds 10 million
  if (taxYear === "2026" && yearlyIncome > 10000000) {
    const surcharge = baseTax * 0.09; // 9% surcharge
    return baseTax + surcharge;
  }

  return baseTax;
};

// Reverse calculation: Find required yearly income for a given monthly tax
export const calculateRequiredIncome = (
  monthlyTax: number,
  taxYear: string = "2026"
): number => {
  const yearlyTax = monthlyTax * 12;
  const year = taxYears.find((y) => y.year === taxYear);
  if (!year) {
    throw new Error(`Tax year ${taxYear} not found`);
  }

  if (monthlyTax <= 0) return 0;

  const EPS = 1e-6;
  const slabs = year.slabs;

  function invertBaseTax(targetBaseTax: number, allSlabs: TaxSlab[]): number {
    // Find the slab in which this base tax falls, then invert analytically
    for (let i = 1; i < allSlabs.length; i++) {
      const slab = allSlabs[i];
      const prevSlab = allSlabs[i - 1];
      const minTax = slab.fixedTax; // at prevSlab.maxIncome boundary
      const maxTax = Number.isFinite(slab.maxIncome)
        ? slab.fixedTax + (slab.maxIncome - prevSlab.maxIncome) * slab.rate
        : Infinity;

      if (targetBaseTax + EPS >= minTax && targetBaseTax <= maxTax + EPS) {
        // tax = slab.fixedTax + slab.rate * (income - prevSlab.maxIncome)
        // => income = prevSlab.maxIncome + (tax - slab.fixedTax)/slab.rate
        const income =
          prevSlab.maxIncome + (targetBaseTax - slab.fixedTax) / slab.rate;
        return Math.max(0, Math.round(income));
      }
    }
    // If not found (very small target), it must be in the first slab (0% tax)
    return 0;
  }

  // Handle surcharge for 2026: 9% on income tax if income > 10,000,000
  if (taxYear === "2026") {
    const thresholdIncome = 10_000_000;
    const taxAtThreshold = calculateTax(thresholdIncome, taxYear); // no surcharge at exactly threshold

    if (yearlyTax <= taxAtThreshold + EPS) {
      // Below or at the surcharge threshold – invert directly
      return invertBaseTax(yearlyTax, slabs);
    }

    // Above threshold – remove surcharge, invert base tax, then ensure > threshold
    const baseTaxTarget = yearlyTax / 1.09;
    const income = invertBaseTax(baseTaxTarget, slabs);
    if (income <= thresholdIncome) {
      // No exact solution above threshold (gap due to surcharge); choose minimal value above threshold
      return thresholdIncome + 1;
    }
    return income;
  }

  // Years without surcharge: invert directly
  return invertBaseTax(yearlyTax, slabs);
};
