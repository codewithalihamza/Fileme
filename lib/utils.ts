import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const validatePhoneNumber = (phone: string): boolean => {
  // Pakistani phone number format: 03XXXXXXXXX (11 digits)
  const phoneRegex = /^03\d{9}$/;
  return phoneRegex.test(phone);
};

export const contactInfo = {
  Email: "info@fileme.com",
  Phone: "+92 348 6512212",
  Hours: "Mon-Fri 9AM-6PM",
  Address: "Modal Town, Lahore",
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
