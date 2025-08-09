import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/types";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";

export const getRoleBadge = (role: string) => {
  const variants = {
    admin: "bg-red-500 text-white",
    employees: "bg-blue-500 text-white",
    customer: "bg-green-500 text-white",
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
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case RequestStatus.IN_PROGRESS:
      return <FileText className="h-4 w-4 text-blue-600" />;
    case RequestStatus.COMPLETED:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case RequestStatus.PAID:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case RequestStatus.UNPAID:
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
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
    pending: "bg-yellow-500 text-white",
    in_progress: "bg-blue-500 text-white",
    contacted: "bg-green-500 text-white",
  };
  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status.replace("_", " ").charAt(0).toUpperCase() +
        status.replace("_", " ").slice(1).toLowerCase()}
    </Badge>
  );
};
