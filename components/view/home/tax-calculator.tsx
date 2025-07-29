"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateTax } from "@/lib/tax";
import { formatCurrency, formatNumberWithCommas } from "@/lib/utils";
import { Calculator, Sparkles, TrendingUp, TrendingUpDown, X } from "lucide-react";
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

    // Handle input change with comma formatting
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        setMonthlySalary(value);
        setDisplayValue(formatNumberWithCommas(value));
    };

    const handleCalculate = async () => {
        const monthly = parseFloat(monthlySalary);
        if (isNaN(monthly) || monthly < 0) {
            setCalculation(null);
            return;
        }

        setIsCalculating(true);

        // Simulate calculation delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const yearly = monthly * 12;
        const yearlyTax = calculateTax(yearly);
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
        <section className=" py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mb-16 text-center"
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
                        <motion.div
                            className="relative"
                        >
                            <div className="rounded-full bg-blue-100 p-4 border shadow-lg">
                                <Calculator className="size-10 text-blue-600" />
                            </div>
                            <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
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
                        Calculate your income tax based on the latest tax slabs for salaried persons
                    </motion.p>
                </motion.div>

                <div className="mx-auto max-w-5xl">
                    <motion.div
                        className="mb-8 rounded-3xl bg-white p-8 shadow-xl border border-gray-200"
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
                                className="mb-6 text-3xl font-bold text-gray-900 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                Enter Your Monthly Salary
                            </motion.h3>
                            <motion.div
                                className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-center max-w-2xl mx-auto"
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
                                            placeholder="Enter your monthly salary (PKR)"
                                            value={displayValue}
                                            onChange={handleInputChange}
                                            className="mt-1 text-lg font-semibold text-center py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex justify-center sm:flex-none"
                                >
                                    <Button
                                        onClick={handleCalculate}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 shadow-lg transition-all duration-300"
                                        disabled={!monthlySalary || parseFloat(monthlySalary) <= 0 || isCalculating}
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
                                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                        </motion.div>

                        {/* Tax Year Selection */}
                        <motion.div
                            className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-200"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <motion.div
                                    className="w-3 h-3 bg-green-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <p className="text-lg font-semibold text-blue-800">
                                    Tax Year: 2025-2026 (Latest)
                                </p>
                            </div>
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
                                    className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
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
                                        <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
                                            <motion.div
                                                className="mb-6 flex items-center"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                            >
                                                <motion.div
                                                    className="mr-4 p-3 bg-green-100 rounded-full"
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <TrendingUp className="size-6 text-green-600" />
                                                </motion.div>
                                                <h3 className="text-2xl font-bold text-gray-900">Monthly Breakdown</h3>
                                            </motion.div>
                                            <motion.div
                                                className="space-y-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.6 }}
                                            >
                                                {[
                                                    { label: "Monthly Income", value: calculation.monthlyIncome, color: "green" },
                                                    { label: "Monthly Tax", value: calculation.monthlyTax, color: "red" },
                                                    { label: "Salary After Tax", value: calculation.salaryAfterTax, color: "green", highlight: true }
                                                ].map((item, index) => (
                                                    <motion.div
                                                        key={item.label}
                                                        className={`flex justify-between items-center p-4 rounded-xl border ${item.highlight
                                                            ? 'bg-green-100 border-2 border-green-300'
                                                            : 'bg-white border border-gray-100'
                                                            }`}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <span className={`font-medium ${item.highlight ? 'text-lg font-bold text-gray-900' : 'text-gray-600'}`}>
                                                            {item.label}:
                                                        </span>
                                                        <span className={`font-bold text-lg ${item.color === 'red' ? 'text-red-600' : item.highlight ? 'text-green-700 text-xl' : 'text-gray-900'}`}>
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
                                        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
                                            <motion.div
                                                className="mb-6 flex items-center"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.5 }}
                                            >
                                                <motion.div
                                                    className="mr-4 p-3 bg-blue-100 rounded-full"
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <TrendingUpDown className="size-6 text-blue-600" />
                                                </motion.div>
                                                <h3 className="text-2xl font-bold text-gray-900">Yearly Breakdown</h3>
                                            </motion.div>
                                            <motion.div
                                                className="space-y-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.7 }}
                                            >
                                                {[
                                                    { label: "Yearly Income", value: calculation.yearlyIncome, color: "blue" },
                                                    { label: "Yearly Tax", value: calculation.yearlyTax, color: "red" },
                                                    { label: "Income After Tax", value: calculation.yearlyIncomeAfterTax, color: "blue", highlight: true }
                                                ].map((item, index) => (
                                                    <motion.div
                                                        key={item.label}
                                                        className={`flex justify-between items-center p-4 rounded-xl border ${item.highlight
                                                            ? 'bg-blue-100 border-2 border-blue-300'
                                                            : 'bg-white border border-gray-100'
                                                            }`}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <span className={`font-medium ${item.highlight ? 'text-lg font-bold text-gray-900' : 'text-gray-600'}`}>
                                                            {item.label}:
                                                        </span>
                                                        <span className={`font-bold text-lg ${item.color === 'red' ? 'text-red-600' : item.highlight ? 'text-blue-700 text-xl' : 'text-gray-900'}`}>
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
        </section>
    );
}; 