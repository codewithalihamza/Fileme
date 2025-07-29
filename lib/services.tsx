import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calculator,
  FileText,
  Shield,
} from "lucide-react";
import { ReactElement } from "react";

export interface Service {
  icon: ReactElement;
  title: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  gradient: string;
  borderColor: string;
  iconBg: string;
}

export function getServices(): Service[] {
  return [
    {
      icon: <FileText className="size-8" />,
      title: "Tax Services",
      description:
        "Comprehensive tax services including return filing, compliance, and strategic tax planning to optimize your tax position.",
      features: [
        "Tax Return Filing & Preparation",
        "Business Registration & NTN",
        "SECP Annual Filing",
        "Sales Tax Registration & Returns",
        "Withholding Tax Management",
        "Tax Strategy & Planning",
        "Corporate Registration (SMC, Private Limited)",
        "Tax Compliance & Advisory",
      ],
      image:
        "/hero-section/accountant-calculating-profit-with-financial-analysis-graphs.jpg",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-600",
    },
    {
      icon: <Calculator className="size-8" />,
      title: "Accounting & Financial Reporting",
      description:
        "Professional accounting and financial reporting services ensuring compliance with IFRS/GAAP standards and statutory requirements.",
      features: [
        "Bookkeeping & General Ledger",
        "Financial Statements Preparation",
        "Group Accounts & Consolidation",
        "IFRS/GAAP Advisory",
        "Statutory Accounts Preparation",
        "Management Reporting",
        "Financial Accounting Advisory",
        "Outsourced Accounting Services",
      ],
      image:
        "/hero-section/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.jpg",
      color: "green",
      gradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      iconBg: "bg-green-600",
    },
    {
      icon: <Building2 className="size-8" />,
      title: "Business Valuation Services",
      description:
        "Expert business valuation services for mergers, acquisitions, investments, and fair value measurements in compliance with IFRS 13.",
      features: [
        "Business Valuation for Mergers & Acquisitions",
        "Fair Value Measurement (IFRS 13)",
        "Share & Intangible Asset Valuation",
        "Purchase Price Allocation (PPA)",
        "Transaction Valuation Services",
        "Financial Asset Valuation",
        "Mergers & Acquisitions Valuation Advisory",
        "Goodwill Impairment Testing",
      ],
      image: "/hero-section/consultant-with-client.jpg",
      color: "purple",
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-600",
    },
    {
      icon: <BarChart3 className="size-8" />,
      title: "Financial Analysis & Decision Support",
      description:
        "Comprehensive financial analysis and decision support services to drive strategic business decisions and performance optimization.",
      features: [
        "Ratio & Trend Analysis",
        "Industry Benchmarking",
        "Working Capital Assessment",
        "Forecasting & Budgeting",
        "Financial Planning & Analysis (FP&A)",
        "KPI Design & Dashboard Reporting",
        "Performance Reporting",
        "Decision Support Services",
      ],
      image: "/hero-section/financial-analysis.jpg",
      color: "orange",
      gradient: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-600",
    },
    {
      icon: <Shield className="size-8" />,
      title: "Internal Controls Advisory",
      description:
        "Comprehensive internal controls design, review, and testing services to ensure robust financial controls and compliance frameworks.",
      features: [
        "Internal Controls Design & Review",
        "COSO/COBIT Framework Compliance",
        "Financial Control Mapping (ICFR/ICOFR)",
        "Risk Control Matrix (RCM)",
        "Controls Implementation",
        "Financial Controls Advisory",
        "Internal Control Testing",
        "Compliance Framework Development",
      ],
      image: "/hero-section/internal-controls-advisory.jpg",
      color: "indigo",
      gradient: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-600",
    },
    {
      icon: <AlertTriangle className="size-8" />,
      title: "Risk Advisory Services",
      description:
        "Enterprise risk management and governance advisory services to identify, assess, and mitigate business risks effectively.",
      features: [
        "Risk Assessment & Mapping",
        "Enterprise Risk Management (ERM)",
        "Fraud Risk Assessments",
        "Governance & Compliance (GRC)",
        "Risk Registers & Mitigation",
        "Operational Risk Advisory",
        "Internal Audit Support",
        "Compliance Framework Design",
      ],
      image: "/hero-section/risk-advisory-services.jpg",
      color: "red",
      gradient: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      iconBg: "bg-red-600",
    },
  ];
}
