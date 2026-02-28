import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "@/shared/hooks/use-breadcrumbs";
import { Fragment } from "react";

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {crumb.href ? (
            <Link
              to={crumb.href}
              className="transition-colors hover:text-foreground"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{crumb.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
