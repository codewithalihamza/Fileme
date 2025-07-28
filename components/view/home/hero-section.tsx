"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-section/financial-analysis.jpg"
          alt="Professional tax advisor working"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-indigo-900/80"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="animate-blob absolute left-10 top-20 size-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="animate-blob animation-delay-2000 absolute right-10 top-40 size-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 size-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Urgency Badge */}
            <motion.div
              className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Clock className="mr-2 size-4 animate-pulse" />⚡ Last Date to
              File: 30th September
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mb-8 text-5xl font-bold leading-tight text-white lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Professional Tax{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Filing Services
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mb-10 text-xl leading-relaxed text-gray-300 lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Expert tax professionals with{" "}
              <span className="font-semibold text-blue-400">99% accuracy</span>{" "}
              and{" "}
              <span className="font-semibold text-green-400">
                24-hour support
              </span>
              . Secure, fast, and completely hassle-free filing experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mb-12 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-lg shadow-2xl hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/contact" className="flex items-center">
                    Start Filing Now
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-8 text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                {
                  icon: Shield,
                  text: "Bank-Level Security",
                  color: "text-green-400",
                },
                {
                  icon: Users,
                  text: "1,000+ Happy Clients",
                  color: "text-blue-400",
                },
                { icon: Star, text: "4.9/5 Rating", color: "text-yellow-400" },
                { icon: Zap, text: "24hr Support", color: "text-purple-400" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon className={`mr-2 size-5 ${item.color}`} />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image Gall ery */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Featured Image */}
            <motion.div
              className="relative mb-8 overflow-hidden rounded-3xl shadow-2xl"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/hero-section/accountant-calculating-profit-with-financial-analysis-graphs.jpg"
                alt="Professional tax inspector reviewing documents"
                width={600}
                height={400}
                className="size-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Expert Tax Review</h3>
                <p className="text-sm text-gray-200">
                  Professional document analysis
                </p>
              </div>
            </motion.div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Stock accounting */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Image
                  src="/hero-section/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.jpg"
                  alt="Financial analysis and market research"
                  width={300}
                  height={200}
                  className="size-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-sm font-semibold">
                    Accounting & Advisor Services
                  </h4>
                  <p className="text-xs text-gray-200">
                    Professional accounting and advisory services
                  </p>
                </div>
              </motion.div>

              {/* Tax Consultation */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Image
                  src="/hero-section/consultant-with-client.jpg"
                  alt="Accountant calculating profits with financial graphs"
                  width={300}
                  height={200}
                  className="size-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-sm font-semibold">Tax Consultation</h4>
                  <p className="text-xs text-gray-200">
                    Professional tax consultation
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Floating Action Cards */}
            <motion.div
              className="absolute -right-8 top-1/4 rounded-2xl bg-white/10 p-4 shadow-2xl backdrop-blur-md"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.1, x: -5 }}
            >
              <div className="flex items-center space-x-3 text-white">
                <div className="rounded-full bg-green-500 p-2">
                  <CheckCircle className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Verified</p>
                  <p className="text-xs text-gray-300">IRS Approved</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
