import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { type Role } from "@/shared/types";
import { ROLE_OPTIONS } from "@/shared/constants/role-options";
import { Search } from "lucide-react";
import type { UserFilters as UserFiltersType } from "../types";

interface UserFiltersProps {
  filters: UserFiltersType;
  onChange: (filters: UserFiltersType) => void;
}

export function UserFilters({ filters, onChange }: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={filters.search || ""}
          onChange={(e) =>
            onChange({ ...filters, search: e.target.value, page: 1 })
          }
          className="pl-9"
        />
      </div>
      <Select
        value={filters.role || "all"}
        onValueChange={(value) =>
          onChange({
            ...filters,
            role: value === "all" ? undefined : (value as Role),
            page: 1,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {ROLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
