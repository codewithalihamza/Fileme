"use client";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { contactInfo } from "@/lib/utils";
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
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
      ],
      image:
        "/hero-section/accountant-calculating-profit-with-financial-analysis-graphs.jpg",
      color: "blue",
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
      ],
      image:
        "/hero-section/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.jpg",
      color: "green",
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
        "Mergers & Acquisitions Valuation Advisory",
      ],
      image: "/hero-section/consultant-with-client.jpg",
      color: "purple",
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
      ],
      image: "/hero-section/financial-analysis.jpg",
      color: "orange",
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
      ],
      image: "/hero-section/internal-controls-advisory.jpg",
      color: "indigo",
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
      ],
      image: "/hero-section/risk-advisory-services.jpg",
      color: "red",
    },
  ];

  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-700/90 to-purple-800/90" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-bold text-white lg:text-6xl">
              About Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Financial Services
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100 lg:text-2xl">
              We are your trusted partner in comprehensive financial services
              including tax services, accounting & financial reporting, business
              valuation, financial analysis, internal controls, and risk
              advisory. With over 7+ years of experience, we help individuals
              and businesses achieve financial success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Our Comprehensive Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We provide a full range of financial services to meet all your
              needs
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div
                    className={`mb-6 inline-flex rounded-xl p-3 ${
                      service.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : service.color === "green"
                          ? "bg-green-100 text-green-600"
                          : service.color === "purple"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {service.icon}
                  </div>

                  <h3 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="mr-3 size-5 shrink-0 text-green-500" />
                        <span className="text-base">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className={`${
                        service.color === "blue"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : service.color === "green"
                            ? "bg-green-600 hover:bg-green-700"
                            : service.color === "purple"
                              ? "bg-purple-600 hover:bg-purple-700"
                              : "bg-orange-600 hover:bg-orange-700"
                      } px-8 py-3 text-lg font-semibold text-white`}
                    >
                      <Link href="/contact">Learn More</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Image */}
                <div
                  className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                >
                  <motion.div
                    className="relative h-96 overflow-hidden rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                Your Trusted Financial Partner
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                We understand that financial matters can be complex and
                overwhelming. That&apos;s why we&apos;re committed to providing
                clear, reliable, and personalized financial services that help
                you make informed decisions.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Our team of experienced professionals combines deep expertise
                with a client-first approach, ensuring that every solution is
                tailored to your specific needs and goals.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 flex size-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="size-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Certified professionals</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 flex size-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="size-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Up-to-date with latest regulations
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 flex size-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="size-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Personalized approach to every client
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 overflow-hidden rounded-2xl">
                <Image
                  src="/hero-section/accountant-calculating-profit-with-financial-analysis-graphs.jpg"
                  alt="Professional team working"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Contact us today to discuss your financial needs and discover how
              we can help you achieve your goals.
            </p>
            <div className="flex items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 px-8 py-3 text-lg font-semibold text-gray-900 hover:bg-yellow-300"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={contactInfo.Phone} />
    </div>
  );
}
