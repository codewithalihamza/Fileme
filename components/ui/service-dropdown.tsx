"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicesNames } from "@/types";

interface ServiceDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function ServiceDropdown({
  value,
  onValueChange,
  error,
  placeholder = "Select a service",
  label = "Select Service",
  required = true,
}: ServiceDropdownProps) {
  return (
    <div>
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`mt-1 ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {servicesNames.map((service) => (
            <SelectItem key={service.value} value={service.value}>
              {service.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
