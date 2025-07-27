import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone number validation regex (11 digits)
export const PHONE_REGEX = /^\d{11}$/;

export function validatePhoneNumber(phone: string): boolean {
  return PHONE_REGEX.test(phone.trim());
}
