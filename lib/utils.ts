import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EMAIL_REGEX, PHONE_REGEX } from "./constants";

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
  return PHONE_REGEX.test(phone);
};
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const contactInfo = {
  Email: "filemetoday@gmail.com",
  Phone: "+92 347 6713425",
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
