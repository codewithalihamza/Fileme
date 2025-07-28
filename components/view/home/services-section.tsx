"use client";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle,
  FileText,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

export const ServicesSection = () => {
  const services = [
    {
      icon: <FileText className="size-8" />,
      title: "Tax Services",
      description:
        "Comprehensive tax services including return filing, compliance, and strategic tax planning to optimize your tax position.",
      features: [
        "Tax Return Filing & Preparation",
        "Business Registration & NTN",
        "SECP Annual Filing",
        "Sales Tax Registration & Returns",
        "Withholding Tax Management",
        "Tax Strategy & Planning",
        "Corporate Registration (SMC, Private Limited)",
        "Tax Compliance & Advisory",
      ],
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-600",
    },
    {
      icon: <Calculator className="size-8" />,
      title: "Accounting & Financial Reporting",
      description:
        "Professional accounting and financial reporting services ensuring compliance with IFRS/GAAP standards and statutory requirements.",
      features: [
        "Bookkeeping & General Ledger",
        "Financial Statements Preparation",
        "Group Accounts & Consolidation",
        "IFRS/GAAP Advisory",
        "Statutory Accounts Preparation",
        "Management Reporting",
        "Financial Accounting Advisory",
        "Outsourced Accounting Services",
      ],
      color: "green",
      gradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      iconBg: "bg-green-600",
    },
    {
      icon: <Building2 className="size-8" />,
      title: "Business Valuation Services",
      description:
        "Expert business valuation services for mergers, acquisitions, investments, and fair value measurements in compliance with IFRS 13.",
      features: [
        "Business Valuation for Mergers & Acquisitions",
        "Fair Value Measurement (IFRS 13)",
        "Share & Intangible Asset Valuation",
        "Purchase Price Allocation (PPA)",
        "Transaction Valuation Services",
        "Financial Asset Valuation",
        "Mergers & Acquisitions Valuation Advisory",
        "Goodwill Impairment Testing",
      ],
      color: "purple",
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-600",
    },
    {
      icon: <BarChart3 className="size-8" />,
      title: "Financial Analysis & Decision Support",
      description:
        "Comprehensive financial analysis and decision support services to drive strategic business decisions and performance optimization.",
      features: [
        "Ratio & Trend Analysis",
        "Industry Benchmarking",
        "Working Capital Assessment",
        "Forecasting & Budgeting",
        "Financial Planning & Analysis (FP&A)",
        "KPI Design & Dashboard Reporting",
        "Performance Reporting",
        "Decision Support Services",
      ],
      color: "orange",
      gradient: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-600",
    },
    {
      icon: <Shield className="size-8" />,
      title: "Internal Controls Advisory",
      description:
        "Comprehensive internal controls design, review, and testing services to ensure robust financial controls and compliance frameworks.",
      features: [
        "Internal Controls Design & Review",
        "COSO/COBIT Framework Compliance",
        "Financial Control Mapping (ICFR/ICOFR)",
        "Risk Control Matrix (RCM)",
        "Controls Implementation",
        "Financial Controls Advisory",
        "Internal Control Testing",
        "Compliance Framework Development",
      ],
      color: "indigo",
      gradient: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-600",
    },
    {
      icon: <AlertTriangle className="size-8" />,
      title: "Risk Advisory Services",
      description:
        "Enterprise risk management and governance advisory services to identify, assess, and mitigate business risks effectively.",
      features: [
        "Risk Assessment & Mapping",
        "Enterprise Risk Management (ERM)",
        "Fraud Risk Assessments",
        "Governance & Compliance (GRC)",
        "Risk Registers & Mitigation",
        "Operational Risk Advisory",
        "Internal Audit Support",
        "Compliance Framework Design",
      ],
      color: "red",
      gradient: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      iconBg: "bg-red-600",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Our Professional Services
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Comprehensive financial solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`rounded-2xl border ${service.borderColor} bg-gradient-to-br ${service.gradient} p-8 transition-all duration-300 hover:shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <motion.div
                className={`mb-6 flex size-16 items-center justify-center rounded-xl ${service.iconBg}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white">{service.icon}</div>
              </motion.div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mb-6 leading-relaxed text-gray-600">
                {service.description}
              </p>

              <motion.ul className="space-y-2 text-gray-600">
                {service.features.map((item, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + featureIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="mr-2 size-5 text-green-500" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
