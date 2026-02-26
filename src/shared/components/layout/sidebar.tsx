import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useSidebarStore } from "@/shared/hooks/use-sidebar";
import { NAV_ITEMS } from "@/shared/constants/navigation";
import { useAuth } from "@/modules/auth/context";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Sidebar() {
  const { collapsed, toggle } = useSidebarStore();
  const location = useLocation();
  const { hasPermission } = useAuth();

  const filteredItems = NAV_ITEMS.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && <span className="text-lg font-semibold">Dashboard</span>}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed ? "mx-auto" : "ml-auto")}
          onClick={toggle}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {filteredItems.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          const Icon = item.icon;

          const linkContent = (
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.href}>{linkContent}</div>;
        })}
      </nav>
    </aside>
  );
}
