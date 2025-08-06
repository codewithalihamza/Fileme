export interface TaxSlabInfo {
  year: string;
  description: string;
}

export const taxSlabsInfo: TaxSlabInfo[] = [
  {
    year: "2026",
    description: `As per the latest income tax regulations for the year 2026, the following slabs and income tax rates will be applicable for salaried persons:

• Income up to Rs. 600,000: 0% tax rate
• Income from Rs. 600,001 to Rs. 1,200,000: 1% of the amount exceeding Rs. 600,000
• Income from Rs. 1,200,001 to Rs. 2,200,000: Rs. 6,000 + 11% of the amount exceeding Rs. 1,200,000
• Income from Rs. 2,200,001 to Rs. 3,200,000: Rs. 116,000 + 23% of the amount exceeding Rs. 2,200,000
• Income from Rs. 3,200,001 to Rs. 4,100,000: Rs. 346,000 + 30% of the amount exceeding Rs. 3,200,000
• Income above Rs. 4,100,000: Rs. 616,000 + 35% of the amount exceeding Rs. 4,100,000

Additional Surcharge: In case of an individual deriving income chargeable under the head "Salary", the surcharge shall be payable at the rate of nine percent of the income tax imposed under Division I of Part I of the First Schedule where the taxable income exceeds rupees ten million in a tax year.`,
  },
  {
    year: "2025",
    description: `As per the latest income tax regulations for the year 2025, the following slabs and income tax rates will be applicable for salaried persons:

• Income up to Rs. 600,000: 0% tax rate
• Income from Rs. 600,001 to Rs. 1,200,000: 5% of the amount exceeding Rs. 600,000
• Income from Rs. 1,200,001 to Rs. 2,200,000: Rs. 30,000 + 15% of the amount exceeding Rs. 1,200,000
• Income from Rs. 2,200,001 to Rs. 3,200,000: Rs. 180,000 + 25% of the amount exceeding Rs. 2,200,000
• Income from Rs. 3,200,001 to Rs. 4,100,000: Rs. 430,000 + 30% of the amount exceeding Rs. 3,200,000
• Income above Rs. 4,100,000: Rs. 700,000 + 35% of the amount exceeding Rs. 4,100,000`,
  },
  {
    year: "2024",
    description: `As per Federal Budget 2024 presented by Government of Pakistan, following slabs and income tax rates will be applicable for salaried persons for the year 2024:

• Income up to Rs. 600,000: 0% tax rate
• Income from Rs. 600,001 to Rs. 1,200,000: 2.5% of the amount exceeding Rs. 600,000
• Income from Rs. 1,200,001 to Rs. 2,400,000: Rs. 15,000 + 12.5% of the amount exceeding Rs. 1,200,000
• Income from Rs. 2,400,001 to Rs. 3,600,000: Rs. 165,000 + 22.5% of the amount exceeding Rs. 2,400,000
• Income from Rs. 3,600,001 to Rs. 6,000,000: Rs. 435,000 + 27.5% of the amount exceeding Rs. 3,600,000
• Income above Rs. 6,000,000: Rs. 1,095,000 + 35% of the amount exceeding Rs. 6,000,000`,
  },
];

export const getTaxSlabInfo = (year: string): string => {
  const slabInfo = taxSlabsInfo.find((slab) => slab.year === year);
  return slabInfo
    ? slabInfo.description
    : "Tax slab information not available for this year.";
};
