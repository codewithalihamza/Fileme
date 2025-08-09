import { Badge } from "@/components/ui/badge";
import {
  ContactStatus,
  ReferralStatus,
  RequestStatus,
  UserRole,
} from "@/types";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";

export const getRoleBadge = (role: string) => {
  const variants = {
    [UserRole.ADMIN]: "bg-red-500 text-white",
    [UserRole.EMPLOYEES]: "bg-blue-500 text-white",
    [UserRole.CUSTOMER]: "bg-green-500 text-white",
  };
  return (
    <Badge className={variants[role as keyof typeof variants]}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};

export const getRequestsStatusIcon = (status: RequestStatus) => {
  switch (status) {
    case RequestStatus.PENDING:
      return <Clock className="size-4 text-yellow-600" />;
    case RequestStatus.IN_PROGRESS:
      return <FileText className="size-4 text-blue-600" />;
    case RequestStatus.COMPLETED:
      return <CheckCircle className="size-4 text-green-600" />;
    case RequestStatus.PAID:
      return <CheckCircle className="size-4 text-green-600" />;
    case RequestStatus.UNPAID:
      return <XCircle className="size-4 text-red-600" />;
    default:
      return <FileText className="size-4 text-gray-600" />;
  }
};

export const getRequestsStatusBadge = (status: RequestStatus) => {
  const variants = {
    [RequestStatus.PENDING]: "bg-yellow-500 text-white",
    [RequestStatus.IN_PROGRESS]: "bg-blue-500 text-white",
    [RequestStatus.COMPLETED]: "bg-green-500 text-white",
    [RequestStatus.PAID]: "bg-green-600 text-white",
    [RequestStatus.UNPAID]: "bg-red-500 text-white",
  };
  return (
    <Badge className={variants[status]}>
      {status.replace("_", " ").charAt(0).toUpperCase() +
        status.replace("_", " ").slice(1)}
    </Badge>
  );
};

export const getContactsStatusBadge = (status: string) => {
  const variants = {
    [ContactStatus.PENDING]: "bg-yellow-500 text-white",
    [ContactStatus.IN_PROGRESS]: "bg-blue-500 text-white",
    [ContactStatus.CONTACTED]: "bg-green-500 text-white",
  };
  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status.replace("_", " ").charAt(0).toUpperCase() +
        status.replace("_", " ").slice(1).toLowerCase()}
    </Badge>
  );
};

export const getReferralStatusBadge = (status: string) => {
  const variants = {
    [ReferralStatus.PENDING]: "bg-yellow-500 text-white",
    [ReferralStatus.IN_PROGRESS]: "bg-blue-500 text-white",
    [ReferralStatus.COMPLETED]: "bg-green-500 text-white",
    [ReferralStatus.PAID]: "bg-green-600 text-white",
  };
  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status.replace("_", " ").charAt(0).toUpperCase() +
        status.replace("_", " ").slice(1).toLowerCase()}
    </Badge>
  );
};
