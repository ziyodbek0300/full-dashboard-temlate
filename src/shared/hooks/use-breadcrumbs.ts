import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export interface Breadcrumb {
  label: string;
  href?: string;
}

const LABEL_MAP: Record<string, string> = {
  app: "Dashboard",
  users: "Users",
  settings: "Settings",
  new: "Create",
  edit: "Edit",
};

export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation();

  return useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [];
    let path = "";

    for (let i = 0; i < parts.length; i++) {
      path += `/${parts[i]}`;
      const label = LABEL_MAP[parts[i]] || parts[i];
      const isLast = i === parts.length - 1;
      breadcrumbs.push({ label, href: isLast ? undefined : path });
    }

    return breadcrumbs;
  }, [location.pathname]);
}
