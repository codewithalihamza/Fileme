"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <motion.section
      className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="mb-6 text-3xl font-bold text-white lg:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Don&apos;t Miss the Deadline!
        </motion.h2>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-xl text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Time is running out! Get your tax return filed before September 31st
          to avoid penalties and ensure a smooth tax season.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="px-8 py-3 text-lg"
          >
            <Link href="/contact">Start Filing Now</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
