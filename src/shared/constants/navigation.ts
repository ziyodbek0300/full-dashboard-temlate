import { Users, Settings, type LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";
import type { Permission } from "@/shared/types";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: Permission;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Users",
    href: ROUTES.USERS,
    icon: Users,
  },
  {
    title: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];
