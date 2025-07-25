"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Shield, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="mr-2 h-4 w-4" />⏰ Last Date to File Tax Return:
              31st September
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Get Your Tax Return Filed Before{" "}
              <span className="text-blue-600">31st September!</span>
            </motion.h1>

            <motion.p
              className="mb-8 text-xl leading-relaxed text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Professional tax return filing and audit services. Secure, fast,
              and hassle-free.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="px-8 py-3 text-lg">
                  <Link href="/contact">File Now</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center space-x-6 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                { icon: CheckCircle, text: "Secure & Confidential" },
                { icon: CheckCircle, text: "Expert Team" },
                { icon: CheckCircle, text: "Fast Processing" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="mr-2 h-5 w-5 text-green-500" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="rounded-2xl bg-white p-8 shadow-2xl"
              whileHover={{ y: -10, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                <motion.div
                  className="text-center text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FileText className="mx-auto mb-4 h-24 w-24" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold">
                    Tax Filing Made Easy
                  </h3>
                  <p className="text-blue-100">
                    Professional expertise at your fingertips
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -right-4 -top-4 rounded-full bg-green-500 p-3 text-white shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
            >
              <Shield className="h-6 w-6" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 rounded-full bg-orange-500 p-3 text-white shadow-lg"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              whileHover={{ scale: 1.2 }}
            >
              <TrendingUp className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
