"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  scrollEffect?: boolean;
  initialY?: number;
  initialOpacity?: number;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
  scrollEffect = true,
  initialY = 50,
  initialOpacity = 0,
}: AnimatedCardProps) {
  const baseClasses = "rounded-2xl bg-white p-6 shadow-lg";
  const combinedClasses = `${baseClasses} ${className}`;

  const scrollAnimation = scrollEffect
    ? {
        initial: { opacity: initialOpacity, y: initialY },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay },
        viewport: { once: true },
      }
    : {};

  const hoverAnimation = hoverEffect
    ? {
        whileHover: {
          y: -10,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          scale: 1.02,
        },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <motion.div
      className={combinedClasses}
      {...scrollAnimation}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedIconCard({
  children,
  className = "",
  delay = 0,
  iconColor = "bg-blue-600",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  iconColor?: string;
}) {
  return (
    <AnimatedCard
      className={className}
      delay={delay}
      hoverEffect={true}
      scrollEffect={true}
    >
      <motion.div
        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${iconColor}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatedCard>
  );
}
