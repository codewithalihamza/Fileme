"use client";
import { CheckCircle, FileText, Shield } from "lucide-react";
import { motion } from "motion/react";

export const ServicesSection = () => {
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
            Comprehensive tax solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <motion.div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FileText className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Tax Return Filing
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              Professional tax return preparation and filing services. We ensure
              accuracy, maximize deductions, and meet all deadlines. Our experts
              handle individual and business tax returns with precision.
            </p>
            <motion.ul className="space-y-2 text-gray-600">
              {[
                "Individual Tax Returns",
                "Business Tax Returns",
                "Maximize Deductions",
                "Electronic Filing",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <motion.div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-600"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Audit Services
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              Comprehensive audit services to ensure compliance and identify
              potential issues before they become problems. Our audit team
              provides thorough financial reviews and recommendations.
            </p>
            <motion.ul className="space-y-2 text-gray-600">
              {[
                "Financial Audits",
                "Compliance Reviews",
                "Risk Assessment",
                "Expert Consultation",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
