"use client";

import { motion } from "motion/react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    color?: string;
    className?: string;
}

export function LoadingSpinner({
    size = "md",
    color = "#3b82f6",
    className = ""
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12"
    };

    return (
        <motion.div
            className={`${sizeClasses[size]} ${className}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <svg
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </motion.div>
    );
}

export function LoadingDots({ className = "" }: { className?: string }) {
    return (
        <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="h-2 w-2 rounded-full bg-blue-600"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    );
}

export function LoadingPulse({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`h-8 w-8 rounded-full bg-blue-600 ${className}`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
} 