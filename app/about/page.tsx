"use client";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const services = [
    {
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
      image:
        "/hero-section/accountant-calculating-profit-with-financial-analysis-graphs.jpg",
      color: "blue",
    },
    {
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
      image:
        "/hero-section/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.jpg",
      color: "green",
    },
    {
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
      image: "/hero-section/consultant-with-client.jpg",
      color: "purple",
    },
    {
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
      image:
        "/hero-section/business-man-stock-exchange-trader-looking-laptop-screen-night.jpg",
      color: "orange",
    },
  ];

  return (
    <div>
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
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
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
                        <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
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
                      className={`${service.color === "blue"
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
                overwhelming. That&apos;s why we&apos;re committed to providing clear,
                reliable, and personalized financial services that help you make
                informed decisions.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Our team of experienced professionals combines deep expertise
                with a client-first approach, ensuring that every solution is
                tailored to your specific needs and goals.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
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
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
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
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
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
    </div>
  );
}
