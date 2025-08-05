"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateTax, taxYears } from "@/lib/tax";
import { getTaxSlabInfo } from "@/lib/tax-slabs";
import { formatCurrency, formatNumberWithCommas } from "@/lib/utils";
import {
  Calculator,
  FileText,
  Sparkles,
  TrendingUp,
  TrendingUpDown,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface TaxCalculation {
  monthlyIncome: number;
  monthlyTax: number;
  salaryAfterTax: number;
  yearlyIncome: number;
  yearlyTax: number;
  yearlyIncomeAfterTax: number;
}

export const TaxCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>("");
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedTaxYear, setSelectedTaxYear] = useState(
    taxYears[taxYears.length - 1]
  );
  const [showTaxSlabModal, setShowTaxSlabModal] = useState(false);

  // Handle input change with comma formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setMonthlySalary(value);
    setDisplayValue(formatNumberWithCommas(value));
    // Close results when input changes
    setCalculation(null);
  };

  const handleCalculate = async () => {
    const monthly = parseFloat(monthlySalary);
    if (isNaN(monthly) || monthly < 0) {
      setCalculation(null);
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const yearly = monthly * 12;
    const yearlyTax = calculateTax(yearly, selectedTaxYear.year);
    const monthlyTax = yearlyTax / 12;

    setCalculation({
      monthlyIncome: monthly,
      monthlyTax: monthlyTax,
      salaryAfterTax: monthly - monthlyTax,
      yearlyIncome: yearly,
      yearlyTax: yearlyTax,
      yearlyIncomeAfterTax: yearly - yearlyTax,
    });

    setIsCalculating(false);
  };

  const handleCloseResults = () => {
    setCalculation(null);
    setMonthlySalary("");
    setDisplayValue("");
  };

  return (
    <section className="mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-15 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="relative">
              <div className="rounded-full border bg-blue-100 p-4 shadow-lg">
                <Calculator className="size-10 text-blue-600" />
              </div>
              <motion.div
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="size-3 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h2
            className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tax Calculator
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Calculate your income tax based on the latest tax slabs for salaried
            persons
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-5xl">
          <motion.div
            className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="mb-6 text-center text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Calculate Tax on Your Salary
              </motion.h3>
              <motion.div
                className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-1">
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="monthly-salary"
                      type="text"
                      placeholder="Your Monthly Salary"
                      value={displayValue}
                      onChange={handleInputChange}
                      className="mt-1 border-2 border-gray-200 py-4 text-center text-lg font-semibold transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </motion.div>
                </div>

                {/* Tax Year Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <Select
                    value={selectedTaxYear.year}
                    onValueChange={(value) => {
                      const year = taxYears.find((y) => y.year === value);
                      if (year) {
                        setSelectedTaxYear(year);
                        // Close results when tax year changes
                        setCalculation(null);
                      }
                    }}
                  >
                    <SelectTrigger className="mx-auto w-full max-w-xs">
                      <SelectValue placeholder="Select tax year" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxYears.map((year) => (
                        <SelectItem key={year.year} value={year.year}>
                          {year.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 flex justify-center sm:flex-none"
              >
                <Button
                  onClick={handleCalculate}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                  disabled={
                    !monthlySalary ||
                    parseFloat(monthlySalary) <= 0 ||
                    isCalculating
                  }
                >
                  <AnimatePresence mode="wait">
                    {isCalculating ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Calculating...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="calculate"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Calculate Tax
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>

            {/* Tax Year Info */}
            <motion.div
              className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => setShowTaxSlabModal(true)}
                className="flex w-full items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <motion.div
                  className="h-3 w-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <p className="text-lg font-semibold text-blue-800 underline">
                  View Tax Slabs for {selectedTaxYear.year}
                </p>
                <motion.div
                  className="rounded-full bg-blue-100 p-1"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <FileText className="size-4 text-blue-600" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {calculation && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                {/* Close button */}
                <motion.button
                  onClick={handleCloseResults}
                  className="absolute -right-4 -top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:bg-red-600"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <X className="size-5" />
                </motion.button>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Monthly Results */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-xl">
                      <motion.div
                        className="mb-6 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <motion.div
                          className="mr-4 rounded-full bg-green-100 p-3"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <TrendingUp className="size-6 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Monthly Breakdown
                        </h3>
                      </motion.div>
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {[
                          {
                            label: "Monthly Income",
                            value: calculation.monthlyIncome,
                            color: "green",
                          },
                          {
                            label: "Monthly Tax",
                            value: calculation.monthlyTax,
                            color: "red",
                          },
                          {
                            label: "Salary After Tax",
                            value: calculation.salaryAfterTax,
                            color: "green",
                            highlight: true,
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            className={`flex items-center justify-between rounded-xl border p-4 ${
                              item.highlight
                                ? "border-2 border-green-300 bg-green-100"
                                : "border border-gray-100 bg-white"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + index * 0.1,
                            }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span
                              className={`font-medium ${item.highlight ? "text-lg font-bold text-gray-900" : "text-gray-600"}`}
                            >
                              {item.label}:
                            </span>
                            <span
                              className={`text-lg font-bold ${item.color === "red" ? "text-red-600" : item.highlight ? "text-xl text-green-700" : "text-gray-900"}`}
                            >
                              {formatCurrency(item.value)}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </Card>
                  </motion.div>

                  {/* Yearly Results */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-xl">
                      <motion.div
                        className="mb-6 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <motion.div
                          className="mr-4 rounded-full bg-blue-100 p-3"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <TrendingUpDown className="size-6 text-blue-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Yearly Breakdown
                        </h3>
                      </motion.div>
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        {[
                          {
                            label: "Yearly Income",
                            value: calculation.yearlyIncome,
                            color: "blue",
                          },
                          {
                            label: "Yearly Tax",
                            value: calculation.yearlyTax,
                            color: "red",
                          },
                          {
                            label: "Income After Tax",
                            value: calculation.yearlyIncomeAfterTax,
                            color: "blue",
                            highlight: true,
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            className={`flex items-center justify-between rounded-xl border p-4 ${
                              item.highlight
                                ? "border-2 border-blue-300 bg-blue-100"
                                : "border border-gray-100 bg-white"
                            }`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.9 + index * 0.1,
                            }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span
                              className={`font-medium ${item.highlight ? "text-lg font-bold text-gray-900" : "text-gray-600"}`}
                            >
                              {item.label}:
                            </span>
                            <span
                              className={`text-lg font-bold ${item.color === "red" ? "text-red-600" : item.highlight ? "text-xl text-blue-700" : "text-gray-900"}`}
                            >
                              {formatCurrency(item.value)}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tax Slab Modal */}
      <Modal
        isOpen={showTaxSlabModal}
        onClose={() => setShowTaxSlabModal(false)}
        title={`Tax Slab Information - ${selectedTaxYear.year}`}
      >
        <div className="space-y-6">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="size-8 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Income Tax Slabs
            </h3>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700">
            <div className="space-y-4">
              <div className="text-sm leading-relaxed">
                {getTaxSlabInfo(selectedTaxYear.year)
                  .split("\n")
                  .map((line, index) => {
                    if (line.trim().startsWith("•")) {
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 border-b border-gray-100 py-2 last:border-b-0"
                        >
                          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-700">
                            {line.trim().substring(1).trim()}
                          </span>
                        </div>
                      );
                    } else if (line.trim() === "") {
                      return <div key={index} className="h-2"></div>;
                    } else {
                      return (
                        <div
                          key={index}
                          className="text-sm font-medium text-gray-600"
                        >
                          {line.trim()}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};
