import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Role } from "@/shared/types";
import { Search } from "lucide-react";
import type { UserFilters as UserFiltersType } from "../types";

interface UserFiltersProps {
  filters: UserFiltersType;
  onChange: (filters: UserFiltersType) => void;
}

export function UserFilters({ filters, onChange }: UserFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative max-w-sm flex-1">
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
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value={Role.ADMIN}>Admin</SelectItem>
          <SelectItem value={Role.MANAGER}>Manager</SelectItem>
          <SelectItem value={Role.VIEWER}>Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
