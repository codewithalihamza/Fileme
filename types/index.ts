export enum UserRole {
  ADMIN = "admin",
  EMPLOYEES = "employees",
  CUSTOMER = "customer",
}

export const userRoleNames = [
  {
    label: "Admin",
    value: UserRole.ADMIN,
  },
  {
    label: "Employees",
    value: UserRole.EMPLOYEES,
  },
  {
    label: "Customer",
    value: UserRole.CUSTOMER,
  },
];

export enum UserStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
}

export const userStatusNames = [
  {
    label: "Active",
    value: UserStatus.ACTIVE,
  },
  {
    label: "Disabled",
    value: UserStatus.DISABLED,
  },
];

export enum Service {
  TAX = "tax",
  ACCOUNTING = "accounting",
  BUSINESS_VALUATION = "business-valuation",
  FINANCIAL_ANALYSIS = "financial-analysis",
  INTERNAL_CONTROLS = "internal-controls",
  RISK_ADVISORY = "risk-advisory",
}

export const servicesNames = [
  {
    label: "Tax Services",
    value: Service.TAX,
  },
  {
    label: "Accounting & Financial Reporting",
    value: Service.ACCOUNTING,
  },
  {
    label: "Business Valuation Services",
    value: Service.BUSINESS_VALUATION,
  },
  {
    label: "Financial Analysis & Decision Support",
    value: Service.FINANCIAL_ANALYSIS,
  },
  {
    label: "Internal Controls Advisory",
    value: Service.INTERNAL_CONTROLS,
  },
  {
    label: "Risk Advisory Services",
    value: Service.RISK_ADVISORY,
  },
];

export enum ContactStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  CONTACTED = "contacted",
}

export const contactStatusNames = [
  {
    label: "Pending",
    value: ContactStatus.PENDING,
  },
  {
    label: "In Progress",
    value: ContactStatus.IN_PROGRESS,
  },
  {
    label: "Contacted",
    value: ContactStatus.CONTACTED,
  },
];

export enum HeardFrom {
  LINKEDIN = "linkedin",
  WEBSITE = "website",
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  OTHERS = "others",
}
export const heardFromNames = [
  {
    label: "LinkedIn",
    value: HeardFrom.LINKEDIN,
  },
  {
    label: "Website",
    value: HeardFrom.WEBSITE,
  },
  {
    label: "Instagram",
    value: HeardFrom.INSTAGRAM,
  },
  {
    label: "Facebook",
    value: HeardFrom.FACEBOOK,
  },
  {
    label: "Others",
    value: HeardFrom.OTHERS,
  },
];

export enum ReferralStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  PAID = "paid",
}

export const referralStatusNames = [
  {
    label: "Pending",
    value: ReferralStatus.PENDING,
  },
  {
    label: "In Progress",
    value: ReferralStatus.IN_PROGRESS,
  },
  {
    label: "Completed",
    value: ReferralStatus.COMPLETED,
  },
  {
    label: "Paid",
    value: ReferralStatus.PAID,
  },
];

export enum RequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  UNPAID = "unpaid",
  PAID = "paid",
  COMPLETED = "completed",
}

export const requestStatusNames = [
  {
    label: "Pending",
    value: RequestStatus.PENDING,
  },
  {
    label: "In Progress",
    value: RequestStatus.IN_PROGRESS,
  },
  {
    label: "Unpaid",
    value: RequestStatus.UNPAID,
  },
  {
    label: "Paid",
    value: RequestStatus.PAID,
  },
  {
    label: "Completed",
    value: RequestStatus.COMPLETED,
  },
];
