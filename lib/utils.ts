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

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with commas
export const formatNumberWithCommas = (value: string): string => {
  const numericValue = value.replace(/,/g, "");
  if (numericValue === "") return "";

  const number = parseFloat(numericValue);
  if (isNaN(number)) return "";

  return number.toLocaleString("en-US");
};
