import { TableCell, TableRow } from "@/components/ui/table";
import { Inbox, Search } from "lucide-react";

interface TableEmptyProps {
  message?: string;
  description?: string;
  icon?: "inbox" | "search";
  columns?: number;
}

export function TableEmpty({
  message = "No records found",
  description = "No data available to display",
  icon = "inbox",
  columns = 7,
}: TableEmptyProps) {
  const IconComponent = icon === "search" ? Search : Inbox;

  return (
    <TableRow>
      <TableCell colSpan={columns} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="rounded-full bg-gray-100 p-3">
            <IconComponent className="size-6 text-gray-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">{message}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
