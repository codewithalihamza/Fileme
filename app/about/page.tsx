"use client";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { ChartNoAxesCombined, FileText, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Tax Return Services",
      description:
        "Comprehensive tax preparation and filing services for individuals and businesses. We ensure accuracy, maximize deductions, and meet all deadlines.",
      features: [
        "Individual Tax Returns",
        "Business Tax Returns",
        "E-filing Services",
        "Tax Planning",
        "Extension Filing",
      ],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Audit Services",
      description:
        "Professional audit services to ensure financial accuracy, compliance, and transparency. We help businesses maintain trust and meet regulatory requirements.",
      features: [
        "Financial Statement Audits",
        "Internal Audits",
        "Compliance Audits",
        "Risk Assessment",
        "Audit Preparation",
      ],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Tax Consulting",
      description:
        "Expert tax consulting to optimize your tax strategy, minimize liabilities, and ensure compliance with ever-changing tax laws and regulations.",
      features: [
        "Tax Strategy Planning",
        "Business Structure Advice",
        "Tax Law Updates",
        "IRS Representation",
        "Tax Dispute Resolution",
      ],
    },
    {
      icon: <ChartNoAxesCombined className="h-8 w-8" />,
      title: "Financial Planning",
      description:
        "Comprehensive financial planning services to help you achieve your financial goals, from retirement planning to investment strategies.",
      features: [
        "Retirement Planning",
        "Investment Strategies",
        "Estate Planning",
        "Cash Flow Management",
        "Financial Goal Setting",
      ],
    },
  ];

  const stats = [
    { number: "1,000+", label: "Happy Clients" },
    { number: "7+", label: "Years Experience" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-20">
        <div className="absolute inset-0">
          <Image
            src="/hero-section/business-man-stock-exchange-trader-looking-laptop-screen-night.jpg"
            alt="Financial planning"
            fill
            className="object-cover opacity-20"
            priority
          />
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
              We are your trusted partner in tax preparation, audit services,
              consulting, and financial planning. With over 7+ years of
              experience, we help individuals and businesses achieve financial
              success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group cursor-pointer rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-600 p-3 text-white">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-2 text-3xl font-bold text-blue-600 lg:text-4xl">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
    </div>
  );
}
