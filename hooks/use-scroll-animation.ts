"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  amount?: "some" | "all" | number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    ...options,
  });

  return { ref, isInView };
}

export function useStaggeredAnimation(
  items: any[],
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    ...options,
  });

  const getStaggerDelay = (index: number, baseDelay = 0.1) => {
    return isInView ? baseDelay * index : 0;
  };

  return { ref, isInView, getStaggerDelay };
}
