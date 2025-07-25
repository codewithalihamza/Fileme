"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-4 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600"
                whileHover={{ rotate: 5 }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm font-bold text-white">F</span>
              </motion.div>
              <span className="text-xl font-bold">Fileme</span>
            </motion.div>
            <motion.p
              className="text-sm text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Professional tax return filing and audit services. Secure, fast,
              and hassle-free.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="mb-4 text-lg font-semibold"
              whileHover={{ color: "#3b82f6" }}
            >
              Services
            </motion.h3>
            <motion.ul className="space-y-2 text-sm text-gray-300">
              {[
                "Tax Return Filing",
                "Audit Services",
                "Tax Consultation",
                "Financial Planning",
              ].map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    x: 5,
                    color: "#3b82f6",
                  }}
                  className="cursor-pointer"
                >
                  {service}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="mb-4 text-lg font-semibold"
              whileHover={{ color: "#3b82f6" }}
            >
              Contact
            </motion.h3>
            <motion.div className="space-y-2 text-sm text-gray-300">
              {[
                "Email: info@fileme.com",
                "Phone: +1 (555) 123-4567",
                "Hours: Mon-Fri 9AM-6PM",
              ].map((contact, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    x: -5,
                    color: "#3b82f6",
                  }}
                  className="cursor-pointer"
                >
                  {contact}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 border-t border-gray-800 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm text-gray-400"
            whileHover={{ color: "#6b7280" }}
          >
            © 2025 Fileme. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
