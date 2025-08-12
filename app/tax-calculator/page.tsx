"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateRequiredIncome, calculateTax, taxYears } from "@/lib/tax";
import { TaxYear } from "@/lib/tax-slabs";
import { formatCurrency, formatNumberWithCommas } from "@/lib/utils";
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Calculator,
  Info,
  TrendingUp,
  TrendingUpDown,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ForwardResult {
  monthlyIncome: number;
  monthlyTax: number;
  salaryAfterTaxMonthly: number;
  yearlyIncome: number;
  yearlyTax: number;
  incomeAfterTaxYearly: number;
}

interface ReverseResult {
  expectedTaxMonthly: number;
  requiredMonthlyIncome: number;
  requiredYearlyIncome: number;
  monthlyTax: number;
  yearlyTax: number;
  salaryAfterTaxMonthly: number;
  incomeAfterTaxYearly: number;
}

type Period = "month" | "year";

export default function TaxCalculatorPage() {
  const [period, setPeriod] = useState<Period>("month");
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [amountInput, setAmountInput] = useState<string>("");
  const [displayInput, setDisplayInput] = useState<string>("");
  const [selectedTaxYear, setSelectedTaxYear] = useState(
    taxYears[taxYears.length - 1]
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [forwardResult, setForwardResult] = useState<ForwardResult | null>(
    null
  );
  const [reverseResult, setReverseResult] = useState<ReverseResult | null>(
    null
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/,/g, "");
    setAmountInput(value);
    setDisplayInput(formatNumberWithCommas(value));
    setForwardResult(null);
    setReverseResult(null);
  }

  async function handleCalculate() {
    if (isReverseMode) return handleReverse();
    return handleForward();
  }

  async function handleForward() {
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      setForwardResult(null);
      return;
    }
    setIsCalculating(true);
    await new Promise((r) => setTimeout(r, 400));

    const yearlyIncome = period === "month" ? amount * 12 : amount;
    const monthlyIncome = yearlyIncome / 12;
    const yearlyTax = calculateTax(yearlyIncome, selectedTaxYear.year);
    const monthlyTax = yearlyTax / 12;

    setForwardResult({
      monthlyIncome,
      monthlyTax,
      salaryAfterTaxMonthly: monthlyIncome - monthlyTax,
      yearlyIncome,
      yearlyTax,
      incomeAfterTaxYearly: yearlyIncome - yearlyTax,
    });
    setReverseResult(null);
    setIsCalculating(false);
  }

  async function handleReverse() {
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      setReverseResult(null);
      return;
    }
    setIsCalculating(true);
    await new Promise((r) => setTimeout(r, 400));

    const expectedMonthlyTax = period === "month" ? amount : amount / 12;
    const requiredYearlyIncome = calculateRequiredIncome(
      expectedMonthlyTax,
      selectedTaxYear.year
    );
    const requiredMonthlyIncome = requiredYearlyIncome / 12;

    const verifyYearlyTax = calculateTax(
      requiredYearlyIncome,
      selectedTaxYear.year
    );
    const verifyMonthlyTax = verifyYearlyTax / 12;

    setReverseResult({
      expectedTaxMonthly: expectedMonthlyTax,
      requiredMonthlyIncome: Math.round(requiredMonthlyIncome),
      requiredYearlyIncome: Math.round(requiredYearlyIncome),
      monthlyTax: period === "month" ? amount : verifyMonthlyTax,
      yearlyTax: period === "year" ? amount : verifyMonthlyTax * 12,
      salaryAfterTaxMonthly: Math.round(
        requiredMonthlyIncome - verifyMonthlyTax
      ),
      incomeAfterTaxYearly: Math.round(requiredYearlyIncome - verifyYearlyTax),
    });
    setForwardResult(null);
    setIsCalculating(false);
  }

  function resetAll() {
    setAmountInput("");
    setDisplayInput("");
    setForwardResult(null);
    setReverseResult(null);
  }

  return (
    <section className="mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="rounded-xl border bg-blue-50 p-3">
                  <Calculator className="size-6 text-blue-600" />
                </div>
                <motion.div
                  className="absolute -right-1 -top-1 size-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  Tax Calculator
                </h1>
                <p className="text-sm text-gray-600">
                  Compute taxes precisely using official slabs with forward or
                  reverse mode.
                </p>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={() => {
                  if (isReverseMode) {
                    setIsReverseMode(false);
                    setForwardResult(null);
                    setReverseResult(null);
                  }
                }}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  !isReverseMode
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <ArrowRightLeft className="size-4" />
                Forward
              </button>
              <button
                onClick={() => {
                  if (!isReverseMode) {
                    setIsReverseMode(true);
                    setForwardResult(null);
                    setReverseResult(null);
                  }
                }}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isReverseMode
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <ArrowLeftRight className="size-4" />
                Reverse
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]">
            {/* Period toggle */}
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1">
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  period === "month"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => {
                  setPeriod("month");
                  resetAll();
                }}
              >
                Month
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  period === "year"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => {
                  setPeriod("year");
                  resetAll();
                }}
              >
                Year
              </button>
            </div>

            {/* Amount input with adornments */}
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                Rs
              </span>
              <Input
                type="text"
                placeholder={
                  isReverseMode
                    ? period === "month"
                      ? "Expected Monthly Tax"
                      : "Expected Yearly Tax"
                    : period === "month"
                      ? "Monthly Salary"
                      : "Yearly Salary"
                }
                value={displayInput}
                onChange={handleInputChange}
                className="h-12 pl-10 pr-16 text-center text-base font-semibold"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {period === "month" ? "/mo" : "/yr"}
              </span>
            </div>

            {/* Year select */}
            <Select
              value={selectedTaxYear.year}
              onValueChange={(value) => {
                const yearEnum = value as TaxYear;
                const y = taxYears.find((ty) => ty.year === yearEnum);
                if (y) {
                  setSelectedTaxYear(y);
                  setForwardResult(null);
                  setReverseResult(null);
                }
              }}
            >
              <SelectTrigger className="h-12 w-[170px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {taxYears.map((ty) => (
                  <SelectItem key={ty.year} value={ty.year}>
                    {ty.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCalculate}
                className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:from-blue-700 hover:to-indigo-700"
                disabled={
                  isCalculating || !amountInput || parseFloat(amountInput) <= 0
                }
              >
                <AnimatePresence mode="wait">
                  {isCalculating ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Calculating...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="calc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Calculate
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={resetAll}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Helper */}
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-blue-800">
            <Info className="mt-0.5 size-4" />
            <p>
              Results reflect Pakistan salaried person slabs for the selected
              year. Reverse mode finds the minimum salary to meet the expected
              tax.
            </p>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {forwardResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-2">
                      <TrendingUp className="size-5 text-green-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Monthly
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <ResultRow
                      label="Income"
                      value={forwardResult.monthlyIncome}
                    />
                    <ResultRow
                      label="Tax"
                      value={forwardResult.monthlyTax}
                      color="red"
                    />
                    <ResultRow
                      label="After Tax"
                      value={forwardResult.salaryAfterTaxMonthly}
                      emphasisColor="green"
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {forwardResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-2">
                      <TrendingUpDown className="size-5 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Yearly
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <ResultRow
                      label="Income"
                      value={forwardResult.yearlyIncome}
                    />
                    <ResultRow
                      label="Tax"
                      value={forwardResult.yearlyTax}
                      color="red"
                    />
                    <ResultRow
                      label="After Tax"
                      value={forwardResult.incomeAfterTaxYearly}
                      emphasisColor="blue"
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {reverseResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-2">
                      <TrendingUp className="size-5 text-green-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Monthly
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <ResultRow
                      label="Required Salary"
                      value={reverseResult.requiredMonthlyIncome}
                      emphasisColor="green"
                    />
                    <ResultRow
                      label="Tax"
                      value={reverseResult.monthlyTax}
                      color="red"
                    />
                    <ResultRow
                      label="After Tax"
                      value={reverseResult.salaryAfterTaxMonthly}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {reverseResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-2">
                      <TrendingUpDown className="size-5 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Yearly
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <ResultRow
                      label="Required Salary"
                      value={reverseResult.requiredYearlyIncome}
                    />
                    <ResultRow
                      label="Tax"
                      value={reverseResult.yearlyTax}
                      color="red"
                    />
                    <ResultRow
                      label="After Tax"
                      value={reverseResult.incomeAfterTaxYearly}
                      emphasisColor="blue"
                    />
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            This tool is for guidance only and does not constitute tax advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  color,
  emphasisColor,
}: {
  label: string;
  value: number;
  color?: "red" | "green" | "blue";
  emphasisColor?: "red" | "green" | "blue";
}) {
  const base = "text-lg font-bold";
  const colorClass =
    color === "red"
      ? "text-red-600"
      : color === "green"
        ? "text-green-700"
        : color === "blue"
          ? "text-blue-700"
          : "text-gray-900";
  const emphasis =
    emphasisColor === "red"
      ? "text-red-700"
      : emphasisColor === "green"
        ? "text-green-700"
        : emphasisColor === "blue"
          ? "text-blue-700"
          : colorClass;

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-3">
      <span className="text-gray-600">{label}</span>
      <span className={`${base} ${emphasis}`}>{formatCurrency(value)}</span>
    </div>
  );
}
