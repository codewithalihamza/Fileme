// Referral program configuration
export const REFERRAL_REWARD_PERCENTAGE = 15; // 15% reward for referrals

export const PHONE_REGEX = /^03\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getRoleDescription = (role: string) => {
  switch (role) {
    case "admin":
      return "Full system access and management";
    case "employees":
      return "Limited access for team members";
    case "customer":
      return "Basic access for customers";
    default:
      return "";
  }
};
